# MCP Setup

## Objectif

Utiliser MCP de facon pragmatique pour observer l'application locale, executer des parcours et conserver des preuves.

## Strategie retenue

La strategie recommandee est `mixed` :

- outils locaux pour lancer l'application ou verifier l'environnement
- MCP pour piloter certains parcours et observer le rendu
- separation claire entre configuration commitable et secrets locaux

## Ce qui peut etre committe

- la documentation de mise en place
- les scripts utilitaires generiques
- les templates de parcours ou de comptes rendus
- les chemins de sorties dans `reports/`
- la configuration MCP du depot quand elle ne contient pas de secret, par exemple `.mcp.json`

## Ce qui doit rester local

- secrets d'acces
- tokens
- mots de passe
- configuration personnelle du navigateur ou du poste
- variables d'environnement sensibles

## Mise en place conseillee

1. verifier que l'application cible peut tourner localement
2. lancer de preference `fsvb-studio-portfolio/portfolio-app/` via la commande documentee
3. configurer la base URL locale dans l'environnement
4. ouvrir un navigateur outille via MCP
5. executer un parcours cible
6. stocker les preuves dans `reports/evidence/`

## Configuration preparee dans ce depot

Le depot contient maintenant :

- `.mcp.json`

Cette configuration prepare le serveur MCP `chrome-devtools` pour piloter un navigateur Chrome via le package officiel `chrome-devtools-mcp`.

Si Codex Desktop n'affiche pas encore ce serveur, il faut en general recharger le workspace ou relancer l'application pour que la nouvelle configuration soit prise en compte.

## Premier parcours conseille

Pour une premiere verification simple :

1. lancer le site local
2. ouvrir la page d'accueil
3. verifier que les contenus principaux se chargent
4. noter les points de friction ou d'incomprehension
5. faire une capture ou creer une note de preuve
6. transformer cela en constat priorise

## Exemple de base URL locale

Si Vite demarre sur son port habituel, la base URL locale sera souvent proche de :

- `http://localhost:5173`

Dans ce depot, une verification reelle a confirme le fonctionnement sur :

- `http://127.0.0.1:4173/`

Ce point peut varier si un autre port est choisi ou deja occupe sur votre poste.

## Bonnes pratiques

- nommer les preuves avec une date et un sujet clair
- lier chaque preuve a un constat ou a un risque
- preferer des parcours courts et verifiables
- noter les limites de l'observation quand un acces manque
- separer clairement les secrets locaux du depot d'analyse

## Ressources utiles

- [docs/how-to/run-target-app.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/run-target-app.md)
- [docs/workflows/README.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/workflows/README.md)
