-- Migration pour ajouter les champs ComUp/Marketplace
-- À exécuter dans Supabase SQL Editor

-- Ajouter colonne payment_source
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_source VARCHAR(20) DEFAULT 'paypal'
CHECK (payment_source IN ('paypal', 'comeup', 'malt', 'direct'));

-- Ajouter colonne marketplace_order_id
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS marketplace_order_id VARCHAR(255);

-- Créer index pour performance
CREATE INDEX IF NOT EXISTS idx_orders_payment_source 
ON orders(payment_source);

CREATE INDEX IF NOT EXISTS idx_orders_marketplace_order_id 
ON orders(marketplace_order_id) 
WHERE marketplace_order_id IS NOT NULL;

-- Mettre à jour les commandes existantes
UPDATE orders 
SET payment_source = 'paypal' 
WHERE payment_source IS NULL 
AND stripe_payment_id IS NOT NULL;

-- Commentaires pour documentation
COMMENT ON COLUMN orders.payment_source IS 'Source du paiement: paypal, comeup, malt, direct';
COMMENT ON COLUMN orders.marketplace_order_id IS 'ID de commande sur marketplace (ComUp, Malt, etc.)';

-- Vérification de la migration
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
AND column_name IN ('payment_source', 'marketplace_order_id')
ORDER BY column_name;