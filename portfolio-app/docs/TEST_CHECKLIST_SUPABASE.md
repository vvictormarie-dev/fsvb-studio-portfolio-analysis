# 🧪 CHECKLIST TEST - Données Supabase du Configurateur

## 🎯 **Objectif**
Vérifier exactement quelles données sont envoyées à Supabase lors du clic "Commander".

## 📋 **Étapes de Test**

### **A) Remplir le formulaire**
```
✅ Nom entreprise: "Test Company" 
✅ Email: "test@example.com"
✅ Téléphone: "0123456789" (optionnel)
✅ Sélectionner template: "landing-solo"
✅ Changer thème: "empire" → "lumiere" 
✅ Modifier au moins une section (ex: activer/désactiver FAQ)
✅ Si possible, personnaliser props d'une section
```

### **B) Cliquer "Commander"** 
```
✅ Bouton passe en "⏳ Sauvegarde en cours..."
✅ Puis "✅ Commande sauvegardée!" OU "❌ Erreur - Réessayer"
```

### **C) Vérifier logs console** 
**Ouvrir DevTools (F12) → Console et chercher :**

```javascript
🚀 ORDER_PAYLOAD - Structure complète: {
  orderId: "ORDER-1736165432-A1B2C3",
  template: "landing-solo", 
  theme: "lumiere",
  colorMode: "auto",
  formData: { companyName, email, theme, colors... },
  sectionsConfig: [ {id: "navbar", enabled: true, props?: {...}} ],
  contactInfo: { companyName, email, phone, social },
  assets: { logoUrl },
  fullPayload: {...}
}
```

```javascript  
📋 SECTIONS_CONFIG détail: [
  { id: "navbar", label: "Navigation", enabled: true, required: true, props?: {...} },
  { id: "hero", label: "Hero Principal", enabled: true, props?: {...} },
  // ... autres sections
]
```

```javascript
📤 ORDER_PAYLOAD avant insert: { order_id, template, form_data, sections_config... }
📥 SUPABASE_RESULT: { data: [...], error: null }
```

### **D) Vérifier row Supabase**
**Dashboard Supabase → Table Editor → orders :**

```sql
✅ Nouvelle ligne créée
✅ order_id = "ORDER-1736165432-A1B2C3" 
✅ template = "landing-solo"
✅ theme = "lumiere" 
✅ company_name = "Test Company"
✅ email = "test@example.com"
✅ form_data = JSON complet du formulaire
✅ config = JSON sectionsConfig 
✅ sections_config = JSON sectionsConfig (même données)
✅ contact_info = JSON consolidé
✅ assets = JSON avec logoUrl
✅ color_mode = "auto" ou "custom"
✅ created_at = timestamp récent
```

## ❓ **Questions à résoudre**

### **1. Contenu de sectionsConfig**
**QUE CONTIENT-IL EXACTEMENT ?**
- ✅ Statut enabled/disabled de chaque section ?
- ❓ Props/valeurs personnalisées des sections ?
- ❓ Textes modifiés (titres, descriptions) ?
- ❓ Images uploadées ?
- ❓ Couleurs personnalisées par section ?

**RÉPONSE ATTENDUE dans console :**
```javascript
📋 SECTIONS_CONFIG détail: [
  {
    id: "hero", 
    enabled: true,
    props: {                    // ← EXISTE-T-IL ?
      title: "Mon Titre Custom",
      subtitle: "Mon Sous-titre",
      ctaText: "Mon CTA", 
      backgroundImage: "url..."
    }
  }
]
```

### **2. Props personnalisées manquantes ?**
**SI sectionsConfig ne contient PAS les props :**
- Où sont stockées les personnalisations utilisateur ?
- Faut-il ajouter un champ `customProps` séparé ?
- Le client peut-il récupérer toute sa config pour régénérer le site ?

## 🚨 **Indicateurs d'erreur**

**Console :**
- `❌ Erreur lors de l'insertion: ...`  
- `⚠️ Supabase non configuré`
- `ORDER_PAYLOAD avant insert: undefined`

**UI :**  
- Bouton reste "❌ Erreur - Réessayer"
- Message d'erreur sous le bouton

**Supabase :**
- Aucune nouvelle ligne dans table orders
- Erreur dans Dashboard → Logs

## ✅ **Succès attendu**

**Console :** Logs clairs avec structure complète  
**UI :** "✅ Commande sauvegardée!"  
**Supabase :** Nouvelle ligne avec toutes les données JSON  
**Données :** sectionsConfig contient la config complète pour régénérer le site