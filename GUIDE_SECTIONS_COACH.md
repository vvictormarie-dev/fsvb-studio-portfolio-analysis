# 🧠 GUIDE SECTIONS TEMPLATE COACH
### Guide opérationnel FSVB Studio - Documentation complète des 12 sections

---

## 📋 VUE D'ENSEMBLE TEMPLATE COACH

- **Total sections** : 12
- **Sections obligatoires** : 5 (navbar, hero, domains, services, booking, footer)
- **Sections optionnelles** : 7 (about, approach, certifications, testimonials, faq, contact)
- **Secteur cible** : Coachs professionnels, thérapeutes, accompagnateurs

---

## SECTION 1 : NAVBAR

**1. Identification**
- ID exact : `navbar`
- Position : 1 (en-tête fixe)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `logoText` (string) - Optionnel - "Sophie Martin - Coach" - Texte de la marque
- `logoUrl` (string) - Optionnel - "/logo.png" - URL du logo
- `layout` (string) - Optionnel - "split" - Type d'affichage (classic/centered/split)

**3. Éléments visuels**
- Logo/texte de marque à gauche
- Menu de navigation horizontal
- Liens d'ancrage vers sections
- Design épuré

**4. Comportement spécial**
- Navigation smooth-scroll vers sections
- Responsive avec menu mobile
- Position fixe en haut de page

**5. Bugs connus**
- Aucun bug identifié
- Workaround : N/A

**6. Suggestions contenu (3-5 exemples)**
Suggestions nom/marque :

"Marie Dubois - Coach de Vie"
"Alexandre Martin - Coaching Professionnel"
"Sophie Laurent - Thérapeute Holistique"
"Thomas Leroy - Coach en Développement Personnel"
"Camille Rousseau - Accompagnement Bien-être"

**7. Instructions session live**
"Je vais personnaliser la navigation avec votre nom et prénom. Quel nom souhaitez-vous afficher dans la barre de navigation ? Avez-vous un logo à intégrer ou préférez-vous juste du texte ?"

---

## SECTION 2 : HERO

**1. Identification**
- ID exact : `hero`
- Position : 2 (première section visible)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `title` (string) - Requis - "Révélez votre potentiel" - Titre principal
- `subtitle` (string) - Optionnel - "Coach certifiée - Accompagnement bienveillant" - Sous-titre
- `description` (string) - Optionnel - "Ensemble, clarifions vos objectifs..." - Description
- `ctaText` (string) - Optionnel - "Prendre rendez-vous" - Texte bouton principal

**3. Éléments visuels**
- Titre impact en grand format
- Sous-titre avec qualifications
- Description de l'accompagnement
- Bouton CTA principal (RDV)
- Bouton secondaire (En savoir plus)

**4. Comportement spécial**
- Bouton principal ancre vers section booking
- Bouton secondaire ancre vers section about
- Animation au défilement

**5. Bugs connus**
- Aucun bug identifié
- Workaround : N/A

**6. Suggestions contenu (3-5 exemples)**
Suggestions titre Hero :

"Révélez votre potentiel avec un coaching sur-mesure"
"Transformez votre vie avec un accompagnement personnalisé"
"Atteignez vos objectifs avec un coaching bienveillant"
"Libérez votre potentiel, créez la vie qui vous ressemble"
"Un coaching unique pour révéler le meilleur de vous-même"

Suggestions sous-titre :

"Coach certifiée ICF - 10 ans d'expérience en accompagnement"
"Thérapeute holistique - Approche corps-esprit intégrée"
"Coach en développement personnel - Spécialiste confiance en soi"
"Accompagnement professionnel - Reconversion et leadership"

Suggestions CTA :

"Réserver un appel découverte"
"Prendre rendez-vous gratuitement"
"Commencer mon accompagnement"
"Découvrir le coaching"

**7. Instructions session live**
"Nous allons personnaliser votre message d'accueil. Quel est votre message principal pour vos futurs clients ? Comment vous présentez-vous en 2-3 mots ? Êtes-vous certifié(e) par un organisme particulier ? Quel est votre domaine de spécialisation ?"

---

## SECTION 3 : ABOUT (Mon Parcours)

**1. Identification**
- ID exact : `about`
- Position : 3 (présentation personnelle)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `title` (string) - Optionnel - "Mon Parcours" - Titre de section
- `description` (string) - Requis - Long texte de présentation
- `image` (string) - Optionnel - "/placeholder-coach.jpg" - Photo du coach
- `values` (array) - Optionnel - Tableaux de valeurs/qualifications

