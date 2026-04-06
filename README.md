# FSVB Studio Portfolio Analysis

Ce depot sert a analyser, tester, observer et documenter l'application web `FSVB Studio Portfolio` sans dependre de Tiagento dans cette premiere phase.

## Ce que contient ce depot

- `fsvb-studio-portfolio/` : le depot de l'application cible importe localement
- `fsvb-studio-portfolio/portfolio-app/` : l'application web principale detectee a ce stade
- `docs/` : les guides pratiques, modes operatoires et templates
- `reports/` : les brouillons, rapports generes, versions consolidees et preuves
- `tools/` : les scripts simples utiles au quotidien
- `.codex/agents/` : les profils Codex specialises pour les missions frequentes

## Principe de fonctionnement

Le depot est organise pour permettre un travail simple :

1. importer l'application cible localement
2. la lancer ou l'observer avec des outils locaux et MCP
3. noter les constats et conserver les preuves
4. produire des rapports lisibles par un public non technique

## Place de l'application cible

L'application cible est importee en `subtree` dans `fsvb-studio-portfolio/`. Cela permet de garder un depot d'analyse separe, tout en conservant une copie locale de l'application a etudier.

Dans l'etat actuel du depot d'analyse, la copie locale est alignee sur la branche cible `analyse-marie`.

Le stack principal detecte est :

- application frontend React
- TypeScript
- Vite
- dependances fonctionnelles vers Supabase et PayPal

La racine importee contient un script de confort, mais l'application utile a lancer se trouve surtout dans `fsvb-studio-portfolio/portfolio-app/`.

Commande de mise a jour future :

```powershell
git subtree pull --prefix fsvb-studio-portfolio https://github.com/Sue70623/fsvb-studio-portfolio.git analyse-marie --squash
```

## Logique MCP

La strategie retenue est `mixed` :

- MCP peut servir a lancer l'application ou verifier son environnement
- MCP peut ouvrir un navigateur outille pour suivre des parcours
- MCP peut aider a collecter des preuves et a lire certaines ressources utiles

Les details de mise en place sont documentes dans [docs/how-to/mcp-setup.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/mcp-setup.md).

## Logique de rapports consolides

Le depot separe les etapes de production :

- `reports/drafts/` : notes de travail et premieres observations
- `reports/generated/` : sorties produites par script ou outil
- `reports/consolidated/` : livrables relus et partageables
- `reports/evidence/` : captures, journaux et autres preuves

Cette separation permet de garder un historique clair et de transformer des constats techniques en syntheses metier.

## Tiagento plus tard

Tiagento n'est pas installe dans cette phase. L'organisation du depot laisse toutefois une place naturelle a un moteur de workflow plus tard, sans reorganisation lourde, grace a :

- une structure de dossiers stable
- des agents Codex deja prets
- des scripts simples qui pourront etre remplaces ou orchestres ensuite

## Demarrage rapide

Commencez par [docs/how-to/quickstart.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/quickstart.md).

## Parcours recommande pour une premiere analyse

1. verifier l'environnement local
2. installer les dependances de l'application cible
3. lancer l'application cible localement
4. verifier une ou deux pages clefs dans le navigateur
5. collecter les preuves utiles
6. remplir un template de rapport
7. produire une synthese consolidee

Ce parcours permet de commencer simplement, sans moteur externe, tout en gardant une trace claire des constats.
