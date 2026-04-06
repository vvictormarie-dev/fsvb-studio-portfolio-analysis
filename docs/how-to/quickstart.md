# Quickstart

## Objectif

Ce guide permet de lancer une premiere analyse sans Tiagento.

## Etapes

1. Verifier l'environnement local :

```powershell
powershell -ExecutionPolicy Bypass -File tools/check-environment.ps1
```

2. Lire le guide de lancement de l'application cible :

- [docs/how-to/run-target-app.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/run-target-app.md)

3. Configurer MCP si vous voulez observer l'application dans un navigateur outille :

- [docs/how-to/mcp-setup.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/mcp-setup.md)

4. Utiliser un agent Codex adapte au besoin dans `.codex/agents/`

5. Produire un premier rapport consolide :

```powershell
powershell -ExecutionPolicy Bypass -File tools/generate-consolidated-report.ps1
```

## Resultat attendu

A la fin, vous devez pouvoir :

- lancer ou verifier l'application cible localement
- executer un premier parcours d'observation
- noter les constats dans un template
- produire une synthese consolidée partageable
