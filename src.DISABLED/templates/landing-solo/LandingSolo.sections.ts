/*
=== STRUCTURE SECTIONS LANDING SOLO ===
Configuration pour l'activation/désactivation des sections du template LandingSolo
*/

export interface LandingSectionConfig {
  id: string;
  label: string;
  enabled: boolean;
  required?: boolean; // Sections obligatoires qui ne peuvent pas être désactivées
  configurable?: boolean; // Si la section accepte des props configurables
  description?: string; // Description de la section
  props?: Record<string, any>; // Props disponibles pour la configuration
}

/*
ANALYSE STRUCTURELLE - 17 SECTIONS IDENTIFIÉES :
1. Navbar - Navigation principale (OBLIGATOIRE)
2. Hero - Section d'accueil principale (OBLIGATOIRE) 
3. Trust Bar - Statistiques de confiance (OPTIONNELLE)
4. About - Présentation "Pourquoi me choisir" (OPTIONNELLE)
5. Services - Grille des offres/packages (OBLIGATOIRE)
6. Portfolio - Réalisations clients (OPTIONNELLE)
7. Features - Avantages/différenciation (OPTIONNELLE)
8. Process - Comment ça marche (OPTIONNELLE)
9. Comparison - Avec/sans site (OPTIONNELLE)
10. CTA Intermédiaire - Appel à l'action milieu de page (OPTIONNELLE)
11. Testimonials - Témoignages clients (OPTIONNELLE)
12. FAQ - Questions fréquentes (OPTIONNELLE)
13. Urgency - Badge d'urgence (OPTIONNELLE)
14. Guarantee - Section garanties (OPTIONNELLE)
15. Contact - Formulaire de contact (OBLIGATOIRE)
16. CTA Final - Dernière chance de conversion (OPTIONNELLE)
17. Footer - Pied de page (OBLIGATOIRE)
*/

export const landingSectionsDefault: LandingSectionConfig[] = [
  {
    id: "navbar",
    label: "Navigation",
    enabled: true,
    required: true,
    configurable: true
  },
  {
    id: "hero",
    label: "Hero Principal",
    enabled: true,
    required: true,
    configurable: true,
    props: {
      title: "Sites Vitrines Premium",
      subtitle: "Livrés en 3 jours", 
      description: "Transformez votre vision en réalité digitale avec nos sites sur-mesure",
      primaryCtaText: "Commander mon site",
      primaryCtaLink: "#contact",
      secondaryCtaText: "Voir portfolio",
      secondaryCtaLink: "#portfolio"
    }
  },
  {
    id: "trustbar",
    label: "Statistiques de Confiance",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "about",
    label: "À Propos / Pourquoi Nous Choisir",
    enabled: true,
    required: false,
    configurable: true,
    props: {
      title: "Pourquoi Me Choisir ?",
      description: "Passionnée par la création digitale, je transforme vos idées en sites web performants",
      image: "/api/placeholder/400/300",
      values: [
        { icon: "⚡", title: "Livraison Express", description: "Votre site prêt en 3 jours maximum" },
        { icon: "🎨", title: "Design Sur-Mesure", description: "Création unique adaptée à votre image" },
        { icon: "📱", title: "100% Responsive", description: "Parfait sur mobile, tablette et desktop" }
      ]
    }
  },
  {
    id: "services",
    label: "Mes Offres / Services",
    enabled: true,
    required: true,
    configurable: true,
    props: {
      title: "Mes Offres",
      subtitle: "Des solutions adaptées à tous vos besoins",
      services: [
        {
          id: "flash",
          title: "Site Flash",
          price: "350€",
          description: "Parfait pour commencer en ligne rapidement",
          features: ["Site 1-3 pages", "Design responsive", "Formulaire contact"]
        },
        {
          id: "start", 
          title: "Site Start",
          price: "550€",
          description: "Solution complète pour votre présence digitale",
          features: ["Site 5-10 pages", "Blog intégré", "SEO optimisé"]
        }
      ]
    }
  },
  {
    id: "portfolio",
    label: "Portfolio / Réalisations",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "features",
    label: "Avantages / Pourquoi Me Choisir",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "process",
    label: "Comment Ça Marche",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "comparison",
    label: "Comparaison Avec/Sans",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "cta-middle",
    label: "CTA Intermédiaire",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "testimonials",
    label: "Témoignages Clients",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "faq",
    label: "FAQ",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "urgency",
    label: "Badge d'Urgence",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "guarantee",
    label: "Garanties",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "contact",
    label: "Formulaire de Contact",
    enabled: true,
    required: true,
    configurable: true,
    props: {
      title: "Prêt à Démarrer Votre Projet ?",
      subtitle: "Discutons ensemble de vos besoins",
      email: "contact@fsvbstudio.com",
      phone: "+33 6 12 34 56 78",
      address: "Lyon, France",
      formTitle: "Parlons de votre projet",
      ctaText: "Envoyer le message"
    }
  },
  {
    id: "cta-final",
    label: "CTA Final",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "footer",
    label: "Pied de Page",
    enabled: true,
    required: true,
    configurable: true
  }
];

/*
PROPS CONFIGURABLES IDENTIFIÉES PAR SECTION :

1. NAVBAR:
- brand: string (nom de l'entreprise)
- items: NavItem[] (liens de navigation)

2. HERO: 
- title: string (titre principal)
- subtitle: string (sous-titre)
- description: string (description)
- primaryCTA: {text, href}
- secondaryCTA: {text, href}
- backgroundImage: string

3. TRUSTBAR:
- stats: StatItem[] (statistiques)

4. ABOUT:
- title: string
- description: string
- image: string
- values: {title, description, icon}[]

5. SERVICES:
- title: string
- subtitle: string
- services: Service[] (packages/offres)

6. PORTFOLIO:
- title: string
- subtitle: string
- items: PortfolioProject[]
- columns: number

7. FEATURES:
- title: string
- subtitle: string
- features: Feature[]
- columns: number

8. PROCESS:
- title: string
- subtitle: string
- steps: ProcessStep[]

9. COMPARISON:
- title: string
- withoutTitle: string
- withoutDescription: string
- withTitle: string
- withDescription: string

10. CTA-MIDDLE:
- title: string
- description: string
- primaryButton: {text, href}

11. TESTIMONIALS:
- title: string
- subtitle: string
- testimonials: Testimonial[]

12. FAQ:
- title: string
- subtitle: string
- faqs: FAQItem[]

13. URGENCY:
- text: string
- style: 'default' | 'warning' | 'success'

14. GUARANTEE:
- title: string
- description: string
- icon: string

15. CONTACT:
- title: string
- subtitle: string
- onSubmit: function

16. CTA-FINAL:
- title: string
- description: string
- primaryButton: {text, href}

17. FOOTER:
- brand: string
- copyright: string
- sections: FooterSection[]
- socialLinks: SocialLink[]
*/