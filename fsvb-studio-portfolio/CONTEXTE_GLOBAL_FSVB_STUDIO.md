# CONTEXTE GLOBAL FSVB STUDIO

## 🎯 MISSION ET VISION

**FSVB Studio** est une plateforme de création de sites vitrines premium avec un positionnement unique sur le marché français.

### **Mission principale**
Démocratiser l'accès aux sites web professionnels pour les entrepreneurs, artisans et PME françaises en proposant des solutions clés-en-main à prix accessible avec livraison express.

### **Vision**
Devenir la référence française pour les sites vitrines sur-mesure alliant rapidité, qualité et affordabilité.

## 🏗️ ARCHITECTURE TECHNIQUE

### **Stack technologique**
- **Frontend :** React 18 + TypeScript + Vite
- **Styling :** CSS Modules + Variables CSS (tokens design)
- **Backend :** Supabase (BDD + Auth + Storage)
- **Paiement :** PayPal intégration
- **Deployment :** Netlify avec domaines personnalisés

### **Structure du projet**
```
FSVB-Studio/
├── portfolio-app/          # Application principale React
│   ├── src/
│   │   ├── templates/       # Templates de sites (landing-solo, restaurant, coach)
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/          # Pages principales (ConfiguratorPage, etc.)
│   │   ├── config/         # Configuration sections et Supabase
│   │   └── styles/         # Thèmes CSS et tokens design
│   └── docs/              # Documentation technique et audits
```

## 🎨 SYSTÈME DE TEMPLATES

### **3 Templates disponibles**

1. **Landing Solo** (350€)
   - Cible : Freelances, consultants, services B2B
   - Thème recommandé : **Empire** (Tech/SaaS)
   - Sections : Hero, About, Services, Portfolio, Testimonials, Contact

2. **Restaurant** (400€)
   - Cible : Restaurants, cafés, traiteurs
   - Thème recommandé : **Chaleur** (Convivial/Gourmand)
   - Sections : Hero, Specialties, Menu, Gallery, Location, Contact

3. **Coach** (500€)
   - Cible : Coachs, thérapeutes, bien-être
   - Thème recommandé : **Zen** (Bien-être/Calme)
   - Sections : Hero, Approach, Domains, Services, Certifications, Contact

### **5 Thèmes visuels**
- **Empire** : Tech/SaaS moderne (bleus professionnels)
- **Lumière** : Professionnel blanc épuré
- **Chaleur** : Restaurant convivial (oranges/terres)
- **Zen** : Bien-être apaisant (turquoise/verts)
- **Minimaliste** : Designer épuré (noir/blanc)

## 🔧 CONFIGURATEUR AVANCÉ

### **Fonctionnalités principales**
- **Sélection template** avec associations automatiques template → thème
- **Personnalisation complète** : couleurs, contenus, sections
- **Preview temps réel** avec mise à jour instantanée
- **Modal de capture rapide** pour configuration express
- **Système d'accordéons** pour personnaliser chaque section
- **Gestion des sections communes/spécifiques** par template

### **UX/UI Workflow optimal**
1. **Client arrive** → Sélection template (homepage ou direct configurateur)
2. **Thème auto-appliqué** → Cohérence visuelle immédiate
3. **Modal de capture** → Informations essentielles rapidement
4. **Preview instantané** → Aperçu du site généré
5. **Ajustements fins** → Configurateur pour peaufinage
6. **Commande PayPal** → Paiement sécurisé et livraison

## 📊 MODÈLE ÉCONOMIQUE

### **Positionnement pricing**
- **Marché** : Entre les builders gratuits (Wix, Squarespace) et les agences (2000-5000€)
- **Sweet spot** : 350-500€ pour un site professionnel livré en 3-5 jours
- **Valeur ajoutée** : Personnalisation + Rapidité + Support français

### **Revenus cibles**
- **Objectif court terme** : 10 sites/mois = 4000€ MRR
- **Objectif moyen terme** : 50 sites/mois = 20000€ MRR
- **Croissance** : Templates additionnels + services complémentaires

## 🎯 CIBLES CLIENTS

### **Personas principaux**

1. **L'Entrepreneur pressé** (Landing Solo)
   - Freelance, consultant, coach indépendant
   - Besoin : Présence web rapide et professionnelle
   - Budget : 300-500€, délai : < 1 semaine

2. **Le Restaurateur local** (Restaurant)
   - Restaurant familial, café, traiteur
   - Besoin : Showcase produits + réservations
   - Budget : 400-600€, délai : < 5 jours

