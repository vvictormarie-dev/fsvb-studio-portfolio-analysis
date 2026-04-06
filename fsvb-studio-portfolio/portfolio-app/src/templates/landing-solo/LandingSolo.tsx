/*
=== TEMPLATE LANDING SOLO - PLAN DE MODULARISATION ===

STRUCTURE ACTUELLE : 17 sections identifiées
📁 Configuration détaillée dans : ./LandingSolo.sections.ts

PLAN D'ACTIVATION/DÉSACTIVATION DES SECTIONS :
✅ Sections OBLIGATOIRES (toujours affichées) :
   - Navbar, Hero, Services, Contact, Footer
✅ Sections OPTIONNELLES (peuvent être désactivées) :
   - TrustBar, About, Portfolio, Features, Process, Comparison, 
   - CTA-Middle, Testimonials, FAQ, Urgency, Guarantee, CTA-Final

SYSTÈME MODULAIRE À IMPLÉMENTER :
1. Props interface avec sectionsConfig: LandingSectionConfig[]
2. Fonction isEnabled(sectionId) pour vérifier l'activation
3. Rendu conditionnel : {isEnabled('portfolio') && <PortfolioGrid />}
4. Props configurables pour chaque section (titres, textes, données)

PERSONNALISATION DYNAMIQUE :
- Injection des données du configurateur (nom, couleurs, contact)
- Remplacement des données statiques par des props
- Conservation de la richesse du contenu avec des fallbacks

PROPS FUTURES À AJOUTER :
❌ sectionsConfig: LandingSectionConfig[] - Configuration des sections
❌ companyName: string - Nom de l'entreprise
❌ contactInfo: {email, phone} - Informations de contact
❌ customColors: {primary, secondary, accent} - Couleurs personnalisées
❌ customContent: Record<string, any> - Contenu personnalisé par section

OBJECTIF FINAL : Template modulaire + JSON de configuration = Site client généré facilement
*/

import React, { useState } from 'react';
import { landingSectionsDefault, type LandingSectionConfig } from './LandingSolo.sections';
import { 
  Navbar,
  Section,
  Footer,
  HeroSection,
  TrustBar,
  AboutSection,
  ServicesGrid,
  PortfolioGrid,
  FeaturesGrid,
  ProcessTimeline,
  FAQSection,
  ContactForm,
  CTABox,
  UrgencyBadge,
  TestimonialCard
} from '../components';
import type { 
  Service,
  PortfolioProject,
  Feature,
  ProcessStep as ProcessStepData,
  FAQItem,
  Testimonial,
  StatItem
} from '../components/types';
import { ThemeSelector } from '../components/ThemeSelector';
import { EditButton } from '../../components/EditButton';
import '../styles/themes.css';
import '../styles/template-base.css';
import '../styles/template-components.css';

interface LandingSoloProps {
  hideThemeSelector?: boolean;
  sectionsConfig?: LandingSectionConfig[];
  // ✅ nouvelles props pour personnaliser le Hero
  heroTitleOverride?: string;
  heroSubtitleOverride?: string;
  heroCtaLabelOverride?: string;
  // ✅ nouvelles props pour personnaliser brand (navbar/footer)
  formData?: {
    companyName?: string;
    logoUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    services?: {
      sectionTitle?: string;
      sectionSubtitle?: string;
    };
  };
  // Section-specific overrides (de section.props)
  navbarProps?: {
    logoText?: string;
    logoUrl?: string;
    layout?: string;
  };
  footerProps?: {
    brandText?: string;
    brandLogoUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
  // 🖍️ Callback pour édition directe des sections
  onEditSection?: (sectionId: string) => void;
}

export const LandingSolo: React.FC<LandingSoloProps> = ({ 
  hideThemeSelector = false, 
  sectionsConfig,
  heroTitleOverride,
  heroSubtitleOverride,
  heroCtaLabelOverride,
  formData,
  navbarProps,
  onEditSection
}) => {
  const [currentTheme, setCurrentTheme] = useState('empire');

  // Configuration des sections
  const sections: LandingSectionConfig[] = sectionsConfig ?? landingSectionsDefault;

  const isSectionEnabled = (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section) return false;
    
    // Si la section est marquée comme obligatoire, on force true
    if (section.required) return true;
    
    return section.enabled !== false;
  };

  // Helper functions for brand data fallbacks
  const getNavbarBrandText = () => {
    return navbarProps?.logoText || formData?.companyName || "Empire Digital";
  };

  const getFooterBrandText = () => {
    return footerPropsConfig?.brandText || formData?.companyName || "FSVB Studio";
  };

