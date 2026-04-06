-- ================================
-- 🗄️ CRÉATION BUCKET PROJECT-IMAGES + POLICIES
-- À exécuter dans l'éditeur SQL Supabase
-- ================================

-- 1. Créer le bucket 'project-images' (public pour les URLs directes)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- 2. Policy : Permettre upload à tous (pour les clients configurateur)
CREATE POLICY "Allow upload for everyone"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-images');

-- 3. Policy : Permettre lecture publique (pour affichage images)
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

-- 4. Policy : Permettre suppression pour authenticated (admin)
CREATE POLICY "Allow delete for authenticated users"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- 5. Policy : Permettre mise à jour pour authenticated (admin)
CREATE POLICY "Allow update for authenticated users"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- ================================
-- 🔍 VÉRIFICATION POST-CRÉATION
-- ================================

-- Vérifier que le bucket est créé
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE name = 'project-images';

-- Vérifier les policies storage
SELECT 
  policyname,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND policyname LIKE '%project-images%' 
OR policyname LIKE '%upload%' 
OR policyname LIKE '%Public read%';