3. **Le Coach bien-être** (Coach)
   - Thérapeute, coach sportif, praticien
   - Besoin : Crédibilité + prise RDV
   - Budget : 500-700€, délai : < 1 semaine

### **Pain points résolus**
- ❌ **Agences trop chères** → ✅ Prix accessibles
- ❌ **Délais trop longs** → ✅ Livraison 3-5 jours
- ❌ **Builders compliqués** → ✅ Configurateur guidé
- ❌ **Résultats amateur** → ✅ Qualité professionnelle
- ❌ **Maintenance technique** → ✅ Solution clés-en-main

## 🚀 AVANTAGES CONCURRENTIELS

### **Différenciateurs clés**
1. **Rapidité extrême** : 3-5 jours vs 2-6 semaines marché
2. **Prix transparent** : Forfait fixe vs devis variables
3. **Qualité premium** : Design professionnel vs templates générique
4. **Support français** : Relation humaine vs chatbots
5. **Configurateur innovant** : Preview temps réel vs mockups statiques

### **Barrières à l'entrée créées**
- **Système technique complexe** : ConfiguratorPage + 3900 lignes
- **Expertise design** : 5 thèmes cohérents + tokens CSS
- **Process optimisé** : Workflow capture → config → livraison
- **Base clients** : Témoignages + références sectorielles

## 🔄 ROADMAP TECHNIQUE

### **Phase actuelle : MVP Stabilisation**
- ✅ Templates fonctionnels (3)
- ✅ Configurateur avancé
- ✅ Associations template/thème
- ✅ Modal de capture optimisé
- ✅ PayPal integration
- 🔄 **En cours** : UX polishing + tests utilisateur

### **Phase suivante : Scale & Growth**
- 🎯 Templates additionnels (E-commerce, Portfolio, Corporate)
- 🎯 Système de templates custom
- 🎯 Dashboard client pour modifications post-livraison
- 🎯 Intégrations tiers (Google Analytics, CRM, etc.)
- 🎯 Marketplace de modules complémentaires

### **Phase future : Enterprise**
- 🚀 Version white-label pour agences
- 🚀 API publique pour intégrations
- 🚀 Intelligence artificielle pour suggestions design
- 🚀 Expansion européenne (Belgique, Suisse)

## 💡 INNOVATIONS TECHNIQUES RÉCENTES

### **Système d'accordéons dynamiques**
- Personalisation granulaire de chaque section
- Interface intuitive avec toggles visuels
- Props configurables pour chaque template

### **Association automatique template/thème**
- Mapping intelligent : Landing → Empire, Restaurant → Chaleur, Coach → Zen
- Respect des choix utilisateur manuels
- Indicateurs visuels pour guidance UX

### **Modal de capture adaptatif**
- Interface optimisée selon le template sélectionné
- Collecte de données contextuelle et progressive
- Preview instantané pour validation client

## 🧠 COMPRÉHENSION TECHNIQUE APPROFONDIE

### **Complexité du système découverte**

**ConfiguratorPage.tsx : Le cœur complexe**
- **3900+ lignes de code** - Un des composants React les plus sophistiqués
- **Triple gestion d'état** : sectionsConfig (landing), restaurantSectionsConfig, coachSectionsConfig
- **Orchestration complexe** : 15+ useEffect pour synchroniser template ↔ thème ↔ sections ↔ preview
- **Props dynamiques** : Chaque section a ses props configurables selon le template sélectionné

### **Architecture en couches comprise**

**Niveau 1 : Templates (Présentation)**
```
/templates/landing-solo/    → Components + Sections + Styles
/templates/restaurant/      → Components + Sections + Styles  
/templates/coach/          → Components + Sections + Styles
```

**Niveau 2 : Configuration (Logique métier)**
```
/config/sectionsConfig.ts  → Mapping sections communes/spécifiques
ConfiguratorPage.tsx       → State management + UX orchestration
```

**Niveau 3 : Système de thèmes (Design tokens)**
```
/styles/themes.css         → 5 thèmes × variables CSS
/styles/template-base.css  → Layout patterns communs
```

### **Patterns techniques identifiés**

**1. Props drilling intelligent**
- FormData centralisé → Propagé aux templates via props
- updateSectionProps() → Mise à jour granulaire par section
- Computed props → Hero title basé sur companyName + template context

**2. État conditionnel complexe**
```typescript
// Pattern découvert : États multiples selon template
const currentSections = selectedTemplate === "landing-solo" 
  ? sectionsConfig 
  : selectedTemplate === "restaurant"
  ? restaurantSectionsConfig 
  : coachSectionsConfig;
```