**3. Éléments visuels**
- Photo du coach (format portrait)
- Texte de présentation détaillé
- Badges de qualifications/certifications
- Mise en page texte + image

**4. Comportement spécial**
- Aucun comportement particulier
- Section statique informative

**5. Bugs connus**
- Aucun bug identifié
- Workaround : N/A

**6. Suggestions contenu (3-5 exemples)**
Suggestions titre section :

"Mon Parcours"
"Qui suis-je ?"
"À propos de moi"
"Mon histoire"
"Pourquoi je fais ce métier"

Suggestions description :

"Diplômée en psychologie et certifiée coach ICF, j'accompagne depuis 8 ans des personnes en quête de sens et d'accomplissement. Mon approche allie écoute bienveillante, questionnement puissant et outils concrets."

"Après 15 ans dans le management, j'ai découvert ma passion pour l'accompagnement humain. Formée aux neurosciences et certifiée en PNL, j'aide mes clients à révéler leur potentiel authentique."

"Thérapeute holistique depuis 10 ans, je combine approches traditionnelles et outils modernes. Ma mission : vous reconnecter à votre sagesse intérieure pour créer une vie épanouissante."

Suggestions qualifications :

"Certifiée ICF - Coach professionnelle"
"Formation PNL - Praticienne certifiée"
"Diplôme psychologie - 5 ans d'études"
"+300 clients - Accompagnements réussis"

**7. Instructions session live**
"Parlez-moi de votre parcours professionnel et personnel. Quelles sont vos formations principales ? Depuis quand pratiquez-vous ? Qu'est-ce qui vous a amené au coaching/thérapie ? Avez-vous une photo professionnelle récente ?"

---

## SECTION 4 : APPROACH (Ma Méthode)

**1. Identification**
- ID exact : `approach`
- Position : 4 (explication méthodologie)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `title` (string) - Optionnel - "Ma Méthode" - Titre de section
- `subtitle` (string) - Optionnel - "Un accompagnement structuré" - Sous-titre
- `steps` (array) - Requis - Tableau des étapes méthodologiques

**3. Éléments visuels**
- Timeline verticale des étapes
- Chaque étape avec numéro, titre, description
- Durée indiquée pour chaque phase
- Design processus structuré

**4. Comportement spécial**
- Aucune animation particulière
- Section informative statique

**5. Bugs connus**
- Aucun bug identifié
- Workaround : N/A

**6. Suggestions contenu (3-5 exemples)**
Suggestions titre :

"Ma Méthode"
"Mon Processus"
"Comment je vous accompagne"
"Les étapes de l'accompagnement"
"Ma démarche coaching"

Suggestions étapes processus :

"1. Écoute active - Comprendre votre situation et vos besoins - 30 min"
"2. Définition objectifs - Clarifier vos aspirations - 1h"  
"3. Plan d'action - Co-construire votre stratégie - 1h"
"4. Accompagnement - Suivi régulier et ajustements - Sur mesure"

Ou approche thérapeutique :

"1. Accueil bienveillant - Créer un espace de confiance - 30 min"
"2. Exploration profonde - Identifier les blocages - 1h"
"3. Libération émotionnelle - Techniques de transformation - 1h"
"4. Intégration durable - Ancrage des changements - Sur mesure"

**7. Instructions session live**
"Décrivez-moi votre méthode de travail. Comment se déroule un accompagnement type avec vous ? Quelles sont les grandes étapes ? Combien de temps dure chaque phase ? Avez-vous des outils spécifiques que vous utilisez ?"

---

## SECTION 5 : DOMAINS (Mes Domaines)

**1. Identification**
- ID exact : `domains`
- Position : 5 (spécialisations)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `sectionTitle` (string) - Optionnel - "Mes Domaines d'Accompagnement" - Titre
- `sectionSubtitle` (string) - Optionnel - "Accompagnements adaptés" - Sous-titre
- `items` (array) - Requis - Tableau des domaines avec icon, titre, description

**3. Éléments visuels**
- Grille de 4 cartes en ligne
- Chaque domaine avec icône, titre, description
- Layout responsive et équilibré

**4. Comportement spécial**
- Aucun comportement particulier
- Section statique informative

**5. Bugs connus**
- Aucun bug identifié
- Workaround : N/A

**6. Suggestions contenu (3-5 exemples)**
Suggestions domaines coaching professionnel :

"💼 Coaching professionnel - Orientation, reconversion, leadership"
"🎯 Atteinte d'objectifs - Projets de vie, ambitions, réalisations"
"⚖️ Équilibre vie pro/perso - Harmonie, priorités, bien-être"
"💪 Confiance en soi - Estime, affirmation, authenticité"

