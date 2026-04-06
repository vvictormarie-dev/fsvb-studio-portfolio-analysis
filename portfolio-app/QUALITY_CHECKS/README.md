# 📋 QUALITY CHECKS - Checklist Pré-Livraison

## 🎯 Objectif
Ce dossier contient les prompts de vérification à utiliser AVANT chaque livraison client pour garantir la qualité maximale du site généré.

---

## ⚠️ IMPORTANT - CONSERVATION OBLIGATOIRE

**Ce dossier DOIT être conservé dans TOUS les templates générés.**

Lors de la génération d'un nouveau site client :
- ✅ Copier le template choisi
- ✅ Injecter les données client (JSON)
- ✅ **GARDER le dossier QUALITY_CHECKS intact**
- ✅ Utiliser les prompts avant livraison

**NE JAMAIS supprimer ce dossier lors de la copie/nettoyage des templates.**

---

## 📋 Workflow Pré-Livraison

### Étape 1 : Génération Site
```bash
# Claude génère le site avec données client
npm run build
```

### Étape 2 : Quality Checks (dans l'ordre)
```bash
1. Ouvrir 01_SEO_AUDIT.md
   → Copier prompt complet
   → Envoyer à Copilot/Claude
   → Appliquer corrections SEO

2. Ouvrir 02_PREVIEW_VALIDATION.md
   → Copier prompt complet
   → Envoyer à Copilot
   → Corriger différences preview/site

3. Ouvrir 03_COPYWRITING_REVIEW.md
   → Copier prompt complet
   → Envoyer à Claude Opus (meilleur pour texte)
   → Corriger textes

4. Ouvrir 04_ACCESSIBILITY_CHECK.md
   → Copier prompt complet
   → Envoyer à Copilot
   → Corriger accessibilité

5. Ouvrir 05_PERFORMANCE_AUDIT.md
   → Copier prompt complet
   → Envoyer à Copilot
   → Optimiser performance
```

### Étape 3 : Tests Finaux
```bash
# Tester localement
npm run dev

# Build production
npm run build

# Tests navigateurs
- Chrome
- Safari
- Firefox
- Mobile (responsive)
```

### Étape 4 : Livraison ✅
```bash
# Déploiement
git push
netlify deploy --prod
```

---

## 🔍 Contenu des Prompts

### 01_SEO_AUDIT.md
Optimisation complète SEO :
- Meta tags (title, description, keywords)
- Structure HTML sémantique (h1, h2, sections)
- Images optimisées (alt, format WebP, lazy loading)
- Schema.org (données structurées)
- robots.txt + sitemap.xml
- Mobile-friendly
- Performance (Web Vitals)

### 02_PREVIEW_VALIDATION.md
Validation cohérence configurateur ↔ site :
- Données injectées (textes, images)
- Couleurs & thèmes
- Sections visibilité
- Intégrations externes
- Responsive

### 03_COPYWRITING_REVIEW.md
Relecture qualité textes :
- Orthographe & grammaire
- Ton & style
- Clarté & concision
- CTAs actionnables
- SEO naturel
- Bénéfices clients

### 04_ACCESSIBILITY_CHECK.md
Accessibilité WCAG 2.1 :
- Contraste couleurs (AA minimum)
- Navigation clavier
- ARIA labels
- Textes alternatifs
- Focus visible
- Screen readers

### 05_PERFORMANCE_AUDIT.md
Optimisation performance :
- Temps de chargement
- Taille bundle
- Images optimisées
- Code splitting
- Cache
- Lighthouse score > 90

---

## ✅ Critères Validation Globale

**Le site est prêt à livrer si :**
- ✅ SEO : Score PageSpeed > 90
- ✅ Preview = Site (100% correspondance)
- ✅ Textes : 0 faute, ton professionnel
- ✅ Accessibilité : WCAG 2.1 AA
- ✅ Performance : LCP < 2.5s

---

## 🛠️ Outils Recommandés

**SEO :**
- Google PageSpeed Insights
- Google Mobile-Friendly Test
- Google Rich Results Test

**Accessibilité :**
- WAVE (WebAIM)
- axe DevTools
- Lighthouse (Chrome)

**Performance :**
- Lighthouse
- WebPageTest
- GTmetrix

**Textes :**
- LanguageTool
- Antidote
- Grammarly

---

## 📞 Support

Si problème lors des Quality Checks :
1. Vérifier documentation prompt concerné
2. Tester sur environnement local
3. Utiliser outils de test recommandés
4. Contacter support technique si bloquant

---

**Dernière mise à jour :** 2026-01-15
**Version :** 1.0