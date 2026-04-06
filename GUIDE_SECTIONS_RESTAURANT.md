# Guide complet sections Restaurant pour manuel opérationnel FSVB Studio

## Vue d'ensemble
Ce guide détaille chaque section du template Restaurant pour accompagner les sessions client restaurateur. Chaque section est documentée avec ses props, comportements, suggestions de contenu et instructions opérationnelles spécifiques aux établissements de restauration.

---

## SECTION 1 : NAVBAR

**1. Identification**
- ID: `navbar`
- Position: 1 (navigation fixe en haut)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
brand: string (requis)
  Exemple: "Ristorante Bella Vista"
  Description: Nom du restaurant

logoUrl?: string (optionnel)
  Exemple: "/logo-restaurant.png"
  Description: Logo du restaurant

layout?: 'classic' | 'centered' | 'split' (optionnel)
  Exemple: "centered"
  Description: Layout adapté aux restaurants (centered recommandé)

items: NavItem[] (requis)
  Exemple: [
    {label: "Accueil", href: "#hero"},
    {label: "Menu", href: "#menu"}, 
    {label: "Galerie", href: "#gallery"},
    {label: "Réservation", href: "#reservation"}
  ]
  Description: Navigation spécialisée restaurant
```

**3. Éléments visuels**
- Layout responsive avec menu burger mobile
- Brand centré (adapté aux restaurants)
- Navigation épurée vers sections clés
- Style chaleureux cohérent avec l'ambiance resto

**4. Comportement spécial**
- Navigation fixe avec transparence
- Scroll smooth vers sections
- Mise en avant du lien "Réservation"
- Animation au scroll

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Restaurant italien :**
- "Ristorante Bella Vista", "Trattoria del Sole", "Casa Mamma"

**Restaurant français :**
- "Le Petit Gourmet", "Bistrot du Marché", "L'Auberge Dorée"

**Restaurant asiatique :**
- "Le Jardin de Jade", "Sakura Sushi", "Dragon d'Or"

**Brasserie :**
- "La Belle Époque", "Café de la Paix", "Le Central"

**Pizzeria :**
- "Pizza Corner", "Il Forno", "Napoli Express"

**7. Instructions session live**
🗣️ "Commençons par le nom de votre restaurant et la navigation. C'est l'identité première de votre établissement."
📋 Questions essentielles :
- "Quel est le nom exact de votre restaurant ?"
- "Avez-vous un logo ? Dans quel format ?"
- "Quelles sections voulez-vous mettre en avant dans le menu ?"
- "Souhaitez-vous un accès direct à la réservation ?"

👉 Navigation restaurant type :
1. Accueil (présentation)
2. Menu/Carte (incontournable)
3. Galerie (photos plats/ambiance)
4. À propos (histoire)
5. Réservation (conversion)

✅ Tester navigation et lisibilité

---

## SECTION 2 : HERO

**1. Identification**
- ID: `hero`
- Position: 2 (première impression)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Bienvenue au Ristorante Bella Vista"
  Description: Titre d'accueil chaleureux

subtitle: string (requis)
  Exemple: "Cuisine italienne authentique depuis 1985"
  Description: Positionnement/histoire courte

description?: string (optionnel)
  Exemple: "Découvrez nos spécialités dans une ambiance chaleureuse et familiale"
  Description: Complément d'information

primaryCTA: {text: string, href: string} (requis)
  Exemple: {text: "Réserver une table", href: "#reservation"}
  Description: Action principale pour restaurants

secondaryCTA?: {text: string, href: string} (optionnel)
  Exemple: {text: "Voir la carte", href: "#menu"}
  Description: Action secondaire découverte

backgroundImage?: string (optionnel)
  Exemple: "/restaurant-ambiance.jpg"
  Description: Photo d'ambiance du restaurant
```

**3. Éléments visuels**
- Image de fond : plats signature ou ambiance restaurant
- Titre avec typographie élégante
- Sous-titre mettant en avant l'authenticité/tradition
- Double CTA : réservation + découverte

**4. Comportement spécial**
- Effet parallax sur l'image de fond
- Animation d'entrée textes
- Boutons avec couleurs brand restaurant
- Responsive avec adaptation mobile

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Cuisine italienne :**
```
Titre: "Savourez l'authenticité de la cuisine italienne"
Sous-titre: "Traditions familiales depuis 1985"
CTA: "Réserver votre table"
```

**Cuisine française :**
```
Titre: "L'art de vivre à la française"
Sous-titre: "Bistronomie moderne et produits du terroir"
CTA: "Découvrir notre carte"
```

**Restaurant gastronomique :**
```
Titre: "Une expérience culinaire inoubliable"
Sous-titre: "Chef étoilé - Cuisine créative"
CTA: "Réserver votre expérience"
```

**Brasserie/Bistrot :**
```
Titre: "Convivialité et saveurs du terroir"
Sous-titre: "Ouvert 7j/7 - Ambiance chaleureuse"
CTA: "Voir nos plats du jour"
```

