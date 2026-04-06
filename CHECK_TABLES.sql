-- ================================
-- 🔍 SCRIPT DE VÉRIFICATION TABLES FSVB STUDIO
-- À exécuter dans l'éditeur SQL Supabase
-- ================================

-- 1. Vérifier que la table 'orders' existe
SELECT 
  table_name, 
  table_type,
  table_schema 
FROM information_schema.tables 
WHERE table_name = 'orders' 
AND table_schema = 'public';

-- 2. Vérifier la structure de la table orders
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Vérifier que la table 'live_sessions' existe (sessions collaboratives)
SELECT 
  table_name, 
  table_type,
  table_schema 
FROM information_schema.tables 
WHERE table_name = 'live_sessions' 
AND table_schema = 'public';

-- 4. Vérifier la structure de live_sessions
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'live_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Vérifier le bucket 'project-images' existe
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE name = 'project-images';

-- 6. Vérifier les policies RLS sur orders
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('orders', 'live_sessions');

-- 7. Compter les commandes existantes
SELECT 
  COUNT(*) as total_orders,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as orders_last_7_days
FROM orders;

-- 8. Compter les sessions collaboratives actives
SELECT 
  COUNT(*) as total_sessions,
  COUNT(CASE WHEN expires_at > NOW() THEN 1 END) as active_sessions
FROM live_sessions;

-- 9. Vérifier quelques exemples d'orders (sans données sensibles)
SELECT 
  order_id,
  template,
  status,
  created_at,
  CASE 
    WHEN company_name IS NOT NULL THEN '[COMPANY_SET]' 
    ELSE '[NO_COMPANY]' 
  END as company_status
FROM orders 
ORDER BY created_at DESC 
LIMIT 5;

-- 10. Test de connexion realtime (optionnel)
-- Cette requête teste si les publications realtime fonctionnent
SELECT 
  schemaname,
  tablename,
  pubname
FROM pg_publication_tables 
WHERE tablename IN ('orders', 'live_sessions');