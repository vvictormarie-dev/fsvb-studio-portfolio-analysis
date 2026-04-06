# Backlog dev priorise et guide dev debutant

## Priorite 1

### Corriger l'email du formulaire pre-session

- Impact : eleve
- Pourquoi : peut bloquer ou fausser une demande client
- Fichiers a regarder :
  `src/components/FormulairePréSession.tsx`
- Probleme explique simplement :
  le formulaire n'utilise pas toujours le meme nom de champ pour l'email.
  A un endroit on lit `responses.email`.
  A un autre endroit on lit `responses.clientEmail`.
  Donc l'utilisateur peut remplir un champ visible, mais la sauvegarde ou la validation peut regarder un autre champ.
- Ce qu'il faut verifier :
  le champ affiche, la validation du bouton, la creation de l'objet sauvegarde, puis la lecture/reprise des donnees.
- Etapes conseillees :
  1. choisir une seule cle email pour le template `landing-solo`
  2. remplacer toutes les references incoherentes dans le composant
  3. verifier que le bouton de validation regarde bien cette meme cle
  4. verifier que l'objet envoye au service contient bien cette meme valeur
  5. tester manuellement avec un email rempli puis vide
- Piege a eviter :
  corriger seulement le champ visible sans corriger la sauvegarde
- Definition de fini :
  le meme email est utilise dans le champ, la validation, la sauvegarde et la reprise

### Fiabiliser la confirmation de commande

- Impact : eleve
- Pourquoi : la page ne doit pas afficher un succes sans verification solide
- Fichiers a regarder :
  `src/pages/ConfirmationPage.tsx`
  `src/pages/OrderConfirmationPage.tsx`
  `src/config/supabase.ts`
- Probleme explique simplement :
  aujourd'hui la page de confirmation peut reconstruire l'etat a partir de l'URL et du `localStorage`.
  Donc elle peut afficher un message tres rassurant sans relire une commande verifiee.
- Ce qu'il faut verifier :
  d'ou viennent `paymentId`, `orderNumber`, `pendingOrder` et a quel moment la commande est relue en base.
- Etapes conseillees :
  1. identifier l'id fiable de commande
  2. recharger la commande a partir de cet id
  3. verifier le vrai statut avant d'afficher "commande validee" ou "paiement confirme"
  4. prevoir un etat de chargement
  5. prevoir un etat d'erreur si la commande est absente ou incoherente
- Piege a eviter :
  garder le message final actuel alors que la verification n'est pas encore reelle
- Definition de fini :
  la confirmation repose sur une verification reelle de la commande

### Rendre le formulaire contact fiable sans Crisp

- Impact : eleve
- Pourquoi : un message client ne doit pas etre perdu
- Fichiers a regarder :
  `src/pages/ContactPage.tsx`
  `src/services/crispService.ts`
- Probleme explique simplement :
  aujourd'hui le formulaire essaye surtout d'envoyer vers Crisp.
  Si Crisp n'est pas charge, le fallback actuel ne stocke pas vraiment le message.
- Ce qu'il faut verifier :
  que se passe-t-il si `window.$crisp` est absent, bloque ou lent.
- Etapes conseillees :
  1. choisir un canal fiable principal
     exemple : backend, Supabase, email transactionnel
  2. faire d'abord cet envoi principal
  3. garder Crisp seulement en plus si besoin
  4. afficher un message de succes seulement si l'envoi principal a reussi
  5. afficher un message d'erreur honnete sinon
- Piege a eviter :
  continuer a considerer `console.log` comme un vrai fallback
- Definition de fini :
  le message est stocke ou envoye via un canal fiable, meme sans Crisp

### Verrouiller la logique de paiement cote serveur

- Impact : critique
- Pourquoi : le front ne doit pas pouvoir marquer seul une commande comme payee
- Fichiers a regarder :
  `src/components/OrderValidation.tsx`
  `src/config/supabase.ts`
- Probleme explique simplement :
  une partie de la logique de validation paiement semble encore trop proche du navigateur.
  C'est dangereux, car le navigateur ne doit pas etre la source de confiance finale.
- Ce qu'il faut verifier :
  qui decide vraiment que `payment_status = paid` et sur quelle preuve.
- Etapes conseillees :
  1. trouver le point exact ou le statut passe a `paid`
  2. deplacer cette decision vers un backend ou une Edge Function
  3. verifier le paiement cote serveur
  4. mettre a jour la commande seulement apres cette verification
  5. faire afficher au front le resultat du serveur, pas sa propre supposition
- Piege a eviter :
  ajouter juste une verification supplementaire en front
- Definition de fini :
  le statut de paiement est mis a jour uniquement apres verification serveur

## Priorite 2

### Verifier et stabiliser Supabase

- Impact : eleve
- Pourquoi : plusieurs parcours dependent completement de cette configuration
- Fichiers a regarder :
  `.env`
  `src/config/supabase.ts`
  `src/services/preSessionFormService.ts`
  `src/pages/AdminLogin.tsx`
- Probleme explique simplement :
  plusieurs parcours tombent en mode degrade ou en erreur si Supabase n'est pas pret.
