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

## Ce qui doit rester local

- secrets d'acces
- tokens
- mots de passe
- configuration personnelle du navigateur ou du poste
- variables d'environnement sensibles

## Mise en place conseillee

1. verifier que l'application cible peut tourner localement
2. configurer la base URL locale dans l'environnement
3. ouvrir un navigateur outille via MCP
4. executer un parcours cible
5. stocker les preuves dans `reports/evidence/`

## Bonnes pratiques

- nommer les preuves avec une date et un sujet clair
- lier chaque preuve a un constat ou a un risque
- preferer des parcours courts et verifiables
- noter les limites de l'observation quand un acces manque

## Ressources utiles

- [docs/how-to/run-target-app.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/run-target-app.md)
- [docs/workflows/README.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/workflows/README.md)
