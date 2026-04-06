# Audit complet du site FSVB Studio

- Date : 2026-04-06
- Application auditée : `fsvb-studio-portfolio/portfolio-app`
- Base de mesure performance : build de production locale sur `http://127.0.0.1:4174/`
- Méthode : lecture du code, build production, Lighthouse sur pages publiques, contrôle des parcours sensibles

## 1. Résumé décisionnel

### Verdict global

Le site est **présentable et exploitable**, mais il n'est **pas encore solide sur tous les parcours**.

En bref :

- la partie vitrine publique est globalement correcte
- les performances sont **moyennes à bonnes**, mais pénalisées par un bundle trop lourd
- le référencement est **insuffisant** à ce stade
- certains parcours métier ont de vrais risques de confiance ou de perte de lead
- le configurateur concentre l'essentiel de la dette technique

### Niveau de priorité

1. **Priorité haute**
   corriger les parcours de conversion et de confiance
2. **Priorité moyenne**
   alléger l'application et améliorer le SEO
3. **Priorité continue**
   réduire la dette technique du configurateur et des formulaires

## 2. Périmètre audité

### Pages auditées en runtime

- `/`
- `/solutions`
- `/configurator`
- `/about`
- `/contact`
- `/templates/landing-solo`
- `/templates/restaurant`
- `/templates/coach`
- `/admin/login`

### Parcours revus surtout par lecture du code

- `/confirmation`
- `/order/:id`
- `/form/:templateType`
- `/form/:templateType/:sessionId`
- `/configurator/session/:sessionId`
- `/admin/dashboard`

### Limites connues

- pas de session réelle d'administration fournie
- pas de commande réelle fournie pour `/order/:id`
- pas de session réelle fournie pour les formulaires pré-session

## 2bis. Définitions utiles

Cette section garde le jargon technique, mais l'explique simplement.

### Bundle

Un **bundle** est le paquet final de fichiers envoyé au navigateur.

Il contient surtout :

- du **JS**
- du **CSS**
- parfois des images, polices ou ressources liées

Quand le bundle est trop lourd, le site charge plus de données que nécessaire, ce qui pénalise la vitesse perçue.

### Build

La **build** est la version du site préparée pour la mise en ligne.

En pratique :

- en développement, le site est lancé dans un mode pratique pour travailler
- en build, le code est assemblé, optimisé et prêt pour la production

### JS

**JS** signifie **JavaScript**.

C'est le langage qui gère le comportement de la page :

- clics
- formulaires
- affichage dynamique
- logique métier côté navigateur

### CSS

**CSS** est le langage qui gère la présentation visuelle :

- couleurs
- typographie
- espacements
- disposition des blocs
- adaptation mobile

### Lighthouse

**Lighthouse** est un outil d'audit automatique, utilisé ici pour mesurer :

- la performance
- l'accessibilité
- les bonnes pratiques
- le SEO

Il donne des scores, mais aussi des indices concrets sur ce qui ralentit ou fragilise une page.

### SEO

**SEO** signifie **Search Engine Optimization**, soit l'optimisation pour les moteurs de recherche.

L'objectif est que Google comprenne bien :

- le sujet de chaque page
- sa structure
- son intérêt pour un visiteur

Le SEO dépend notamment :

- du titre de page
- de la meta description
- de la structure des contenus
- de la vitesse du site

### FCP

**FCP** signifie **First Contentful Paint**.

Cela mesure le moment où le premier contenu visible apparaît à l'écran.

Lecture simple :

- plus le FCP est bas, plus l'utilisateur voit vite quelque chose

### LCP

**LCP** signifie **Largest Contentful Paint**.

Cela mesure le moment où le contenu principal visible de la page est réellement affiché.

Lecture simple :

- plus le LCP est bas, plus la page semble prête rapidement

### TBT

**TBT** signifie **Total Blocking Time**.

Cela mesure le temps pendant lequel la page est occupée et répond mal, parce que le navigateur traite trop de travail d'un coup.

Lecture simple :

- plus le TBT est bas, plus la page reste réactive

### CLS

**CLS** signifie **Cumulative Layout Shift**.

Cela mesure les déplacements visuels inattendus pendant le chargement.

Lecture simple :

- plus le CLS est bas, plus la page est stable
- un CLS élevé donne l'impression que les blocs bougent tout seuls

### "Le champ email n'utilise pas la même clé de donnée"

Une **clé de donnée** est le nom utilisé dans le code pour stocker ou relire une information.

Exemple :

- un morceau du code écrit `email`
- un autre morceau du code cherche `clientEmail`

Conséquence :

- l'utilisateur a bien saisi son email
- mais une autre partie du système peut croire qu'il est absent

### "Le formulaire dépend du chargement client de Crisp"

Cela signifie que le navigateur du visiteur doit charger le script Crisp côté client avant que l'envoi fonctionne correctement.

Le risque est simple :

- si Crisp ne charge pas
- si le script est bloqué
- si la connexion est lente