**Restaurant familial :**
```
Titre: "Le goût de la tradition familiale"
Sous-titre: "Recettes grand-mère - Ambiance conviviale"
CTA: "Réserver en famille"
```

**7. Instructions session live**
🗣️ "Cette section Hero donne le ton : elle doit faire saliver et donner envie de venir chez vous."
📋 Questions pour le restaurateur :
- "Quelle est votre spécialité culinaire ?"
- "Depuis quand existez-vous ?"
- "Quelle est votre ambiance ? (familiale, élégante, conviviale...)"
- "Qu'est-ce qui vous différencie des autres restaurants ?"
- "Photo signature de votre restaurant/plats disponible ?"

👉 Structure Hero restaurant :
1. Titre évocateur avec spécialité culinaire
2. Sous-titre avec authenticité/histoire
3. CTA principal "Réserver" (priorité)
4. CTA secondaire "Menu/Carte" (découverte)

💡 Mots-clés qui fonctionnent : "Authentique", "Tradition", "Saveurs", "Artisanal", "Familial"

✅ Vérifier cohérence avec identité restaurant

---

## SECTION 3 : SPECIALTIES

**1. Identification**
- ID: `specialties`
- Position: 3 (mise en avant spécialités)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Nos Spécialités"
  Description: Titre section spécialités

subtitle?: string (optionnel)
  Exemple: "Ce qui fait notre différence"
  Description: Sous-titre explicatif

items: Feature[] (requis)
  Exemple: [
    {
      id: "specialty-1",
      icon: "🍝",
      title: "Pâtes fraîches maison",
      description: "Préparées chaque jour avec des ingrédients locaux"
    }
  ]
  Description: Spécialités phares (3-4 max)
```

**3. Éléments visuels**
- Grille de 3-4 spécialités avec icônes
- Cards épurées avec émojis food
- Descriptions courtes et appétissantes
- Layout responsive adaptatif

**4. Comportement spécial**
- Animation d'apparition au scroll
- Hover effects sur les cards
- Icônes animées subtiles
- Pas d'intégrations externes

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Restaurant italien :**
```
🍝 Pâtes fraîches maison
Préparées chaque jour avec semoule de blé dur

🍕 Pizzas au feu de bois  
Cuites dans notre four traditionnel napolitain

🍷 Cave italienne
Plus de 80 références des meilleures régions

🍰 Desserts artisanaux
Tiramisus et gelatos maison
```

**Restaurant français :**
```
🥖 Pain artisanal
Boulangerie partenaire - Cuisson quotidienne

🧀 Plateau de fromages
Sélection fine de fromages fermiers AOP

🍷 Carte des vins
200 références françaises par notre sommelier

🍯 Produits du terroir
Circuits courts et producteurs locaux
```

**Restaurant asiatique :**
```
🍜 Ramen authentiques
Bouillon mijoté 48h - Nouilles artisanales

🍣 Sushis frais
Poissons sélectionnés quotidiennement

🥢 Cuisine au wok
Cuisson minute - Légumes croquants

🍵 Thés d'exception
Sélection de thés premium importés
```

**Brasserie :**
```
🍺 Bières artisanales
8 pressions locales renouvelées

🥩 Viandes maturées
Sélection boucher - Maturation 21 jours

🥗 Salades fraîcheur
Produits bio et légumes de saison

🍰 Desserts maison
Pâtisserie traditionnelle quotidienne
```

**7. Instructions session live**
🗣️ "Cette section met en avant vos forces. C'est ce qui fera que les clients choisiront votre restaurant."
📋 Questions pour identifier spécialités :
- "Quels sont vos 3-4 plats signature ?"
- "Qu'est-ce qui fait votre réputation ?"
- "Avez-vous des savoir-faire particuliers ?"
- "D'où viennent vos produits ?"
- "Que disent vos clients réguliers de vous ?"

👉 Conseils spécialités restaurant :
- Maximum 4 spécialités (lisibilité)
- Mettre en avant l'origine/qualité
- Utiliser émojis food évocateurs
- Être spécifique (pas juste "pizza" mais "pizza napolitaine")

💡 Angles d'approche : origine des produits, techniques de cuisine, histoire des recettes, partenariats locaux

✅ Vérifier authenticité et différenciation

---

## SECTION 4 : MENU

**1. Identification**
- ID: `menu`
- Position: 4 (carte complète)
- Statut: ⚠️ Partiel (en développement - placeholder actuel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Notre Carte"
  Description: Titre section menu

subtitle?: string (optionnel)
  Exemple: "Cuisine fraîche renouvelée selon les saisons"
  Description: Description du menu

categories: MenuCategory[] (requis)
  Exemple: [
    {
      name: "Entrées",
      items: [
        {name: "Burrata des Pouilles", price: "14€", description: "Tomates confites, roquette, huile basilic"}
      ]
    }
  ]
  Description: Structure complète du menu
```

**3. Éléments visuels**
- Actuellement : placeholder simple
- Futur : sections par catégorie (Entrées, Plats, Desserts)
- Cards élégantes avec prix bien visibles
- Descriptions appétissantes

