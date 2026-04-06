-- Migration pour créer la table des formulaires pré-session
-- À exécuter dans Supabase SQL Editor

CREATE TABLE IF NOT EXISTS pre_session_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('landing-solo', 'restaurant', 'coach')),
  client_email TEXT NOT NULL,
  responses JSONB NOT NULL DEFAULT '{}',
  files_urls JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_session_id ON pre_session_forms(session_id);
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_status ON pre_session_forms(status);
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_template_type ON pre_session_forms(template_type);
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_created_at ON pre_session_forms(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pre_session_forms_updated_at 
  BEFORE UPDATE ON pre_session_forms 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE pre_session_forms ENABLE ROW LEVEL SECURITY;

-- Politique : Lecture publique par session_id (pour le formulaire client)
CREATE POLICY "Allow public read by session_id" ON pre_session_forms
  FOR SELECT USING (true);

-- Politique : Insertion publique (pour soumission formulaire)
CREATE POLICY "Allow public insert" ON pre_session_forms
  FOR INSERT WITH CHECK (true);

-- Politique : Admin peut tout faire (pour dashboard admin)
-- Note: Tu devras adapter selon ton système d'auth admin
CREATE POLICY "Allow admin full access" ON pre_session_forms
  FOR ALL USING (
    -- À adapter selon ton système d'authentification admin
    auth.jwt() ->> 'email' = 'ton-email-admin@example.com'
  );

-- Commentaires pour documentation
COMMENT ON TABLE pre_session_forms IS 'Stockage des formulaires pré-session clients';
COMMENT ON COLUMN pre_session_forms.session_id IS 'ID unique pour identifier la session client';
COMMENT ON COLUMN pre_session_forms.template_type IS 'Type de template choisi (landing-solo, restaurant, coach)';
COMMENT ON COLUMN pre_session_forms.responses IS 'Réponses du formulaire en JSON';
COMMENT ON COLUMN pre_session_forms.files_urls IS 'URLs des fichiers uploadés (logo, images, etc.)';
COMMENT ON COLUMN pre_session_forms.status IS 'Statut du formulaire (pending, reviewed, completed)';

-- Vue pour le dashboard admin (optionnel, pour simplifier les requêtes)
CREATE OR REPLACE VIEW admin_forms_view AS
SELECT 
  id,
  session_id,
  template_type,
  client_email,
  status,
  created_at,
  reviewed_at,
  -- Extraire quelques champs utiles du JSON responses
  responses ->> 'companyName' AS company_name,
  responses ->> 'restaurantName' AS restaurant_name,
  responses ->> 'coachName' AS coach_name,
  -- Compter le nombre de réponses
  jsonb_array_length(
    CASE 
      WHEN jsonb_typeof(responses) = 'object' 
      THEN jsonb_object_keys_array(responses) 
      ELSE '[]'::jsonb 
    END
  ) AS responses_count
FROM pre_session_forms
ORDER BY created_at DESC;

COMMENT ON VIEW admin_forms_view IS 'Vue simplifiée pour le dashboard admin';

-- Exemples de requêtes utiles (commentées)
/*
-- Récupérer tous les formulaires en attente
SELECT * FROM pre_session_forms WHERE status = 'pending' ORDER BY created_at DESC;

-- Récupérer un formulaire par session_id
SELECT * FROM pre_session_forms WHERE session_id = 'abc123';

-- Compter les formulaires par template
SELECT template_type, COUNT(*) FROM pre_session_forms GROUP BY template_type;

-- Formulaires des 7 derniers jours
SELECT * FROM pre_session_forms 
WHERE created_at >= NOW() - INTERVAL '7 days' 
ORDER BY created_at DESC;
*/