# Plan 3 lots code source

## Lot 1 - Fiabilite immediate

### Objectif

Securiser ce qui engage directement la confiance du client.

### A traiter

- corriger l'incoherence email du pre-session
- rendre le contact fiable meme sans Crisp
- fiabiliser la confirmation de commande
- sortir la validation finale du paiement du navigateur
- fermer les policies SQL les plus ouvertes

### Pourquoi ce lot passe en premier

Parce qu'il touche directement :

- la prise de contact
- la confiance apres commande
- la validite du paiement
- la confidentialite minimale attendue

### Methode de resolution pas a pas

1. figer les flux critiques a traiter et les fichiers cibles
2. remettre une seule source de verite sur chaque flux
3. faire verifier les statuts sensibles hors navigateur
4. refermer les acces SQL trop larges
5. rejouer les cas nominaux et les cas d'erreur

### Bonnes pratiques visees dans ce lot

- source de confiance cote serveur
- droits limites au strict besoin
- messages de succes seulement apres verification reelle
- reduction des dependances a un script tiers pour un besoin metier critique

### Resultat attendu

- moins de risque de perte de lead
- moins de faux succes
- moins de risque de statut paiement invalide
- base plus rassurante pour continuer

## Lot 2 - Stabilisation du socle

### Objectif

Redonner de la marge a l'equipe pour corriger sans casser.

### A traiter

- renforcer l'acces admin avec un vrai controle de role
- assainir configuration, valeurs en dur et identifiants tiers
- reduire les logs sensibles cote navigateur
- reduire les `any` et warnings critiques
- reprendre les types partages
- ajouter les premiers tests automatises
- reduire les donnees sensibles laissees dans le navigateur

### Pourquoi ce lot vient ensuite

Une fois la confiance minimale retablie, il faut rendre le terrain technique plus sain.

Sinon :

- chaque correction restera risquee
- le configurateur continuera a freiner tout le monde
- la dette technique mangera les prochains lots

### Methode de resolution pas a pas

1. traiter d'abord les types utilises partout
2. nettoyer configuration, valeurs en dur et logs sensibles
3. corriger les alertes lint des parcours business
4. installer un petit socle de tests utile tout de suite
5. clarifier le role admin et les controles associes
6. supprimer ce qui reste inutilement stocke cote navigateur

### Bonnes pratiques visees dans ce lot

- contrats de donnees plus stricts
- gestion d'etat plus previsible
- prevention des regressions
- meilleur cloisonnement entre acces utilisateur et acces admin
- configuration plus lisible
- moins d'exposition inutile dans le navigateur

### Resultat attendu

- code plus lisible
- risque de regression plus faible
- meilleure capacite a livrer vite ensuite

## Lot 3 - Montee en qualite

### Objectif

Ameliorer la qualite percue, la vitesse et la visibilite du site.

### A traiter

- chargement differe des grosses routes
- police et medias plus legers
- SEO par page
- accessibilite visible
- harmonisation design system
- reprise du socle front
- reprise de la coherence visuelle et de l'integration
- cadrage de gouvernance du front

### Pourquoi ce lot vient en troisieme

Parce qu'il sera bien plus rentable une fois les flux critiques et la dette la plus risquee deja traites.

### Methode de resolution pas a pas

1. decouper le chargement des routes lourdes
2. supprimer les couts reseau evitables
3. figer les tokens et retirer les overrides inutiles
4. reprendre les alignements, centrages et ecarts visuels
5. poser les metadonnees page par page
6. corriger les points d'accessibilite les plus visibles
7. harmoniser les styles et les tokens

### Bonnes pratiques visees dans ce lot

- performance par defaut
- semantique et accessibilite coherentes
- SEO technique de base
- coherence du systeme de design
- source de verite unique pour le front
- meilleure gouvernance des composants et styles

### Resultat attendu

- site plus rapide
- base SEO plus propre
- experience plus homogene
- sensation de produit plus abouti

## Lecture tech lead du plan

### Ce plan respecte une logique saine

- d'abord la confiance
- ensuite la stabilite
- enfin la montee en qualite

### Ce que ce plan ajoute desormais

- la qualite du code ne se limite plus aux bugs fonctionnels
- la configuration, les valeurs en dur, les logs sensibles et la coherence front entrent maintenant dans le pilotage

### Ce qu'il faut eviter

- lancer un gros refactor avant d'avoir ferme les risques paiement et securite
- viser le zero dette partout avant d'avoir protege les flux critiques
- traiter la performance visuelle avant la fiabilite metier

## Ordre conseille

1. lot 1 sans attendre
2. lot 2 juste apres pour stabiliser
3. lot 3 ensuite pour faire monter le niveau global

## Idee simple a garder

Le projet n'a pas besoin d'une refonte.

Il a surtout besoin de faire les bonnes corrections dans le bon ordre, avec plus de rigueur sur les bonnes pratiques de developpement.