**4. Comportement spécial**
- Navigation entre catégories
- Prix mis en avant
- Descriptions sur hover/tap
- Mode print-friendly possible

**5. Bugs connus**
- ⚠️ **Section en développement** - Actuellement placeholder
- ✅ Composant MenuGrid à créer pour version production

**6. Suggestions contenu**

**Structure menu italien :**
```
ANTIPASTI (8-12€)
- Bruschette della casa
- Antipasto misto  
- Burrata des Pouilles

PRIMI PIATTI (12-16€)
- Spaghetti carbonara
- Risotto aux champignons
- Penne all'arrabbiata

SECONDI PIATTI (16-24€)
- Osso buco alla milanese
- Branzino al sale
- Saltimbocca alla romana

DOLCI (6-8€)
- Tiramisu maison
- Panna cotta
- Gelato artisanal
```

**Structure menu français :**
```
ENTRÉES (9-15€)
- Foie gras maison
- Escargots de Bourgogne
- Salade de chèvre chaud

PLATS (18-28€)
- Boeuf bourguignon
- Sole meunière
- Magret de canard

DESSERTS (7-9€)
- Tarte Tatin
- Crème brûlée
- Île flottante
```

**7. Instructions session live**
🗣️ "Le menu est le cœur de votre activité. Il faut qu'il soit clair, appétissant et bien organisé."
📋 Questions pour le menu :
- "Avez-vous votre carte actualisée ?"
- "Comment organisez-vous vos plats ? (entrées/plats/desserts)"
- "Vos prix sont-ils à jour ?"
- "Avez-vous des spécialités à mettre en avant ?"
- "Proposez-vous des menus fixes ?"

👉 Conseils menu restaurant :
- Maximum 6-8 plats par catégorie
- Descriptions courtes mais évocatrices
- Prix clairs et assumés
- Mise en avant des spécialités maison

⚠️ **Important** : Prévenir le client que cette section sera complétée avec un vrai composant menu dans la version finale

✅ Noter tous les détails pour le développement final

---

## SECTION 5 : GALLERY

**1. Identification**
- ID: `gallery`
- Position: 5 (photos ambiance/plats)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Galerie"
  Description: Titre section photos

subtitle?: string (optionnel)
  Exemple: "Découvrez notre restaurant en images"
  Description: Sous-titre explicatif

projects: PortfolioItem[] (requis)
  Exemple: [
    {
      id: "photo-1",
      title: "Salle principale", 
      description: "Ambiance chaleureuse et conviviale",
      image: "/restaurant-salle.jpg",
      category: "Ambiance"
    }
  ]
  Description: Photos du restaurant et plats (6-9 photos)

columns?: 2 | 3 | 4 (optionnel)
  Exemple: 3
  Description: Organisation en colonnes
```

**3. Éléments visuels**
- Grille responsive de photos
- Categories : Ambiance, Plats, Équipe, Événements
- Lightbox pour agrandissement
- Effet hover avec descriptions

**4. Comportement spécial**
- Images lazy loading
- Animation au scroll
- Catégories filtrables possibles
- Optimisation mobile

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Mix photos restaurant :**
```
AMBIANCE (40%)
- Salle principale / Terrasse
- Bar / Comptoir
- Cuisine ouverte
- Décoration/détails

PLATS (50%)
- Spécialités signature
- Présentation soignée
- Produits bruts/ingrédients
- Dressage artistique

ÉQUIPE (10%)
- Chef en action
- Service en salle
- Équipe cuisine
```

**Photos ambiance essentielles :**
- Vue d'ensemble salle
- Terrasse si disponible
- Bar/comptoir
- Table dressée
- Détails déco caractéristiques
- Cuisine ouverte

**Photos plats incontournables :**
- Plat signature photographié pro
- Dessert maison
- Plateau fromages/charcuteries
- Présentation apéritif
- Spécialité en cours de préparation

**7. Instructions session live**
🗣️ "Les photos sont cruciales pour un restaurant. Elles doivent faire saliver et donner envie de venir."
📋 Questions photos restaurant :
- "Avez-vous des photos professionnelles ?"
- "Montrez-moi vos plus beaux plats"
- "Votre salle est-elle photogénique ?"
- "Avez-vous une terrasse/espace particulier ?"
- "Photos de l'équipe en action ?"

👉 Conseils photos restaurant :
- Qualité professionnelle obligatoire
- Éclairage naturel privilégié
- Éviter les photos de téléphone
- Mélanger ambiance et plats (60/40)
- Cohérence visuelle (filtres, style)

💡 Si pas de photos pro : proposer shooting ou photos stock qualité

⚠️ Photos interdites : plats mal présentés, salle vide/triste, éclairage jaune

✅ Vérifier autorisation et qualité de toutes les photos

---

## SECTION 6 : ABOUT

**1. Identification**
- ID: `about`
- Position: 6 (histoire du restaurant)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Notre Histoire"
  Description: Titre section présentation

description: string (requis)
  Exemple: "Depuis 1985, la famille Rossi vous accueille dans son restaurant pour vous faire découvrir la vraie cuisine italienne."
  Description: Histoire du restaurant (150-250 mots)

image: string (requis)
  Exemple: "/chef-portrait.jpg"
  Description: Photo du chef/propriétaire

values: AboutValue[] (requis)
  Exemple: [
    {icon: "👨‍🍳", title: "Chef Passion", description: "35 ans d'expérience"},
    {icon: "🇮🇹", title: "Authenticité", description: "Recettes traditionnelles"}
  ]
  Description: Valeurs/atouts du restaurant
```

