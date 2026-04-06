# Lancer l'application cible

## Emplacement

- depot importe : `fsvb-studio-portfolio/`
- application web principale detectee : `fsvb-studio-portfolio/portfolio-app/`

## Stack principal detecte

- React
- TypeScript
- Vite
- npm avec `package-lock.json`
- services externes visibles dans le code : Supabase et PayPal

## Point d'entree recommande

Le depot importe contient un `package.json` a la racine qui redirige vers `portfolio-app/`.

Pour un usage simple, vous pouvez donc lancer les commandes depuis :

- `fsvb-studio-portfolio/`

## Installation

```powershell
cd fsvb-studio-portfolio
npm run install-deps
```

Alternative equivalente :

```powershell
cd fsvb-studio-portfolio/portfolio-app
npm install
```

## Lancement local

Commande la plus simple :

```powershell
cd fsvb-studio-portfolio
npm run dev
```

Equivalent via le script du depot d'analyse, dans le terminal courant :

```powershell
powershell -ExecutionPolicy Bypass -File tools/run-target-app.ps1 -Start
```

## Cas Codex Desktop

Dans Codex Desktop, un lancement "dans le terminal courant" ne reste pas toujours accessible apres la fin de la commande pilotee par l'agent.

Le mode le plus fiable observe dans ce depot est donc :

- lancer le serveur en arriere-plan
- masquer la fenetre `cmd`
- verifier ensuite l'URL locale

Exemple de commande de reference :

```powershell
cd fsvb-studio-portfolio/portfolio-app
Start-Process -FilePath npm.cmd -ArgumentList 'run','dev','--','--host','127.0.0.1','--port','4173' -WindowStyle Hidden
```

URL locale verifiee :

- `http://127.0.0.1:4173/`

## Verifier que le site repond

Indices simples :

- le port `4173` ecoute localement
- le navigateur affiche bien la page d'accueil
- le journal Vite annonce une URL locale

Si le site n'est pas accessible, verifier en priorite :

- que `npm install` a bien ete lance
- qu'un autre outil n'occupe pas deja le port choisi
- que le serveur n'a pas ete ferme juste apres le lancement
- que les variables d'environnement utiles ne bloquent pas le rendu d'une page cle

## Arreter le site

Arret recommande via le script du depot :

```powershell
powershell -ExecutionPolicy Bypass -File tools/stop-target-app.ps1
```

Ce script coupe le serveur local sur le port documente, sans demander de repere technique supplementaire.

Commande directe sur l'application :

```powershell
cd fsvb-studio-portfolio/portfolio-app
npm run dev
```

## Build

```powershell
cd fsvb-studio-portfolio
npm run build
```

Ou :

```powershell
cd fsvb-studio-portfolio/portfolio-app
npm run build
```

## Apercu de production locale

```powershell
cd fsvb-studio-portfolio
npm run preview
```

## Verification qualite connue

Lint disponible :

```powershell
cd fsvb-studio-portfolio
npm run lint
```

## Tests connus a ce stade

- aucun script de test automatise standard n'a ete detecte dans les `package.json`
- le depot contient plusieurs documents et checklists de test, mais pas de commande `npm test` prete a l'emploi

## Pre-requis confirmes

- Git
- Node.js
- npm

## Pre-requis probables ou a verifier

- version exacte de Node.js non documentee dans le depot importe
- variables d'environnement locales pour certaines fonctions integrees
- acces reseau aux services Supabase ou PayPal pour certains parcours reels

## Variables d'environnement et vigilance

Le code de `portfolio-app` attend notamment :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- des variables PayPal selon le mode utilise

Le depot importe contient deja un fichier `.env`. Pour un usage d'analyse, il est recommande de privilegier des variables locales dediees au poste d'observation et de ne pas ajouter de nouveaux secrets dans les fichiers commitables.

## Information utile pour l'analyse

Le script `npm run dev` de `portfolio-app` lance d'abord `node scripts/generate-build-info.js`, qui essaie de lire le commit Git courant pour enrichir les informations de build. Cela ne bloque pas l'analyse mais explique certaines traces visibles au demarrage.

## Fenetre `cmd` et confort d'usage

Si vous lancez l'application depuis un terminal deja ouvert, elle reste dans ce terminal et n'ouvre pas forcement une nouvelle fenetre Windows.

Le mode recommande dans ce depot est donc :

- utiliser `npm run dev` dans le terminal courant
- ou lancer `tools/run-target-app.ps1 -Start`, qui reste lui aussi dans le terminal courant

Dans Codex Desktop, si vous avez besoin que le site reste accessible sans interaction continue, le lancement masque en arriere-plan est plus fiable que le mode strictement attache au terminal integre.
