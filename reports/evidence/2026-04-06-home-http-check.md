# Preuve - Verification locale home et configurator

- Date : 2026-04-06
- Base URL : `http://127.0.0.1:4173/`
- Objectif : confirmer l'accessibilite locale de la home et du premier point d'entree dans l'offre

## Resultats constates

- `GET /` : reponse `200`
- `GET /configurator` : reponse `200`
- la page locale est servie par Vite
- les CTA structurants releves dans le code :
  - `Voir les templates`
  - `Commander un site`
  - `Creer ce site`

## Limite de la preuve

Cette preuve ne remplace pas une observation visuelle complete dans un navigateur pilote. Elle confirme surtout :

- que le site demarre
- que les routes clefs repondent
- que les points d'entree du parcours sont bien presents dans la structure observee
