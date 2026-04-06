# 🧪 **TEST SESSIONS COLLABORATIVES - Guide Utilisateur**

## ✅ **PRÉREQUIS VÉRIFIÉS**
- [x] **SQL Supabase exécuté** (create_live_sessions.sql + create_rpc_functions.sql)
- [x] **Build réussi** - Application compilée sans erreurs
- [x] **Fonctionnalités implémentées** - Infrastructure complète

---

## 🚀 **TESTS MANUELS À EFFECTUER**

### **TEST 1 : Création Session Solo (5min)**
1. **Démarrer** l'app → `npm run dev`
2. **Aller** sur `/configurator?template=landing-solo`
3. **Cliquer** bouton **"👥 Collaborer"**
4. **Vérifier** :
   - ✅ Modal s'ouvre avec infos session
   - ✅ Bouton "🚀 Créer la session" cliquable
   - ✅ Loading state pendant création
   - ✅ URL générée format : `/configurator/session/[UUID]`

### **TEST 2 : Navigation Session Existante (5min)**
1. **Copier** l'URL de session générée
2. **Ouvrir** nouvel onglet/fenêtre
3. **Coller** l'URL de session
4. **Vérifier** :
   - ✅ Page charge avec données partagées
   - ✅ Header affiche "🔴 LIVE" 
   - ✅ Compteur "2 utilisateur(s) connecté(s)"
   - ✅ Formulaire synchronisé entre onglets

### **TEST 3 : Synchronisation Temps Réel (10min)**
Avec **2 onglets** sur la même session :

**3A - Modifications Basiques :**
- **Onglet 1** : Changer template (landing-solo → restaurant)
- **Onglet 2** : Vérifier changement instantané
- **Onglet 2** : Modifier nom entreprise
- **Onglet 1** : Vérifier synchronisation

**3B - Couleurs & Sections :**
- **Onglet 1** : Changer thème couleur
- **Onglet 2** : Vérifier preview mise à jour
- **Onglet 2** : Activer/désactiver sections
- **Onglet 1** : Vérifier config sections synchronisée

### **TEST 4 : Gestion Déconnexions (5min)**
1. **Fermer** un onglet 
2. **Vérifier** : Compteur utilisateurs décrémenté
3. **Perdre** connexion internet momentanément
4. **Vérifier** : Indicateur "⚠️ Reconnexion..."
5. **Rétablir** connexion
6. **Vérifier** : Retour à "🔴 LIVE"

### **TEST 5 : Sessions Expirées (5min)**
1. **Créer** session test
2. **Modifier** manuellement l'URL avec UUID invalide
3. **Vérifier** : Redirection vers `/configurator`
4. **Accéder** session créée > 24h (si possible)
5. **Vérifier** : Message "Session expirée ou introuvable"

---

## 🐛 **PROBLÈMES À SURVEILLER**

### **Critiques (Arrêter les tests)** :
- ❌ **Erreur Supabase** → Vérifier configuration
- ❌ **Aucune synchronisation** → Problème realtime
- ❌ **Crash app** → Erreur TypeScript/React

### **Mineurs (Noter et continuer)** :
- ⚠️ **Délai sync > 2 sec** → Performance
- ⚠️ **Interface freeze** temporaire → UX
- ⚠️ **Reconnexions fréquentes** → Réseau

---

## 📊 **RÉSULTATS ATTENDUS**

### **Comportement Normal** :
- ✅ **Sync < 500ms** entre onglets
- ✅ **0 erreur console** critique
- ✅ **UI responsive** pendant sync
- ✅ **Nettoyage auto** sessions expirées
- ✅ **Performance** preview fluide

### **Limites Acceptées** :
- ⚠️ **Chunks > 500KB** (normal avec Supabase)
- ⚠️ **Last-write-wins** (par design)
- ⚠️ **Max 2 utilisateurs** (par design)

---

## 🎯 **PROCHAINES ÉTAPES POST-TEST**

1. **Si tests OK** → Session collaborative MVP ✅
2. **Si bugs mineurs** → Polish final (15min)
3. **Si bugs majeurs** → Debug prioritaire
4. **Documentation** → Guide business utilisateur

---

**⚡ TEMPS TOTAL TESTS : 30 minutes maximum**
**🎬 ACTION : Lancer `npm run dev` et commencer TEST 1**