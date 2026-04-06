# 🔍 CHECKLIST DEBUGGING PAYPAL - RÉSULTATS

## ✅ ÉTAPE 1 : Vérification Client ID

**Configuration .env :**
```
VITE_PAYPAL_CLIENT_ID_SANDBOX=AfxLi-rhXtQjM4yH3UaLXHeHMjma4ZYlJmMTnltEiJo4yY7B5lWDIQJOo6sbOeJmHwF2KplmqKA2N73j
VITE_PAYPAL_CLIENT_ID_LIVE=AfxLi-rhXtQjM4yH3UaLXHeHMjma4ZYlJmMTnltEiJo4yY7B5lWDIQJOo6sbOeJmHwF2KplmqKA2N73j
VITE_PAYPAL_MODE=sandbox
```

**✅ CE QUI FONCTIONNE :**
- Client ID présent dans .env
- Longueur : 80 caractères (correct)
- Commence par "Af" (format valide)
- Pas d'espaces ni guillemets
- Variables d'environnement accessibles

**❌ POINT D'ATTENTION :**
- Même Client ID pour SANDBOX et LIVE (inhabituel mais possible)
- À vérifier : est-ce vraiment un Client ID SANDBOX ?

---

## 🔍 ÉTAPE 2 : Vérification fichier .env

**✅ CE QUI FONCTIONNE :**
- Fichier .env à la racine du projet ✅
- Format correct (pas de guillemets) ✅
- Nom variables correct (VITE_*) ✅
- Pas d'espaces autour du = ✅

**🔧 ACTION EFFECTUÉE :**
- Logs détaillés ajoutés dans console
- Vérification automatique espaces/guillemets
- Affichage longueur et début du Client ID

---

## 🌐 ÉTAPE 3 : Vérification URL script PayPal

**Console Logs ajoutés :**
```javascript
console.log('🌐 URL complète du script:', scriptUrl);
console.log('📝 Paramètres URL:', { 'client-id': ..., 'currency': 'EUR' });
```

**À VÉRIFIER DANS CONSOLE NAVIGATEUR :**
1. Ouvrir DevTools (F12)
2. Onglet Network
3. Filtrer "paypal"
4. Recharger page /order/ORDER-ID
5. Vérifier statut requête vers paypal.com/sdk/js

**Statut attendu :**
- ✅ 200 = Script chargé avec succès
- ❌ 400 = Bad Request (Client ID invalide)
- ❌ 404 = URL incorrecte
- ❌ 406 = Not Acceptable (problème headers/config)

---

## 🔑 ÉTAPE 4 : Vérifier environnement PayPal Dashboard

**À FAIRE MAINTENANT :**

1. **Aller sur PayPal Developer Dashboard**
   - URL : https://developer.paypal.com/dashboard
   - Connexion avec compte PayPal

2. **Vérifier l'app**
   - Cliquer "Mes apps et identifiants"
   - Sélectionner app "Rename IA" (ou créer nouvelle)
   - **ONGLET SANDBOX** (pas Live)

3. **Copier le vrai Client ID Sandbox**
   - Dans section "Sandbox"
   - Client ID commence par "A..." (80 caractères)
   - Copier SANS espaces

4. **Vérifier statut app**
   - App doit être "Active" (pas Inactive)
   - Vérifier que domaine localhost est autorisé

5. **Remplacer dans .env**
   ```
   VITE_PAYPAL_CLIENT_ID_SANDBOX=<nouveau_client_id_sandbox>
   ```

6. **Redémarrer serveur**
   ```powershell
   # Arrêter serveur (Ctrl+C)
   npm run dev
   ```

---

## 🔧 ÉTAPE 5 : Configuration minimale PayPal

**✅ DÉJÀ IMPLÉMENTÉ :**
```javascript
const scriptUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
```

**Configuration actuelle :**
- ✅ client-id (obligatoire)
- ✅ currency=EUR
- ✅ Pas de paramètres superflus

**Configuration MINIMALE pour test :**
- Garder uniquement client-id
- Enlever currency si problème persiste
- Tester URL directement dans navigateur