- Etapes conseillees :
  1. verifier les variables d'environnement
  2. verifier que le client Supabase s'initialise bien
  3. tester auth admin
  4. tester insertion commande
  5. tester creation formulaire pre-session
  6. noter les erreurs exactes une par une
- Definition de fini :
  auth, commandes, formulaires et policies sont verifies

### Revoir les acces sensibles et les policies

- Impact : eleve
- Pourquoi : certaines lectures ou ressources peuvent etre trop ouvertes
- Fichiers a regarder :
  `sql/`
  `src/pages/OrderConfirmationPage.tsx`
  `src/services/sessionService.ts`
  `src/config/supabase.ts`
- Probleme explique simplement :
  certaines routes ou policies semblent pouvoir laisser lire trop d'informations si elles sont deployees telles quelles.
- Etapes conseillees :
  1. lister les tables et buckets sensibles
  2. verifier les policies de lecture/ecriture une par une
  3. chercher les cas du type `USING (true)` ou acces trop large
  4. verifier comment les URLs de commande et de session sont construites
  5. fermer d'abord ce qui est public sans raison forte
- Definition de fini :
  commandes, sessions et fichiers sensibles ne sont plus exposes trop largement

### Reduire les erreurs techniques du configurateur et des formulaires

- Impact : moyen a eleve
- Pourquoi : la dette technique ralentit toutes les corrections
- Fichiers a regarder :
  `src/pages/ConfiguratorPage.tsx`
  `src/components/ConfigurationCaptureModalAdaptive.tsx`
  `src/components/FormulairePréSession.tsx`
- Probleme explique simplement :
  ces fichiers concentrent beaucoup d'erreurs lint et de logique.
  Plus ils restent fragiles, plus chaque correction devient risquee.
- Etapes conseillees :
  1. traiter d'abord les `any` lies aux donnees critiques
  2. traiter ensuite les warnings `useEffect`
  3. refaire passer le lint regulierement
  4. ne pas vouloir tout nettoyer d'un seul coup
- Piege a eviter :
  lancer un grand refactor sans tests minimum
- Definition de fini :
  baisse nette des erreurs lint sur les composants critiques

### Ajouter quelques tests sur les parcours critiques

- Impact : moyen a eleve
- Pourquoi : eviter les regressions sur les zones business
- Probleme explique simplement :
  ces parcours cassent facilement car ils melangent interface, donnees et etat.
- Etapes conseillees :
  1. choisir 3 cas minimum : pre-session, confirmation, contact
  2. ecrire un test nominal par parcours
  3. ecrire un test d'erreur par parcours
  4. garder les tests simples et lisibles
- Definition de fini :
  tests minimum sur pre-session, confirmation et contact

## Priorite 3

### Passer les grosses routes en chargement differe

- Impact : moyen a eleve
- Pourquoi : le site charge trop de code des l'ouverture
- Fichiers a regarder :
  `src/App.tsx`
- Probleme explique simplement :
  beaucoup de grosses pages sont importees tout de suite, meme quand l'utilisateur n'en a pas besoin.
- Etapes conseillees :
  1. identifier les plus grosses pages
  2. passer ces imports en lazy loading
  3. ajouter un fallback simple pendant le chargement
  4. refaire un build et relire Lighthouse
- Definition de fini :
  configurateur, admin, templates et pages lourdes sont separes

### Ajouter les bases SEO par page

- Impact : moyen
- Pourquoi : le site a besoin d'un socle plus propre pour etre visible
- Fichiers a regarder :
  `index.html`
  pages publiques
- Probleme explique simplement :
  le site a aujourd'hui un socle SEO trop global pour des pages qui ont des roles differents.
- Etapes conseillees :
  1. definir les pages business prioritaires
  2. rediger un titre et une description par page
  3. ajouter les balises utiles
  4. verifier que les liens internes pointent bien vers les bonnes pages
- Definition de fini :
  titre, description et canonical sur les pages business

### Corriger les points d'accessibilite les plus visibles

- Impact : moyen
- Pourquoi : certains parcours restent difficiles a lire ou a utiliser
- Probleme explique simplement :
  certains problemes ne cassent pas le site, mais ils le rendent plus difficile a utiliser.
- Etapes conseillees :
  1. corriger les labels manquants
  2. ajouter les zones `<main>`
  3. corriger les contrastes les plus faibles
  4. revoir les modales et le clavier
  5. recontroler avec Lighthouse
- Definition de fini :
  labels, contrastes, main, modales et clavier corriges sur les ecrans prioritaires

### Harmoniser la coherence visuelle

- Impact : moyen
- Pourquoi : la promesse premium n'est pas tenue partout
- Probleme explique simplement :
  l'interface a une bonne base, mais certaines pages utilisent encore d'autres couleurs, d'autres typos ou d'autres logiques.
- Etapes conseillees :
  1. choisir une palette principale
  2. verifier les variables globales
  3. supprimer les couleurs hors systeme
  4. limiter les familles typo
  5. verifier admin, modales et configurateur
- Definition de fini :
  palette, typographie et composants critiques alignes

## Regle de travail conseillee

Avant chaque correction :

- verifier si c'est un bug technique ou une decision produit
- si c'est une decision produit, faire valider le comportement attendu
- si c'est un bug clair, corriger puis tester tout de suite