**3. Éléments visuels**
- Layout 2 colonnes : photo gauche, texte droite
- Photo du chef/équipe/propriétaire
- Histoire racontée avec passion
- Points forts avec icônes

**4. Comportement spécial**
- Animation des éléments au scroll
- Photo avec effet de profondeur
- Aucune intégration externe
- Responsive adaptatif

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Restaurant familial italien :**
```
Titre: "Une Tradition Familiale"
Description: "Depuis 1985, la famiglia Rossi vous accueille dans son restaurant pour vous faire découvrir la vera cucina italiana. Nos recettes, transmises de génération en génération, sont préparées avec les meilleurs produits importés directement d'Italie."

Valeurs:
👨‍🍳 Chef Passion - 35 ans d'expérience napolitaine
🇮🇹 Authenticité - Recettes ancestrales préservées  
🥫 Produits Premium - Import direct d'Italie
❤️ Accueil Familial - Comme chez nonna
```

**Restaurant gastronomique :**
```
Titre: "L'Art de la Gastronomie"  
Description: "Le Chef Dubois, formé dans les plus grandes maisons, vous propose une cuisine créative alliant tradition française et techniques modernes. Chaque plat raconte une histoire, celle des producteurs locaux et de notre terroir d'exception."

Valeurs:
⭐ Chef Étoilé - Formation palace parisien
🌱 Produits Locaux - Circuits courts exclusifs
🎨 Cuisine Créative - Innovation et tradition
🍷 Accords Parfaits - Cave sélectionnée sommelier
```

**Bistrot convivial :**
```
Titre: "Le Goût de la Convivialité"
Description: "Depuis 2010, Marie et Paul ont créé ce petit bistrot de quartier où l'on se sent comme à la maison. Cuisine traditionnelle revisitée, produits frais du marché et ambiance chaleureuse font le succès de cette adresse devenue incontournable."

Valeurs:
🏠 Esprit Famille - Ambiance chaleureuse garantie
🥕 Marché Quotidien - Produits frais sélectionnés
🍷 Cave Passion - Vins de vignerons indépendants
💝 Service Souriant - Équipe aux petits soins
```

**7. Instructions session live**
🗣️ "Cette section humanise votre restaurant. Les clients aiment connaître l'histoire derrière leurs plats préférés."
📋 Questions pour l'histoire :
- "Depuis quand votre restaurant existe-t-il ?"
- "Quelle est votre formation/parcours ?"
- "Avez-vous une philosophie culinaire particulière ?"
- "D'où viennent vos recettes ?"
- "Qu'est-ce qui vous passionne dans ce métier ?"

👉 Structure histoire restaurant :
- Origine/création (quand, pourquoi, par qui)
- Spécialisation culinaire (techniques, influences)
- Philosophie (produits, service, ambiance)
- Évolution/projets (reconnaissance, développement)

💡 Éléments qui touchent : transmission familiale, passion du métier, relation producteurs, accueil clients

✅ Vérifier authenticité et cohérence avec l'offre

---

## SECTION 7 : TESTIMONIALS

**1. Identification**
- ID: `testimonials`
- Position: 7 (avis clients)
- Statut: ⚠️ Partiel (placeholder actuel - composant à développer)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Avis de nos clients"
  Description: Titre section témoignages

subtitle?: string (optionnel)
  Exemple: "Ce qu'ils disent de leur expérience"
  Description: Sous-titre explicatif

testimonials: Testimonial[] (requis)
  Exemple: [
    {
      id: "1",
      name: "Marie D.",
      role: "Cliente régulière",
      rating: 5,
      text: "Cuisine authentique et service impeccable ! Mes amis italiens confirment l'authenticité.",
      image: "/client-marie.jpg"
    }
  ]
  Description: Témoignages clients (3-4 max)
```

**3. Éléments visuels**
- Actuellement : placeholder simple
- Futur : Cards avec photos clients, étoiles, avis
- Layout responsive 2-3 colonnes
- Design chaleureux restaurant

**4. Comportement spécial**
- Animation d'entrée décalée
- Système d'étoiles visuelles
- Rotation automatique possible
- Liens vers avis complets

**5. Bugs connus**
- ⚠️ **Section en développement** - Actuellement placeholder
- ✅ Composant TestimonialCard spécialisé restaurant à créer

**6. Suggestions contenu**

**Types d'avis restaurant efficaces :**
```
AUTHENTICITÉ CULINAIRE
"La cuisine la plus authentique de la région ! En tant qu'italien, je recommande vivement."
- Marco R., Chef d'entreprise ⭐⭐⭐⭐⭐

