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

4. Installer les dependances de l'application cible :

```powershell
cd fsvb-studio-portfolio
npm run install-deps
```

5. Lancer l'application cible :

```powershell
powershell -ExecutionPolicy Bypass -File tools/run-target-app.ps1 -Start
```

Si vous travaillez depuis Codex Desktop et que vous voulez garder le site accessible sans fenetre `cmd` visible, utilisez de preference un lancement en arriere-plan masque documente dans :

- [docs/how-to/run-target-app.md](/C:/Users/Mariedo/OneDrive/Documents/Dev/fsvb-studio-portfolio-analysis/docs/how-to/run-target-app.md)

6. Ouvrir l'URL locale confirmee et verifier un premier ecran cle :

- `http://127.0.0.1:4173/`

7. Utiliser un agent Codex adapte au besoin dans `.codex/agents/`

8. Initialiser une preuve si necessaire :

```powershell
powershell -ExecutionPolicy Bypass -File tools/collect-evidence.ps1 -Name "premier-controle"
```

9. Produire un premier rapport consolide :

```powershell
powershell -ExecutionPolicy Bypass -File tools/generate-consolidated-report.ps1
```

10. Arreter l'application cible quand le controle est termine :

```powershell
powershell -ExecutionPolicy Bypass -File tools/stop-target-app.ps1
```

## Resultat attendu

A la fin, vous devez pouvoir :

- lancer ou verifier l'application cible localement
- executer un premier parcours d'observation
- noter les constats dans un template
- produire une synthese consolidee partageable
