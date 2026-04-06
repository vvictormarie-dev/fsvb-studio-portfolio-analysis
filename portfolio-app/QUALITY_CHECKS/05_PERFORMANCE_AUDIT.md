# ⚡ PERFORMANCE AUDIT - Optimisation Vitesse

## MISSION
Optimiser le site pour atteindre un score Lighthouse > 90 et des temps de chargement < 3s

---

## CHECKLIST PERFORMANCE

### 1. Core Web Vitals (Google)

**Objectifs critiques :**
- [ ] **LCP** (Largest Contentful Paint) < 2.5s
- [ ] **FID** (First Input Delay) < 100ms
- [ ] **CLS** (Cumulative Layout Shift) < 0.1
- [ ] **INP** (Interaction to Next Paint) < 200ms

**Tester sur :**
````
https://pagespeed.web.dev/
````

---

### 2. Taille Bundle

**Vérifier :**
````bash
npm run build
````

**Objectifs :**
- [ ] JS total < 300KB (gzippé)
- [ ] CSS total < 100KB (gzippé)
- [ ] HTML < 50KB
- [ ] Chaque chunk JS < 200KB

**Si trop gros :**
- Code splitting (lazy loading components)
- Tree shaking (enlever code non utilisé)
- Minification aggressive

---

### 3. Images Optimisées

**Pour CHAQUE image :**
- [ ] Format moderne (WebP ou AVIF)
- [ ] Taille fichier < 200KB par image
- [ ] Dimensions adaptées (pas 4000x3000 pour 400x300)
- [ ] Compression (TinyPNG, Squoosh)
- [ ] Lazy loading (sauf hero)
- [ ] Responsive (srcset pour différentes tailles)

**Exemple optimisé :**
````html
<img 
  srcset="
    image-400.webp 400w,
    image-800.webp 800w,
    image-1200.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-800.webp"
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
>
````

**Outils compression :**
- https://tinypng.com/
- https://squoosh.app/
- ImageOptim (Mac)

---

### 4. Fonts Optimisées

**Stratégie :**
- [ ] System fonts si possible (instantané)
- [ ] Google Fonts avec `&display=swap`
- [ ] Précharger fonts critiques
- [ ] Limiter à 2-3 weights max

**Préchargement :**
````html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
````

**System fonts (0ms) :**
````css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
````

---

### 5. Code CSS

**Optimisations :**
- [ ] Minifié
- [ ] Critical CSS inline (above the fold)
- [ ] Non-critical CSS en async
- [ ] Pas de CSS inutilisé (PurgeCSS)

**Critical CSS :**
````html
<head>
  <style>
    /* CSS critique inline (hero, header, fonts) */
  </style>
  
  <link rel="preload" as="style" href="/styles/main.css">
  <link rel="stylesheet" href="/styles/main.css" media="print" onload="this.media='all'">
</head>
````

---

### 6. Code JavaScript

**Optimisations :**
- [ ] Minifié
- [ ] Différé (defer) ou async
- [ ] Code splitting (chunks séparés)
- [ ] Lazy loading composants lourds

**Stratégie chargement :**
````html
<!-- Critical JS : inline ou defer -->
<script defer src="/main.js"></script>

<!-- Non-critical : async ou lazy -->
<script async src="/analytics.js"></script>
````

**React lazy loading :**
````jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
````

---

### 7. Réseau & Serveur

**Headers HTTP :**
````
# Cache assets statiques
Cache-Control: public, max-age=31536000, immutable

# Compression
Content-Encoding: gzip (ou brotli)

# Sécurité
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
````

**CDN :**
- [ ] Assets statiques sur CDN
- [ ] Images via CDN (Cloudinary, Imgix)

---

### 8. Chargement Progressif

**Stratégie :**
1. **Above the fold** : Instantané
2. **Visible après scroll** : Lazy
3. **Interactions** : On demand

**Lazy loading sections :**
````jsx
// Section visible seulement après scroll
const LazySection = lazy(() => import('./Section'));

<IntersectionObserver>
  {isVisible && (
    <Suspense fallback={<Skeleton />}>
      <LazySection />
    </Suspense>
  )}
</IntersectionObserver>
````

---

### 9. Third-Party Scripts

**Auditer scripts tiers :**
- [ ] Google Analytics : nécessaire ?
- [ ] Fonts externes : system fonts ?
- [ ] Maps : lazy load
- [ ] Widgets : lazy load

**Charger en async :**
````html
<!-- Google Analytics async -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- Maps lazy -->
<button onclick="loadGoogleMaps()">Voir la carte</button>
````

---

### 10. Base de Données (si applicable)

**Optimisations :**
- [ ] Indexes sur colonnes fréquentes
- [ ] Pagination requêtes (pas tout charger)
- [ ] Cache résultats fréquents (Redis)
- [ ] Requêtes optimisées (éviter N+1)

---

### 11. Mobile Performance

**Tests spécifiques mobile :**
- [ ] 4G : chargement < 3s
- [ ] 3G : chargement < 5s
- [ ] Images adaptatives (srcset)
- [ ] Interactions tactiles fluides

**Throttling test :**
Chrome DevTools → Network → Slow 4G

---

### 12. Monitoring

**Outils monitoring continu :**
- Google Search Console (Core Web Vitals)
- Lighthouse CI (automatisé)
- WebPageTest
- Real User Monitoring (Vercel Analytics, Sentry)

---

## 🛠️ OUTILS DE TEST

**Analyse performance :**
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest (https://webpagetest.org/)
- GTmetrix (https://gtmetrix.com/)

**Bundle analyzer :**
````bash
# Analyser taille bundle
npm install -D webpack-bundle-analyzer
npm run build -- --stats

# Visualiser
npx webpack-bundle-analyzer dist/stats.json
````

**Monitoring :**
- Vercel Analytics
- Cloudflare Web Analytics
- Google Search Console

---

## ✅ CRITÈRES VALIDATION

**Le site est performant si :**
- ✅ Lighthouse Performance > 90
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ Bundle JS < 300KB gzippé
- ✅ Images < 200KB chacune
- ✅ Chargement 4G < 3s

---

## 🎯 Quick Wins (Gains Rapides)

**Si score < 70, commencer par :**
1. Compresser toutes les images (WebP)
2. Lazy load images sauf hero
3. Defer JS non-critique
4. Minifier CSS/JS
5. Activer compression Gzip/Brotli

**Ces 5 actions donnent +20-30 points généralement.**

---

**FIN PERFORMANCE AUDIT**