AMBIANCE & SERVICE  
"Accueil chaleureux, ambiance familiale. On s'y sent comme chez soi, cuisine délicieuse."
- Sophie M., Famille ⭐⭐⭐⭐⭐

EXPÉRIENCE GLOBALE
"Repas d'anniversaire parfait ! Équipe aux petits soins, plats raffinés. Nous reviendrons !"  
- Jean-Paul L., Couple ⭐⭐⭐⭐⭐
```

**Sources d'avis à exploiter :**
- Google My Business (avec autorisation)
- TripAdvisor
- Facebook  
- LaFourchette/OpenTable
- Témoignages directs clients

**7. Instructions session live**
🗣️ "Les avis clients sont cruciaux pour rassurer les nouveaux clients. Ils valent tous les arguments commerciaux."
📋 Questions pour collecter témoignages :
- "Avez-vous des avis Google positifs ?"
- "Des clients vous ont-ils écrit des messages sympas ?"
- "Avez-vous des photos avec des clients heureux ?"
- "Des personnalités ont-elles fréquenté votre restaurant ?"

👉 Critères avis restaurant :
- Spécifique à l'expérience restaurant (pas générique)
- Mentionne aspects concrets (plats, service, ambiance)
- Prénom + première lettre nom + fonction/contexte
- Photos clients si possible (avec autorisation)

⚠️ **Important** : Prévenir le client que cette section sera développée avec un vrai composant témoignages

✅ Noter les avis clients pour intégration future

---

## SECTION 8 : HOURS/LOCATION

**1. Identification**
- ID: `hoursLocation`
- Position: 8 (informations pratiques)
- Statut: ⚠️ Partiel (placeholder actuel - composant à développer)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Horaires & Localisation"
  Description: Titre section infos pratiques

address: string (requis)
  Exemple: "123 Rue de la Gastronomie, 75001 Paris"
  Description: Adresse complète restaurant

phone: string (requis)
  Exemple: "01 23 45 67 89"
  Description: Téléphone restaurant

weekdayHours: string (requis)
  Exemple: "Mardi - Samedi : 12h-14h30 & 19h-22h30"
  Description: Horaires semaine

weekendHours?: string (optionnel)
  Exemple: "Dimanche : 12h-15h uniquement"
  Description: Horaires weekend

closedDays?: string (optionnel)
  Exemple: "Fermé le lundi"
  Description: Jours de fermeture

mapEmbedUrl?: string (optionnel)
  Exemple: URL Google Maps embed
  Description: Carte intégrée
```

**3. Éléments visuels**
- Actuellement : layout simple centré
- Futur : Card avec infos + carte Google Maps intégrée
- Icônes pour téléphone, adresse, horaires
- Design mobile-first

**4. Comportement spécial**
- Liens cliquables (tel, adresse)
- Carte interactive Google Maps
- Horaires mis à jour en temps réel
- Statut ouvert/fermé dynamique

**5. Bugs connus**
- ⚠️ **Section en développement** - Actuellement placeholder basic
- ✅ Intégration Google Maps et composant horaires à créer

**6. Suggestions contenu**

**Format horaires restaurant standard :**
```
📍 ADRESSE
15 rue de la République, 69002 Lyon

📞 TÉLÉPHONE  
04 78 42 85 96

🕐 HORAIRES
Mardi - Vendredi : 12h-14h & 19h-22h
Samedi : 19h-23h
Dimanche : 12h-15h
Fermé le lundi

🚗 PARKING
Parking République à 2 minutes
```

**Variations selon type restaurant :**
```
BRASSERIE (amplitude large)
Lundi - Dimanche : 7h-1h
Service continu cuisine : 11h30-23h

GASTRONOMIQUE (service structuré)  
Mardi - Samedi : 12h-13h30 & 19h30-21h30
Fermé dimanche et lundi

PIZZERIA (horaires étendus)
Mardi - Dimanche : 18h-23h (22h dimanche)
Fermé le lundi
```

**Informations complémentaires utiles :**
- Parking disponible/payant
- Accès transport en commun
- Terrasse (si saison)
- Réservation conseillée/obligatoire

**7. Instructions session live**
🗣️ "Ces informations pratiques sont cruciales. Un client qui ne trouve pas vos horaires, c'est un client perdu."
📋 Questions horaires/localisation :
- "Quels sont exactement vos horaires ?"
- "Ces horaires changent-ils selon la saison ?"
- "Quelle est votre adresse complète ?"
- "Numéro de téléphone pour réservations ?"
- "Avez-vous un parking ? Transport en commun proche ?"

👉 Points de vigilance horaires :
- Exactitude absolue (responsabilité légale)
- Distinction service/ouverture
- Horaires saisonniers si applicable
- Jours fériés/congés annuels

⚠️ **Important** : Section sera complétée avec Google Maps intégré et composant horaires dynamique

✅ Noter toutes les infos pour développement final