Suggestions domaines thérapie holistique :

"🌱 Développement personnel - Épanouissement, croissance intérieure"
"💚 Gestion émotionnelle - Stress, anxiété, colère, tristesse"
"🧘‍♀️ Bien-être global - Corps, esprit, énergies"
"❤️ Relations humaines - Communication, couple, famille"

Suggestions domaines coaching de vie :

"🏠 Transitions de vie - Déménagement, séparation, deuil"
"👨‍👩‍👧‍👦 Vie de famille - Parentalité, éducation, équilibre"
"🎨 Créativité - Expression, talents, passion, reconversion artistique"
"🧠 Développement personnel - Confiance, estime de soi, potentiel"

**7. Instructions session live**
"Quels sont vos principaux domaines d'expertise ? Dans quels domaines de la vie accompagnez-vous vos clients ? Avez-vous des spécialisations particulières ? Pouvez-vous me donner 3-4 domaines principaux avec une phrase descriptive pour chacun ?"

---

## SECTION 6 : SERVICES (Mes Formules)

**1. Identification**
- ID exact : `services`
- Position : 6 (offres et tarifs)
- Statut éditabilité : ⚠️ Partiel

**2. Props nécessaires (si éditable)**
- Section utilise données codées en dur
- Modification nécessite intervention technique

**3. Éléments visuels**
- 3 formules en cartes (Découverte, Accompagnement, Transformation)
- Prix, durée, liste des inclus
- Mise en avant formule recommandée

**4. Comportement spécial**
- Aucun lien ou action particulière
- Section informative statique

**5. Bugs connus**
- Contenu non éditable en live
- Workaround : Modifier le texte manuellement avec le client

**6. Suggestions contenu (3-5 exemples)**
Suggestions formules coaching :

"🔍 Découverte - Séance d'exploration 1h - 80€"
"🎯 Accompagnement - Programme 5 séances - 350€"
"🚀 Transformation - Accompagnement 3 mois - 650€"

Suggestions formules thérapie :

"🌱 Séance Découverte - Première rencontre 1h - 70€"
"💚 Suivi Thérapeutique - 8 séances personnalisées - 480€"
"🌟 Transformation Profonde - Programme 6 mois - 800€"

Suggestions inclus coaching :

"✓ Séance individuelle ✓ Bilan de situation ✓ Premiers axes"
"✓ Plan d'action personnalisé ✓ Suivi entre séances ✓ Exercices pratiques"
"✓ Accompagnement complet ✓ Ressources exclusives ✓ Bilan final"

**7. Instructions session live**
"Cette section montre vos formules d'accompagnement. Nous modifierons les prix et descriptions selon vos offres réelles. Quelles sont vos 2-3 formules principales ? Quels sont vos tarifs ? Qu'est-ce qui est inclus dans chaque formule ?"

---

## SECTION 7 : CERTIFICATIONS (Mes Formations)

**1. Identification**
- ID exact : `certifications`
- Position : 7 (diplômes et formations)
- Statut éditabilité : ⚠️ Partiel

**2. Props nécessaires (si éditable)**
- `title` (string) - Optionnel - "Formations & Certifications" - Titre
- `description` (string) - Optionnel - Texte descriptif

**3. Éléments visuels**
- Placeholder pour timeline formations
- Zone de texte description
- Design en attente de développement complet

**4. Comportement spécial**
- Section en cours de développement
- Affichage placeholder par défaut

**5. Bugs connus**
- Section non complètement développée
- Workaround : Utiliser section About pour mentionner formations

**6. Suggestions contenu (3-5 exemples)**
Suggestions formations coaching :

"📚 Certification Coach ICF - Niveau ACC - 2020"
"🧠 Formation PNL - Praticien certifié - 2021" 
"📖 Spécialisation CNV - Communication Non Violente - 2022"
"🎓 Master en Psychologie - Université Paris V - 2018"

Suggestions formations thérapie :

"🌟 Praticien Reiki - Niveau Maître - 2019"
"🧘‍♀️ Formation Mindfulness - Jon Kabat-Zinn - 2020"
"💚 Thérapie Holistique - École Européenne - 2021"
"📚 DU Psychologie Positive - Université Grenoble - 2022"

**7. Instructions session live**
"Cette section montrera vos formations principales. Pour l'instant elle est en développement. Nous pouvons mentionner vos certifications dans la section À Propos. Quelles sont vos principales formations et certifications ?"

---

## SECTION 8 : TESTIMONIALS (Témoignages)

**1. Identification**
- ID exact : `testimonials`
- Position : 8 (social proof)
- Statut éditabilité : ❌ Non éditable

