# PROMPTS POUR ISOLATION DES TEMPLATES
## Guide pour créer 3 copies autonomes de FSVB Studio

### 🎯 OBJECTIF
Transformer FSVB Studio multi-templates en 3 projets autonomes :
- **FSVB-Landing-Solo** (template sur-mesure)
- **FSVB-Restaurant** (template restaurant)
- **FSVB-Coach** (template coach)

---

## ⚠️ RÈGLE CRITIQUE - CONSERVATION OBLIGATOIRE

**LORS DE TOUTE ISOLATION/NETTOYAGE DE TEMPLATE :**

📋 **ÉLÉMENTS À CONSERVER OBLIGATOIREMENT :**
- ✅ **Dossier `/QUALITY_CHECKS/` complet** (tous les fichiers .md)
- ✅ **Tous les sous-fichiers du dossier QUALITY_CHECKS**
- ✅ **Ne JAMAIS supprimer ou modifier ce dossier**

**Raison :** Ces prompts sont essentiels pour la validation qualité pré-livraison client.

**Le dossier QUALITY_CHECKS contient :**
- README.md (instructions)
- 01_SEO_AUDIT.md (prompt SEO)
- 02_PREVIEW_VALIDATION.md (prompt cohérence)
- 03_COPYWRITING_REVIEW.md (prompt textes)
- 04_ACCESSIBILITY_CHECK.md (prompt accessibilité)  
- 05_PERFORMANCE_AUDIT.md (prompt performance)

---

## 📋 ÉTAPES PRÉPARATOIRES

### 1. Créer 3 dossiers VS Code séparés
```bash
# Copier le dossier portfolio-app 3 fois
cp -r portfolio-app FSVB-Landing-Solo
cp -r portfolio-app FSVB-Restaurant  
cp -r portfolio-app FSVB-Coach
```

### 2. Modifier les package.json
```json
// FSVB-Landing-Solo/package.json
{
  "name": "fsvb-landing-solo",
  "description": "FSVB Studio - Template Sur-Mesure"
}

// FSVB-Restaurant/package.json  
{
  "name": "fsvb-restaurant",
  "description": "FSVB Studio - Template Restaurant"
}

// FSVB-Coach/package.json
{
  "name": "fsvb-coach", 
  "description": "FSVB Studio - Template Coach"
}
```

---

## 🤖 PROMPTS CLAUDE POUR ISOLATION

### PROMPT 1: LANDING-SOLO
```
Je veux isoler uniquement le template "landing-solo" dans ce projet FSVB Studio.

⚠️ RÈGLE CRITIQUE : CONSERVER OBLIGATOIREMENT le dossier /QUALITY_CHECKS/ complet avec tous ses fichiers .md (prompts de validation qualité pré-livraison). Ne JAMAIS le supprimer ou modifier.

OBJECTIFS :
- Garder SEULEMENT le template landing-solo
- Supprimer tous les fichiers des templates restaurant et coach
- Simplifier le code pour ne gérer qu'un seul template
- Garder le configurateur fonctionnel pour landing-solo uniquement
- Maintenir toutes les fonctionnalités : export JSON, export preview, validation

ACTIONS À EFFECTUER :
1. Supprimer les dossiers restaurant et coach de src/templates/
2. Supprimer les dossiers restaurant de public/templates/ 
3. Nettoyer ConfiguratorPage.tsx pour supprimer les références aux autres templates
4. Simplifier TemplateModal.tsx pour afficher seulement landing-solo
5. Nettoyer toutes les logiques conditionnelles basées sur selectedTemplate
6. Adapter ConfigurationCaptureModalAdaptive.tsx pour les sections landing-solo seulement
7. Mettre à jour les types et interfaces
8. Nettoyer les constantes de templates

SECTIONS LANDING-SOLO À CONSERVER :
- Hero, About, Services, Portfolio, Features, Testimonials, FAQ, Contact

Peux-tu effectuer ce nettoyage en gardant le projet fonctionnel ?
```