---

## 🗄️ ÉTAPE 6 : Vérifier erreur Supabase (406)

**✅ LOGS AJOUTÉS :**
```javascript
console.log('🔍 ÉTAPE 6 : RÉCUPÉRATION COMMANDE SUPABASE');
console.log('🆔 Order ID recherché:', orderId);
console.log('📡 Requête vers: /orders?order_id=eq.' + orderId);
```

**❌ PROBLÈME IDENTIFIÉ :**
- Erreur 406 sur requête Supabase
- Commande non trouvée ou RLS bloque

**CAUSES POSSIBLES ERREUR 406 SUPABASE :**
1. Header Accept manquant (application/json)
2. Header Content-Type incorrect
3. Colonne order_id inexistante dans table
4. RLS (Row Level Security) bloque SELECT
5. Clé API invalide ou expirée

**🔧 VÉRIFICATIONS À FAIRE :**

1. **Supabase Dashboard > Table Editor**
   - Ouvrir table "orders"
   - Vérifier colonne "order_id" existe
   - Vérifier type : text ou varchar

2. **Supabase Dashboard > Authentication > Policies**
   - Table "orders" doit avoir politique SELECT
   - Politique pour anon key (clé publique)
   - Activer "Enable read access for anon"

3. **Créer une commande de test**
   - Aller sur /configurator
   - Remplir formulaire complet
   - Commander
   - Noter l'ORDER-ID généré
   - Tester /order/ORDER-ID

---

## 📊 RÉSUMÉ ACTIONS À FAIRE

### PRIORITÉ 1 - PayPal (30 min)

1. ✅ Ouvrir https://developer.paypal.com/dashboard
2. ✅ Aller "Mes apps et identifiants" > Sandbox
3. ✅ Copier vrai Client ID Sandbox (différent du Live)
4. ✅ Remplacer dans .env : `VITE_PAYPAL_CLIENT_ID_SANDBOX=...`
5. ✅ Redémarrer serveur : Ctrl+C puis `npm run dev`
6. ✅ Tester page /order/ORDER-ID
7. ✅ Regarder console logs détaillés

### PRIORITÉ 2 - Supabase (15 min)

1. ✅ Aller sur Supabase Dashboard
2. ✅ Table Editor > orders > vérifier colonnes
3. ✅ Authentication > Policies > activer SELECT pour anon
4. ✅ Créer commande test depuis configurateur
5. ✅ Tester récupération avec nouveau ORDER-ID

---

## 🔍 CONSOLE LOGS À SURVEILLER

Après redémarrage serveur, rafraîchir page /order/ORDER-ID et chercher :

```
═══════════════════════════════════════════
🔍 ÉTAPE 1 : VÉRIFICATION CLIENT ID PAYPAL
═══════════════════════════════════════════
📋 Client ID brut: AfxLi...
📏 Longueur Client ID: 80
🔤 Commence par: Af
✅ Contient espaces: Non
✅ Contient guillemets: Non
```

```
═══════════════════════════════════════════
🔍 ÉTAPE 3 : VÉRIFICATION URL SCRIPT PAYPAL
═══════════════════════════════════════════
🌐 URL complète du script: https://www.paypal.com/sdk/js?...
```

```
✅ SUCCÈS : Script PayPal chargé
```

**SI ERREUR :**
```
❌ ERREUR : Échec chargement script PayPal
🔍 CHECKLIST ERREUR 400/406 :
   1. Client ID invalide ou expiré
   2. App PayPal pas en statut "Active"
   ...
```

---

## 🎯 PROCHAINE ÉTAPE

**Exécuter maintenant :**
1. Redémarrer le serveur de développement
2. Aller sur http://localhost:5173/order/ORDER-1768400610945-7ZF5IF
3. Ouvrir DevTools (F12) > Console
4. Copier TOUS les logs qui commencent par ═══
5. Me les envoyer pour analyse

**Je pourrai alors te dire exactement :**
- Si Client ID est valide
- Si URL PayPal est correcte
- Quelle erreur exacte bloque le chargement
- Quelle action précise faire ensuite