**2. Props nécessaires (si éditable)**
- Section en développement
- Pas de props configurables actuellement

**3. Éléments visuels**
- Placeholder "Section témoignages à venir"
- Design en attente

**4. Comportement spécial**
- Section non fonctionnelle
- Affichage placeholder uniquement

**5. Bugs connus**
- Section non développée
- Workaround : Mentionner témoignages dans section About ou en verbal

**6. Suggestions contenu (3-5 exemples)**
Suggestions témoignages coaching :

"Grâce à Marie, j'ai trouvé ma voie professionnelle. Son accompagnement bienveillant m'a permis de révéler mes talents cachés. - Sophie, 35 ans"

"Un coaching qui a transformé ma vie. Alexandre m'a aidé à reprendre confiance et à oser mes rêves. Résultats visibles dès les premières séances. - Thomas, 42 ans"

"Approche humaine et professionnelle remarquable. Camille a su m'accompagner dans ma transition de carrière avec douceur et efficacité. - Julie, 39 ans"

**7. Instructions session live**
"Cette section témoignages est en cours de développement sur le site. Nous pourrons inclure vos témoignages clients dans une version future. Avez-vous des retours clients que vous aimeriez partager lors de nos échanges ?"

---

## SECTION 9 : FAQ (Questions Fréquentes)

**1. Identification**
- ID exact : `faq`
- Position : 9 (réponses aux objections)
- Statut éditabilité : ⚠️ Partiel

**2. Props nécessaires (si éditable)**
- Section utilise contenu codé en dur
- Modification nécessite intervention technique

**3. Éléments visuels**
- 4 questions/réponses expandables
- Format accordéon classique
- Questions spécifiques coaching

**4. Comportement spécial**
- Clic pour déplier/replier réponses
- Animation smooth d'ouverture

**5. Bugs connus**
- Contenu FAQ non éditable en live
- Workaround : Adapter les questions avec le client manuellement

**6. Suggestions contenu (3-5 exemples)**
Suggestions FAQ coaching :

"❓ Qu'est-ce que le coaching ?"
"❓ Combien de séances sont nécessaires ?"
"❓ Les séances sont-elles confidentielles ?"
"❓ Comment se déroulent les séances ?"

Suggestions FAQ thérapie :

"❓ Quelle est la différence avec la psychothérapie ?"
"❓ À partir de quel âge peut-on consulter ?"
"❓ Faut-il parler de problèmes précis ?"
"❓ Les séances sont-elles remboursées ?"

Suggestions réponses type :

"Le coaching vous aide à atteindre vos objectifs en développant vos ressources internes. Ce n'est ni de la thérapie, ni du conseil, mais un partenariat pour révéler votre potentiel."

"Cela dépend de vos objectifs. Une séance peut suffire pour un déclic, mais 5-10 séances sont généralement optimales pour un changement durable."

**7. Instructions session live**
"Voici les questions que vos futurs clients posent souvent. Nous adapterons ces réponses à votre pratique. Quelles sont les 3-4 questions qu'on vous pose le plus souvent ? Comment répondez-vous à ces interrogations ?"

---

## SECTION 10 : BOOKING (Prendre RDV)

**1. Identification**
- ID exact : `booking`
- Position : 10 (conversion principale)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `title` (string) - Optionnel - "Prendre Rendez-vous" - Titre section
- `subtitle` (string) - Optionnel - "Réservez votre séance découverte" - Sous-titre
- `phone` (string) - Optionnel - "06 12 34 56 78" - Numéro de téléphone

**3. Éléments visuels**
- Titre d'appel à l'action
- Placeholder widget Cal.com
- Numéro de téléphone alternatif
- Design centré et engageant

**4. Comportement spécial**
- Integration Cal.com à configurer
- Lien direct section depuis hero
- Anchor ID pour navigation

**5. Bugs connus**
- Widget calendrier non configuré par défaut
- Workaround : Donner coordonnées directes en attendant setup Cal.com

**6. Suggestions contenu (3-5 exemples)**
Suggestions titre booking :

"Prendre Rendez-vous"
"Réserver ma séance découverte"
"Commencer mon accompagnement"
"Planifier notre première rencontre"
"Réserver un appel gratuit"

Suggestions sous-titre :

"📅 Réservez votre séance découverte gratuite de 30 minutes"
"🎯 Premier échange gratuit pour définir vos besoins"
"💚 Rencontre préalable sans engagement - 30 min offertes"
"🌟 Séance découverte gratuite pour faire connaissance"

Suggestions téléphone :

