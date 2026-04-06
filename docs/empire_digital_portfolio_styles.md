## EMPIRE DIGITAL – STYLE GUIDE (Portfolio)

> Version basée sur Rename IA, avec adaptations portfolio.

---

### 1. Design Tokens (variables.css)

```css
:root {
  --accent-gold: #CFAE60;
  --accent-gold-bright: #FFD700;
  --accent-gold-soft: #E6C875;

  --color-bg-start: #04040E;
  --color-bg-middle: #14133F;
  --color-bg-end: #211F68;

  --color-white: #FFFFFF;
  --color-black: #000000;

  --text-primary: #FFFFFF;
  --text-secondary: #E0E0E0;
  --text-tertiary: #B0B0B0;

  --font-primary: 'Montserrat', sans-serif;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.5rem;

  --font-size-hero-title: 3.2rem;
  --font-size-hero-subtitle: 1.2rem;

  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 999px;

  --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 12px 30px rgba(0, 0, 0, 0.35);

  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-bg-hover: rgba(255, 255, 255, 0.10);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  --blur-sm: 4px;
  --blur-md: 10px;
  --blur-lg: 16px;

  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;

  --z-navbar: 1000;
  --z-drawer: 1100;
}
```

---

### 2. Fond global & sections

```css
body {
  background: linear-gradient(90deg, var(--color-bg-start), var(--color-bg-middle), var(--color-bg-end));
  background-attachment: fixed;
  color: var(--text-primary);
}

.sectionBgA {
  background: linear-gradient(90deg, var(--color-bg-start), var(--color-bg-middle), var(--color-bg-end));
}

.sectionBgB {
  background: linear-gradient(90deg, var(--color-bg-end), var(--color-bg-middle), var(--color-bg-start));
}

.section {
  padding: 4rem 0;
}
```

---

### 3. NavBar

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  height: 64px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur-md));
  border-bottom: 1px solid var(--accent-gold);
}
```

---

### 4. Drawer mobile

```css
.drawer {
  position: fixed;
  top: 64px;
  right: 0;
  bottom: 0;
  width: 280px;
  background: linear-gradient(135deg, var(--color-bg-start), var(--color-bg-middle), var(--color-bg-end));
  backdrop-filter: blur(var(--blur-lg));
  padding: 1.5rem;
}
```

---

### 5. Glass cards

```css
.glassCard {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur-md));
  border-radius: var(--radius-xl);
  border: 1px solid var(--glass-border);
  padding: 1.75rem;
  transition: transform var(--transition-normal);
}
```

---

### 6. Sidebars (services / templates)

```css
.sidebar {
  width: 260px;
  position: sticky;
  top: 80px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur-md));
  border-right: 1px solid var(--glass-border);
  padding: 1.5rem;
}
```

---

### 7. Footer

```css
.footer {
  padding: 2.5rem 0;
  border-top: 1px solid var(--accent-gold);
  background: linear-gradient(180deg, rgba(4, 4, 14, .6), var(--color-bg-start));
}
```

---

### 8. Hero

```css
.hero {
  min-height: calc(100vh - 64px);
  padding-top: 96px;
  text-align: center;
}

.heroTitle {
  font-size: var(--font-size-hero-title);
  font-weight: var(--font-weight-bold);
}
```

---

## Règle générale d'application
- Remplacer tout hex hardcodé par des variables
- Utiliser `.sectionBgA / .sectionBgB`
- NavBar fixed + ligne or
- Sidebars glass fixes
- Footer fond sombre + bordure or

---

## Objectif
Alignement total avec l'identité Rename IA, adapté au portfolio et aux pages Services & Templates.