  // Générer dynamiquement les liens de navigation selon les sections cochées
  const getNavbarLinks = () => {
    const visibleSectionIds = navbarPropsConfig?.visibleSectionIds as string[] || [];
    
    // Mapping des IDs de section vers les liens
    const sectionToLinkMap: Record<string, { label: string; href: string }> = {
      'hero': { label: 'Accueil', href: '#hero' },
      'about': { label: 'À propos', href: '#about' },
      'services': { label: 'Services', href: '#services' },
      'portfolio': { label: 'Portfolio', href: '#portfolio' },
      'features': { label: 'Avantages', href: '#features' },
      'process': { label: 'Process', href: '#process' },
      'testimonials': { label: 'Témoignages', href: '#testimonials' },
      'faq': { label: 'FAQ', href: '#faq' },
      'contact': { label: 'Contact', href: '#contact' }
    };
    
    // Si pas de sections cochées, utiliser la navigation par défaut
    if (visibleSectionIds.length === 0) {
      return [
        { label: 'Accueil', href: '#hero', active: true },
        { label: 'Services', href: '#services' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Process', href: '#process' },
        { label: 'Contact', href: '#contact' }
      ];
    }
    
    // Générer les liens selon les sections cochées
    return visibleSectionIds.map((sectionId, index) => ({
      ...sectionToLinkMap[sectionId],
      active: index === 0 // Premier élément actif
    })).filter(link => link.label); // Filtrer les sections non mappées
  };

  // Générer dynamiquement les sections du footer selon les sections cochées
  const getFooterSections = () => {
    const footerSectionIds = footerPropsConfig?.footerSectionIds as string[] || [];
    
    // Mapping des IDs de section vers les liens du footer
    const sectionToFooterLinkMap: Record<string, { label: string; href: string }> = {
      'hero': { label: 'Accueil', href: '#hero' },
      'about': { label: 'À propos', href: '#about' },
      'services': { label: 'Services', href: '#services' },
      'portfolio': { label: 'Portfolio', href: '#portfolio' },
      'features': { label: 'Avantages', href: '#features' },
      'process': { label: 'Process', href: '#process' },
      'testimonials': { label: 'Témoignages', href: '#testimonials' },
      'faq': { label: 'FAQ', href: '#faq' },
      'contact': { label: 'Contact', href: '#contact' }
    };
    
    // Si pas de sections cochées pour le footer, utiliser la structure par défaut
    if (footerSectionIds.length === 0) {
      return [
        {
          title: 'Services',
          links: [
            { label: 'Site Flash', href: '#services' },
            { label: 'Site Start', href: '#services' },
            { label: 'Site Pro', href: '#services' }
          ]
        },
        {
          title: 'Liens Utiles',
          links: [
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Process', href: '#process' },
            { label: 'Contact', href: '#contact' }
          ]
        }
      ];
    }
    
    // Générer une seule section "Navigation" avec les liens cochés
    return [
      {
        title: 'Navigation',
        links: footerSectionIds.map(sectionId => sectionToFooterLinkMap[sectionId]).filter(link => link)
      }
    ];
  };

  // Data examples
  const services: Service[] = [
    {
      id: 'flash',
      icon: '⚡',
      title: 'Site Flash',
      price: '350€',
      description: 'Parfait pour commencer en ligne rapidement',
      features: [
        'Site 1-3 pages',
        'Design responsive',
        'Formulaire contact',
        'Optimisé mobile',
        'Livraison 48h'
      ]
    },
    {
      id: 'start',
      icon: '🚀',
      title: 'Site Start',
      price: '550€',
      description: 'Solution complète pour votre présence web',
      features: [
        'Site 4-6 pages',
        'Blog intégré',
        'WhatsApp chat',
        'Analytics',
        'SEO optimisé',
        'Formation incluse'
      ]
    },
    {
      id: 'pro',
      icon: '💎',
      title: 'Site Pro',
      price: '800€',
      description: 'Plateforme professionnelle avancée',
      features: [
        'Site illimité',
        'E-commerce léger',
        'Réservations en ligne',
        'Multi-langues',
        'Support 6 mois',
        'Maintenance incluse'
      ]
    }
  ];

  const portfolio: PortfolioProject[] = [
    {
      id: '1',
      title: 'Restaurant Le Gourmet',
      description: 'Site vitrine avec système de réservation',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
      category: 'Restaurant',
      technologies: ['React', 'CSS']
    },
    {
      id: '2',
      title: 'Cabinet Dentaire Martin',
      description: 'Site médical avec prise de rendez-vous',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80',
      category: 'Médical',
      technologies: ['Vue', 'PHP']
    },
    {
      id: '3',
      title: 'Coach Sportif Alex',
      description: 'Landing page avec formulaires coach',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      category: 'Coaching',
      technologies: ['React', 'Node.js']
    },
    {
      id: '4',
      title: 'Architecte Dubois',
      description: 'Portfolio professionnel élégant',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
      category: 'Architecture',
      technologies: ['Next.js', 'Tailwind']
    },
    {
      id: '5',
      title: 'Salon de Beauté Zen',
      description: 'Site avec booking en ligne',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80',
      category: 'Beauté',
      technologies: ['WordPress', 'PHP']
    },
    {
      id: '6',
      title: 'Consultant Finance Pro',
      description: 'Site corporate avec blog',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
      category: 'Finance',
      technologies: ['React', 'TypeScript']
    }
  ];

  const features: Feature[] = [
    {
      id: '1',
      icon: '⚡',
      title: 'Livraison Express',
      description: 'Votre site prêt en 3 jours maximum, sans compromis sur la qualité'
    },
    {
      id: '2',
      icon: '📱',
      title: '100% Responsive',
      description: 'Parfait sur mobile, tablette et desktop. Testé sur tous les appareils'
    },
    {
      id: '3',
      icon: '🚀',
      title: 'Performance Optimale',
      description: 'Temps de chargement ultra-rapide pour une meilleure expérience utilisateur'
    },
    {
      id: '4',
      icon: '🎯',
      title: 'SEO Intégré',
      description: 'Optimisé pour Google dès le lancement pour attirer plus de clients'
    }
  ];

  const processSteps: ProcessStepData[] = [
    {
      id: '1',
      number: 1,
      title: 'Briefing & Analyse',
      description: 'On définit ensemble vos besoins, objectifs et style souhaité',
      icon: '💬',
      duration: '30min'
    },
    {
      id: '2',
      number: 2,
      title: 'Création & Design',
      description: 'Je développe votre site selon vos spécifications',
      icon: '🎨',
      duration: '2 jours'
    },
    {
      id: '3',
      number: 3,
      title: 'Tests & Révisions',
      description: 'Validation complète et ajustements selon vos retours',
      icon: '🔍',
      duration: '1 jour'
    },
    {
      id: '4',
      number: 4,
      title: 'Mise en Ligne',
      description: 'Déploiement et formation pour gérer votre nouveau site',
      icon: '🚀',
      duration: '2h'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      role: 'Restauratrice',
      company: 'Le Petit Gourmet',
      rating: 5,
      text: 'FSVB Studio a transformé ma vision en réalité ! Mon site attire maintenant 3x plus de réservations.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&q=80'
    },
    {
      id: '2',
      name: 'Thomas Martin',
      role: 'Coach Sportif',
      company: 'Fit & Strong',
      rating: 5,
      text: 'Délai respecté, qualité au rendez-vous. Je recommande vivement pour tous vos projets web !',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      role: 'Architecte',
      company: 'Studio Laurent',
      rating: 5,
      text: 'Un site élégant qui reflète parfaitement mon style. Mes clients sont impressionnés !',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80'
    }
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Combien de temps pour créer mon site ?',
      answer: 'Entre 2 et 3 jours selon la formule choisie. Le site Flash est livré en 48h, les autres formules en 72h maximum.'
    },
    {
      id: '2',
      question: 'Le prix inclut-il l\'hébergement ?',
      answer: 'L\'hébergement est à votre charge (environ 5€/mois). Je peux vous conseiller et vous aider à le configurer.'
    },
    {
      id: '3',
      question: 'Puis-je modifier mon site après livraison ?',
      answer: 'Oui ! Je vous forme à la gestion de votre site et vous avez 1 mois de support gratuit pour toute question.'
    },
    {
      id: '4',
      question: 'Mon site sera-t-il visible sur Google ?',
      answer: 'Absolument ! Tous mes sites sont optimisés SEO. Indexation Google sous 48h et conseils inclus.'
    },
    {
      id: '5',
      question: 'Que se passe-t-il si je ne suis pas satisfait ?',
      answer: 'Révisions illimitées pendant 15 jours. Si vraiment ça ne va pas, je vous rembourse intégralement.'
    },
    {
      id: '6',
      question: 'Proposez-vous de la maintenance ?',
      answer: 'Oui, forfaits maintenance à partir de 50€/mois pour mises à jour, sauvegardes et support technique.'
    }
  ];