---

## SECTION 9 : RESERVATION

**1. Identification**
- ID: `reservation`
- Position: 9 (formulaire réservation)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Réserver une table"
  Description: Titre appel à action

subtitle?: string (optionnel)
  Exemple: "Nous reviendrons vers vous sous 24h pour confirmer"
  Description: Process de réservation

ctaText?: string (optionnel)
  Exemple: "Réserver"
  Description: Texte bouton

phone?: string (optionnel)
  Exemple: "04 78 42 85 96"
  Description: Téléphone direct réservation

email?: string (optionnel)
  Exemple: "reservation@restaurant.fr"
  Description: Email réservations

onlineBookingUrl?: string (optionnel)
  Exemple: "https://lafourchette.com/restaurant"
  Description: Lien réservation externe
```

**3. Éléments visuels**
- Formulaire avec champs : nom, email, téléphone, nombre de personnes, date/heure souhaitée, message
- Design soigné cohérent avec l'image restaurant
- Bouton proéminent "Réserver"
- Informations contact complémentaires

**4. Comportement spécial**
- Validation formulaire côté client
- Champ date/heure avec picker
- Champ nombre de personnes
- Envoi par email (configuration nécessaire)

**5. Bugs connus**
- ⚠️ Formulaire actuellement en mode console.log (dev)
- ✅ Intégration email et/ou Cal.com nécessaire pour production

**6. Suggestions contenu**

**Formulaire réservation standard :**
```
Titre: "Réservez votre table"
Sous-titre: "Confirmation sous 24h par téléphone"
Champs:
- Nom/Prénom
- Téléphone  
- Email
- Nombre de personnes
- Date souhaitée
- Heure souhaitée  
- Message (allergies, occasion...)
```

**Variantes selon restaurant :**
```
GASTRONOMIQUE
"Réservez votre expérience culinaire"
+ Champ "Occasion spéciale"
+ Accord mets/vins souhaité

GROUPE/ÉVÉNEMENT
"Organiser votre événement"  
+ Champ budget par personne
+ Type d'événement (anniversaire, entreprise...)

TERRASSE SAISONNIÈRE
"Préférence salle/terrasse"
+ Note météo/saison
```

**Messages de confirmation types :**
```
STANDARD
"Merci ! Nous vous contactons sous 24h pour confirmer votre réservation."

WEEKEND/FORTE AFFLUENCE
"Demande reçue ! Réponse sous 48h. Pour une réservation urgente, appelez-nous."

AVEC ALTERNATIVE
"Si vos créneaux ne sont pas disponibles, nous vous proposerons des alternatives."
```

**7. Instructions session live**
🗣️ "La réservation, c'est votre conversion finale. Elle doit être simple et rassurante."
📋 Questions réservation :
- "Comment gérez-vous actuellement les réservations ?"
- "Téléphone dédié réservations ?"
- "Utilisez-vous LaFourchette, OpenTable... ?"
- "Délai de confirmation habituel ?"
- "Informations importantes à demander ?" (allergies, groupe...)

👉 Bonnes pratiques réservation :
- Formulaire court mais complet
- Confirmation automatique de réception
- Délai de réponse annoncé et respecté
- Alternatives en cas d'indisponibilité

🔧 Configuration technique à prévoir :
- Integration email (Netlify Forms, EmailJS...)
- Éventuelle intégration Cal.com ou LaFourchette
- Page de remerciement après envoi

✅ Tester le formulaire avant mise en production

---

## SECTION 10 : EVENTS

**1. Identification**
- ID: `events`
- Position: 10 (événements/privatisation)
- Statut: ⚠️ Partiel (placeholder - désactivé par défaut)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Événements & Privatisation"
  Description: Titre section événements

subtitle?: string (optionnel)
  Exemple: "Organisez vos événements dans un cadre d'exception"
  Description: Accroche événements

description: string (requis)
  Exemple: "Anniversaires, séminaires, mariages... Nous personnalisons votre événement"
  Description: Description services événementiels

capacity?: number (optionnel)
  Exemple: 50
  Description: Capacité maximum

services: string[] (requis)
  Exemple: ["Menus sur-mesure", "Privatisation complète", "Service traiteur"]
  Description: Services événementiels proposés
```

**3. Éléments visuels**
- Actuellement : placeholder simple
- Futur : section avec photos événements, capacités, services
- Call-to-action contact événements
- Galerie événements passés

**4. Comportement spécial**
- Section désactivée par défaut
- Formulaire contact spécialisé événements
- Galerie photos événements
- Lien vers brochure événements

**5. Bugs connus**
- ⚠️ **Section en développement** - Placeholder basique
- ✅ Composant événements complet à créer

**6. Suggestions contenu**

