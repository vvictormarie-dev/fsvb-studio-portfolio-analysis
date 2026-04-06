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
}

export const LandingSolo: React.FC<LandingSoloProps> = ({ 
  hideThemeSelector = false, 
  sectionsConfig,
  heroTitleOverride,
  heroSubtitleOverride,
  heroCtaLabelOverride,
  formData,
  navbarProps
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
      image: '/api/placeholder/300/200',
      category: 'Restaurant',
      technologies: ['React', 'CSS']
    },
    {
      id: '2',
      title: 'Cabinet Dentaire Martin',
      description: 'Site médical avec prise de rendez-vous',
      image: '/api/placeholder/300/200',
      category: 'Médical',
      technologies: ['Vue', 'PHP']
    },
    {
      id: '3',
      title: 'Coach Sportif Alex',
      description: 'Landing page avec formulaires coach',
      image: '/api/placeholder/300/200',
      category: 'Coaching',
      technologies: ['React', 'Node.js']
    },
    {
      id: '4',
      title: 'Architecte Dubois',
      description: 'Portfolio professionnel élégant',
      image: '/api/placeholder/300/200',
      category: 'Architecture',
      technologies: ['Next.js', 'Tailwind']
    },
    {
      id: '5',
      title: 'Salon de Beauté Zen',
      description: 'Site avec booking en ligne',
      image: '/api/placeholder/300/200',
      category: 'Beauté',
      technologies: ['WordPress', 'PHP']
    },
    {
      id: '6',
      title: 'Consultant Finance Pro',
      description: 'Site corporate avec blog',
      image: '/api/placeholder/300/200',
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
      image: '/api/placeholder/80/80'
    },
    {
      id: '2',
      name: 'Thomas Martin',
      role: 'Coach Sportif',
      company: 'Fit & Strong',
      rating: 5,
      text: 'Délai respecté, qualité au rendez-vous. Je recommande vivement pour tous vos projets web !',
      image: '/api/placeholder/80/80'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      role: 'Architecte',
      company: 'Studio Laurent',
      rating: 5,
      text: 'Un site élégant qui reflète parfaitement mon style. Mes clients sont impressionnés !',
      image: '/api/placeholder/80/80'
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
    return section?.props || {};
  };

  // Récupérer les props dynamiques de la section hero
  const heroProps = getSectionProps('hero');
  
  // Récupérer les props dynamiques des autres sections
  const aboutProps = getSectionProps('about');
  const contactProps = getSectionProps('contact');
  
  // Récupérer les props dynamiques des sections Niveau 2
  const trustbarProps = getSectionProps('trustbar');
  const guaranteeProps = getSectionProps('guarantee');
  const ctaFinalProps = getSectionProps('cta-final');
  const footerPropsConfig = getSectionProps('footer');

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
  const heroTitle = heroTitleOverride ?? heroContent.title;
  const heroSubtitle = heroSubtitleOverride ?? heroContent.subtitle;
  const heroCtaLabel = heroCtaLabelOverride ?? heroContent.primaryCTA.text;
  const heroDescription = heroProps?.description || heroContent.description;
  
  // Variables de surcharge pour About
  const aboutTitle = aboutProps?.title || "Pourquoi choisir mes services ?";
  const aboutDescription = aboutProps?.description || "Passionnée par le web depuis 3 ans, je vous aide à créer une présence en ligne qui convertit vos visiteurs en clients.";
  const aboutImage = aboutProps?.image || "/api/placeholder/500/400";
  
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
          items={[
            { label: 'Accueil', href: '#hero', active: true },
            { label: 'Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Process', href: '#process' },
            { label: 'Contact', href: '#contact' }
          ]}
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
        <Section id="hero">
          <HeroSection
            title={heroTitle}
            subtitle={heroSubtitle}
            description={heroDescription}
            primaryCTA={{
              text: heroCtaLabel,
              href: '#services'
            }}
            backgroundImage="/api/placeholder/1920/1080"
          />
        </Section>
      )}
      
      {/* 
      TODO: SECTION 3 - TRUST BAR (OPTIONNELLE)
      - Activation: {isEnabled('trustbar') && ...}
      - Props configurables: stats (statistiques de confiance)
      - Données actuelles: trustStats statique (50+ sites, 48h, 100%, 3 ans)
      - Rendu futur: stats={customContent.trustbar?.stats || trustStats}
      */}
      {isSectionEnabled('trustbar') && (
        <TrustBar stats={trustStats} />
      )}
      
      {/* 
      TODO: SECTION 4 - ABOUT (OPTIONNELLE)
      - Activation: {isEnabled('about') && ...}
      - Props configurables: title, description, image, values
      - Données actuelles: "Pourquoi choisir mes services" + valeurs fixes
      - Rendu futur: title={customContent.about?.title || 'Pourquoi choisir mes services ?'}
      */}
      {isSectionEnabled('about') && (
        <Section id="about">
          <AboutSection
            title={aboutTitle}
            description={aboutDescription}
            image={aboutImage}
            values={[
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
            ]}
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
        <Section id="services">
          <ServicesGrid
            title={servicesTitle}
            subtitle={servicesSubtitle}
            services={services}
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
        <Section id="portfolio">
          <PortfolioGrid
            title="Mes Réalisations"
            subtitle="Découvrez quelques projets que j'ai créés pour mes clients"
            items={portfolio}
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
        <Section>
          <FeaturesGrid
            title="Pourquoi Me Choisir"
            subtitle="Ce qui fait la différence dans mes prestations"
            features={features}
            columns={4}
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
        <Section id="process">
          <ProcessTimeline
            title="Comment Ça Marche"
            subtitle="Un processus simple et efficace pour votre projet"
            steps={processSteps}
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
        <Section>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: 'var(--template-font-size-2xl)', color: 'var(--template-text)', marginBottom: '2rem' }}>
              Avec ou sans site professionnel
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ padding: '2rem', background: 'var(--template-card-bg)', borderRadius: '1rem', border: '1px solid var(--template-border)' }}>
                <h3>Sans Site Web</h3>
                <p>Visibilité limitée, difficile à trouver, pas de crédibilité</p>
              </div>
              <div style={{ padding: '2rem', background: 'var(--template-accent)', borderRadius: '1rem', color: 'white' }}>
                <h3>Avec Site Pro</h3>
                <p>Présence 24/7, trouvé sur Google, image professionnelle</p>
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
        <Section>
          <CTABox
            title="Prêt à Démarrer Votre Projet ?"
            description="Discutons ensemble de vos besoins et créons le site qui va booster votre activité"
            primaryButton={{
              text: 'Planifier un appel',
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
        <Section>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: 'var(--template-font-size-2xl)', 
              color: 'var(--template-text)',
              marginBottom: '1rem'
            }}>
              Ce Que Disent Mes Clients
            </h2>
            <p style={{ 
              color: 'var(--template-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Leurs témoignages parlent mieux que moi
            </p>
          </div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
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
        <Section>
          <FAQSection
            title="Questions Fréquentes"
            subtitle="Tout ce que vous devez savoir"
            faqs={faqs}
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
        <Section>
          <div style={{ textAlign: 'center' }}>
            <UrgencyBadge
              text="Seulement 3 places disponibles ce mois-ci"
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
        <Section>
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
        <Section id="contact">
          <ContactForm
            title={contactTitle}
            subtitle={contactSubtitle}
            onSubmit={(data) => console.log('Form submitted:', data)}
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
        <Section>
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
          copyright={`© 2024 ${getFooterBrandText()} - Créatrice de sites web`}
          sections={[
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
          ]}
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