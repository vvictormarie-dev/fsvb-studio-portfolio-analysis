# Plan des 3 prochains lots avec guide simple

## Lot 1 - Critique

### Objectif

Securiser ce qui touche directement a la confiance, au contact et a la commande.

### A traiter

- corriger le bug email du formulaire pre-session
- fiabiliser la page de confirmation apres commande
- rendre le formulaire contact fiable meme si Crisp ne charge pas
- verifier les points de securite les plus sensibles autour des commandes et des donnees

### Pourquoi ce lot passe en premier

Parce qu'il touche directement a la confiance.
Si ces points ne sont pas corriges, on peut :

- perdre une demande client
- afficher une mauvaise confirmation
- laisser un comportement trop fragile autour du paiement

### Comment aborder ce lot pour un dev debutant

1. commencer par reproduire chaque bug
2. noter ce qui est observe et ce qui est attendu
3. corriger un sujet a la fois
4. retester tout de suite apres chaque correction
5. ne pas melanger une correction business et un grand nettoyage de code

### Ordre conseille dans ce lot

1. email pre-session
2. contact
3. confirmation
4. paiement et securite associee

### Resultat attendu

- moins de risque de perte de lead
- moins de faux succes apres commande
- base plus saine pour continuer

## Lot 2 - Stabilisation

### Objectif

Rendre l'application plus robuste en vrai usage.

### A traiter

- valider la configuration Supabase et PayPal
- verifier les parcours reels : commande, pre-session, admin login, page commande
- traiter les zones les plus fragiles du configurateur
- reduire les erreurs techniques les plus visibles dans le lint
- poser quelques tests simples sur les parcours critiques

### Pourquoi ce lot vient juste apres

Une fois les bugs les plus sensibles corriges, il faut securiser le terrain technique.
Sinon les corrections suivantes risquent de casser ailleurs ou de rester en mode "demo".

### Comment aborder ce lot pour un dev debutant

1. verifier d'abord l'environnement
2. tester ensuite les parcours un par un
3. garder une liste claire des erreurs rencontrees
4. corriger les erreurs lint les plus proches du business avant les autres
5. ajouter de petits tests simples, pas une grosse usine

### Ordre conseille dans ce lot

1. variables d'environnement
2. auth Supabase / admin
3. commandes et formulaires
4. erreurs lint critiques
5. tests minimum

### Resultat attendu

- moins de surprises en environnement reel
- equipe dev plus a l'aise pour corriger sans casser ailleurs

## Lot 3 - Amelioration

### Objectif

Ameliorer la qualite percue et la visibilite du site.

### A traiter

- alleger le chargement du site
- separer les grosses routes pour de meilleures performances
- ajouter les bases SEO par page
- corriger les principaux problemes d'accessibilite
- harmoniser la coherence visuelle

### Pourquoi ce lot vient en troisieme

Il est important, mais il sera plus efficace si les parcours business et l'environnement sont deja stables.

### Comment aborder ce lot pour un dev debutant

1. mesurer avant de corriger
2. faire des changements visibles mais limites
3. verifier apres chaque petit lot
4. ne pas traiter performance, SEO, accessibilite et design en meme temps dans le meme commit si possible

### Ordre conseille dans ce lot

1. chargement differe
2. SEO de base
3. accessibilite visible
4. coherence visuelle

### Resultat attendu

- site plus rapide
- meilleure base pour le referencement
- impression plus aboutie

## Ordre conseille

1. faire le lot 1 sans attendre
2. enchainner avec le lot 2 pour stabiliser le terrain
3. lancer le lot 3 ensuite pour monter en qualite

## Idee simple a garder

Le plus important n'est pas de faire beaucoup de choses.
Le plus important est de faire **les bonnes choses dans le bon ordre**.

## Regle simple pour tous les lots

Pour chaque sujet, se poser 3 questions :

1. quel est le probleme visible ?
2. d'ou vient-il exactement dans le code ?
3. comment verifier simplement que la correction marche vraiment ?
