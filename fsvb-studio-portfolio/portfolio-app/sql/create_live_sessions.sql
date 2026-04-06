-- Table pour sessions collaboratives temps réel
-- À exécuter dans l'éditeur SQL Supabase

CREATE TABLE live_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(50) UNIQUE NOT NULL,
  form_data JSONB NOT NULL,
  template_type VARCHAR(20) NOT NULL DEFAULT 'landing-solo',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '24 hours',
  active_users INTEGER DEFAULT 1
);

-- Index pour performance
CREATE INDEX idx_live_sessions_session_id ON live_sessions(session_id);
CREATE INDEX idx_live_sessions_expires ON live_sessions(expires_at);

-- RLS Policies (sécurité basique)
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre lecture/écriture à tous (sessions publiques par URL)
CREATE POLICY "Allow all operations on live_sessions" 
ON live_sessions 
FOR ALL 
USING (true);

-- Fonction pour nettoyer les sessions expirées (optionnel)
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM live_sessions WHERE expires_at < NOW();
  RETURN 1;
END;
$$;