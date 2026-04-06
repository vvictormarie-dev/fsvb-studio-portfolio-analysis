-- Fonctions RPC pour gérer les compteurs d'utilisateurs actifs
-- À exécuter dans l'éditeur SQL Supabase

-- Fonction pour incrémenter le nombre d'utilisateurs actifs
CREATE OR REPLACE FUNCTION increment_active_users(session_id VARCHAR)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE live_sessions 
  SET active_users = active_users + 1,
      updated_at = NOW()
  WHERE live_sessions.session_id = increment_active_users.session_id
    AND expires_at > NOW();
END;
$$;

-- Fonction pour décrémenter le nombre d'utilisateurs actifs
CREATE OR REPLACE FUNCTION decrement_active_users(session_id VARCHAR)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE live_sessions 
  SET active_users = GREATEST(active_users - 1, 0),
      updated_at = NOW()
  WHERE live_sessions.session_id = decrement_active_users.session_id
    AND expires_at > NOW();
END;
$$;