  // Helper pour récupérer les props d'une section spécifique avec fallbacks
  const getSectionProps = (sectionId: string) => {
    const section = sectionsConfig?.find(s => s.id === sectionId);
    // Import des defaults depuis sectionPropsMapping
    const getSectionDefaults = (sectionId: string) => {
      // Simplified version - you might want to import the actual function
      const defaultsMap: any = {
        'services': { sectionTitle: 'Mes Offres', sectionSubtitle: 'Choisissez la formule adaptée à vos besoins' },
        'portfolio': { sectionTitle: 'Mes Réalisations', sectionSubtitle: 'Découvrez quelques projets que j\'ai créés pour mes clients' },
        'features': { sectionTitle: 'Pourquoi Me Choisir', sectionSubtitle: 'Ce qui fait la différence dans mes prestations' },
        'testimonials': { sectionTitle: 'Témoignages', sectionSubtitle: 'Ce que disent mes clients' },
        'faq': { sectionTitle: 'Questions Fréquentes', sectionSubtitle: 'Tout ce que vous devez savoir' }
      };
      return defaultsMap[sectionId] || {};
    };
    
    const defaults = getSectionDefaults(sectionId);
    return { ...defaults, ...(section?.props || {}) };
  };

  // Récupérer les props dynamiques de la section hero
  const heroProps = getSectionProps('hero');
  