**Restaurant avec capacité événements :**
```
Titre: "Vos Événements d'Exception"
Description: "De l'anniversaire intime au séminaire d'entreprise, nous créons sur-mesure l'événement qui vous ressemble dans notre écrin de 80 places."

SERVICES PROPOSÉS
🎂 Anniversaires privés (10-30 pers)
💼 Séminaires entreprise (20-50 pers) 
💒 Réceptions mariages (50-80 pers)
🥂 Cocktails & inaugurations
🍽️ Service traiteur externe

FORMULES
- Privatisation partielle (espace séparé)
- Privatisation totale (restaurant complet)
- Menus groupe personnalisés
- Service dédié événements
```

**Petite capacité/bistrot :**
```
Titre: "Vos Moments Spéciaux"  
Description: "Anniversaires, réunions amicales... Notre salle peut accueillir vos groupes jusqu'à 25 personnes dans une ambiance chaleureuse."

PRESTATIONS
🎈 Anniversaires (8-25 pers)
👥 Repas d'affaires  
🎉 Réunions amicales
🎂 Menus groupe sur-mesure
```

**7. Instructions session live**
🗣️ "Cette section n'est pertinente que si vous avez vraiment une capacité d'accueil pour les groupes."
📋 Questions événements :
- "Recevez-vous des groupes/événements ?"
- "Quelle est votre capacité maximum ?"
- "Proposez-vous des formules groupe ?"
- "Privatisation possible ?"
- "Avez-vous déjà organisé des événements ?"

👉 Activation conditionnelle :
- Seulement si capacité > 15-20 personnes
- Expérience événements déjà existante
- Volonté de développer cette activité

⚠️ **Important** : Section désactivée par défaut - à activer seulement si pertinente pour le restaurant

✅ Évaluer pertinence avec le client avant activation

---

## SECTION 11 : CONTACT

**1. Identification**
- ID: `contact`
- Position: 11 (contact général)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Nous contacter"
  Description: Titre contact général

subtitle?: string (optionnel)
  Exemple: "Une question ? N'hésitez pas à nous écrire"
  Description: Encouragement contact

ctaText?: string (optionnel)
  Exemple: "Envoyer"
  Description: Texte bouton envoi

showPhone: boolean (optionnel)
  Exemple: true
  Description: Afficher champ téléphone

email?: string (optionnel)
  Exemple: "contact@restaurant.fr" 
  Description: Email contact affiché

phone?: string (optionnel)
  Exemple: "04 78 42 85 96"
  Description: Téléphone contact affiché
```

**3. Éléments visuels**
- Formulaire contact standard : nom, email, téléphone, message
- Informations de contact visibles
- Design cohérent avec section réservation
- Distinction claire avec la réservation

**4. Comportement spécial**
- Formulaire généraliste (pas spécialisé réservation)
- Validation standard
- Envoi email configuration nécessaire
- Page confirmation

**5. Bugs connus**
- ⚠️ Formulaire actuellement en mode console.log (dev)
- ✅ Configuration email nécessaire pour production

**6. Suggestions contenu**

**Contact général restaurant :**
```
Titre: "Une Question ?"
Sous-titre: "Notre équipe vous répond rapidement"

UTILISATIONS
- Questions sur allergies/intolérances
- Demandes d'informations générales  
- Partenariats/événements spéciaux
- Réclamations/suggestions
- Candidatures spontanées
```

**Différenciation réservation vs contact :**
```
RÉSERVATION (Section 9)
→ Formulaire spécialisé table
→ Champs date/heure/nombre personnes
→ Process restauration

CONTACT GÉNÉRAL (Section 11)  
→ Formulaire généraliste
→ Champ message libre
→ Questions diverses
```

**Messages selon contexte :**
```
POLYVALENT
"Réservations, questions, suggestions... Nous sommes à votre écoute !"

FOCUS SERVICE  
"Notre équipe se fera un plaisir de répondre à toutes vos questions"

AVEC HORAIRES
"Réponse sous 24h en semaine, 48h le weekend"
```

**7. Instructions session live**
🗣️ "Cette section contact est optionnelle. Elle fait double emploi avec la réservation dans la plupart des cas."
📋 Questions sur la pertinence :
- "Recevez-vous beaucoup de questions autres que réservations ?"
- "Avez-vous besoin d'un contact général séparé ?"
- "Email dédié aux questions vs réservations ?"

👉 Recommandations :
- Optionnel si section réservation suffisante
- Utile pour restaurants avec activités multiples
- Nécessaire si traiteur, événements, partenariats...

💡 Alternative : fusionner avec footer ou garder seulement réservation

✅ Évaluer nécessité réelle avec le client

---

## SECTION 12 : FOOTER

**1. Identification**
- ID: `footer`
- Position: 12 (pied de page)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
brand: string (requis)
  Exemple: "Ristorante Bella Vista"
  Description: Nom du restaurant

copyright: string (requis)
  Exemple: "© 2024 Ristorante Bella Vista - Tous droits réservés"
  Description: Mentions copyright

sections: FooterSection[] (optionnel)
  Exemple: [
    {
      title: "Infos Pratiques",
      links: [
        {label: "Horaires", href: "#horaires"},
        {label: "Réservation", href: "#reservation"}
      ]
    }
  ]
  Description: Sections de liens organisées

socialLinks: SocialLink[] (optionnel)
  Exemple: [
    {platform: "Facebook", url: "https://facebook.com/restaurant", icon: "📘"},
    {platform: "Instagram", url: "https://instagram.com/restaurant", icon: "📸"}
  ]
  Description: Réseaux sociaux restaurant
```

