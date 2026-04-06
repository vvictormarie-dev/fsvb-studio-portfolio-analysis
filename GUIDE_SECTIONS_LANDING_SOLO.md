# Guide complet sections Landing Solo - Manuel opérationnel FSVB Studio

## Vue d'ensemble
Ce guide détaille chaque section du template Landing Solo pour accompagner les sessions client. Chaque section est documentée avec ses props, comportements, suggestions de contenu et instructions opérationnelles.

---

## SECTION 1 : NAVBAR

**1. Identification**
- ID: `navbar`
- Position: 1 (navigation fixe en haut)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
brand: string (requis)
  Exemple: "FSVB Studio"
  Description: Nom de l'entreprise/marque

logoUrl?: string (optionnel)
  Exemple: "/logo-entreprise.png"
  Description: URL du logo personnalisé

layout?: 'classic' | 'centered' | 'split' (optionnel)
  Exemple: "classic"
  Description: Style de mise en page

items: NavItem[] (requis)
  Exemple: [{label: "Accueil", href: "#hero"}, {label: "Services", href: "#services"}]
  Description: Liens de navigation
```

**3. Éléments visuels**
- Layout responsive : menu burger sur mobile
- Brand/logo aligné à gauche
- Menu navigation aligné à droite
- Style glassmorphism avec transparence

**4. Comportement spécial**
- Navigation fixe (sticky)
- Scroll smooth vers les sections
- Menu mobile avec animation
- Mise en surbrillance de la section active

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance/Agence :**
- "FSVB Studio", "Mon Studio", "Votre Nom Pro"

**Restaurant :**
- "Restaurant Le Gourmet", "Chez [Nom]", "Le [Spécialité]"

**Coach :**
- "[Prénom] Coaching", "Transform Academy", "[Nom] Mentor"

**7. Instructions session live**
🗣️ "Commençons par configurer la navigation. C'est ce que vos visiteurs verront en permanence."
📋 Questions à poser :
- "Quel est le nom de votre entreprise ?"
- "Avez-vous un logo à intégrer ?"
- "Quelles sections voulez-vous dans le menu ?"

👉 Configuration :
1. Saisir le nom/brand
2. Uploader logo si disponible
3. Cocher les sections à afficher dans le menu

✅ Valider navigation fonctionnelle

---

## SECTION 2 : HERO

**1. Identification**
- ID: `hero`
- Position: 2 (première section visible)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Sites Vitrines Premium"
  Description: Titre principal H1

subtitle: string (requis)
  Exemple: "Livrés en 3 jours"
  Description: Sous-titre accrocheur

description?: string (optionnel)
  Exemple: "Transformez votre vision en réalité digitale"
  Description: Paragraphe explicatif

primaryCTA: {text: string, href: string} (requis)
  Exemple: {text: "Voir mes offres", href: "#services"}
  Description: Bouton d'action principal

secondaryCTA?: {text: string, href: string} (optionnel)
  Exemple: {text: "Portfolio", href: "#portfolio"}
  Description: Bouton d'action secondaire

backgroundImage?: string (optionnel)
  Exemple: "/hero-background.jpg"
  Description: Image de fond
```

**3. Éléments visuels**
- Layout 2 colonnes sur desktop, 1 colonne mobile
- Titre + sous-titre + description + boutons CTA
- Image de fond avec overlay optionnel
- Animation fade-in au chargement

