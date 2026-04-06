# 🚀 PARCOURS CLIENT FSVB STUDIO
*Guide complet pour comprendre le fonctionnement de FSVB Studio*

---

## 🎯 QU'EST-CE QUE FSVB STUDIO ?

FSVB Studio est un **outil de création de sites web collaboratif**. Imagine un atelier de couture où :
- Tu es la **couturière** (admin) qui crée des vêtements sur mesure
- Ton **client** est à côté de toi et voit le vêtement prendre forme en temps réel
- Vous **collaborez ensemble** pour ajuster chaque détail
- Le résultat final est un **site web professionnel** entièrement personnalisé

---

## 🏗️ ARCHITECTURE GLOBALE

```
FSVB STUDIO
│
├── 🏠 Dashboard Admin (Page d'accueil)
│    └── Sélection template + Gestion projets
│
├── 🛠️ Configurator Page (Atelier de travail)
│    ├── Sidebar Configurator (Ajustements rapides)
│    ├── Modal détaillé (Édition complète)
│    └── Preview temps réel (Résultat visuel)
│
└── 🎨 Templates disponibles
     ├── Landing Solo (Freelance/Consultant) - 350€
     ├── Restaurant (Établissement) - 400€
     └── Coach (Accompagnement) - 500€
```

---

## 👤 PARCOURS ADMIN (TOI)

### **Étape 1 : Démarrage**
🏠 **Tu ouvres FSVB Studio**
- Tu arrives sur le Dashboard
- Tu vois tes projets en cours
- Tu peux créer un nouveau projet

### **Étape 2 : Choix du template**
🎨 **Tu sélectionnes le bon template**
- **Landing Solo** : Pour freelance, consultant, coach personnel
- **Restaurant** : Pour établissement, food truck, traiteur  
- **Coach** : Pour coach professionnel, thérapeute

### **Étape 3 : Ouverture de l'atelier**
🛠️ **Tu entres dans le Configurator**
- Écran divisé en 3 parties :
  - **Gauche** : Sidebar de configuration
  - **Centre** : Preview du site en temps réel
  - **Droite** : Outils et options

### **Étape 4 : Configuration de base**
⚡ **Tu fais les réglages rapides** (sidebar)
- Nom de l'entreprise
- Logo
- Couleurs principales
- Titre/slogan principal

### **Étape 5 : Peaufinage détaillé**
🎯 **Tu cliques sur les crayons** pour éditer chaque section
- 29 sections disponibles au total
- Modal s'ouvre pour chaque section
- Édition complète : textes, images, couleurs, mise en page

### **Étape 6 : Sauvegarde et livraison**
💾 **Tu finalises le projet**
- Sauvegarde automatique en Supabase
- Génération du site final
- Livraison au client

---

## 🤝 PARCOURS SESSION COLLABORATIVE

> **Scénario** : Tu es en visio avec ton client pour créer son site de restaurant

### **Avant la session**
📋 **Préparation**
1. Tu as envoyé un questionnaire au client
2. Tu as préparé le template Restaurant  
3. Tu ouvres FSVB Studio en partage d'écran

### **Pendant la session (1h30)**

#### **🏁 Démarrage (10min)**
```
Toi : "Bonjour ! Aujourd'hui on va créer votre site ensemble. 
      Vous allez voir le résultat en temps réel sur votre écran."

Client : "D'accord, comment ça marche ?"

Toi : "C'est simple ! Je vais modifier chaque section une par une,
      et vous me dites si ça vous plaît."
```

#### **🎨 Configuration de base (15min)**
**Tu ouvres la sidebar et remplis :**
- **Nom** : "Ristorante Bella Vista"
- **Logo** : Upload du logo client
- **Couleurs** : Rouge/or pour l'ambiance italienne
- **Slogan** : "Authentique cuisine italienne depuis 1985"

**Le client voit** : Le site change en temps réel, ses couleurs apparaissent

#### **🍽️ Section par section (60min)**