**3. Éléments visuels**
- Layout multi-colonnes responsive
- Brand restaurant proéminent
- Liens organisés par thème
- Réseaux sociaux avec icônes

**4. Comportement spécial**
- Liens internes vers sections
- Liens externes vers réseaux/plateformes
- Responsive avec collapse sur mobile
- SEO avec mentions légales

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Footer restaurant complet :**
```
BRAND: "Ristorante Bella Vista"
COPYRIGHT: "© 2024 Ristorante Bella Vista - Tous droits réservés"

SECTIONS:
Restaurant
- Notre histoire
- Nos spécialités  
- Galerie photos
- Équipe

Infos Pratiques  
- Horaires & Plan
- Réservation
- Parking
- Contact

Légal
- Mentions légales
- Politique confidentialité
- CGV (si boutique)

RÉSEAUX SOCIAUX:
Facebook, Instagram, TripAdvisor, Google My Business
```

**Footer simplifié (petit restaurant) :**
```
SECTIONS:
Navigation
- Menu
- Réservation  
- Contact
- Horaires

Légal
- Mentions légales
- Confidentialité

RÉSEAUX:
Facebook, Instagram, Google
```

**Réseaux sociaux restaurant prioritaires :**
1. **Google My Business** (avis, horaires)
2. **Facebook** (communauté, événements)  
3. **Instagram** (photos plats, stories)
4. **TripAdvisor** (avis touristes)
5. **LaFourchette** (réservations)

**7. Instructions session live**
🗣️ "Le footer complète l'expérience. Pour un restaurant, les réseaux sociaux et avis sont cruciaux."
📋 Questions footer restaurant :
- "Sur quels réseaux sociaux êtes-vous présents ?"
- "Avez-vous Google My Business ?"
- "Présents sur TripAdvisor, LaFourchette ?"
- "Pages légales nécessaires ?"

👉 Éléments indispensables restaurant :
- Google My Business (local SEO)
- Réseaux avec photos (Instagram priorité)
- Horaires répétés (aide mobile)
- Contact téléphone visible

💡 Optimisation restaurant :
- Liens vers avis Google/TripAdvisor
- Intégration réservation externe
- Horaires temps réel
- Mention allergènes si obligatoire

✅ Vérifier tous liens et réseaux actifs

---

## RÉCAPITULATIF POUR SESSION CLIENT RESTAURANT

### Sections OBLIGATOIRES (toujours actives)
1. **NAVBAR** - Navigation spécialisée restaurant
2. **HERO** - Première impression culinaire
4. **MENU** - Carte complète (en développement)
8. **HOURS/LOCATION** - Infos pratiques essentielles
9. **RESERVATION** - Formulaire réservation table
12. **FOOTER** - Informations complètes

### Sections OPTIONNELLES (selon besoins restaurant)
3. **SPECIALTIES** - Plats signature/spécialités
5. **GALLERY** - Photos ambiance/plats
6. **ABOUT** - Histoire du restaurant
7. **TESTIMONIALS** - Avis clients (en développement)
10. **EVENTS** - Privatisation/événements (si pertinent)
11. **CONTACT** - Contact général (souvent optionnel)

### Questions clés pour chaque restaurateur
1. **Quel type de cuisine/restaurant ?** (adaptation suggestions)
2. **Depuis quand existez-vous ?** (Histoire/About)
3. **Avez-vous des photos professionnelles ?** (Gallery)
4. **Quelles sont vos spécialités signature ?** (Specialties)
5. **Comment gérez-vous les réservations ?** (Reservation)
6. **Recevez-vous des groupes/événements ?** (Events)

### Ordre de configuration recommandé
1. **NAVBAR + HERO** (identité restaurant)
2. **SPECIALTIES + MENU** (offre culinaire)
3. **GALLERY** (photos impact)
4. **ABOUT** (histoire/authenticité)  
5. **HOURS/LOCATION + RESERVATION** (conversion)
6. **Sections optionnelles** selon pertinence

### Spécificités restaurant vs autres templates
- **Photos indispensables** (plats + ambiance)
- **Horaires précis** (responsabilité légale)
- **Réservation prioritaire** (conversion spécialisée)
- **Authenticité cruciale** (origine, tradition, chef)
- **Réseaux sociaux essentiels** (Google, Instagram, TripAdvisor)

### Sections en développement
⚠️ **MENU** (Section 4) - Composant carte complète à finaliser
⚠️ **TESTIMONIALS** (Section 7) - Composant avis clients à créer  
⚠️ **HOURS/LOCATION** (Section 8) - Intégration Google Maps à ajouter
⚠️ **EVENTS** (Section 10) - Composant événements si pertinent

---

*Guide créé pour FSVB Studio - Template Restaurant - Version 1.0 - Janvier 2024*