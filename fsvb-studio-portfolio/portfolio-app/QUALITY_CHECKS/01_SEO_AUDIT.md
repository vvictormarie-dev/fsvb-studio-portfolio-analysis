# 🔍 SEO AUDIT - Template [NOM]

## MISSION
Optimiser le SEO du template pour maximiser le référencement Google

---

## CHECKLIST SEO TECHNIQUE

### 1. Balises META (CRITIQUE)

**À vérifier dans index.html :**
- [ ] `<title>` présent et descriptif (50-60 caractères)
- [ ] `<meta name="description">` (150-160 caractères)
- [ ] `<meta name="keywords">` avec mots-clés pertinents
- [ ] `<meta name="author">`
- [ ] `<meta name="viewport">` pour mobile
- [ ] `<link rel="canonical">` si besoin

**À ajouter dans chaque page template :**
```html
<head>
  <title>[Nom Entreprise] - [Service Principal] | [Ville]</title>
  <meta name="description" content="[Description entreprise 150 caractères optimisée mots-clés]">
  <meta name="keywords" content="[mot-clé 1], [mot-clé 2], [ville], [service]">
  <meta property="og:title" content="[Titre]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="[URL image]">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

---

### 2. Structure HTML Sémantique

**Vérifier hiérarchie :**
- [ ] 1 seul `<h1>` par page (titre principal)
- [ ] `<h2>` pour sections principales
- [ ] `<h3>` pour sous-sections
- [ ] Ordre logique h1 → h2 → h3 (pas de saut)

**Balises sémantiques :**
- [ ] `<header>` pour en-tête
- [ ] `<nav>` pour navigation
- [ ] `<main>` pour contenu principal
- [ ] `<article>` pour contenu indépendant
- [ ] `<section>` pour sections thématiques
- [ ] `<aside>` pour contenu complémentaire
- [ ] `<footer>` pour pied de page

---

### 3. Images Optimisées

**Pour CHAQUE image :**
- [ ] Attribut `alt` descriptif et mot-clé
- [ ] Format WebP ou AVIF (si supporté, sinon JPG/PNG)
- [ ] Taille < 200KB par image
- [ ] Dimensions adaptées (pas d'image 4000px affichée 400px)
- [ ] Lazy loading : `loading="lazy"` sauf hero

**Exemple :**
```html
<img 
  src="/images/restaurant-plat.webp" 
  alt="Plat signature du restaurant [Nom] à [Ville]"
  width="800"
  height="600"
  loading="lazy"
>
```

---

### 4. Liens Internes & Externes

**Vérifier :**
- [ ] Liens internes avec textes d'ancrage descriptifs
- [ ] Liens externes : `rel="noopener noreferrer"` si `target="_blank"`
- [ ] Pas de liens cassés (404)
- [ ] URL propres (pas de /page?id=123, mais /nos-services)

---

### 5. Performance Web Vitals

**Objectifs Google :**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

**Optimisations :**
- [ ] Minification CSS/JS
- [ ] Compression Gzip/Brotli
- [ ] Cache navigateur configuré
- [ ] CDN pour assets statiques

---

### 6. Mobile-First

**Tester sur mobile :**
- [ ] Texte lisible sans zoom (min 16px)
- [ ] Boutons cliquables (min 44x44px)
- [ ] Pas de scroll horizontal
- [ ] Temps de chargement < 3s en 4G

**Google Mobile-Friendly Test :**
```
https://search.google.com/test/mobile-friendly
```

---

### 7. Schema.org (Données Structurées)

**Ajouter JSON-LD selon type :**

**Restaurant :**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "[Nom Restaurant]",
  "image": "[URL logo]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Adresse]",
    "addressLocality": "[Ville]",
    "postalCode": "[CP]",
    "addressCountry": "FR"
  },
  "telephone": "[Téléphone]",
  "servesCuisine": "[Type cuisine]",
  "priceRange": "€€"
}
</script>
```

**Coach :**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "[Nom Coach]",
  "image": "[URL photo]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[Ville]",
    "addressCountry": "FR"
  },
  "telephone": "[Téléphone]",
  "priceRange": "€€€"
}
</script>
```

---

### 8. Fichiers Techniques

**Créer si absents :**

**robots.txt :**
```
User-agent: *
Allow: /

Sitemap: https://[domaine].fr/sitemap.xml
```

**sitemap.xml :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[domaine].fr/</loc>
    <lastmod>2026-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[domaine].fr/services</loc>
    <lastmod>2026-01-15</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## ✅ CRITÈRES DE VALIDATION

**Le template est SEO-ready si :**
- ✅ Score Google PageSpeed > 90
- ✅ Meta tags complets
- ✅ Structure HTML sémantique
- ✅ Images optimisées avec alt
- ✅ Mobile-friendly 100%
- ✅ Schema.org ajouté
- ✅ robots.txt + sitemap.xml

---

## 🛠️ OUTILS DE TEST

**Avant livraison, tester sur :**
- Google PageSpeed Insights
- Google Mobile-Friendly Test
- Google Rich Results Test (schema.org)
- SEMrush Site Audit (gratuit limité)
- Lighthouse (dans Chrome DevTools)

---

**FIN AUDIT SEO**