  // Récupérer les props dynamiques des autres sections
  const aboutProps = getSectionProps('about');
  const contactProps = getSectionProps('contact');
  
  // Récupérer les props dynamiques des sections Niveau 2
  const trustbarProps = getSectionProps('trustbar');
  const guaranteeProps = getSectionProps('guarantee');
  const ctaMiddleProps = getSectionProps('cta-middle');
  const comparisonProps = getSectionProps('comparison');
  const ctaFinalProps = getSectionProps('cta-final');
  const footerPropsConfig = getSectionProps('footer');
  const navbarPropsConfig = getSectionProps('navbar');

  // Variables de surcharge pour Trustbar
  const trustStats: StatItem[] = [
    { 
      value: trustbarProps?.stat1Value || '50+', 
      label: trustbarProps?.stat1Label || 'Sites créés',
      icon: trustbarProps?.stat1Icon || 'users'
    },
    { 
      value: trustbarProps?.stat2Value || '48h', 
      label: trustbarProps?.stat2Label || 'Livraison moyenne',
      icon: trustbarProps?.stat2Icon || 'clock'
    },
    { 
      value: trustbarProps?.stat3Value || '100%', 
      label: trustbarProps?.stat3Label || 'Clients satisfaits',
      icon: trustbarProps?.stat3Icon || 'star'
    },
    { 
      value: trustbarProps?.stat4Value || '3 ans', 
      label: trustbarProps?.stat4Label || 'Expérience',
      icon: trustbarProps?.stat4Icon || 'calendar'
    }
  ];

  const heroContent = {
    title: 'Sites Vitrines Premium',
    subtitle: 'Livrés en 3 jours',
    description: 'FSVB Studio crée votre présence en ligne professionnelle optimisée par IA pour attirer plus de clients et développer votre activité.',
    primaryCTA: {
      text: 'Voir mes offres',
      href: '#services'
    },
    secondaryCTA: {
      text: 'Portfolio',
      href: '#portfolio'
    }
  };

  // Variables de surcharge pour le Hero
  const heroTitle = heroProps?.title || (heroTitleOverride ?? heroContent.title);
  const heroSubtitle = heroProps?.subtitle || (heroSubtitleOverride ?? heroContent.subtitle);
  const heroCtaLabel = heroProps?.ctaButton || (heroCtaLabelOverride ?? heroContent.primaryCTA.text);
  const heroDescription = heroProps?.description || heroContent.description;
  
  // Variables de surcharge pour About
  const aboutTitle = aboutProps?.title || "Pourquoi choisir mes services ?";
  const aboutDescription = aboutProps?.description || "Passionnée par le web depuis 3 ans, je vous aide à créer une présence en ligne qui convertit vos visiteurs en clients.";
  const aboutImage = aboutProps?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80";
  
  // Variables de surcharge pour Services (utilise formData)
  const servicesTitle = formData?.services?.sectionTitle || "Mes Offres";
  const servicesSubtitle = formData?.services?.sectionSubtitle || "Choisissez la formule adaptée à vos besoins";
  
  // Variables de surcharge pour Contact
  const contactTitle = contactProps?.title || "Contactez-Moi";
  const contactSubtitle = contactProps?.subtitle || "Prêt à créer votre site ? Parlons-en !";
  
  // Variables de surcharge pour Garanties
  const guaranteeIcon = guaranteeProps?.icon || "🛡️";
  const guaranteeTitle = guaranteeProps?.title || "Mes Garanties";
  const guaranteeDescription = guaranteeProps?.description || "Satisfait ou remboursé sous 15 jours";
  
  // Variables de surcharge pour CTA Middle
  const ctaMiddleTitle = ctaMiddleProps?.title || "Prêt à Démarrer Votre Projet ?";
  const ctaMiddleDescription = ctaMiddleProps?.description || "Discutons ensemble de vos besoins et créons le site qui va booster votre activité";
  const ctaMiddleButtonText = ctaMiddleProps?.buttonText || "Planifier un appel";
  
