# 🗄️ Intégration Supabase - Guide de configuration

## ⚡ Configuration rapide

### 1. Variables d'environnement
Copiez votre URL et clé anonyme depuis votre dashboard Supabase dans `.env.local` :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Création de la table orders
Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Table pour stocker les commandes
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  template TEXT NOT NULL,
  theme TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  form_data JSONB NOT NULL,
  sections_config JSONB NOT NULL,
  contact_info JSONB NOT NULL,
  assets JSONB,
  color_mode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_orders_order_id ON public.orders(order_id);
CREATE INDEX idx_orders_email ON public.orders(email);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- RLS (Row Level Security) - À adapter selon vos besoins
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy : Permettre les insertions depuis l'application
CREATE POLICY "Permettre insertion orders" ON public.orders
FOR INSERT WITH CHECK (true);

-- Policy : Permettre la lecture (pour debug/admin) 
CREATE POLICY "Permettre lecture orders" ON public.orders
FOR SELECT USING (true);
```

### 3. Test de l'intégration

1. **Démarrez l'application** : `npm run dev`
2. **Allez sur le configurateur** : `/configurator`
3. **Remplissez le formulaire** avec au minimum :
   - Nom de l'entreprise
   - Email
4. **Cliquez sur "Commander"**
5. **Vérifiez le feedback** :
   - ✅ "Commande sauvegardée!" → Succès
   - ❌ "Erreur - Réessayer" → Problème de config

### 4. Vérification dans Supabase

Dans votre dashboard Supabase → Table Editor → `orders` :
- Vous devriez voir votre commande avec tous les détails
- Le JSON `form_data` contient tous les champs du formulaire
- Le JSON `sections_config` contient la configuration des sections

## 🔍 Structure des données

### ClientOrder (Frontend)
```typescript
interface ClientOrder {
  orderId: string;                    // ORDER-1736165432-A1B2C3
  template: string;                   // 'landing-solo' | 'restaurant' | 'coach'  
  theme: string;                      // 'empire' | 'lumiere' | etc.
  formData: FormData;                 // Tous les champs du formulaire
  contactInfo: {                      // Infos consolidées
    companyName: string;
    email: string; 
    phone: string;
    social: {instagram?, linkedin?}
  };
  assets: {logoUrl?};                 // URLs d'images
  sectionsConfig: SectionConfig[];    // Configuration des sections
  colorMode: 'auto' | 'custom';
  createdAt: string;                  // ISO timestamp
}
```

### OrderRecord (Database)
```typescript
interface OrderRecord {
  id?: string;                        // UUID auto-généré
  order_id: string;                   // Copie de orderId
  template: string;                   // Template sélectionné
  theme: string;                      // Thème choisi
  company_name: string;               // Nom entreprise (extraction)
  email: string;                      // Email (extraction)
  phone?: string;                     // Téléphone (extraction)
  form_data: any;                     // JSON complet formData
  sections_config: any;               // JSON configuration sections
  contact_info: any;                  // JSON infos contact
  assets: any;                        // JSON assets
  color_mode?: string;                // Mode couleur
  created_at?: string;                // Timestamp création
  updated_at?: string;                // Timestamp maj
}
```

## 🚨 Sécurité et Production

### RLS (Row Level Security)
Les policies actuelles permettent toutes les insertions/lectures. Pour la production :

```sql
-- Policy plus restrictive : uniquement insertions avec email valide
DROP POLICY "Permettre insertion orders" ON public.orders;
CREATE POLICY "Insertion avec email" ON public.orders
FOR INSERT WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Policy lecture : uniquement pour les administrateurs
DROP POLICY "Permettre lecture orders" ON public.orders;
CREATE POLICY "Lecture admin seulement" ON public.orders
FOR SELECT USING (auth.role() = 'service_role');
```

### Variables d'environnement
- ✅ `.env.local` : OK pour développement local
- ⚠️ Production : Utiliser les variables d'environnement du hosting (Vercel, Netlify, etc.)

## 🛠️ Fonctionnalités actuelles

### ✅ Implémenté
- Insert automatique des commandes dans Supabase
- Feedback UI (succès/erreur) en temps réel
- Gestion des erreurs avec messages explicites  
- Structure de données complète et typée
- Génération d'orderIds uniques
- Consolidation des infos contact et assets

### 🚧 Améliorations possibles
- Dashboard admin pour visualiser les commandes
- Export CSV/Excel des commandes
- Notifications email automatiques
- Webhook pour traitement automatisé
- Archivage des anciennes commandes

## 📞 Debug

### Erreurs courantes

**"Configuration Supabase manquante"**
→ Vérifiez vos variables dans `.env.local`

**"Failed to insert"** 
→ Vérifiez que la table `orders` existe avec le bon schéma

**"RLS violation"**
→ Vérifiez les policies RLS sur la table

### Logs utiles
- Console navigateur : messages détaillés d'insertion
- Network tab : requêtes vers Supabase
- Dashboard Supabase → Logs : erreurs côté serveur