alors le formulaire peut échouer ou devenir peu fiable.

### "Le configurateur porte trop de responsabilités dans un seul écran"

Cela signifie qu'une même page gère trop de rôles différents à la fois.

Dans ce projet, le configurateur semble centraliser :

- l'édition du contenu
- la prévisualisation
- les sessions collaboratives
- l'import/export
- la validation
- la commande

Conséquence :

- page plus difficile à comprendre
- maintenance plus coûteuse
- risque de régression plus élevé

## 3. Tableau performance par page

Scores Lighthouse en production locale, profil mobile.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Accueil | 82 | 98 | 100 | 83 | 3.02 s | 3.96 s | 17 ms | 0.011 |
| Solutions | 83 | 98 | 100 | 83 | 3.01 s | 3.81 s | 6 ms | 0.003 |
| Configurateur | 74 | 94 | 100 | 83 | 3.01 s | 5.38 s | 96 ms | 0.017 |
| À propos | 75 | 98 | 100 | 83 | 3.01 s | 5.26 s | 0 ms | 0.000 |
| Contact | 83 | 98 | 100 | 82 | 3.01 s | 3.80 s | 1 ms | 0.001 |
| Template landing-solo | 74 | 92 | 100 | 83 | 3.01 s | 5.67 s | 42 ms | 0.013 |
| Template restaurant | 83 | 94 | 100 | 83 | 3.01 s | 3.89 s | 34 ms | 0.012 |
| Template coach | 78 | 98 | 100 | 83 | 3.01 s | 4.25 s | 34 ms | 0.084 |
| Admin login | 83 | 88 | 100 | 82 | 3.01 s | 3.80 s | 5 ms | 0.001 |

### Lecture simple

- **Bon niveau** : accueil, solutions, contact, restaurant, admin login
- **Niveau moyen** : configurateur, about, landing-solo, coach
- **Point le plus fragile** : configurateur et template landing-solo, surtout à cause du poids chargé et du LCP

## 4. Constats confirmés

### 4.1 Conversion et confiance

#### C1. Bug confirmé sur le formulaire pré-session landing-solo

Le champ email n'utilise pas la même clé de donnée selon les endroits du code.

Conséquence :

- l'utilisateur peut remplir le champ visible
- la validation peut considérer que l'email manque
- l'enregistrement peut partir avec une valeur vide ou incohérente

Preuves :

- validation sur `clientEmail`
- sauvegarde sur `responses.clientEmail`
- champ visible principal lié à `responses.email`

Impact :

- **élevé**
- risque direct de formulaire incomplet ou bloqué sur un parcours de vente

#### C2. La page de confirmation peut afficher un succès sans vraie vérification serveur

La page `/confirmation` se base sur :

- les paramètres d'URL
- `localStorage`

Elle affiche ensuite un message de paiement confirmé ou de commande validée.

Conséquence :

- une confirmation peut être affichée même sans preuve fraîche côté serveur
- cela crée un risque de confusion, de faux positif et de perte de confiance

Impact :

- **élevé**
- sujet métier et image de marque

#### C3. Le formulaire de contact dépend du chargement client de Crisp

Si Crisp n'est pas disponible :

- le message n'est pas stocké côté serveur
- le fallback actuel est un `console.log`
- le lead peut être perdu

Conséquence :

- formulaire non fiable en cas de blocage script, mauvaise connexion ou outil de protection navigateur

Impact :

- **élevé**
- risque direct de perte de prospect

### 4.2 Performance et structure

#### C4. Le site charge trop de code pour des pages simples

La build produit :

- un JS principal de **945.62 kB**
- un CSS principal de **210.81 kB**

Lighthouse confirme aussi un volume non utilisé important :

- **142 à 183 KiB de JavaScript inutilisé** selon les pages
- **23 à 31 KiB de CSS inutilisé**

Cause probable confirmée par la structure :

- de nombreuses pages lourdes sont importées directement dans `App.tsx`
- pas de chargement différé par route pour le configurateur, les templates et l'admin

Impact :

- **élevé** sur le temps d'affichage perçu
- pénalise surtout le configurateur et landing-solo

#### C5. Le LCP reste trop haut sur plusieurs pages clés

Pages les plus touchées :

- configurateur : **5.38 s**
- about : **5.26 s**
- template landing-solo : **5.67 s**
- template coach : **4.25 s**

Lecture :

- la page devient visible assez vite
- mais l'élément principal perçu comme "chargé" arrive trop tard

Impact :

- **moyen à élevé**
- nuit à la sensation de qualité et peut faire décrocher sur mobile

### 4.3 SEO et contenu technique

#### C6. Les pages n'ont pas de meta description

Lighthouse le remonte sur toutes les pages contrôlées.

Conséquence :

- extraits Google moins propres
- message marketing moins maîtrisé
- scores SEO bloqués autour de **82-83**

Impact :

- **moyen**
- faible effort, gain rapide

