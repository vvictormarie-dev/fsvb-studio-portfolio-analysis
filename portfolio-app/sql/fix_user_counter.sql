-- Fix critiques pour compteur utilisateurs sessions collaboratives
-- À exécuter dans l'éditeur SQL Supabase IMMÉDIATEMENT

-- ================================================
-- ÉTAPE 1: Nouvelle table pour tracker utilisateurs uniques
-- ================================================

CREATE TABLE IF NOT EXISTS session_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(50) NOT NULL,
  user_fingerprint VARCHAR(255) NOT NULL,
  connected_at TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_user_per_session UNIQUE(session_id, user_fingerprint)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_session_users_session_id ON session_users(session_id);
CREATE INDEX IF NOT EXISTS idx_session_users_last_seen ON session_users(last_seen);

-- ================================================
-- ÉTAPE 2: REMPLACER anciennes fonctions RPC bugguées
-- ================================================

-- Supprimer anciennes fonctions défaillantes
DROP FUNCTION IF EXISTS increment_active_users(VARCHAR);
DROP FUNCTION IF EXISTS decrement_active_users(VARCHAR);

-- Nouvelle fonction avec déduplication et tracking correct
CREATE OR REPLACE FUNCTION increment_active_users_safe(
  p_session_id VARCHAR, 
  p_user_fingerprint VARCHAR
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Insérer ou mettre à jour la dernière activité utilisateur
  INSERT INTO session_users (session_id, user_fingerprint, last_seen)
  VALUES (p_session_id, p_user_fingerprint, NOW())
  ON CONFLICT (session_id, user_fingerprint) 
  DO UPDATE SET last_seen = NOW();
  
  -- Compter les utilisateurs actifs (dernière activité < 5 minutes)
  SELECT COUNT(*) INTO user_count
  FROM session_users 
  WHERE session_id = p_session_id 
    AND last_seen > NOW() - INTERVAL '5 minutes';
  
  -- Mettre à jour le compteur dans live_sessions
  UPDATE live_sessions 
  SET active_users = user_count, 
      updated_at = NOW()
  WHERE live_sessions.session_id = p_session_id;
  
  RETURN user_count;
END;
$$;

-- Nouvelle fonction pour décrémenter avec nettoyage
CREATE OR REPLACE FUNCTION decrement_active_users_safe(
  p_session_id VARCHAR,
  p_user_fingerprint VARCHAR
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Marquer l'utilisateur comme déconnecté (supprimer l'entrée)
  DELETE FROM session_users 
  WHERE session_id = p_session_id 
    AND user_fingerprint = p_user_fingerprint;
  
  -- Nettoyer les utilisateurs inactifs (> 5 minutes)
  DELETE FROM session_users 
  WHERE session_id = p_session_id 
    AND last_seen < NOW() - INTERVAL '5 minutes';
  
  -- Compter les utilisateurs encore actifs
  SELECT COUNT(*) INTO user_count
  FROM session_users 
  WHERE session_id = p_session_id;
  
  -- Mettre à jour le compteur dans live_sessions
  UPDATE live_sessions 
  SET active_users = GREATEST(user_count, 0),
      updated_at = NOW()
  WHERE live_sessions.session_id = p_session_id;
  
  RETURN GREATEST(user_count, 0);
END;
$$;

-- Fonction pour nettoyer automatiquement les utilisateurs inactifs
CREATE OR REPLACE FUNCTION cleanup_inactive_users()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  cleaned_count INTEGER;
  session_record RECORD;
BEGIN
  -- Supprimer les utilisateurs inactifs (> 5 minutes)
  DELETE FROM session_users 
  WHERE last_seen < NOW() - INTERVAL '5 minutes';
  
  GET DIAGNOSTICS cleaned_count = ROW_COUNT;
  
  -- Mettre à jour tous les compteurs des sessions actives
  FOR session_record IN 
    SELECT DISTINCT session_id FROM live_sessions WHERE expires_at > NOW()
  LOOP
    UPDATE live_sessions 
    SET active_users = (
      SELECT COUNT(*) FROM session_users 
      WHERE session_id = session_record.session_id
    ),
    updated_at = NOW()
    WHERE session_id = session_record.session_id;
  END LOOP;
  
  RETURN cleaned_count;
END;
$$;

-- ================================================
-- ÉTAPE 3: RESET compteur session de test défaillante
-- ================================================

-- Reset immédiat pour la session de test hePFo7uw
UPDATE live_sessions 
SET active_users = 0 
WHERE session_id = 'hePFo7uw';

-- Supprimer toutes les entrées session_users pour cette session
DELETE FROM session_users 
WHERE session_id = 'hePFo7uw';

-- ================================================
-- ÉTAPE 4: Politique de sécurité pour nouvelle table
-- ================================================

-- Activer RLS
ALTER TABLE session_users ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre toutes opérations (sessions publiques par URL)
CREATE POLICY "Allow all operations on session_users" 
ON session_users 
FOR ALL 
USING (true);

-- ================================================
-- VÉRIFICATION: Tester les nouvelles fonctions
-- ================================================

-- Test 1: Ajouter utilisateur fictif
SELECT increment_active_users_safe('hePFo7uw', 'test_user_1');

-- Test 2: Vérifier compteur
SELECT session_id, active_users FROM live_sessions WHERE session_id = 'hePFo7uw';

-- Test 3: Supprimer utilisateur fictif
SELECT decrement_active_users_safe('hePFo7uw', 'test_user_1');

-- Test 4: Vérifier compteur final (doit être 0)
SELECT session_id, active_users FROM live_sessions WHERE session_id = 'hePFo7uw';

COMMENT ON FUNCTION increment_active_users_safe IS 'Incrémente le compteur utilisateurs avec déduplication et tracking correct';
COMMENT ON FUNCTION decrement_active_users_safe IS 'Décrémente le compteur utilisateurs avec cleanup automatique';
COMMENT ON FUNCTION cleanup_inactive_users IS 'Nettoie les utilisateurs inactifs et met à jour tous les compteurs';