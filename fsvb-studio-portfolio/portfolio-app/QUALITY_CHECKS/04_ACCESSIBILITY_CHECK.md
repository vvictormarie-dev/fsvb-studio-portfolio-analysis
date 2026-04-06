# ♿ ACCESSIBILITY CHECK - WCAG 2.1 AA

## MISSION
Vérifier que le site est accessible aux personnes en situation de handicap selon les normes WCAG 2.1 niveau AA

---

## CHECKLIST ACCESSIBILITÉ

### 1. Contraste Couleurs (CRITIQUE)

**Ratio minimum requis :**
- Texte normal : 4.5:1
- Texte large (18pt+ ou 14pt+ gras) : 3:1
- Éléments UI interactifs : 3:1

**Vérifier TOUS les textes :**
- [ ] Texte corps sur fond
- [ ] Titres sur fond
- [ ] Liens sur fond
- [ ] Boutons (texte + bordure)
- [ ] Texte sur images
- [ ] Placeholders formulaires

**Outil de test :**
````
https://webaim.org/resources/contrastchecker/
````

**Corrections si contraste insuffisant :**
- Assombrir le texte OU
- Éclaircir le fond OU
- Ajouter un halo/ombre portée

---

### 2. Navigation Clavier

**Tester SANS souris :**
- [ ] Tab : navigation entre éléments
- [ ] Shift+Tab : navigation arrière
- [ ] Enter : activation liens/boutons
- [ ] Espace : activation boutons/checkboxes
- [ ] Flèches : navigation menus déroulants

**Ordre logique :**
- [ ] Navigation suit ordre visuel (haut → bas, gauche → droite)
- [ ] Pas de piège clavier (impossible de sortir d'un élément)
- [ ] Skip links présent ("Aller au contenu")

**Ajouter si absent :**
````html
<a href="#main-content" class="skip-link">
  Aller au contenu principal
</a>
````
````css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
````

---

### 3. Focus Visible

**Vérifier :**
- [ ] Tous les éléments interactifs ont un focus visible
- [ ] Focus différent du état normal (pas juste :hover)
- [ ] Contraste focus suffisant

**Ne JAMAIS utiliser :**
````css
/* ❌ INTERDIT */
*:focus {
  outline: none;
}
````

**Style focus recommandé :**
````css
/* ✅ BON */
a:focus, button:focus, input:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}
````

---

### 4. ARIA Labels

**Éléments interactifs sans texte visible :**
- [ ] Bouton fermer (X) : `aria-label="Fermer"`
- [ ] Bouton menu : `aria-label="Menu de navigation"`
- [ ] Liens icônes : `aria-label="Facebook"`
- [ ] Bouton recherche : `aria-label="Rechercher"`

**Exemple :**
````html
<button aria-label="Ouvrir le menu de navigation">
  <svg><!-- icône hamburger --></svg>
</button>

<a href="https://facebook.com" aria-label="Notre page Facebook">
  <svg><!-- icône Facebook --></svg>
</a>
````

---

### 5. Images

**Textes alternatifs (alt) :**
- [ ] Toutes les images ont un attribut alt
- [ ] Images décoratives : `alt=""` (vide)
- [ ] Images informatives : alt descriptif
- [ ] Pas de "image de" dans alt (redondant)

**Exemples :**
````html
<!-- ✅ Image informative -->
<img src="chef.jpg" alt="Chef Jean préparant une tarte aux pommes">

<!-- ✅ Image décorative -->
<img src="decoration.svg" alt="">

<!-- ❌ Mauvais alt -->
<img src="plat.jpg" alt="image">
<img src="plat.jpg" alt="photo d'un plat">
````

---

### 6. Formulaires

**Labels explicites :**
- [ ] Chaque input a un `<label>` associé
- [ ] Pas de placeholder comme seul label
- [ ] Messages d'erreur clairs

**Exemple correct :**
````html
<label for="email">Adresse email *</label>
<input 
  type="email" 
  id="email" 
  name="email"
  aria-required="true"
  aria-describedby="email-error"
>
<span id="email-error" role="alert">
  <!-- Message erreur si besoin -->