**3. Orchestration UX sophistiquée**
```typescript
// Pattern : Auto-sync sans conflits utilisateur
useEffect(() => {
  if (!isThemeManuallySet || !formData.theme) {
    setFormData(prev => ({ ...prev, theme: recommendedTheme }));
  }
}, [selectedTemplate, isThemeManuallySet]);
```

## 🎯 LOGIQUE MÉTIER COMPRISE

### **Workflow client analysé**

**Phase 1 : Capture rapide (Modal)**
- Templates pré-configurés pour réduire friction
- Questions ciblées selon secteur d'activité
- Données minimales pour génération immédiate

**Phase 2 : Preview instantané** 
- Rendu temps réel sans rechargement page
- CSS Variables dynamiques pour couleurs
- data-theme switching pour cohérence visuelle

**Phase 3 : Ajustements fins (Configurateur)**
- Accordéons par section pour éviter surcharge cognitive
- Props contextuels selon template sélectionné  
- Validation progressive avant commande

### **Défis UX résolus identifiés**

**Problème : Configurateur trop complexe**
→ **Solution** : Modal capture + Accordéons + Preview

**Problème : Manque de cohérence visuelle**
→ **Solution** : Associations template/thème automatiques

**Problème : Trop d'options paralysantes**
→ **Solution** : Progressive disclosure + Hints contextuel

## 🔍 ARCHITECTURE TECHNIQUE ANALYSÉE

### **Défis techniques surmontés**

**1. State synchronization hell**
- 3 configs de sections différentes à maintenir
- Props dynamiques selon template + sections enabled
- Éviter les infinite loops React

**2. CSS-in-JS complexe**
```css
/* Pattern découvert : Thématisation via CSS Variables */
[data-theme="empire"] {
  --template-primary: #2563EB;
  /* ... 15+ variables par thème */
}
/* Overrides dynamiques via JavaScript */
el.style.setProperty('--template-primary', userColor);
```

**3. Type safety avec configurations dynamiques**
```typescript
// Pattern : Types conditionnels pour props sections
type LandingSectionConfig = { id: string; props?: LandingProps; }
type RestaurantSectionConfig = { id: string; props?: RestaurantProps; }
```

### **Patterns d'optimisation découverts**

**1. Lazy evaluation des sections**
```typescript
// Ne calcule les props que pour les sections enabled
const enabledSections = currentSections.filter(s => s.enabled || s.required);
```

**2. Memoization intelligente**
```typescript
// useCallback pour éviter re-renders accordéons
const toggleSectionProps = useCallback((sectionId: string) => {
  setOpenSections(prev => [...]);
}, []);
```

**3. Conditional rendering optimisé**
```jsx
{/* Rendu conditionnel selon template pour éviter DOM bloat */}
{selectedTemplate === 'landing-solo' && <LandingPreview />}
```

## 💡 INSIGHTS BUSINESS COMPRIS

### **Positionnement stratégique analysé**

**Gap marché identifié :**
- **Builders (Wix/Squarespace)** : Faciles mais limitées esthétiquement
- **Agences traditionnelles** : Qualité mais cher (2000-5000€) + lent (4-8 semaines)
- **FSVB Studio** : Sweet spot → Qualité professionnelle + Prix accessible + Rapidité

**Avantages concurrentiels techniques :**
- **Configurateur sophistiqué** → Barrière technologique élevée
- **Templates sectoriels** → Spécialisation vs généraliste
- **Preview temps réel** → UX supérieure aux mockups statiques

### **Scalabilité technique prévue**

**Extensibilité architecture :**
- Système de templates modulaire → Nouveaux secteurs facilement
- CSS Variables système → Nouveaux thèmes rapidement  
- Config-driven sections → Personnalisation infinie

**Performance considerations :**
- Code splitting par template → Chargement optimisé
- CSS Modules → Éviter conflicts globaux
- React.lazy → Composants lourds en différé

---

## 📝 UTILISATION DE CE CONTEXTE

**Pour maintenir la continuité :** Ce fichier contient tous les éléments contextuels essentiels pour comprendre FSVB Studio, ses objectifs techniques, son positionnement marché et sa roadmap. Référencez-le lors de nouvelles conversations pour maintenir la cohérence des développements et décisions.

**Dernière mise à jour :** Janvier 2026 - Post implémentation associations template/thème et accordéons de configuration avancés.