  // Variables de surcharge pour Comparison
  const comparisonTitle = comparisonProps?.title || "Avec ou sans site professionnel";
  const withoutTitle = comparisonProps?.withoutTitle || "Sans Site Web";
  const withoutDescription = comparisonProps?.withoutDescription || "Visibilité limitée, difficile à trouver, pas de crédibilité";
  const withTitle = comparisonProps?.withTitle || "Avec Site Pro";
  const withDescription = comparisonProps?.withDescription || "Présence 24/7, trouvé sur Google, image professionnelle";
  
  // Variables de surcharge pour CTA Final
  const ctaFinalTitle = ctaFinalProps?.title || "Transformez Votre Présence En Ligne Dès Aujourd'hui";
  const ctaFinalDescription = ctaFinalProps?.description || "Ne perdez plus de clients à cause d'une absence digitale. Votre nouveau site vous attend !";
  const ctaFinalButtonText = ctaFinalProps?.buttonText || "Commander mon site";
  
  // Variables de surcharge pour Footer
  const githubUrl = footerPropsConfig?.githubUrl || "#";
  const twitterUrl = footerPropsConfig?.twitterUrl || "#";

  // Gestion conditionnelle du wrapper selon le mode
  const wrapperProps = hideThemeSelector
    ? { className: 'templateWrapper' } // Mode configurateur → aucun data-theme interne
    : { className: 'templateWrapper', 'data-theme': currentTheme }; // Mode autonome → thème interne actif

