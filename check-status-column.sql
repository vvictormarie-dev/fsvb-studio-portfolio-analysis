-- ===========================================
-- VÉRIFICATION COLONNE STATUS TABLE ORDERS
-- ===========================================

-- 1. STRUCTURE COMPLÈTE DE LA TABLE ORDERS
-- Voir toutes les colonnes, leurs types et contraintes
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable,
  column_default,
  ordinal_position
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'orders'
ORDER BY ordinal_position;

-- 2. DÉFINITION SPÉCIFIQUE DE LA COLONNE STATUS
-- Examiner uniquement la colonne status
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable,
  column_default,
  collation_name,
  udt_name -- Type sous-jacent
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'orders'
  AND column_name = 'status';

-- 3. VÉRIFIER LES CONTRAINTES CHECK SUR LA TABLE
-- Voir toutes les contraintes check qui pourraient affecter la colonne status
SELECT 
  tc.constraint_name,
  tc.constraint_type,
  cc.check_clause,
  tc.table_name
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc 
  ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public' 
  AND tc.table_name = 'orders'
  AND tc.constraint_type = 'CHECK';

-- 4. EXAMINER TOUS LES TYPES ENUM DANS LA BASE (si status est un ENUM)
-- Voir si il y a des types ENUM définis
SELECT 
  t.typname,
  e.enumlabel,
  e.enumsortorder
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE t.typname LIKE '%status%'
ORDER BY t.typname, e.enumsortorder;

-- 5. CONTRAINTES COMPLÈTES DE LA TABLE ORDERS
-- Voir toutes les contraintes (PRIMARY KEY, FOREIGN KEY, CHECK, etc.)
SELECT 
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name,
  tc.is_deferrable,
  tc.initially_deferred
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
WHERE tc.table_schema = 'public' 
  AND tc.table_name = 'orders'
ORDER BY tc.constraint_type, tc.constraint_name;

-- 6. VALEURS ACTUELLES DANS LA COLONNE STATUS (échantillon)
-- Voir quelles valeurs sont actuellement stockées
SELECT 
  status,
  COUNT(*) as count_records
FROM public.orders
WHERE status IS NOT NULL
GROUP BY status
ORDER BY count_records DESC;

-- 7. VÉRIFIER S'IL Y A DES VALEURS NULL
-- Compter les enregistrements avec status NULL
SELECT 
  COUNT(*) as total_records,
  COUNT(status) as records_with_status,
  COUNT(*) - COUNT(status) as null_status_records
FROM public.orders;

-- 8. DÉFINITION DDL COMPLÈTE DE LA TABLE (PostgreSQL)
-- Requête pour reconstruire la définition CREATE TABLE
SELECT 
  'CREATE TABLE ' || schemaname || '.' || tablename || ' (' ||
  string_agg(
    column_name || ' ' || 
    CASE 
      WHEN data_type = 'character varying' THEN 'VARCHAR(' || character_maximum_length || ')'
      WHEN data_type = 'character' THEN 'CHAR(' || character_maximum_length || ')'
      WHEN data_type = 'timestamp with time zone' THEN 'TIMESTAMPTZ'
      WHEN data_type = 'timestamp without time zone' THEN 'TIMESTAMP'
      ELSE UPPER(data_type)
    END ||
    CASE 
      WHEN is_nullable = 'NO' THEN ' NOT NULL'
      ELSE ''
    END ||
    CASE 
      WHEN column_default IS NOT NULL THEN ' DEFAULT ' || column_default
      ELSE ''
    END,
    E',\n  '
    ORDER BY ordinal_position
  ) || 
  E'\n);'
FROM information_schema.columns c
JOIN pg_tables t ON c.table_name = t.tablename
WHERE c.table_schema = 'public' 
  AND c.table_name = 'orders'
  AND t.schemaname = 'public'
GROUP BY schemaname, tablename;