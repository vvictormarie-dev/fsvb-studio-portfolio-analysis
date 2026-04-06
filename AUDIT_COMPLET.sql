-- ================================
-- 🔍 AUDIT COMPLET FSVB STUDIO - État actuel
-- ================================

-- 1. VÉRIFIER LES IMAGES DANS LE BUCKET (organisation actuelle)
SELECT 
  name,
  id,
  bucket_id,
  created_at,
  updated_at,
  last_accessed_at,
  metadata->>'size' as file_size_bytes,
  CASE 
    WHEN name ~ '^[0-9]+/' THEN 'ORGANISÉ PAR TIMESTAMP'
    WHEN name ~ '^ORDER-[0-9]+-[A-Z0-9]+/' THEN 'ORGANISÉ PAR ORDER_ID ✅'
    WHEN name ~ '^temp_[0-9]+/' THEN 'TEMPORAIRE'
    ELSE 'NON ORGANISÉ'
  END as organisation_type,
  -- Extraire le dossier parent
  split_part(name, '/', 1) as dossier_parent
FROM storage.objects 
WHERE bucket_id = 'project-images'
ORDER BY created_at DESC
LIMIT 20;

-- 2. STATISTIQUES ORGANISATION IMAGES
SELECT 
  CASE 
    WHEN name ~ '^[0-9]+/' THEN 'TIMESTAMP'
    WHEN name ~ '^ORDER-[0-9]+-[A-Z0-9]+/' THEN 'ORDER_ID'
    WHEN name ~ '^temp_[0-9]+/' THEN 'TEMP'
    ELSE 'AUTRE'
  END as type_organisation,
  COUNT(*) as nombre_images,
  MIN(created_at) as premiere_image,
  MAX(created_at) as derniere_image
FROM storage.objects 
WHERE bucket_id = 'project-images'
GROUP BY 1
ORDER BY 2 DESC;

-- 3. VÉRIFIER LES SESSIONS COLLABORATIVES
SELECT 
  session_id,
  template_type,
  active_users,
  created_at,
  updated_at,
  expires_at,
  CASE 
    WHEN expires_at > NOW() THEN 'ACTIVE ✅'
    ELSE 'EXPIRÉE ❌'
  END as statut,
  -- Taille des données form_data (cast explicite)
  pg_size_pretty(pg_column_size(form_data)::bigint) as taille_form_data
FROM live_sessions
ORDER BY created_at DESC
LIMIT 10;

-- 4. CROSS-CHECK : Orders avec images uploadées
SELECT 
  o.order_id,
  o.company_name,
  o.template,
  o.status,
  o.created_at as order_date,
  COUNT(img.name) as images_uploadees,
  -- Vérifier si des images correspondent à cet order_id
  COUNT(CASE WHEN img.name LIKE CONCAT(o.order_id, '/%') THEN 1 END) as images_bien_organisees
FROM orders o
LEFT JOIN storage.objects img ON img.bucket_id = 'project-images' 
  AND (img.name LIKE CONCAT(o.order_id, '/%') OR img.name LIKE CONCAT('%', SUBSTRING(o.order_id, 7, 10), '%'))
GROUP BY o.order_id, o.company_name, o.template, o.status, o.created_at
ORDER BY o.created_at DESC;

-- 5. VÉRIFIER LES POLICIES STORAGE (détaillées)
SELECT 
  policyname,
  cmd as operation,
  CASE 
    WHEN roles = '{public}' THEN 'PUBLIC'
    WHEN roles = '{authenticated}' THEN 'AUTHENTICATED'
    WHEN roles = '{anon}' THEN 'ANONYMOUS'
    ELSE roles::text
  END as qui_peut_faire,
  qual as conditions
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- 6. VÉRIFIER LA CONFIGURATION REALTIME
SELECT 
  schemaname,
  tablename,
  pubname
FROM pg_publication_tables 
WHERE tablename IN ('orders', 'live_sessions');

-- 7. EXEMPLE DE FORM_DATA (structure)
SELECT 
  session_id,
  template_type,
  jsonb_typeof(form_data) as type_form_data,
  jsonb_object_keys(form_data) as cles_disponibles
FROM live_sessions 
WHERE form_data IS NOT NULL
LIMIT 5;