**4. Comportement spécial**
- Scroll smooth vers sections si href = ancre (#)
- Animation parallax légère sur l'image de fond
- Responsive avec reflow du contenu

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Restaurant :**
```
Titre: "Savourez l'authenticité de la cuisine italienne"
Sous-titre: "Depuis 1985"
CTA: "Réserver une table"
```

**Coach :**
```
Titre: "Révélez votre potentiel avec un coaching sur-mesure"
Sous-titre: "Transformez votre vie maintenant"
CTA: "Réserver un appel découverte"
```

**Freelance :**
```
Titre: "Développeur web freelance à [Ville]"
Sous-titre: "Sites performants en 3 jours"
CTA: "Voir mes réalisations"
```

**7. Instructions session live**
🗣️ "Cette section Hero est cruciale : c'est la première impression de vos visiteurs."
📋 Questions clés :
- "Quelle est votre proposition de valeur unique ?"
- "Que voulez-vous que le visiteur fasse en premier ?"
- "Comment résumeriez-vous votre activité en 5 mots ?"

👉 Ordre de configuration :
1. Titre (impact fort, 3-8 mots)
2. Sous-titre (précision/bénéfice)
3. Description (optionnel, 1 phrase)
4. CTA principal (verbe d'action)
5. CTA secondaire (optionnel)

✅ Vérifier preview et impact visuel

---

## SECTION 3 : TRUSTBAR

**1. Identification**
- ID: `trustbar`
- Position: 3 (après Hero)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
stats: StatItem[] (requis)
  Exemple: [
    {value: "50+", label: "Sites créés", icon: "users"},
    {value: "48h", label: "Livraison", icon: "clock"}
  ]
  Description: Statistiques de confiance (max 4)
```

**3. Éléments visuels**
- Barre horizontale avec glassmorphism
- 2-4 statistiques en ligne
- Icônes + valeurs + labels
- Séparateurs entre stats

**4. Comportement spécial**
- Animation d'entrée au scroll
- Responsive : stack vertical sur mobile
- Effets de glassmorphism

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance :**
- "50+ Sites créés"
- "48h Délai moyen"
- "100% Clients satisfaits"
- "3 ans Expérience"

**Restaurant :**
- "2000+ Couverts servis"
- "15 ans Tradition"
- "5★ Avis Google"
- "3 Chefs experts"

**Coach :**
- "200+ Clients accompagnés"
- "5 ans Expertise"
- "95% Objectifs atteints"
- "50h Formation/mois"

**7. Instructions session live**
🗣️ "Ajoutons des chiffres qui rassurent vos visiteurs et créent de la confiance."
📋 Questions pour statistiques :
- "Depuis combien de temps exercez-vous ?"
- "Combien de clients/projets avez-vous eu ?"
- "Quel est votre délai de livraison ?"
- "Avez-vous des certifications/awards ?"

👉 Conseils :
- Maximum 4 statistiques
- Chiffres ronds et percutants
- Éviter les approximations ("environ 50")
- Préférer les réalisations aux promesses

✅ Vérifier cohérence avec la réalité

---

## SECTION 4 : ABOUT

**1. Identification**
- ID: `about`
- Position: 4 (présentation)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Pourquoi Me Choisir ?"
  Description: Titre de la section

description: string (requis)
  Exemple: "Passionnée par la création digitale..."
  Description: Paragraphe de présentation

image: string (requis)
  Exemple: "/about-photo.jpg"
  Description: Photo professionnelle

values: AboutValue[] (requis)
  Exemple: [
    {icon: "⚡", title: "Livraison Express", description: "Sites prêts en 3 jours"},
    {icon: "🎨", title: "Design Sur-Mesure", description: "Création unique"}
  ]
  Description: Points forts (2-4 valeurs)
```

**3. Éléments visuels**
- Layout 2 colonnes : image gauche, texte droite
- Photo professionnelle encadrée
- Liste de valeurs avec icônes
- Responsive : colonnes empilées sur mobile

**4. Comportement spécial**
- Animation stagger des valeurs au scroll
- Image avec effets CSS subtils
- Pas d'intégrations externes

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance :**
```
Titre: "Pourquoi choisir mes services ?"
Description: "Développeur passionné avec 3 ans d'expérience, je crée des sites qui convertissent vos visiteurs en clients."
Valeurs: 
- Expertise technique approfondie
- Design moderne et professionnel  
- Accompagnement personnalisé
```

**Restaurant :**
```
Titre: "Notre Histoire"
Description: "Famille de restaurateurs depuis 2 générations, nous perpétuons la tradition culinaire italienne avec passion."
Valeurs:
- Recettes familiales authentiques
- Produits frais et locaux
- Service chaleureux
```

**Coach :**
```
Titre: "Mon Approche"
Description: "Coach certifié avec 200+ clients accompagnés, je vous aide à révéler votre potentiel et atteindre vos objectifs."
Valeurs:
- Méthodes éprouvées
- Suivi personnalisé
- Résultats mesurables
```

**7. Instructions session live**
🗣️ "Cette section humanise votre marque. Les gens achètent à des personnes, pas des entreprises."
📋 Questions importantes :
- "Quelle est votre histoire/background ?"
- "Qu'est-ce qui vous différencie ?"
- "Pourquoi les clients vous font-ils confiance ?"
- "Avez-vous une photo professionnelle ?"

👉 Structure recommandée :
1. Photo pro de qualité (éviter selfies)
2. Histoire courte mais personnelle
3. 2-3 points de différenciation forts

💡 Si pas de photo : proposer photo stock ou illustration

✅ Vérifier authenticité et cohérence

---

## SECTION 5 : SERVICES

**1. Identification**
- ID: `services`
- Position: 5 (offres principales)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Mes Offres"
  Description: Titre de la section

subtitle?: string (optionnel)
  Exemple: "Des solutions adaptées à tous vos besoins"
  Description: Sous-titre explicatif

services: Service[] (requis)
  Exemple: [
    {
      id: "flash",
      title: "Site Flash", 
      price: "350€",
      description: "Parfait pour commencer",
      features: ["1-3 pages", "Responsive", "Contact"]
    }
  ]
  Description: Liste des services/packages (2-4 max)
```

**3. Éléments visuels**
- Grille responsive 2-3 colonnes
- Cards avec prix, titre, description, features
- Service du milieu peut être "recommandé"
- Design cohérent avec le theme

**4. Comportement spécial**
- Hover effects sur les cards
- Boutons CTA par service
- Responsive avec stack mobile
- Pas d'intégrations paiement (pour l'instant)

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
Site Flash - 350€
- 1-3 pages responsive
- Formulaire contact  
- Livraison 48h

Site Start - 550€
- 4-6 pages complètes
- Blog intégré
- SEO optimisé

Site Pro - 800€
- Site illimité
- E-commerce léger
- Support 6 mois
```

**Restaurant :**
```
Menu Découverte - 25€
- Entrée + Plat + Dessert
- Accord mets/vins
- Café offert

Menu Tradition - 35€
- Antipasti variés
- Plat signature
- Dessert maison

Menu Dégustation - 55€
- 7 services
- Accords vins inclus
- Digestif offert
```

**Coach :**
```
Séance Découverte - 50€
- 1h d'échange
- Diagnostic personnalisé
- Plan d'action

Accompagnement 3 mois - 300€
- 6 séances 1h
- Suivi WhatsApp
- Outils personnalisés

Programme VIP - 500€
- Suivi illimité 3 mois
- Séances en urgence
- Garantie résultats
```

**7. Instructions session live**
🗣️ "Vos services sont le cœur de votre activité. Il faut être clair et attractif."
📋 Questions stratégiques :
- "Quelles sont vos 2-3 offres principales ?"
- "Comment fixez-vous vos prix ?"
- "Que comprend chaque offre exactement ?"
- "Laquelle recommanderiez-vous ?"

👉 Conseils pricing :
- 2-3 offres maximum (éviter paralysie du choix)
- Effet d'ancrage : offre milieu "populaire"
- Features claires et bénéfiques
- Prix rond et assumé

⚠️ Éviter : listes trop longues, jargon technique, prix cachés

✅ Tester clarté avec le client

---

## SECTION 6 : PORTFOLIO

**1. Identification**
- ID: `portfolio`
- Position: 6 (preuves sociales)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Mes Réalisations"
  Description: Titre de la section

subtitle?: string (optionnel)
  Exemple: "Découvrez quelques projets que j'ai créés"
  Description: Sous-titre descriptif

items: PortfolioProject[] (requis)
  Exemple: [
    {
      id: "1",
      title: "Restaurant Le Gourmet",
      description: "Site avec réservation", 
      image: "/portfolio1.jpg",
      category: "Restaurant",
      technologies: ["React", "CSS"]
    }
  ]
  Description: Projets à afficher (3-6 idéalement)

columns?: 2 | 3 | 4 (optionnel)
  Exemple: 3
  Description: Nombre de colonnes sur desktop
```

**3. Éléments visuels**
- Grille responsive avec images
- Cards avec hover effects
- Filtres par catégorie possibles
- Lightbox/modal pour détails

**4. Comportement spécial**
- Images lazy loading
- Animation d'entrée au scroll
- Possibilité de voir plus/moins
- Liens vers projets si disponibles

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
1. Site Restaurant "La Dolce Vita"
   - Système de réservation
   - Menu interactif
   - Avis Google intégrés

2. Cabinet Dentaire Martin  
   - Prise RDV en ligne
   - Espace patient
   - Mobile-first

3. Coach Fitness Pro
   - Programme en ligne
   - Paiement sécurisé
   - App mobile
```

**Photographe :**
```
1. Shooting Mariage Sarah & Tom
   - 300 photos livrées
   - Album photo inclus
   - Drone + Studio

2. Portraits Corporate
   - 15 collaborateurs
   - Retouches pro
   - Livraison 48h

3. Événement Startup Day
   - Couverture complète
   - Photos + Vidéo
   - Live sur réseaux
```

**Coach :**
```
1. Transformation Marie, 35 ans
   - -15kg en 6 mois  
   - Confiance retrouvée
   - Nouveau poste obtenu

2. Reconversion Paul, 45 ans
   - De cadre à entrepreneur
   - CA 100k€ an 1
   - Équilibre vie/travail

3. Équipe StartupTech
   - Cohésion équipe +40%
   - Productivité doublée
   - 0 turnover
```

**7. Instructions session live**
🗣️ "Votre portfolio, ce sont vos références. Il faut montrer la diversité et qualité de votre travail."
📋 Questions pour portfolio :
- "Quels sont vos 3-5 meilleurs projets ?"
- "Avez-vous des photos/captures d'écran ?"
- "Pouvez-vous quantifier les résultats ?"
- "Avez-vous l'autorisation de les montrer ?"

👉 Conseils création :
- Photos de qualité obligatoires
- Projets variés mais cohérents  
- Résultats chiffrés si possible
- Pas de projets trop anciens (< 2-3 ans)

⚠️ Si portfolio vide : 
- Projets personnels/fictifs
- Avant/après
- Processus de création

✅ Vérifier autorisation et qualité visuelle

---

## SECTION 7 : FEATURES

**1. Identification**
- ID: `features`
- Position: 7 (différenciation)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Pourquoi Me Choisir"
  Description: Titre de la section

subtitle?: string (optionnel)
  Exemple: "Ce qui fait la différence dans mes prestations"
  Description: Sous-titre explicatif

features: Feature[] (requis)
  Exemple: [
    {
      id: "1",
      icon: "⚡",
      title: "Livraison Express",
      description: "Votre site prêt en 3 jours maximum"
    }
  ]
  Description: Avantages distinctifs (3-4 max)

columns?: 2 | 3 | 4 (optionnel)
  Exemple: 3  
  Description: Organisation en colonnes
```

**3. Éléments visuels**
- Grille d'icônes + titres + descriptions
- Design épuré avec espacement généreux
- Icônes emoji ou SVG cohérentes
- Alignement centré généralement

**4. Comportement spécial**
- Animation stagger au scroll
- Hover subtils sur les cards
- Responsive adaptatif
- Pas de liens externes

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance :**
```
⚡ Livraison Express
Votre site prêt en 3 jours maximum, sans compromis qualité

📱 100% Responsive  
Parfait sur mobile, tablette et desktop

🚀 Performance Optimale
Temps de chargement ultra-rapide pour meilleure UX

🎯 SEO Intégré
Optimisé Google dès le lancement pour attirer clients
```

**Restaurant :**
```
🍃 Produits Frais
Ingrédients sélectionnés chaque matin au marché local

👨‍🍳 Chef Expert
15 ans d'expérience en cuisine italienne authentique

🍷 Cave Sélectionnée
Plus de 200 références pour accords parfaits

🚗 Livraison Rapide
Commandes livrées en moins de 30 minutes
```

**Coach :**
```
🎓 Certifié Expert
Diplômé PNL et coach certifié ICF niveau ACC

📊 Méthodes Éprouvées
Techniques validées sur 200+ clients avec succès

💬 Suivi Personnalisé
Disponible 7j/7 par WhatsApp pour questions urgentes

📈 Résultats Mesurables
Objectifs chiffrés et tracking hebdomadaire des progrès
```

**7. Instructions session live**
🗣️ "Cette section répond à la question : 'Pourquoi vous et pas un concurrent ?'"
📋 Questions pour différenciation :
- "Qu'est-ce qui vous rend unique ?"
- "Quels sont vos 3 plus gros avantages ?"
- "Que disent vos clients de vous ?"
- "Comment vous positionnez-vous vs concurrence ?"

👉 Conseils rédaction :
- Maximum 4 features (lisibilité)
- Bénéfices, pas caractéristiques
- Langage client, pas jargon métier
- Preuves quand possible

💡 Structure : Avantage + Explication courte + Bénéfice client

✅ Vérifier différenciation réelle

---

## SECTION 8 : PROCESS

**1. Identification**
- ID: `process`
- Position: 8 (comment ça marche)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Comment Ça Marche"
  Description: Titre de la section

subtitle?: string (optionnel)
  Exemple: "Un processus simple et efficace pour votre projet"
  Description: Sous-titre rassurant

steps: ProcessStep[] (requis)
  Exemple: [
    {
      id: "1",
      number: 1,
      title: "Briefing & Analyse",
      description: "On définit ensemble vos besoins",
      icon: "💬",
      duration: "30min"
    }
  ]
  Description: Étapes du processus (3-5 étapes)
```

**3. Éléments visuels**
- Timeline horizontale ou verticale
- Numérotation claire des étapes
- Icônes et durées pour chaque étape
- Flèches ou connecteurs entre étapes

**4. Comportement spécial**
- Animation progressive des étapes
- Responsive : vertical sur mobile
- Pas d'interactivité complexe

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
1. Briefing & Analyse (30min)
💬 On définit ensemble besoins, objectifs et style souhaité

2. Création & Design (2 jours)  
🎨 Je développe votre site selon vos spécifications

3. Tests & Révisions (1 jour)
🔍 Validation complète et ajustements selon vos retours

4. Mise en Ligne (2h)
🚀 Déploiement et formation pour gérer votre nouveau site
```

**Restaurant :**
```
1. Réservation (1 clic)
📞 Par téléphone, site web ou app mobile

2. Accueil & Installation (5 min)
🍷 Verre de bienvenue et présentation de la carte

3. Commande & Service (30 min)
👨‍🍳 Plats préparés minute avec produits frais

4. Expérience & Départ
😋 Digestif offert et programme fidélité activé
```

**Coach :**
```
1. Appel Découverte (30min gratuit)
📞 Diagnostic de situation et définition objectifs

2. Programme Personnalisé (24h)
📋 Plan d'action sur-mesure avec étapes claires

3. Séances & Suivi (3 mois)
🎯 Rendez-vous réguliers + support WhatsApp quotidien

4. Bilan & Autonomie
📊 Mesure des résultats et outils pour continuer seul
```

**7. Instructions session live**
🗣️ "Cette section rassure le client en lui montrant exactement ce qui va se passer."
📋 Questions pour processus :
- "Comment se déroule typiquement un projet avec vous ?"
- "Quelles sont les grandes étapes ?"
- "Combien de temps prend chaque phase ?"
- "Qu'attendez-vous du client à chaque étape ?"

👉 Conseils structuration :
- 3-5 étapes maximum (simplicité)
- Ordre chronologique strict
- Durées indicatives rassurantes
- Rôle du client mentionné

💡 Mots-clés : "Simple", "Rapide", "Ensemble", "Transparent"

✅ Vérifier cohérence avec réalité opérationnelle

---

## SECTION 9 : COMPARISON

**1. Identification**
- ID: `comparison`
- Position: 9 (avant/après)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Avec ou sans site professionnel"
  Description: Titre de la comparaison

withoutTitle: string (requis)
  Exemple: "Sans Site Web"
  Description: Titre colonne "problème"

withoutDescription: string (requis)
  Exemple: "Visibilité limitée, difficile à trouver"
  Description: Situation sans votre solution

withTitle: string (requis)
  Exemple: "Avec Site Pro"
  Description: Titre colonne "solution"

withDescription: string (requis)
  Exemple: "Présence 24/7, trouvé sur Google"
  Description: Situation avec votre solution
```

**3. Éléments visuels**
- Deux colonnes côte à côte
- Colonne gauche en couleur neutre/grise
- Colonne droite en couleur accent/positive
- Design contrasté pour l'effet dramatique

**4. Comportement spécial**
- Animation d'entrée décalée
- Effets de contraste visuel
- Responsive : colonnes empilées

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
Sans Site Professionnel | Avec Votre Nouveau Site
- Invisible sur Google     | - 1ère page Google
- Prospects vous passent   | - Clients vous trouvent 
- Image amateur           | - Crédibilité professionnelle
- Concurrence vous devance | - Vous démarquez
```

**Restaurant :**
```
Sans Présence Digitale | Avec Notre Service
- Clients ne vous trouvent pas | - Visible sur Google Maps  
- Réservations par téléphone   | - Réservation en 1 clic
- Pas d'avis visibles        | - Avis 5★ mis en avant
- Menu papier seulement       | - Menu interactif en ligne
```

**Coach :**
```
Sans Accompagnement | Avec Mon Coaching
- Objectifs flous et repoussés | - Plan d'action clair
- Motivation en dents de scie  | - Soutien quotidien
- Pas de méthode structurée    | - Techniques éprouvées
- Résultats aléatoires         | - Progression mesurable
```

**7. Instructions session live**
🗣️ "Cette section fait comprendre la valeur de votre offre par contraste."
📋 Questions pour comparison :
- "Quelle est la situation actuelle de vos prospects ?"
- "Quels problèmes rencontrent-ils ?"
- "Comment votre solution transforme leur situation ?"
- "Quels bénéfices concrets apportez-vous ?"

👉 Technique rédactionnelle :
- Problèmes spécifiques et relatable à gauche
- Solutions concrètes et désirables à droite
- Même nombre de points des deux côtés
- Langage émotionnel mais factuel

⚠️ Éviter : exagération, dénigrement concurrence, promesses irréalistes

✅ Vérifier réalisme et éthique

---

## SECTION 10 : CTA-MIDDLE

**1. Identification**
- ID: `cta-middle`
- Position: 10 (relance milieu de page)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Prêt à Démarrer Votre Projet ?"
  Description: Question engageante

description: string (requis)
  Exemple: "Discutons ensemble de vos besoins et créons le site qui va booster votre activité"
  Description: Texte motivationnel

primaryButton: {text: string, href: string} (requis)
  Exemple: {text: "Planifier un appel", href: "#contact"}
  Description: Bouton d'action principal
```

**3. Éléments visuels**
- Bloc centered avec background accent
- Titre accrocheur + description + bouton
- Design qui attire l'attention
- Contraste élevé avec le reste

**4. Comportement spécial**
- Animation d'entrée percutante
- Bouton avec hover effects
- Scroll vers section contact
- Aucune intégration externe

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance :**
```
Titre: "Prêt à Démarrer Votre Projet ?"
Description: "Discutons ensemble de vos besoins et créons le site qui va booster votre activité"
Bouton: "Planifier un appel gratuit"
```

**Restaurant :**
```
Titre: "Envie de Découvrir Nos Saveurs ?"
Description: "Réservez dès maintenant et laissez-vous surprendre par notre cuisine authentique"
Bouton: "Réserver une table"
```

**Coach :**
```
Titre: "Prêt(e) à Transformer Votre Vie ?"
Description: "Prenez rendez-vous pour un appel découverte gratuit de 30 minutes"
Bouton: "Réserver mon appel"
```

**Consultant :**
```
Titre: "Besoin d'Expertise Pour Votre Projet ?"
Description: "Obtenez un diagnostic personnalisé et des recommandations concrètes"
Bouton: "Demander un audit"
```

**7. Instructions session live**
🗣️ "Cette section relance l'attention au milieu du parcours. C'est votre 2ème chance de convertir."
📋 Questions stratégiques :
- "Quelle action voulez-vous provoquer ici ?"
- "Comment formuler pour créer l'urgence ?"
- "Quelle est votre offre d'appel (gratuit/payant) ?"

👉 Conseils copywriting :
- Question directe en titre (engagement)
- Bénéfice immédiat en description
- Verbe d'action en bouton
- Ton plus direct qu'ailleurs

💡 Psychologie : le visiteur a vu vos preuves, il faut déclencher l'action

✅ Tester avec l'offre d'appel gratuit si possible

---

## SECTION 11 : TESTIMONIALS

**1. Identification**
- ID: `testimonials`
- Position: 11 (preuve sociale)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Ce Que Disent Mes Clients"
  Description: Titre de section

subtitle?: string (optionnel)
  Exemple: "Leurs témoignages parlent mieux que moi"
  Description: Sous-titre humble

testimonials: Testimonial[] (requis)
  Exemple: [
    {
      id: "1",
      name: "Marie Dubois", 
      role: "Restauratrice",
      company: "Le Petit Gourmet",
      rating: 5,
      text: "FSVB Studio a transformé ma vision en réalité !",
      image: "/marie-photo.jpg"
    }
  ]
  Description: Témoignages clients (3 max recommandé)
```

**3. Éléments visuels**
- Cards avec photo, nom, rôle, étoiles
- Text du témoignage mis en avant
- Layout 1-3 colonnes selon nombre
- Photos arrondies et cohérentes

**4. Comportement spécial**
- Animation d'entrée au scroll
- Possible carousel si > 3 témoignages
- Hover effects subtils
- Pas de liens externes

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
Marie Dubois - Restauratrice
"FSVB Studio a transformé ma vision en réalité ! Mon site attire maintenant 3x plus de réservations."
⭐⭐⭐⭐⭐

Thomas Martin - Coach Sportif  
"Délai respecté, qualité au rendez-vous. Je recommande vivement pour tous vos projets web !"
⭐⭐⭐⭐⭐

Sophie Laurent - Architecte
"Un site élégant qui reflète parfaitement mon style. Mes clients sont impressionnés !"
⭐⭐⭐⭐⭐
```

**Coach :**
```
Sarah K. - Cadre Marketing
"Grâce à Paul, j'ai enfin osé changer de carrière. Aujourd'hui j'ai mon entreprise !"
⭐⭐⭐⭐⭐

Michel D. - Dirigeant PME
"Un coaching qui m'a fait passer un cap. Mon équipe est plus soudée, mes résultats meilleurs."
⭐⭐⭐⭐⭐

Julie M. - Maman entrepreneur
"J'ai retrouvé confiance en moi et équilibre vie pro/perso. Merci infiniment !"
⭐⭐⭐⭐⭐
```

**7. Instructions session live**
🗣️ "Les témoignages sont votre arme secrète. Ils parlent mieux que toute argumentation."
📋 Questions pour collecte :
- "Avez-vous des témoignages de clients satisfaits ?"
- "Pouvez-vous me montrer des avis Google/Facebook ?"
- "Des clients accepteraient-ils d'apparaître ?"
- "Avez-vous des photos de clients ?"

👉 Critères qualité témoignage :
- Spécifique (pas "très bien")
- Résultat chiffré si possible  
- Nom + prénom + fonction
- Photo réelle du client

⚠️ Si pas de témoignages :
- Avis Google reformatés
- Témoignages futurs promis
- Retours informels structurés

✅ Vérifier autorisation et authenticité

---

## SECTION 12 : FAQ

**1. Identification**
- ID: `faq`
- Position: 12 (lever objections)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Questions Fréquentes"
  Description: Titre de section

subtitle?: string (optionnel)
  Exemple: "Tout ce que vous devez savoir"
  Description: Sous-titre rassurant

faqs: FAQItem[] (requis)
  Exemple: [
    {
      id: "1",
      question: "Combien de temps pour créer mon site ?",
      answer: "Entre 2 et 3 jours selon la formule choisie..."
    }
  ]
  Description: Questions-réponses (max 6-8)
```

**3. Éléments visuels**
- Accordéon expandable
- Questions en gras, réponses en texte normal
- Icônes +/- pour les états ouvert/fermé
- Layout 1-2 colonnes selon taille d'écran

**4. Comportement spécial**
- Accordéon interactif
- Fermeture automatique des autres items
- Animation smooth d'ouverture/fermeture
- Anchor links possibles

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
Q: Combien de temps pour créer mon site ?
R: Entre 2 et 3 jours selon la formule choisie. Le site Flash est livré en 48h, les autres formules en 72h maximum.

Q: Le prix inclut-il l'hébergement ?
R: L'hébergement est à votre charge (environ 5€/mois). Je peux vous conseiller et vous aider à le configurer.

Q: Puis-je modifier mon site après livraison ?
R: Oui ! Je vous forme à la gestion de votre site et vous avez 1 mois de support gratuit pour toute question.

Q: Mon site sera-t-il visible sur Google ?
R: Absolument ! Tous mes sites sont optimisés SEO. Indexation Google sous 48h et conseils inclus.

Q: Que se passe-t-il si je ne suis pas satisfait ?
R: Révisions illimitées pendant 15 jours. Si vraiment ça ne va pas, je vous rembourse intégralement.
```

**Restaurant :**
```
Q: Proposez-vous la livraison ?
R: Oui, dans un rayon de 10km autour du restaurant. Livraison gratuite à partir de 25€ de commande.

Q: Avez-vous des options végétariennes ?
R: Bien sûr ! Notre carte propose toujours 3-4 plats végétariens et nous pouvons adapter la plupart de nos recettes.

Q: Faut-il réserver ?
R: Recommandé le soir et weekend. Vous pouvez réserver par téléphone, site web ou en passant directement.

Q: Acceptez-vous les groupes ?
R: Oui jusqu'à 20 personnes. Au-delà, nous pouvons privatiser une partie du restaurant sur demande.
```

**Coach :**
```
Q: Combien de temps dure un accompagnement ?
R: En général 3 à 6 mois selon les objectifs. Nous faisons un point régulier pour adapter la durée.

Q: Les séances se font-elles en présentiel ?
R: Je propose présentiel à Lyon et visio partout en France. L'efficacité est identique dans les deux formats.

Q: Que se passe-t-il si je n'atteins pas mes objectifs ?
R: Nous redéfinissons ensemble une stratégie adaptée. Si après 3 mois il n'y a aucun progrès, je vous rembourse.

Q: Êtes-vous tenu au secret professionnel ?
R: Absolument. Tous nos échanges sont confidentiels et je suis lié par le code de déontologie ICF.
```

**7. Instructions session live**
🗣️ "La FAQ lève les dernières objections. C'est souvent ce qui fait basculer la décision."
📋 Questions pour identifier FAQ :
- "Quelles questions vous posent toujours les prospects ?"
- "Quelles sont leurs principales hésitations ?"
- "Qu'est-ce qui les inquiète dans votre offre ?"
- "Quels sont vos concurrents et leurs avantages ?"

👉 Structure FAQ efficace :
- 5-8 questions maximum (lisibilité)
- Questions courtes et directes
- Réponses rassurantes et factuelles
- Ordre : prix → délais → garanties → technique

💡 Anticiper : prix, délais, garanties, processus, SAV, comparaisons

✅ Couvrir 80% des objections récurrentes

---

## SECTION 13 : URGENCY

**1. Identification**
- ID: `urgency`
- Position: 13 (créer urgence)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
text: string (requis)
  Exemple: "Seulement 3 places disponibles ce mois-ci"
  Description: Message d'urgence

type?: 'warning' | 'danger' | 'info' (optionnel)
  Exemple: "warning"
  Description: Style visuel du badge

pulsing?: boolean (optionnel)
  Exemple: true
  Description: Animation de pulsation
```

**3. Éléments visuels**
- Badge coloré avec animation
- Centré sur la page
- Couleurs attractives (rouge, orange)
- Effets de pulsation possibles

**4. Comportement spécial**
- Animation de pulsation
- Couleurs d'alerte visuelle
- Aucun lien ou action
- Juste informatif

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance avec planning chargé :**
```
"⚠️ Seulement 2 créneaux disponibles en février"
"🔥 Planning complet jusqu'en mars - Prochaine dispo avril"
"⏰ Promotion -20% se termine dimanche"
"🎯 Dernières places formation WordPress ce mois"
```

**Restaurant événement :**
```
"🔥 Menu Saint-Valentin - Réservations jusqu'au 10 février"
"⚠️ Soirée dégustation complète - Liste d'attente ouverte"  
"🍷 Nouveaux vins - Dégustation samedi uniquement"
"⏰ Brunch dominical - Réservation obligatoire"
```

**Coach lancement programme :**
```
"🚀 Programme de groupe - Début 15 mars - 3 places restantes"
"⚡ Coaching intensif - Session d'avril complète"
"🎯 Tarif early bird jusqu'au 28 février"
"⚠️ Masterclass gratuite - 50 places seulement"
```

**7. Instructions session live**
🗣️ "Cette section crée une urgence psychologique. À utiliser avec parcimonie et honnêteté."
📋 Questions pour urgence légitime :
- "Avez-vous vraiment des contraintes de planning ?"
- "Proposez-vous parfois des promotions ?"
- "Y a-t-il des événements ponctuels ?"
- "Vos tarifs vont-ils augmenter ?"

👉 Bonnes pratiques urgence :
- Toujours vraie et vérifiable
- Date limite précise
- Raison logique (planning, promo, stock)
- Ton informatif, pas agressif

⚠️ Éviter absolument :
- Fausses urgences
- "Dernière chance" permanent
- Pression commerciale excessive
- Menaces déguisées

💡 Alternative : mettre agenda en temps réel

✅ Vérifier véracité et éthique

---

## SECTION 14 : GUARANTEE

**1. Identification**
- ID: `guarantee`
- Position: 14 (rassurer)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Mes Garanties"
  Description: Titre de section

description: string (requis)
  Exemple: "Satisfait ou remboursé sous 15 jours"
  Description: Détail de la garantie

icon?: string (optionnel)
  Exemple: "🛡️"
  Description: Icône représentative (emoji ou SVG)
```

**3. Éléments visuels**
- Card centered avec background distinct
- Icône proéminente (bouclier, badge)
- Texte clair et rassurant
- Design qui inspire confiance

**4. Comportement spécial**
- Animation d'entrée au scroll
- Effet de mise en avant visuelle
- Aucune interactivité
- Focus sur la lisibilité

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
🛡️ Mes Garanties
✅ Révisions illimitées pendant 15 jours
✅ Remboursement intégral si non satisfait
✅ Support technique gratuit 30 jours
✅ Respect des délais ou réduction tarifaire
```

**Restaurant :**
```
🏆 Nos Engagements
✅ Produits frais garantis du jour
✅ Remboursement si plat non conforme
✅ Service en moins de 20 minutes ou digestif offert
✅ Hygiène et propreté certifiées
```

**Coach :**
```
🎯 Ma Garantie Résultat
✅ Objectifs non atteints = remboursement partiel
✅ Disponibilité 7j/7 pendant l'accompagnement
✅ Outils et méthodes fournis à vie
✅ Suivi gratuit 3 mois après la fin du programme
```

**Consultant :**
```
🔒 Garanties Professionnelles
✅ Confidentialité absolue (NDA signé)
✅ Livrables dans les délais convenus
✅ Assurance responsabilité civile professionnelle
✅ Retour sur investissement mesurable ou audit gratuit
```

**7. Instructions session live**
🗣️ "Les garanties éliminent le risque perçu. C'est un puissant levier de conversion."
📋 Questions pour garanties :
- "Que pouvez-vous garantir concrètement ?"
- "Comment gérez-vous les clients insatisfaits ?"
- "Avez-vous une assurance professionnelle ?"
- "Proposez-vous des révisions gratuites ?"

👉 Types de garanties efficaces :
- Satisfaction ou remboursement
- Respect des délais
- Qualité du service
- Support post-livraison

💡 Équilibre : rassurer sans créer d'attentes irréalistes

⚠️ Ne jamais promettre ce qu'on ne peut tenir

✅ Vérifier faisabilité légale et financière

---

## SECTION 15 : CONTACT

**1. Identification**
- ID: `contact`
- Position: 15 (conversion finale)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Contactez-Moi"
  Description: Titre engageant

subtitle?: string (optionnel)  
  Exemple: "Prêt à créer votre site ? Parlons-en !"
  Description: Sous-titre motivant

onSubmit: function (requis)
  Exemple: (data) => console.log('Form submitted:', data)
  Description: Fonction de traitement du formulaire

submitText?: string (optionnel)
  Exemple: "Envoyer le message"
  Description: Texte du bouton

showPhone?: boolean (optionnel)
  Exemple: true
  Description: Afficher champ téléphone

contactInfo?: ContactInfo (optionnel)
  Exemple: {email: "contact@domain.com", phone: "+33612345678"}
  Description: Informations de contact affichées
```

**3. Éléments visuels**
- Formulaire avec champs : nom, email, téléphone, message
- Validation en temps réel
- Bouton CTA proéminent
- Informations de contact complémentaires possibles

**4. Comportement spécial**
- Validation côté client
- États de loading pendant envoi
- Messages de succès/erreur
- Intégration email possible (à configurer)

**5. Bugs connus**
- ⚠️ Formulaire actuellement en mode console.log (dev)
- ✅ Intégration Netlify Forms ou EmailJS nécessaire pour production

**6. Suggestions contenu**

**Freelance :**
```
Titre: "Prêt à Démarrer Votre Projet ?"
Sous-titre: "Discutons ensemble de vos besoins et créons le site qui va booster votre activité"
Bouton: "Envoyer ma demande"
Contact: "hello@monsite.com - 06 12 34 56 78"
```

**Restaurant :**
```
Titre: "Réservez Votre Table"
Sous-titre: "Une question ? Un événement spécial ? Contactez-nous directement"
Bouton: "Envoyer ma demande"
Contact: "reservation@restaurant.fr - 04 12 34 56 78"
```

**Coach :**
```
Titre: "Prêt(e) à Transformer Votre Vie ?"
Sous-titre: "Réservez votre appel découverte gratuit de 30 minutes"
Bouton: "Réserver mon appel"
Contact: "coach@transformation.com - 06 98 76 54 32"
```

**7. Instructions session live**
🗣️ "La section Contact est votre objectif final. Tout le site mène ici."
📋 Questions essentielles :
- "Quel est votre email professionnel ?"
- "Préférez-vous être contacté par email ou téléphone ?"
- "Avez-vous une adresse physique à mentionner ?"
- "Comment voulez-vous qu'on vous présente la demande ?"

👉 Optimisations conversion :
- Formulaire court (max 4 champs)
- Labels clairs et rassurants
- Bouton avec verbe d'action spécifique
- Temps de réponse mentionné

🔧 Configuration technique :
- Intégrer Netlify Forms ou EmailJS
- Tester envoi en local
- Configurer notifications email
- Page de remerciement

✅ Tester fonctionnement complet avant livraison

---

## SECTION 16 : CTA-FINAL

**1. Identification**
- ID: `cta-final`
- Position: 16 (dernière chance)
- Statut: ✅ Éditable live (optionnel)

**2. Props nécessaires**
```typescript
title: string (requis)
  Exemple: "Transformez Votre Présence En Ligne Dès Aujourd'hui"
  Description: Titre impactant de conclusion

description: string (requis)
  Exemple: "Ne perdez plus de clients à cause d'une absence digitale"
  Description: Argument final persuasif

primaryButton: {text: string, href: string} (requis)
  Exemple: {text: "Commander mon site", href: "#contact"}
  Description: Bouton d'action final
```

**3. Éléments visuels**
- Bloc full-width avec background fort
- Typography size élevée pour impact
- Bouton CTA très visible
- Design qui "ferme" le parcours

**4. Comportement spécial**
- Animation d'entrée percutante
- Scroll vers formulaire contact
- Style différenciant du reste
- Pas d'éléments de distraction

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance :**
```
Titre: "Transformez Votre Présence En Ligne Dès Aujourd'hui"
Description: "Ne perdez plus de clients à cause d'une absence digitale. Votre nouveau site vous attend !"
Bouton: "Commander mon site maintenant"
```

**Restaurant :**
```
Titre: "Réservez Dès Maintenant Votre Expérience Culinaire"
Description: "Nos tables se remplissent vite. Ne manquez pas l'occasion de vivre un moment d'exception."
Bouton: "Réserver ma table"
```

**Coach :**
```
Titre: "Votre Transformation Commence Maintenant"
Description: "Chaque jour qui passe sans agir est une opportunité perdue. Prenez votre vie en main aujourd'hui."
Bouton: "Réserver mon appel découverte"
```

**E-commerce :**
```
Titre: "Rejoignez Plus de 1000 Clients Satisfaits"
Description: "Profitez de nos produits premium avec livraison gratuite et garantie satisfaction."
Bouton: "Découvrir la boutique"
```

**7. Instructions session live**
🗣️ "Cette section est votre 'closing'. Elle doit créer l'urgence d'agir maintenant."
📋 Questions pour CTA final :
- "Quel est votre argument le plus fort ?"
- "Qu'est-ce que le prospect perd s'il n'agit pas ?"
- "Comment créer l'urgence sans pression ?"
- "Quel bénéfice final mettre en avant ?"

👉 Techniques de closing :
- Urgence temporelle ou quantitative
- FOMO (Fear of Missing Out)
- Bénéfice transformation finale
- Action spécifique et claire

💡 Psychologie : le visiteur a tout vu, c'est maintenant ou jamais

⚠️ Éviter : répétition exacte d'autres CTA, ton trop agressif

✅ Harmoniser avec le ton général du site

---

## SECTION 17 : FOOTER

**1. Identification**
- ID: `footer`
- Position: 17 (pied de page)
- Statut: ✅ Éditable live (obligatoire)

**2. Props nécessaires**
```typescript
brand: string (requis)
  Exemple: "FSVB Studio"
  Description: Nom de l'entreprise

copyright: string (requis)
  Exemple: "Créé par FSVB Studio"
  Description: Mentions de copyright

sections: FooterSection[] (optionnel)
  Exemple: [
    {
      title: "Navigation",
      links: [
        {label: "Portfolio", href: "#portfolio"},
        {label: "Services", href: "#services"}
      ]
    }
  ]
  Description: Sections de liens organisées

socialLinks: SocialLink[] (optionnel)
  Exemple: [
    {platform: "LinkedIn", url: "https://linkedin.com/in/profil", icon: "💼"}
  ]
  Description: Liens vers réseaux sociaux
```

**3. Éléments visuels**
- Layout multi-colonnes responsive
- Brand prominant avec liens
- Sections organisées par thème
- Réseaux sociaux avec icônes

**4. Comportement spécial**
- Liens internes vers sections
- Liens externes vers réseaux
- Responsive avec collapse sur mobile
- Sticky possible selon le design

**5. Bugs connus**
- ✅ Aucun bug connu actuellement

**6. Suggestions contenu**

**Freelance Web :**
```
Brand: "FSVB Studio"
Copyright: "© 2024 FSVB Studio - Tous droits réservés"

Sections:
Navigation: Portfolio, Services, À propos, Contact
Légal: Mentions légales, CGV, Politique confidentialité

Réseaux: LinkedIn, GitHub, Instagram
```

**Restaurant :**
```
Brand: "Restaurant Le Gourmet"
Copyright: "© 2024 Restaurant Le Gourmet"

Sections:
Le Restaurant: Notre histoire, L'équipe, La carte
Pratique: Horaires, Réservations, Livraison, Contact
Légal: Mentions légales, Politique confidentialité

Réseaux: Facebook, Instagram, TripAdvisor
```

**Coach :**
```
Brand: "[Prénom] Coaching"
Copyright: "© 2024 [Nom] - Coach certifié"

Sections:
Services: Coaching individuel, Programmes, Formations
Ressources: Blog, Outils gratuits, Témoignages
Contact: Prendre RDV, Email, Téléphone

Réseaux: LinkedIn, Facebook, YouTube
```

**7. Instructions session live**
🗣️ "Le footer complète l'expérience. C'est aussi important pour le SEO et la crédibilité."
📋 Questions pour footer :
- "Voulez-vous répéter la navigation principale ?"
- "Avez-vous des pages légales (CGV, mentions) ?"
- "Sur quels réseaux sociaux êtes-vous actifs ?"
- "Souhaitez-vous ajouter des informations pratiques ?"

👉 Éléments indispensables :
- Liens navigation principaux
- Mentions légales (obligation)
- Contact (email, téléphone)
- Réseaux sociaux pertinents

💡 Bonnes pratiques :
- Maximum 3-4 colonnes
- Liens testés et fonctionnels
- Réseaux sociaux avec vraies URL
- Copyright avec année actuelle

✅ Vérifier tous les liens et légalité

---

## RÉCAPITULATIF POUR SESSION CLIENT

### Sections OBLIGATOIRES (toujours actives)
1. **NAVBAR** - Navigation fixe
2. **HERO** - Première impression
5. **SERVICES** - Offres principales  
15. **CONTACT** - Formulaire conversion
17. **FOOTER** - Informations légales

### Sections OPTIONNELLES (selon besoins client)
3. **TRUSTBAR** - Statistiques confiance
4. **ABOUT** - Présentation personnelle
6. **PORTFOLIO** - Réalisations/projets
7. **FEATURES** - Avantages distinctifs
8. **PROCESS** - Comment ça marche
9. **COMPARISON** - Avant/après
10. **CTA-MIDDLE** - Relance milieu
11. **TESTIMONIALS** - Preuves sociales
12. **FAQ** - Lever objections
13. **URGENCY** - Créer urgence
14. **GUARANTEE** - Rassurer
16. **CTA-FINAL** - Closing final

### Questions clés pour chaque client
1. **Quel est votre métier/activité ?** (adaptation suggestions)
2. **Quels sont vos 3 principaux avantages ?** (Features)  
3. **Avez-vous des témoignages clients ?** (Testimonials)
4. **Comment se déroule votre processus ?** (Process)
5. **Quelles sont vos offres/tarifs ?** (Services)
6. **Quelles questions posent vos prospects ?** (FAQ)

### Ordre de configuration recommandé
1. NAVBAR + HERO (identité)
2. SERVICES (cœur de l'offre)
3. ABOUT + FEATURES (différenciation)
4. PORTFOLIO + TESTIMONIALS (preuves)
5. FAQ + CONTACT (conversion)
6. Sections optionnelles selon temps

---

*Guide créé pour FSVB Studio - Version 1.0 - Janvier 2024*