  return (
    <div {...wrapperProps}>
      {/* 
      TODO: SECTION 1 - NAVBAR (OBLIGATOIRE)
      - Activation: Toujours affichée (required: true)
      - Props configurables: brand (nom entreprise), items (navigation)
      - Données statiques: Navigation fixe
      - Rendu futur: {isEnabled('navbar') && <Navbar brand={companyName} items={customNav} />}
      */}
      {isSectionEnabled('navbar') && (
        <Navbar 
          brand={getNavbarBrandText()}
          logoUrl={navbarProps?.logoUrl || formData?.logoUrl}
          layout={navbarProps?.layout as 'classic' | 'centered' | 'split' || 'classic'}
          items={getNavbarLinks()}
        />
      )}
      
      {!hideThemeSelector && <ThemeSelector onThemeChange={setCurrentTheme} />}
      
      {/* 
      TODO: SECTION 2 - HERO (OBLIGATOIRE)
      - Activation: Toujours affichée (required: true)
      - Props configurables: title, subtitle, description, CTAs, backgroundImage
      - Données actuelles: Contenu statique "Sites Vitrines Premium"
      - Rendu futur: title={customContent.hero?.title || 'Sites Vitrines Premium'}
      */}
      {isSectionEnabled('hero') && (
        <section id="hero" data-section="hero">
          {onEditSection && (
            <EditButton sectionId="hero" onEdit={onEditSection} />
          )}
          <HeroSection
            title={heroTitle}
            subtitle={heroSubtitle}
            description={heroDescription}
            primaryCTA={{
              text: heroCtaLabel,
              href: '#services'
            }}
            backgroundImage={heroProps?.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"}
          />
        </section>
      )}
      
      {/* 
      TODO: SECTION 3 - TRUST BAR (OPTIONNELLE)
      - Activation: {isEnabled('trustbar') && ...}
      - Props configurables: stats (statistiques de confiance)
      - Données actuelles: trustStats statique (50+ sites, 48h, 100%, 3 ans)
      - Rendu futur: stats={customContent.trustbar?.stats || trustStats}
      */}
      {isSectionEnabled('trustbar') && (
        <div data-section="trustbar">
          <TrustBar stats={trustStats} />
        </div>
      )}
      
      {/* 
      TODO: SECTION 4 - ABOUT (OPTIONNELLE)
      - Activation: {isEnabled('about') && ...}
      - Props configurables: title, description, image, values
      - Données actuelles: "Pourquoi choisir mes services" + valeurs fixes
      - Rendu futur: title={customContent.about?.title || 'Pourquoi choisir mes services ?'}
      */}
      {isSectionEnabled('about') && (
        <Section id="about" data-section="about">
          {onEditSection && (
            <EditButton sectionId="about" onEdit={onEditSection} />
          )}
          <AboutSection
            title={aboutTitle}
            description={aboutDescription}
            image={aboutImage}
            values={
              aboutProps?.values && aboutProps.values.length > 0 
                ? aboutProps.values
                : [
                    {
                      title: 'Expertise',
                      description: 'Technique approfondie',
                      icon: '🎯'
                    },
                    {
                      title: 'Design',
                      description: 'Moderne et professionnel',
                      icon: '🎨'
                    }
                  ]
            }
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 5 - SERVICES (OBLIGATOIRE)
      - Activation: Toujours affichée (required: true)
      - Props configurables: title, subtitle, services (packages/offres)
      - Données actuelles: services[] avec Flash/Start/Pro
      - Rendu futur: services={customContent.services || services}
      */}
      {isSectionEnabled('services') && (
        <Section id="services" data-section="services">
          {onEditSection && (
            <EditButton sectionId="services" onEdit={onEditSection} />
          )}
          <ServicesGrid
            title={getSectionProps('services')?.sectionTitle || servicesTitle}
            subtitle={getSectionProps('services')?.sectionSubtitle || servicesSubtitle}
            services={getSectionProps('services')?.packages || services}
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 6 - PORTFOLIO (OPTIONNELLE)
      - Activation: {isEnabled('portfolio') && ...}
      - Props configurables: title, subtitle, items, columns
      - Données actuelles: portfolio[] avec 6 projets exemples
      - Rendu futur: items={customContent.portfolio?.items || portfolio}
      */}
      {isSectionEnabled('portfolio') && (
        <Section id="portfolio" data-section="portfolio">
          {onEditSection && (
            <EditButton sectionId="portfolio" onEdit={onEditSection} />
          )}
          <PortfolioGrid
            title={getSectionProps('portfolio')?.sectionTitle || "Mes Réalisations"}
            subtitle={getSectionProps('portfolio')?.sectionSubtitle || "Découvrez quelques projets que j'ai créés pour mes clients"}
            items={getSectionProps('portfolio')?.projects || portfolio}
            columns={3}
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 7 - FEATURES (OPTIONNELLE)
      - Activation: {isEnabled('features') && ...}
      - Props configurables: title, subtitle, features, columns
      - Données actuelles: features[] avec 4 avantages
      - Rendu futur: features={customContent.features || features}
      */}
      {isSectionEnabled('features') && (
        <Section data-section="features">
          {onEditSection && (
            <EditButton sectionId="features" onEdit={onEditSection} />
          )}
          <FeaturesGrid
            title={getSectionProps('features')?.sectionTitle || "Pourquoi Me Choisir"}
            subtitle={getSectionProps('features')?.sectionSubtitle || "Ce qui fait la différence dans mes prestations"}
            features={
              getSectionProps('features')?.items && getSectionProps('features')?.items.length > 0 
                ? getSectionProps('features')?.items.slice(0, 3) // Force maximum 3 features configurées
                : features.slice(0, 3) // Utilise les hardcodées par défaut - max 3
            }
            columns={
              // Calcul dynamique du nombre de colonnes selon le nombre d'éléments
              (() => {
                const featuresArray = getSectionProps('features')?.items && getSectionProps('features')?.items.length > 0 
                  ? getSectionProps('features')?.items.slice(0, 3)
                  : features.slice(0, 3);
                return featuresArray.length <= 3 ? 3 : 4;
              })()
            }
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 8 - PROCESS (OPTIONNELLE)
      - Activation: {isEnabled('process') && ...}
      - Props configurables: title, subtitle, steps
      - Données actuelles: processSteps[] avec 4 étapes
      - Rendu futur: steps={customContent.process?.steps || processSteps}
      */}
      {isSectionEnabled('process') && (
        <Section id="process" data-section="process">
          {onEditSection && (
            <EditButton sectionId="process" onEdit={onEditSection} />
          )}
          <ProcessTimeline
            title={getSectionProps('process')?.sectionTitle || "Comment Ça Marche"}
            subtitle={getSectionProps('process')?.sectionSubtitle || "Un processus simple et efficace pour votre projet"}
            steps={getSectionProps('process')?.steps || processSteps}
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 9 - COMPARISON (OPTIONNELLE)
      - Activation: {isEnabled('comparison') && ...}
      - Props configurables: title, withoutTitle, withoutDesc, withTitle, withDesc
      - Données actuelles: Contenu statique "Avec ou sans site professionnel"
      - Rendu futur: Composant ComparisonSection avec props configurables
      */}
      {isSectionEnabled('comparison') && (
        <Section data-section="comparison">
          {onEditSection && (
            <EditButton sectionId="comparison" onEdit={onEditSection} />
          )}
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: 'var(--template-font-size-2xl)', color: 'var(--template-text)', marginBottom: '2rem' }}>
              {comparisonTitle}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ padding: '2rem', background: 'var(--template-card-bg)', borderRadius: '1rem', border: '1px solid var(--template-border)' }}>
                <h3>{withoutTitle}</h3>
                <p>{withoutDescription}</p>
              </div>
              <div style={{ padding: '2rem', background: 'var(--template-accent)', borderRadius: '1rem', color: 'white' }}>
                <h3>{withTitle}</h3>
                <p>{withDescription}</p>
              </div>
            </div>
          </div>
        </Section>
      )}
      
      {/* 
      TODO: SECTION 10 - CTA INTERMÉDIAIRE (OPTIONNELLE)
      - Activation: {isEnabled('cta-middle') && ...}
      - Props configurables: title, description, primaryButton
      - Données actuelles: "Prêt à Démarrer Votre Projet ?"
      - Rendu futur: title={customContent.ctaMiddle?.title || 'Prêt à Démarrer ?'}
      */}
      {isSectionEnabled('cta-middle') && (
        <Section data-section="cta-middle">
          {onEditSection && (
            <EditButton sectionId="cta-middle" onEdit={onEditSection} />
          )}
          <CTABox
            title={ctaMiddleTitle}
            description={ctaMiddleDescription}
            primaryButton={{
              text: ctaMiddleButtonText,
              href: '#contact',
              onClick: () => console.log('CTA clicked')
            }}
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 11 - TESTIMONIALS (OPTIONNELLE)
      - Activation: {isEnabled('testimonials') && ...}
      - Props configurables: title, subtitle, testimonials
      - Données actuelles: testimonials[] avec 3 témoignages
      - Rendu futur: testimonials={customContent.testimonials || testimonials}
      */}
      {isSectionEnabled('testimonials') && (
        <Section data-section="testimonials">
          {onEditSection && (
            <EditButton sectionId="testimonials" onEdit={onEditSection} />
          )}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: 'var(--template-font-size-2xl)', 
              color: 'var(--template-text)',
              marginBottom: '1rem'
            }}>
              {getSectionProps('testimonials')?.sectionTitle || "Ce Que Disent Mes Clients"}
            </h2>
            <p style={{ 
              color: 'var(--template-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {getSectionProps('testimonials')?.sectionSubtitle || "Leurs témoignages parlent mieux que moi"}
            </p>
          </div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {(() => {
              const testimonialsData = getSectionProps('testimonials')?.items && getSectionProps('testimonials')?.items.length > 0 
                ? getSectionProps('testimonials')?.items.slice(0, 3) // Maximum 3 testimonials configurées
                : testimonials.slice(0, 3); // Utilise les hardcodées par défaut
              
              // Adapter les données et assurer que chaque testimonial a un ID unique
              return testimonialsData.map((testimonial: any, index: number) => (
                <TestimonialCard 
                  key={testimonial.id || `testimonial-${index}`} 
                  testimonial={{
                    id: testimonial.id || `testimonial-${index}`,
                    name: testimonial.name || '',
                    role: testimonial.role || '',
                    company: testimonial.company || '',
                    rating: testimonial.rating || 5,
                    text: testimonial.content || testimonial.text || '', // Adapter content vers text pour le composant
                    image: testimonial.image || testimonial.avatarUrl || '' // Support both image and avatarUrl
                  }} 
                />
              ));
            })()}
          </div>
        </Section>
      )}
      
      {/* 
      TODO: SECTION 12 - FAQ (OPTIONNELLE)
      - Activation: {isEnabled('faq') && ...}
      - Props configurables: title, subtitle, faqs
      - Données actuelles: faqs[] avec 6 questions
      - Rendu futur: faqs={customContent.faq?.faqs || faqs}
      */}
      {isSectionEnabled('faq') && (
        <Section data-section="faq">
          {onEditSection && (
            <EditButton sectionId="faq" onEdit={onEditSection} />
          )}
          <FAQSection
            title={getSectionProps('faq')?.sectionTitle || "Questions Fréquentes"}
            subtitle={getSectionProps('faq')?.sectionSubtitle || "Tout ce que vous devez savoir"}
            faqs={
              getSectionProps('faq')?.items && getSectionProps('faq')?.items.length > 0
                ? getSectionProps('faq')?.items.slice(0, 8) // Maximum 8 FAQ configurées
                : faqs.slice(0, 6) // Utilise les hardcodées par défaut
            }
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 13 - URGENCY (OPTIONNELLE)
      - Activation: {isEnabled('urgency') && ...}
      - Props configurables: text, style
      - Données actuelles: "Seulement 3 places disponibles ce mois-ci"
      - Rendu futur: text={customContent.urgency?.text || 'Places limitées'}
      */}
      {isSectionEnabled('urgency') && (
        <Section data-section="urgency">
          {onEditSection && (
            <EditButton sectionId="urgency" onEdit={onEditSection} />
          )}
          <div style={{ textAlign: 'center' }}>
            <UrgencyBadge
              text={getSectionProps('urgency')?.message || "Seulement 3 places disponibles ce mois-ci"}
            />
          </div>
        </Section>
      )}
      
      {/* 
      TODO: SECTION 14 - GUARANTEE (OPTIONNELLE)
      - Activation: {isEnabled('guarantee') && ...}
      - Props configurables: title, description, icon
      - Données actuelles: "Mes Garanties" + "Satisfait ou remboursé"
      - Rendu futur: title={customContent.guarantee?.title || 'Mes Garanties'}
      */}
      {isSectionEnabled('guarantee') && (
        <Section data-section="guarantee">
          {onEditSection && (
            <EditButton sectionId="guarantee" onEdit={onEditSection} />
          )}
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', background: 'var(--template-card-bg)', borderRadius: '1rem', border: '1px solid var(--template-border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{guaranteeIcon}</div>
              <h2 style={{ fontSize: 'var(--template-font-size-xl)', color: 'var(--template-text)', marginBottom: '1rem' }}>{guaranteeTitle}</h2>
              <p style={{ color: 'var(--template-text-secondary)', fontSize: 'var(--template-font-size-lg)' }}>{guaranteeDescription}</p>
            </div>
          </div>
        </Section>
      )}
      
      {/* 
      TODO: SECTION 15 - CONTACT (OBLIGATOIRE)
      - Activation: Toujours affichée (required: true)
      - Props configurables: title, subtitle, onSubmit
      - Données actuelles: "Contactez-Moi" + callback console.log
      - Rendu futur: title={customContent.contact?.title || 'Contactez-Moi'}
      */}
      {isSectionEnabled('contact') && (
        <Section id="contact" data-section="contact">
          {onEditSection && (
            <EditButton sectionId="contact" onEdit={onEditSection} />
          )}
          <ContactForm
            title={contactTitle}
            subtitle={contactSubtitle}
            onSubmit={async (data) => {
              // 📧 INTÉGRATION CRISP - Envoi vers Crisp Chat
              try {
                // Option 1: Via $crisp API (si Crisp est chargé)
                if (typeof window !== 'undefined' && (window as any).$crisp) {
                  (window as any).$crisp.push(["do", "message:send", [
                    "text", 
                    `📨 NOUVEAU CONTACT:\n` +
                    `👤 Nom: ${data.name}\n` +
                    `📧 Email: ${data.email}\n` +
                    `📱 Téléphone: ${data.phone}\n` +
                    `💬 Message: ${data.message}`
                  ]]);
                  
                  // Définir les propriétés du contact
                  (window as any).$crisp.push(["set", "user:email", data.email]);
                  (window as any).$crisp.push(["set", "user:nickname", data.name]);
                  (window as any).$crisp.push(["set", "user:phone", data.phone]);
                  
                  console.log('✅ Formulaire envoyé vers Crisp !');
                  alert('✅ Votre message a été envoyé ! Nous vous répondrons rapidement.');
                } else {
                  // Fallback: console + alerte
                  console.log('📧 Form submitted (Crisp non disponible):', data);
                  alert('Message reçu ! Nous vous recontacterons rapidement.');
                }
              } catch (error) {
                console.error('❌ Erreur envoi Crisp:', error);
                alert('Message reçu ! Nous vous recontacterons rapidement.');
              }
            }}
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 16 - CTA FINAL (OPTIONNELLE)
      - Activation: {isEnabled('cta-final') && ...}
      - Props configurables: title, description, primaryButton
      - Données actuelles: "Transformez Votre Présence En Ligne"
      - Rendu futur: title={customContent.ctaFinal?.title || 'Transformez...'}
      */}
      {isSectionEnabled('cta-final') && (
        <Section data-section="cta-final">
          {onEditSection && (
            <EditButton sectionId="cta-final" onEdit={onEditSection} />
          )}
          <CTABox
            title={ctaFinalTitle}
            description={ctaFinalDescription}
            primaryButton={{
              text: ctaFinalButtonText,
              href: '#contact',
              onClick: () => console.log('CTA clicked')
            }}
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 17 - FOOTER (OBLIGATOIRE)
      - Activation: Toujours affichée (required: true)
      - Props configurables: brand, copyright, sections, socialLinks
      - Données actuelles: "FSVB Studio" + liens statiques
      - Rendu futur: brand={companyName || 'FSVB Studio'}
      */}
      {isSectionEnabled('footer') && (
        <Footer
          brand={getFooterBrandText()}
          copyright={footerPropsConfig?.businessName || "Créé par FSVB Studio"}
          siret={footerPropsConfig?.siret}
          sections={getFooterSections()}
          socialLinks={[
            ...(footerPropsConfig?.linkedinUrl || formData?.linkedinUrl ? [{ platform: 'LinkedIn', url: footerPropsConfig?.linkedinUrl || formData?.linkedinUrl || '#', icon: '💼' }] : []),
            ...(footerPropsConfig?.instagramUrl || formData?.instagramUrl ? [{ platform: 'Instagram', url: footerPropsConfig?.instagramUrl || formData?.instagramUrl || '#', icon: '📸' }] : []),
            { platform: 'GitHub', url: githubUrl, icon: '🐱' },
            { platform: 'Twitter', url: twitterUrl, icon: '🐦' }
          ]}
        />
      )}
    </div>
  );
};