"📞 Ou contactez-moi directement : 06 12 34 56 78"
"📱 Appelez-moi : 07 89 12 34 56"
"☎️ Par téléphone : 01 23 45 67 89"

**7. Instructions session live**
"Cette section permet à vos clients de prendre rendez-vous. Nous configurerons votre système de réservation Cal.com après la livraison. Pour l'instant, quel est votre numéro de téléphone ? Proposez-vous une première rencontre gratuite ?"

---

## SECTION 11 : CONTACT (Me Contacter)

**1. Identification**
- ID exact : `contact`
- Position : 11 (contact alternatif)
- Statut éditabilité : ✅ Éditable live

**2. Props nécessaires (si éditable)**
- `title` (string) - Optionnel - "Me Contacter" - Titre
- `subtitle` (string) - Optionnel - "Une question ? N'hésitez pas" - Sous-titre
- `ctaText` (string) - Optionnel - "Envoyer" - Texte bouton

**3. Éléments visuels**
- Formulaire de contact classique
- Champs nom, email, message
- Bouton d'envoi personnalisable
- Option affichage téléphone

**4. Comportement spécial**
- Soumission formulaire (console.log actuellement)
- Validation côté client
- Affichage conditionnel téléphone

**5. Bugs connus**
- Formulaire non connecté à un service d'email
- Workaround : Récupérer les coordonnées manuellement

**6. Suggestions contenu (3-5 exemples)**
Suggestions titre contact :

"Me Contacter"
"Posez-moi vos questions"
"Discutons de votre projet"
"Écrivez-moi"
"Parlons ensemble"

Suggestions sous-titre :

"Une question ? N'hésitez pas à m'écrire"
"Je vous réponds sous 24h"
"Décrivez-moi votre situation et vos besoins"
"Racontez-moi votre projet d'accompagnement"

Suggestions CTA :

"Envoyer"
"Envoyer ma demande"
"Me contacter"
"Poser ma question"

**7. Instructions session live**
"Voici un formulaire de contact pour les personnes qui préfèrent écrire. Le formulaire sera connecté à votre email après livraison. En attendant, les messages apparaîtront dans la console. Quel message souhaitez-vous pour encourager le contact ?"

---

## SECTION 12 : FOOTER (Pied de page)

**1. Identification**
- ID exact : `footer`
- Position : 12 (fermeture)
- Statut éditabilité : ⚠️ Partiel

**2. Props nécessaires (si éditable)**
- Texte codé en dur actuellement
- Modification manuelle nécessaire

**3. Éléments visuels**
- Copyright avec nom coach
- Mention certifications
- Design minimaliste

**4. Comportement spécial**
- Aucun comportement particulier
- Section statique

**5. Bugs connus**
- Texte non éditable via configurateur
- Workaround : Modification manuelle du nom

**6. Suggestions contenu (3-5 exemples)**
Suggestions footer coaching :

"© 2025 Marie Dubois - Coach Professionnelle Certifiée ICF"
"© 2025 Alexandre Martin - Coach en Développement Personnel"
"© 2025 Sophie Laurent - Thérapeute Holistique Certifiée"
"© 2025 Thomas Leroy - Accompagnement & Coaching de Vie"
"© 2025 Camille Rousseau - Coach Bien-être et Épanouissement"

**7. Instructions session live**
"Le pied de page affichera vos informations légales. Nous personnaliserons avec votre nom complet et vos principales certifications. Quel est votre nom complet et titre professionnel ?"

---

## 📝 RÉSUMÉ POUR SESSION CLIENT

### **Sections à configurer en priorité :**
1. **HERO** → Personnaliser titre, sous-titre, description
2. **ABOUT** → Ajouter photo et parcours personnel 
3. **DOMAINS** → Définir 4 spécialisations principales
4. **BOOKING** → Configurer téléphone et message RDV
5. **CONTACT** → Personnaliser messages de contact

### **Sections techniques (post-livraison) :**
- **SERVICES** → Adapter formules et tarifs
- **FAQ** → Modifier questions/réponses
- **BOOKING** → Intégrer Cal.com
- **TESTIMONIALS** → Développement à venir

### **Questions clés à poser au client :**
1. Nom complet et certifications ?
2. Spécialisations principales (4 domaines) ?
3. Votre approche/méthode en 4 étapes ?
4. Photo professionnelle disponible ?
5. Téléphone et email de contact ?
6. Première séance gratuite proposée ?
7. Message principal pour clients potentiels ?

---

**📋 Ce guide couvre les 12 sections du template Coach FSVB Studio.**
**✅ Prêt pour utilisation en session client coaching/thérapie.**