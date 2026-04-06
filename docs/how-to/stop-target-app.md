# Arreter l'application cible

## Objectif

Arreter proprement le serveur local quand la phase d'observation est terminee.

## Methode recommandee

```powershell
powershell -ExecutionPolicy Bypass -File tools/stop-target-app.ps1
```

## Ce que fait le script

- cherche un serveur local ecoutant sur le port documente
- coupe le processus correspondant
- laisse les connexions residuelles se fermer naturellement

## Quand l'utiliser

- apres un test manuel
- apres un parcours MCP
- avant de relancer le site sur un autre port
- avant de clore une session de travail
