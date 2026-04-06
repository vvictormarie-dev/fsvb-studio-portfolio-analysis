# 🧪 Script Test Fixes Collaboration - FSVB Studio

## Instructions d'exécution

**1. Exécuter le SQL de fix compteur :**
```sql
-- Dans l'éditeur SQL Supabase, exécuter :
-- portfolio-app\sql\fix_user_counter.sql
```

**2. Redémarrer le serveur de développement :**
```bash
cd portfolio-app
npm run dev
```

**3. Tests à effectuer :**

### ✅ TEST 1 : COMPTEUR UTILISATEURS
```
URL: http://localhost:5173/configurator/session/hePFo7uw?template=landing-solo

1. Ouvrir dans navigateur 1 → Vérifier compteur = 1
2. Ouvrir dans navigateur 2 → Vérifier compteur = 2  
3. Fermer navigateur 1 → Vérifier compteur = 1
4. Rafraîchir navigateur 2 → Vérifier compteur reste = 1

ATTENDU: Compteur exact, pas 42
```

### ✅ TEST 2 : SYNCHRONISATION COMPLÈTE
```
1. Navigateur A : Modifier titre Hero → B doit voir changement < 1sec
2. Navigateur A : Changer couleur primaire → B doit voir < 1sec  
3. Navigateur A : Modifier section About rapidement → B doit voir < 1sec
4. Navigateur A : Taper vite dans plusieurs champs → B doit tout recevoir

ATTENDU: Toutes modifs synchronisées, pas seulement Hero
```

### ✅ TEST 3 : NAVIGATION SECTIONS
```
1. Template landing-solo : Cliquer "Edit" sur section About → doit ouvrir About
2. Template restaurant : Cliquer "Edit" sur section Services → doit ouvrir Services  
3. Template coach : Cliquer "Edit" sur section Testimonials → doit ouvrir Testimonials
4. Vérifier scroll automatique vers section configurateur

ATTENDU: Edit fonctionne pour TOUS templates, pas seulement landing-solo
```

### ✅ TEST 4 : CONSOLE PROPRE
```
1. Ouvrir DevTools Console
2. Naviguer dans l'app, modifier sections
3. Vérifier absence logs "SCROLL DEBUG"
4. Vérifier absence logs "TOGGLE DEBUG"

ATTENDU: Console propre en production
```

## 🔍 Vérifications SQL

**Vérifier sessions actives :**
```sql
SELECT session_id, active_users, created_at, updated_at 
FROM live_sessions 
WHERE expires_at > NOW()
ORDER BY updated_at DESC;
```

**Vérifier utilisateurs trackés :**
```sql
SELECT session_id, COUNT(*) as users_count 
FROM session_users 
WHERE last_seen > NOW() - INTERVAL '5 minutes'
GROUP BY session_id;
```

**Nettoyer si besoin :**
```sql
SELECT cleanup_inactive_users();
```

## 📊 Résultats Attendus

### Avant Fix
- ❌ Compteur : 42 utilisateurs  
- ❌ Sync : Hero OK, reste KO
- ❌ Navigation : Sections cassées sauf landing-solo
- ❌ Console : Spam logs debug

### Après Fix
- ✅ Compteur : Nombre exact d'utilisateurs
- ✅ Sync : Toutes sections < 1 seconde
- ✅ Navigation : Edit sections fonctionne partout  
- ✅ Console : Propre et professionnelle

## 🚨 Si problèmes persistants

**Problem 1: Compteur toujours faux**
```sql
-- Reset manuel
UPDATE live_sessions SET active_users = 0 WHERE session_id = 'hePFo7uw';
DELETE FROM session_users WHERE session_id = 'hePFo7uw';
```

**Problem 2: Sync toujours lente**
```
- Vérifier import debugLog dans ConfiguratorPage
- Vérifier debounce 150ms dans useRealtimeSession  
- Tester réseau (possible problème Supabase)
```

**Problem 3: Navigation sections cassée**
```
- Vérifier handleSectionEdit existe
- Vérifier onEditSection={handleSectionEdit} (pas conditional)
- Vérifier mapping SECTION_MAPPING
```

**Problem 4: Logs toujours présents**
```
- Vérifier import debugLog
- Vérifier DEBUG_CONFIG.scrolling = false
- Clear cache navigateur
```

## ⏰ Temps Total Estimé

- Exécution fixes : **5 minutes**
- Tests validation : **15 minutes**  
- Debug si problèmes : **10 minutes**

**Total : ~30 minutes pour validation complète**