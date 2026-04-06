# AGENTS

Ce depot est concu pour etre utilise avec Codex Desktop dans un contexte d'analyse, de test, d'observation et de documentation d'une application web existante.

## Regles de communication

Quand Codex travaille dans ce depot :

- utiliser un langage simple et peu technique
- privilegier le vocabulaire metier quand il existe
- expliquer brievement les termes techniques necessaires
- annoncer l'avancement par petites etapes compréhensibles
- faire des syntheses courtes, orientees decision et action
- distinguer clairement ce qui est confirme, probable ou a verifier

## Priorites du depot

- observer l'application cible sans la perturber
- produire des constats utiles pour un utilisateur non expert
- conserver des preuves et des rapports reutilisables
- preparer des parcours d'analyse qui pourront etre outilles davantage plus tard

## Utilisation des agents specialises

Les profils disponibles dans `.codex/agents/` couvrent les besoins frequents :

- audit UX
- revue design
- test de parcours utilisateur
- verification qualite
- investigation performance
- synthese documentaire
- coordination generale

Le coordinateur aide a choisir le bon profil et a consolider les retours.

## Ce qu'il faut eviter

- noyer l'utilisateur sous le jargon
- confondre un constat, une hypothese et une recommandation
- lancer des changements non demandes dans l'application cible
- supposer qu'un outil local ou un secret existe sans verification

## Regle sur l'application cible

Par defaut, l'application `FSVB Studio Portfolio` est analysee en priorite en lecture : lancement local, observation, parcours, tests et documentation. Les modifications de son code peuvent venir plus tard, mais elles ne sont pas l'objectif initial.
