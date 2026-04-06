# 🔍 PREVIEW VALIDATION - Correspondance Configurateur ↔ Site

## MISSION
Vérifier que le preview configurateur correspond EXACTEMENT au site généré

---

## CHECKLIST VALIDATION

### 1. Données Injectées

**Pour CHAQUE section, comparer :**

| Champ Configurateur | Preview | Site Généré | ✅/❌ |
|---------------------|---------|-------------|-------|
| Nom entreprise | | | |
| Email | | | |
| Téléphone | | | |
| Slogan | | | |
| Hero titre | | | |
| Hero sous-titre | | | |
| Hero CTA | | | |
| Services description | | | |
| Portfolio items | | | |
| Témoignages | | | |
| Contact adresse | | | |
| Footer texte | | | |

---

### 2. Couleurs & Thème

**Vérifier correspondance :**
- [ ] Couleur primaire identique
- [ ] Couleur secondaire identique
- [ ] Couleur accent identique
- [ ] Thème visuel identique (Empire/Chaleur/Zen)
- [ ] Mode couleur (Auto/Perso) respecté

**Test visuel :**
1. Changer couleur primaire en jaune
2. Vérifier preview = jaune
3. Générer site
4. Vérifier site = jaune

---

### 3. Sections Visibilité

**Pour chaque section :**
- [ ] Si cochée dans modal → Visible dans preview
- [ ] Si cochée dans modal → Visible dans site généré
- [ ] Si NON cochée → Absente preview
- [ ] Si NON cochée → Absente site généré

**Liste sections à vérifier :**
- Hero
- About
- Services
- Portfolio
- Features
- Testimonials
- FAQ
- Contact
- Footer

---

### 4. Images & Médias

**Vérifier :**
- [ ] Images uploadées dans configurateur → Affichées preview
- [ ] Images uploadées → Présentes site généré
- [ ] Logo URL → Affiché correctement
- [ ] Images Supabase accessibles

---

### 5. Intégrations Externes

**Tester :**
- [ ] Google Maps URL → Carte affichée preview
- [ ] Google Maps URL → Carte affichée site
- [ ] Cal.com URL → Lien fonctionnel
- [ ] Widgets personnalisés → Intégrés

---

### 6. Responsive

**Tester sur 3 tailles :**

| Résolution | Preview OK | Site OK |
|------------|------------|---------|
| Desktop 1920px | | |
| Tablette 768px | | |
| Mobile 375px | | |

---

## ✅ CRITÈRES VALIDATION

**Le preview est valide si :**
- ✅ 100% des champs configurateur = visibles preview
- ✅ 100% des champs configurateur = visibles site généré
- ✅ Couleurs identiques partout
- ✅ Sections cochées = affichées
- ✅ Sections non cochées = absentes
- ✅ Responsive identique

---

**FIN VALIDATION PREVIEW**