**1. Hero (Page d'accueil)**
```
Toi : *Clique sur le crayon de la section Hero*
     → Modal s'ouvre

Client : "Je voudrais mettre 'La vraie Italie à votre table'"

Toi : *Tape dans le champ titre*
     → Preview se met à jour instantanément

Client : "Parfait ! Et pour l'image de fond ?"

Toi : *Upload nouvelle image*
     → L'image apparaît immédiatement sur le preview
```

**2. Menu/Carte**
```
Toi : *Clique crayon section Menu*
     → Modal avec liste des plats

Client : "J'ai une nouvelle pizza aux truffes"

Toi : *Clique 'Ajouter plat'*
     → Formulaire apparaît
     → Rempli nom, description, prix

Client : *Voit le plat s'ajouter en direct sur le site*
     "Génial ! Exactement ce que je voulais"
```

**3. Témoignages**
```
Client : "J'ai reçu un super avis hier"

Toi : *Crayon section Testimonials*
     *Ajouter témoignage*
     *Copie-colle l'avis du client*

Client : "Incroyable, on dirait un vrai site professionnel !"
```

#### **✅ Finalisation (5min)**
```
Toi : "Voilà ! Votre site est terminé. Qu'est-ce que vous en pensez ?"

Client : "C'est exactement ce que j'imaginais ! Quand sera-t-il en ligne ?"

Toi : "Je finalise et vous recevez le lien dans 2h maximum."
```

---

## 🧩 COMPOSANTS CLÉS

### **🏠 Dashboard**
**À quoi ça sert :**
- Page d'accueil de ton outil de travail
- Gestion de tous tes projets clients
- Point de départ pour chaque nouveau site

**Comment l'utiliser :**
1. Vois la liste de tes projets en cours
2. Clique "Nouveau projet" pour commencer
3. Ou clique sur un projet existant pour le modifier

**Où ça mène :**
- Vers le Configurator pour travailler sur un site
- Vers les paramètres de ton compte

### **🛠️ Configurator (Sidebar)**
**À quoi ça sert :**
- **Ajustements rapides** des éléments principaux
- Interface simple pour les bases du site
- Idéal pour les modifications en live avec le client

**Quels champs :**
- 📝 **Informations essentielles** : Nom, slogan, contact
- 🎨 **Thème & Couleurs** : Palette, style visuel
- 🖼️ **Médias** : Logo, image de fond
- 🔧 **Paramètres** : Options avancées

**Quand l'utiliser :**
- Au début de chaque projet (config de base)
- Pour des ajustements rapides pendant la session
- Quand le client veut changer une couleur ou un texte

### **✏️ Modal (Édition détaillée)**
**À quoi ça sert :**
- **Édition complète** de chaque section du site
- Interface avancée avec tous les paramètres
- 29 sections différentes disponibles

**Comment l'ouvrir :**
- Clique sur l'**icône crayon** 📝 en haut à droite de chaque section
- Modal s'ouvre en superposition
- Interface spécialisée pour cette section

**Quelles sections disponibles :**
```
🎯 COMMUNES (tous templates) :
├── Hero (page d'accueil)
├── About (présentation)  
├── Testimonials (avis clients)
├── Contact (formulaire)
└── Footer (pied de page)

🎨 LANDING SOLO :
├── Services (offres)
├── Portfolio (réalisations)
├── Process (méthodologie)
├── FAQ (questions)
└── CTA (appels à l'action)

🍽️ RESTAURANT :
├── Menu (carte & prix)
├── Gallery (photos plats)
├── Hours (horaires)
└── Reservation (booking)

👨‍💼 COACH :
├── Approach (méthode)
├── Domains (spécialités)
├── Certifications (diplômes)
└── Booking (prise RDV)
```

### **👁️ Preview (Aperçu temps réel)**
**À quoi ça sert :**
- Affichage **en direct** du site en construction
- Le client voit exactement le résultat final
- Validation immédiate de chaque modification

**Comment ça marche :**
1. Tu modifies dans Sidebar ou Modal
2. Preview se met à jour **automatiquement**
3. Client voit le changement **instantanément**
4. Zéro temps de chargement, zéro délai

**Interaction :**
- Client peut scroller pour voir tout le site
- Responsive : s'adapte mobile/desktop
- Couleurs et images changent en live

---

## 🔄 LOGIQUE DE DONNÉES

### **Le Flow Magic**
```
📝 SAISIE                    💾 STOCKAGE                   👁️ AFFICHAGE
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ Tu tapes dans   │   →     │ Données sauvées │   →     │ Preview lit les │
│ Modal/Sidebar   │         │ dans Supabase   │         │ données et      │
│                 │         │ (sectionsConfig)│         │ affiche le site │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### **Exemple concret :**
1. **Tu tapes** "Ristorante Bella Vista" dans le champ nom
2. **Système sauve** `companyName: "Ristorante Bella Vista"` en base
3. **Preview lit** la donnée et affiche le nom dans la navbar
4. **Client voit** "Ristorante Bella Vista" apparaître instantanément

### **Pourquoi c'est magique :**
- ✅ **Temps réel** : Pas de bouton "Actualiser"
- ✅ **Sauvegarde auto** : Jamais de perte de données  
- ✅ **Sync parfaite** : Ce que tu tapes = ce que client voit
- ✅ **Multi-sections** : Chaque partie est indépendante

---

## 💼 CAS D'USAGE CONCRETS

### **Exemple 1 : Modifier le titre Hero** 🎯
```
SITUATION : Le client veut changer son slogan

👆 ÉTAPES :
1. Tu ouvres la sidebar de droite
2. Section "Informations essentielles"  
3. Champ "Titre principal"
4. Tu effaces l'ancien et tapes : "La vraie Italie à votre table"
5. Preview se met à jour en temps réel

👀 CE QUE VOIT LE CLIENT :
- Le titre change instantanément sur la page d'accueil
- Police et couleurs s'adaptent automatiquement
- Résultat professionnel immédiat
```

### **Exemple 2 : Ajouter un témoignage** 💬
```
SITUATION : Client a reçu un nouvel avis 5 étoiles

👆 ÉTAPES :
1. Tu scrolles jusqu'à la section Testimonials
2. Tu cliques sur l'icône crayon 📝 en haut à droite
3. Modal s'ouvre avec la liste des témoignages
4. Tu cliques "Ajouter témoignage"
5. Tu remplis :
   - Nom : "Marie Dubois" 
   - Avis : "Excellent restaurant, service parfait !"
   - Note : 5 étoiles
6. Tu cliques "Sauvegarder"

👀 CE QUE VOIT LE CLIENT :
- Nouveau témoignage apparaît dans la section
- Design cohérent avec les autres avis
- Étoiles dorées qui brillent
- Client est ravi de voir son avis en live !
```

### **Exemple 3 : Changer couleurs** 🎨
```
SITUATION : Client veut du bleu au lieu du rouge

👆 ÉTAPES :
1. Sidebar de droite
2. Section "Thème & Couleurs"
3. Tu cliques sur le sélecteur de couleur primaire
4. Tu choisis un beau bleu (#2563EB)
5. Magie : TOUT le site passe au bleu instantanément

👀 CE QUE VOIT LE CLIENT :
- Boutons deviennent bleus
- Titres passent au bleu
- Liens adoptent la nouvelle couleur
- Cohérence parfaite sur tout le site
- "Wow ! C'est exactement ce que je voulais !"
```

### **Exemple 4 : Modifier le menu restaurant** 🍕
```
SITUATION : Nouveau plat à ajouter à la carte

👆 ÉTAPES :
1. Section Menu → Crayon 📝
2. Modal "Gestion du Menu" s'ouvre
3. Catégorie "Pizzas" → "Ajouter plat"
4. Tu remplis :
   - Nom : "Pizza aux Truffes"
   - Description : "Sauce tomate, mozzarella, truffes noires, roquette"
   - Prix : "24€"
5. "Sauvegarder"

👀 CE QUE VOIT LE CLIENT :
- La pizza apparaît dans la carte
- Prix aligné avec les autres plats
- Description appétissante
- Design professionnel
- "On dirait un vrai menu de restaurant étoilé !"
```

---

## 🎭 ANALOGIES SIMPLES

### **🎨 FSVB Studio = Atelier d'artiste**
- **Sidebar** = Palette de couleurs (outils de base)
- **Modal** = Chevalet professionnel (travail détaillé) 
- **Preview** = Toile (résultat artistique)
- **Client** = Mécène qui voit l'œuvre naître

### **🏗️ FSVB Studio = Chantier BTP**
- **Template** = Plans d'architecte (structure de base)
- **Configurator** = Gros œuvre (fondations, murs)
- **Modal** = Second œuvre (électricité, peinture, déco)
- **Preview** = Visite virtuelle (résultat final)

### **🍳 FSVB Studio = Cuisine avec chef**
- **Template** = Recette de base
- **Ingrédients** = Contenus du client (textes, images)
- **Configurator** = Préparation (découpe, assaisonnement)
- **Modal** = Cuisson (travail fin et précis)
- **Preview** = Présentation du plat (résultat gourmand)

---

## ❓ QUESTIONS FRÉQUENTES

### **"Pourquoi deux interfaces (Sidebar + Modal) ?"**
🎯 **Réponse** : Comme un smartphone !
- **Sidebar** = Écran d'accueil (accès rapide aux apps principales)
- **Modal** = Application complète (toutes les fonctions détaillées)

### **"Le client peut-il casser quelque chose ?"**
🛡️ **Réponse** : Impossible ! 
- Il ne touche à rien, il regarde seulement
- Seul toi as le contrôle du configurator
- Sauvegarde automatique à chaque modification

### **"Et si on se trompe ?"**
↩️ **Réponse** : Pas de panique !
- Historique des modifications (Ctrl+Z mental)
- Retour en arrière possible
- Sauvegarde de plusieurs versions

### **"Combien de temps pour un site ?"**
⏱️ **Réponse** : Session type
- **Landing Solo** : 1h (simple, direct)
- **Restaurant** : 1h30 (menu + photos)
- **Coach** : 2h (contenu plus riche)

### **"Le client voit vraiment en temps réel ?"**
⚡ **Réponse** : Oui, vraiment !
- Zéro délai, zéro rechargement
- Comme si tu dessinais sur sa feuille
- Effet "wow" garanti à chaque fois

---

## 🎯 CONSEILS POUR LES SESSIONS

### **🚀 Avant (Préparation)**
- [ ] Questionnaire envoyé au client
- [ ] Template choisi selon le métier
- [ ] Logo et photos reçus
- [ ] FSVB Studio ouvert et prêt

### **💪 Pendant (Animation)**
- [ ] Explique chaque étape avant de la faire
- [ ] Demande validation avant de passer au suivant
- [ ] Utilise le preview comme support de discussion
- [ ] Reste patient si le client change d'avis

### **✅ Après (Finalisation)**
- [ ] Dernière vérification ensemble
- [ ] Export du site final
- [ ] Livraison dans les 2h
- [ ] Formation rapide pour les mises à jour

---

## 🎉 POURQUOI FSVB STUDIO EST MAGIQUE

### **✨ Pour TOI (Admin)**
- **Gain de temps** : Plus de va-et-vient, tout en une session
- **Client ravi** : Il voit naître son site sous ses yeux  
- **Moins de stress** : Pas d'incompréhension, validation immédiate
- **Plus de ventes** : Effet wow qui justifie tes tarifs

### **✨ Pour le CLIENT**
- **Transparence totale** : Il voit où vont ses €€€
- **Contrôle** : Il valide chaque choix en temps réel
- **Confiance** : Il comprend ce qu'il achète
- **Excitation** : Comme regarder sa maison se construire !

### **✨ L'EFFET WAOUH**
> *"Je n'ai jamais vu ça ! C'est incroyable de voir mon site se créer en direct !"*
> 
> *"C'est exactement ce que j'avais en tête !"*
> 
> *"On dirait un site qui coûte 5000€ !"*

---

## 🎬 SCÉNARIO COMPLET : SESSION RESTAURANT

### **📞 Appel de préparation**
```
Toi : "Bonjour M. Rossi ! Demain on crée votre site ensemble.
      Avez-vous votre logo et quelques photos de plats ?"

Client : "Oui tout est prêt ! Comment ça va se passer ?"

Toi : "Session de 1h30 en visio. Vous allez voir votre site 
      naître en direct. Préparez votre carte des vins aussi !"
```

### **💻 Début de session**
```
[Partage d'écran activé]

Toi : "Alors M. Rossi, on commence ! Voici FSVB Studio.
      Je vais créer votre site et vous allez tout voir en direct."

Client : "Parfait ! J'ai hâte de voir ça."

Toi : *Clique "Nouveau projet" → Template Restaurant*
      "Voici la base de votre futur site !"

Client : "Oh ! Ça ressemble déjà à un restaurant !"
```

### **🎨 Configuration rapide**
```
Toi : "On commence par les infos de base..."
      *Sidebar → Nom entreprise*
      "Comment s'appelle votre restaurant ?"

Client : "Ristorante Bella Vista"

Toi : *Tape dans le champ*
      "Regardez la barre de menu !"

Client : "Incroyable ! Le nom apparaît en direct !"

Toi : *Upload du logo*
      "Et voici votre logo..."

Client : "Parfait ! Mon identité est déjà là !"
```

### **🍽️ Section par section**

#### **Hero (Accueil)**
```
Toi : *Clique crayon section Hero*
      "Quel message voulez-vous pour accueillir vos clients ?"

Client : "Quelque chose sur la tradition familiale..."

Toi : *Tape : "Tradition familiale depuis 1985"*
      "Comme ça ?"

Client : "Parfait ! Et pour l'image de fond ?"

Toi : *Upload photo terrasse*
      "Voilà votre belle terrasse !"

Client : "Wow ! On s'y croirait déjà !"
```

#### **Menu/Carte**
```
Toi : *Crayon section Menu*
      "Maintenant votre carte. Commençons par les antipasti ?"

Client : "Oui ! Bruschetta maison, 12€"

Toi : *Ajouter plat → Rempli les champs*
      "Description ?"

Client : "Tomates fraîches, basilic, huile d'olive extra vierge"

Toi : *Sauvegarde*
      "Regardez votre menu !"

Client : "On dirait la carte d'un grand restaurant ! 
         Mes clients vont adorer ça !"
```

#### **Témoignages**
```
Client : "J'ai de super avis Google, je peux les mettre ?"

Toi : *Crayon Testimonials*
      "Bien sûr ! Donnez-moi le meilleur."

Client : "5 étoiles : 'Cuisine authentique, accueil chaleureux,
         on se sent comme en famille. Merci pour cette soirée
         mémorable !' - Sophie L."

Toi : *Ajoute le témoignage*
      "Et voilà !"

Client : "Fantastique ! Ça donne vraiment confiance !"
```

### **✅ Finalisation**
```
Toi : "Voilà M. Rossi ! Qu'est-ce que vous en pensez ?"

Client : "Je suis bluffé ! C'est exactement ce que je voulais.
         Mes clients vont être impressionnés !"

Toi : "Parfait ! Je finalise tout ça et vous recevez 
      le lien de votre site dans 2h maximum."

Client : "Génial ! Merci beaucoup, cette session était 
         passionnante ! Je recommanderai à tous mes amis 
         restaurateurs !"
```

---

## 🏆 CONCLUSION

FSVB Studio n'est pas juste un outil, c'est une **expérience collaborative** qui transforme la création de site web en moment magique partagé avec tes clients.

### **🎯 L'objectif** : 
Que ton client reparte avec :
- ✅ Un site professionnel parfait
- ✅ La compréhension de ce qu'il a acheté  
- ✅ L'envie de te recommander
- ✅ Une expérience mémorable

### **🚀 Le secret** :
La magie du temps réel qui transforme une prestation technique en spectacle fascinant !

---

*Maintenant tu as toutes les clés pour expliquer FSVB Studio à n'importe qui ! 🎉*