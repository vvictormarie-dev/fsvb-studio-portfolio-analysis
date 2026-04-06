# FSVB Studio Portfolio Analysis

Ce depot sert a analyser, tester, observer et documenter l'application web `FSVB Studio Portfolio` sans dependre de Tiagento dans cette premiere phase.

## Ce que contient ce depot

- `fsvb-studio-portfolio/` : l'application cible importee localement pour etre observee et testee
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

Commande de mise a jour future :

```powershell
git subtree pull --prefix fsvb-studio-portfolio app-target main --squash
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
