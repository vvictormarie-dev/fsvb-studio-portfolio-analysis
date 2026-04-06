# 📁 INFORMATIONS GIT DU PROJET PORTFOLIO

## 🎯 LOCALISATION DU DÉPÔT GIT PRINCIPAL

**Dépôt Git actuel :** `C:\Users\suzan\Desktop\Portfolio\.git`

- ✅ **Racine du projet** : `C:\Users\suzan\Desktop\Portfolio\`
- ✅ **Branche actuelle** : `feature/style-fixes`
- ✅ **Premier commit** : `4e90f91` - "fix: 5 corrections critiques de style"

## 📂 STRUCTURE DU WORKSPACE

```
C:\Users\suzan\Desktop\Portfolio\
├── .git/                    ← DÉPÔT GIT PRINCIPAL
├── package.json             ← Scripts racine (npm run dev/build)
├── GIT_INFO.md             ← Ce fichier
└── portfolio-app/          ← Code source du projet
    ├── src/
    ├── package.json        ← Dependencies React/Vite
    └── [PLUS DE .git/]     ← Supprimé pour éviter conflits
```

## ⚡ COMMANDES GIT DEPUIS LA RACINE

```bash
# Depuis C:\Users\suzan\Desktop\Portfolio\
git status                  # Voir l'état du dépôt
git add .                   # Ajouter tous les changements
git commit -m "message"     # Commit avec message
git branch                  # Voir les branches
git checkout main           # Changer de branche
```

## 🚀 COMMANDES NPM DEPUIS LA RACINE

```bash
# Depuis C:\Users\suzan\Desktop\Portfolio\
npm run dev                 # → cd portfolio-app && npm run dev
npm run build              # → cd portfolio-app && npm run build
npm run preview            # → cd portfolio-app && npm run preview
```

## 📝 HISTORIQUE DES CORRECTIONS

**Dernier commit :** `4e90f91`
- ✅ NavBar: `--accent-gold` → `--gold-primary`
- ✅ Button: border `1px` → `2px solid --gold-primary`
- ✅ TemplateCard: ajout glassmorphism complet
- ✅ ServicesPage: ajout fond `--bg-gradient`
- ✅ Footer: hover `--gold-soft` → `--gold-bright`

## ⚠️ NOTES IMPORTANTES

1. **UN SEUL DÉPÔT GIT** : Situé à la racine, pas de dépôt imbriqué
2. **SCRIPTS RACINE** : Utiliser `npm run dev` depuis la racine
3. **BRANCHE ACTIVE** : `feature/style-fixes` pour les corrections de style
4. **COMMIT PROPRE** : 79 fichiers trackés, projet complet sauvegardé

---
📅 **Créé le :** 10 décembre 2025  
🔄 **Dernière mise à jour :** Après commit 4e90f91