### PROMPT 2: RESTAURANT
```
Je veux isoler uniquement le template "restaurant" dans ce projet FSVB Studio.

⚠️ RÈGLE CRITIQUE : CONSERVER OBLIGATOIREMENT le dossier /QUALITY_CHECKS/ complet avec tous ses fichiers .md (prompts de validation qualité pré-livraison). Ne JAMAIS le supprimer ou modifier.

OBJECTIFS :
- Garder SEULEMENT le template restaurant
- Supprimer tous les fichiers des templates landing-solo et coach  
- Simplifier le code pour ne gérer qu'un seul template
- Garder le configurateur fonctionnel pour restaurant uniquement
- Maintenir toutes les fonctionnalités : export JSON, export preview, validation

ACTIONS À EFFECTUER :
1. Supprimer les dossiers landing-solo et coach de src/templates/
2. Supprimer le dossier landing-solo de public/templates/
3. Nettoyer ConfiguratorPage.tsx pour supprimer les références aux autres templates
4. Simplifier TemplateModal.tsx pour afficher seulement restaurant
5. Nettoyer toutes les logiques conditionnelles basées sur selectedTemplate
6. Adapter ConfigurationCaptureModalAdaptive.tsx pour les sections restaurant seulement
7. Mettre à jour les types et interfaces
8. Nettoyer les constantes de templates

SECTIONS RESTAURANT À CONSERVER :
- Hero, About, Specialties, Gallery, Location, Testimonials, FAQ, Contact

Peux-tu effectuer ce nettoyage en gardant le projet fonctionnel ?
```

### PROMPT 3: COACH
```
Je veux isoler uniquement le template "coach" dans ce projet FSVB Studio.

⚠️ RÈGLE CRITIQUE : CONSERVER OBLIGATOIREMENT le dossier /QUALITY_CHECKS/ complet avec tous ses fichiers .md (prompts de validation qualité pré-livraison). Ne JAMAIS le supprimer ou modifier.

OBJECTIFS :
- Garder SEULEMENT le template coach
- Supprimer tous les fichiers des templates landing-solo et restaurant
- Simplifier le code pour ne gérer qu'un seul template  
- Garder le configurateur fonctionnel pour coach uniquement
- Maintenir toutes les fonctionnalités : export JSON, export preview, validation

ACTIONS À EFFECTUER :
1. Supprimer les dossiers landing-solo et restaurant de src/templates/
2. Supprimer les dossiers restaurant de public/templates/
3. Nettoyer ConfiguratorPage.tsx pour supprimer les références aux autres templates
4. Simplifier TemplateModal.tsx pour afficher seulement coach
5. Nettoyer toutes les logiques conditionnelles basées sur selectedTemplate
6. Adapter ConfigurationCaptureModalAdaptive.tsx pour les sections coach seulement
7. Mettre à jour les types et interfaces
8. Nettoyer les constantes de templates

SECTIONS COACH À CONSERVER :
- Hero, About, Approach, Domains, Booking, Testimonials, FAQ, Contact

Peux-tu effectuer ce nettoyage en gardant le projet fonctionnel ?
```

---

## 🛠️ VÉRIFICATIONS POST-ISOLATION

### Pour chaque projet isolé :
1. ✅ `npm install` → Pas d'erreurs
2. ✅ `npm run build` → Build réussie  
3. ✅ `npm run dev` → Démarrage local OK
4. ✅ Configurateur fonctionnel sur le template isolé
5. ✅ Export JSON fonctionnel
6. ✅ Export Preview fonctionnel
7. ✅ Modal adaptatif avec sections du template
8. ✅ Validation pré-commande active

### Noms finaux :
- **FSVB-Landing-Solo** : Template sur-mesure autonome
- **FSVB-Restaurant** : Template restaurant autonome  
- **FSVB-Coach** : Template coach autonome

---

## 📝 NOTES IMPORTANTES

1. **Backup** : Toujours garder le projet multi-templates original
2. **Tests** : Tester chaque projet isolé avant déploiement  
3. **Supabase** : Chaque projet peut partager la même base Supabase
4. **Déploiement** : 3 URL Netlify séparées possibles

**Workflow final** : 3 studios autonomes = 3 lignes de produits distinctes sur ComeUp !