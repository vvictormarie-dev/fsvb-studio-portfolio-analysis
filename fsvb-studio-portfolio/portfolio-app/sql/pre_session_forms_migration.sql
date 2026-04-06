-- Migration pour créer la table pre_session_forms
-- Exécuter dans Supabase SQL Editor

-- Créer la table pour stocker les formulaires pré-session
CREATE TABLE IF NOT EXISTS public.pre_session_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    template_type TEXT NOT NULL CHECK (template_type IN ('landing-solo', 'restaurant', 'coach')),
    client_email TEXT NOT NULL,
    responses JSONB NOT NULL DEFAULT '{}',
    files_urls JSONB DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'reviewed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    -- Index pour améliorer les performances
    CONSTRAINT valid_email CHECK (client_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_session_id ON public.pre_session_forms(session_id);
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_status ON public.pre_session_forms(status);
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_template_type ON public.pre_session_forms(template_type);
CREATE INDEX IF NOT EXISTS idx_pre_session_forms_created_at ON public.pre_session_forms(created_at DESC);

-- RLS (Row Level Security) - Pour la sécurité
ALTER TABLE public.pre_session_forms ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (formulaires clients)
CREATE POLICY "Allow public insert" ON public.pre_session_forms
    FOR INSERT
    WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated read" ON public.pre_session_forms
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated update" ON public.pre_session_forms
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Politique pour permettre la suppression aux utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated delete" ON public.pre_session_forms
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Commentaires pour la documentation
COMMENT ON TABLE public.pre_session_forms IS 'Table pour stocker les formulaires de pré-session remplis par les clients';
COMMENT ON COLUMN public.pre_session_forms.session_id IS 'Identifiant unique de la session collaborative';
COMMENT ON COLUMN public.pre_session_forms.template_type IS 'Type de template: landing-solo, restaurant, ou coach';
COMMENT ON COLUMN public.pre_session_forms.client_email IS 'Email du client pour contact et suivi';
COMMENT ON COLUMN public.pre_session_forms.responses IS 'Réponses du client au format JSON';
COMMENT ON COLUMN public.pre_session_forms.files_urls IS 'URLs des fichiers uploadés (logos, images, etc.)';
COMMENT ON COLUMN public.pre_session_forms.status IS 'Statut: pending (en attente), in-progress (en cours), reviewed (traité)';

-- Fonction pour automatiquement mettre à jour reviewed_at
CREATE OR REPLACE FUNCTION update_reviewed_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'reviewed' AND OLD.status != 'reviewed' THEN
        NEW.reviewed_at = TIMEZONE('utc'::text, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour automatiser la mise à jour de reviewed_at
CREATE TRIGGER trigger_update_reviewed_at
    BEFORE UPDATE ON public.pre_session_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_reviewed_at();

-- Données de test (optionnel)
/*
INSERT INTO public.pre_session_forms (session_id, template_type, client_email, responses, status) VALUES
('test-landing-solo-123', 'landing-solo', 'client@example.com', '{"businessName": "Test Business", "description": "Test description", "targetAudience": "Entrepreneurs"}', 'pending'),
('test-restaurant-456', 'restaurant', 'restaurant@example.com', '{"restaurantName": "Test Restaurant"}', 'pending'),
('test-coach-789', 'coach', 'coach@example.com', '{"coachName": "Test Coach"}', 'pending');
*/