</span>
````

**Validation accessible :**
````html
<!-- ❌ Mauvais : erreur visuelle uniquement -->
<input style="border: 2px solid red">

<!-- ✅ Bon : erreur visuelle + textuelle + ARIA -->
<input aria-invalid="true" aria-describedby="error-msg">
<span id="error-msg" role="alert">Email invalide</span>
````

---

### 7. Structure Sémantique

**Landmarks ARIA :**
````html
<header role="banner">
  <nav role="navigation" aria-label="Navigation principale">
  </nav>
</header>

<main role="main" id="main-content">
  <section aria-labelledby="services-title">
    <h2 id="services-title">Nos Services</h2>
  </section>
</main>

<footer role="contentinfo">
</footer>
````

**Hiérarchie titres :**
- [ ] 1 seul h1 par page
- [ ] Pas de saut (h2 → h4 interdit, doit être h2 → h3)
- [ ] Ordre logique

---

### 8. Contenus Dynamiques

**Zones mises à jour dynamiquement :**
````html
<!-- Messages notifications -->
<div role="status" aria-live="polite">
  <!-- Contenu mis à jour par JS -->
</div>

<!-- Erreurs urgentes -->
<div role="alert" aria-live="assertive">
  <!-- Erreur critique -->
</div>
````

**Loading states :**
````html
<button aria-busy="true" aria-label="Chargement en cours">
  <span class="spinner"></span>
</button>
````

---

### 9. Liens & Boutons

**Liens descriptifs :**
````html
<!-- ❌ Mauvais -->
<a href="/services">Cliquez ici</a>
<a href="/services">En savoir plus</a>

<!-- ✅ Bon -->
<a href="/services">Découvrir nos services de coaching</a>
<a href="/contact">Nous contacter pour un devis</a>
````

**Liens externes :**
````html
<a href="https://externe.com" 
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Lien externe - Ouvre dans un nouvel onglet">
  Site partenaire
  <span class="sr-only">(nouvel onglet)</span>
</a>
````

---

### 10. Vidéos & Audio

**Vérifier :**
- [ ] Sous-titres disponibles (vidéos)
- [ ] Transcription texte disponible
- [ ] Contrôles accessibles clavier
- [ ] Autoplay désactivé (ou contrôlable)
````html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subtitles_fr.vtt" srclang="fr" label="Français">
  Votre navigateur ne supporte pas la vidéo.
</video>
````

---

### 11. Tables

**Si utilisation tableaux de données :**
````html
<table>
  <caption>Prix de nos formules</caption>
  <thead>
    <tr>
      <th scope="col">Formule</th>
      <th scope="col">Prix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Découverte</th>
      <td>50€</td>
    </tr>
  </tbody>
</table>
````

---

### 12. Animations

**Respecter prefers-reduced-motion :**
````css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
````

**Vérifier :**
- [ ] Pas d'animations automatiques > 5 secondes sans contrôle
- [ ] Pas de clignotements > 3 fois par seconde
- [ ] Pause disponible pour carrousels

---

## 🛠️ OUTILS DE TEST

**Extensions navigateur :**
- WAVE (WebAIM) - Chrome/Firefox
- axe DevTools - Chrome/Firefox
- Lighthouse - Chrome (Accessibility audit)

**Tests manuels :**
- Navigation clavier complète
- Lecteur d'écran (NVDA Windows, VoiceOver Mac)
- Zoom 200% (lisibilité maintenue)

**Validateurs :**
````
https://wave.webaim.org/
https://www.accessibilitychecker.org/
````

---

## ✅ CRITÈRES VALIDATION

**Le site est accessible si :**
- ✅ 0 erreur critique WAVE
- ✅ Contraste texte > 4.5:1 partout
- ✅ Navigation clavier 100% fonctionnelle
- ✅ Focus visible partout
- ✅ ARIA labels sur éléments sans texte
- ✅ Images avec alt appropriés
- ✅ Formulaires avec labels explicites
- ✅ Lighthouse Accessibility score > 90

---

**FIN ACCESSIBILITY CHECK**