# Workflows

Ce dossier decrit une organisation simple, sans moteur de workflow externe.

## Organisation conseillee

- un brief de mission dans `reports/drafts/`
- des notes d'observation ou de test dans `reports/drafts/`
- des preuves dans `reports/evidence/`
- une ou plusieurs sorties produites automatiquement dans `reports/generated/`
- une synthese partageable dans `reports/consolidated/`

## Logique de travail

1. cadrer le besoin
2. choisir l'agent ou le profil adapte
3. executer le parcours ou l'audit
4. conserver les preuves
5. transformer les constats en synthese metier

## Workflow minimal recommande

Pour demarrer sans Tiagento :

1. `tools/check-environment.ps1`
2. `tools/run-target-app.ps1` ou lancement masque documente
3. observation locale ou parcours MCP
4. `tools/collect-evidence.ps1`
5. redaction dans `docs/templates/`
6. `tools/generate-consolidated-report.ps1`
7. `tools/stop-target-app.ps1`

## Evolution possible plus tard

Cette organisation pourra accueillir Tiagento ou un autre orchestrateur sans changer les emplacements principaux :

- briefs
- preuves
- sorties generees
- rapports consolides