#### C7. Le titre de page est statique

Le `index.html` définit un seul titre global.

Aucune logique de titre par page n'a été relevée dans le code.

Conséquence :

- pages moins distinctes pour le SEO
- onglets navigateur moins clairs

Impact :

- **moyen**

### 4.4 Accessibilité

#### C8. Des problèmes de contraste sont confirmés sur certaines zones

Lighthouse remonte un contraste insuffisant sur :

- `/configurator`
- `/templates/landing-solo`
- `/admin/login`

Conséquence :

- lecture plus difficile
- accessibilité dégradée pour certains utilisateurs

Impact :

- **moyen**

### 4.5 Qualité technique

#### C9. La dette technique est élevée autour du configurateur et des formulaires

Le lint remonte :

- **220 problèmes**
- dont **197 erreurs**

Le gros du volume se concentre sur :

- `ConfiguratorPage.tsx`
- `ConfigurationCaptureModalAdaptive.tsx`
- `FormulairePréSession.tsx`
- composants de paiement et de preview

Conséquence :

- code plus fragile
- corrections plus coûteuses
- risque de régression sur les parcours métier

Impact :

- **moyen à élevé**

## 5. Hypothèses probables

### H1. Le configurateur porte trop de responsabilités dans un seul écran

Probable, car :

- fichier très volumineux
- nombreux états et effets
- logique métier, preview, import/export, sessions et commandes au même endroit

Effet attendu :

- maintenance lente
- bugs plus difficiles à isoler

### H2. La stratégie de chargement globale pénalise toute la vitrine

Probable, car :

- le routeur importe d'emblée des zones qui ne servent pas à toutes les pages
- le poids de la build est élevé pour un site vitrine

## 6. Points à vérifier avec de vraies données

- dashboard admin après authentification réelle
- page de commande `/order/:id` avec une commande existante
- formulaire pré-session complet avec enregistrement réel dans Supabase
- parcours paiement réel de bout en bout
- session collaborative `/configurator/session/:sessionId`

## 7. Plan de correction cohérent

### Lot 1. Sécuriser les parcours métier

Objectif :
fiabiliser ce qui touche à la confiance et à la conversion.

Actions :

1. corriger le mapping email du formulaire pré-session
2. faire vérifier la confirmation de commande côté serveur ou via récupération sûre de la commande
3. brancher le formulaire contact sur une vraie persistance ou un envoi backend fiable
4. garder Crisp comme canal d'échange, mais pas comme point unique de réception

### Lot 2. Alléger l'application

Objectif :
améliorer les performances sans casser la cohérence produit.

Actions :

1. passer les grosses routes en chargement différé
2. isoler `configurator`, `admin`, `templates` et `order` en chunks séparés
3. réduire les styles globaux non utilisés
4. optimiser ou précharger les médias héros réellement visibles

### Lot 3. Relever le niveau SEO

Objectif :
donner à chaque page un rôle clair pour Google et pour l'utilisateur.

Actions :

1. ajouter une meta description par page
2. ajouter un titre par page
3. définir un socle SEO commun : title, description, canonical, partage social
4. prioriser les pages business : accueil, solutions, templates, contact

### Lot 4. Corriger l'accessibilité visible

Objectif :
uniformiser la lisibilité.

Actions :

1. corriger les contrastes faibles dans le configurateur, landing-solo et admin login
2. figer une palette de texte et d'arrière-plan qui reste conforme partout
3. vérifier les états focus et les textes secondaires

### Lot 5. Réduire la dette technique

Objectif :
rendre les prochaines corrections plus simples et plus sûres.

Actions :

1. découper le configurateur en sous-modules métier
2. typer les objets aujourd'hui en `any`
3. traiter les `useEffect` fragiles et dépendances manquantes
4. ajouter quelques tests ciblés sur les parcours critiques

## 8. Priorisation finale

### À faire tout de suite

- corriger le bug email du formulaire pré-session
- fiabiliser la page de confirmation
- sécuriser le formulaire contact

### À faire juste après

- chargement différé par route
- titres et meta descriptions par page
- correction des contrastes

### À faire ensuite

- refactor du configurateur
- traitement progressif de la dette lint/type
- tests de parcours réels avec données valides

## 9. Conclusion simple

Le site donne déjà une base crédible, mais il reste **trop fragile sur certains parcours qui comptent pour le business**.

Le point important n'est pas de tout refaire.

La stratégie la plus cohérente est :

1. **fiabiliser la conversion**
2. **alléger le chargement**
3. **poser un vrai socle SEO**
4. **stabiliser le configurateur**

Avec ces 4 axes, on améliore en même temps :

- la confiance utilisateur
- la vitesse perçue
- la visibilité SEO
- la maintenabilité

## 10. Preuves principales

- rapports Lighthouse JSON dans `reports/evidence/`
- build production locale validée
- vérification lint réalisée
- lecture ciblée du code sur les parcours critiques
