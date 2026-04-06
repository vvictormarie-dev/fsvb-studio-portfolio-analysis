import React from 'react';
import { coachSectionsDefault, type CoachSectionConfig } from './Coach.sections';
import { ThemeSelector } from '../components/ThemeSelector';

// Import composants existants
import { HeroSection } from '../components/hero/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { FeaturesGrid } from '../components/sections/FeaturesGrid';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { FAQSection } from '../components/sections/FAQSection';
import { ContactForm } from '../components/sections/ContactForm';
import { Navbar } from '../components/ui/Navbar';

import type { Feature, ProcessStep, Service, FAQItem } from '../components/types';

interface CoachProps {
  hideThemeSelector?: boolean;
  sectionsConfig?: CoachSectionConfig[];
  heroTitleOverride?: string;
  heroSubtitleOverride?: string;
  // Brand data props (même structure que LandingSolo)
  formData?: {
    companyName?: string;
    logoUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
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

export const Coach: React.FC<CoachProps> = ({ 
  hideThemeSelector = false,
  sectionsConfig = coachSectionsDefault,
  heroTitleOverride,
  heroSubtitleOverride,
  formData: _formData,
  navbarProps: _navbarProps,
  footerProps: _footerProps
}) => {
  
  // Helper pour vérifier si une section est activée
  const isSectionEnabled = (sectionId: string): boolean => {
    const section = sectionsConfig.find(s => s.id === sectionId);
    return section ? section.enabled : false;
  };

  // Brand data helpers (avec fallbacks)
  const formData = _formData;
  const navbarProps = _navbarProps; 
  
  const getNavbarBrandText = (): string => {
    return navbarProps?.logoText || formData?.companyName || 'Sophie Martin - Coach';
  };

  // Helper pour récupérer les props d'une section spécifique avec fallbacks
  const getSectionProps = (sectionId: string) => {
    const section = sectionsConfig?.find(s => s.id === sectionId);
    return section?.props || {};
  };

  // Data coach exemple
  const domains: Feature[] = [
    {
      id: 'domain-1',
      icon: '💼',
      title: 'Coaching professionnel',
      description: 'Orientation, reconversion, leadership'
    },
    {
      id: 'domain-2',
      icon: '❤️',
      title: 'Développement personnel',
      description: 'Confiance en soi, gestion émotions'
    },
    {
      id: 'domain-3',
      icon: '🎯',
      title: 'Atteinte d\'objectifs',
      description: 'Projets de vie, ambitions, réalisations'
    },
    {
      id: 'domain-4',
      icon: '⚖️',
      title: 'Équilibre vie pro/perso',
      description: 'Harmonie, priorités, bien-être'
    }
  ];

  const approachSteps: ProcessStep[] = [
    {
      id: 'step-1',
      number: 1,
      title: 'Écoute active',
      description: 'Comprendre votre situation et vos besoins',
      duration: '30 min'
    },
    {
      id: 'step-2',
      number: 2,
      title: 'Définition objectifs',
      description: 'Clarifier vos aspirations et votre destination',
      duration: '1h'
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Plan d\'action',
      description: 'Co-construire une stratégie personnalisée',
      duration: '1h'
    },
    {
      id: 'step-4',
      number: 4,
      title: 'Accompagnement',
      description: 'Suivi régulier et ajustements',
      duration: 'Sur mesure'
    }
  ];

  const formules: Service[] = [
    {
      id: 'formule-1',
      icon: '🔍',
      title: 'Découverte',
      description: 'Séance d\'exploration de 1h pour faire le point sur votre situation',
      price: '80€',
      features: [
        'Séance individuelle',
        'Bilan de situation',
        'Premiers axes de travail'
      ]
    },
    {
      id: 'formule-2',
      icon: '🎯',
      title: 'Accompagnement',
      description: 'Programme de 5 séances pour un changement durable',
      price: '350€',
      features: [
        '5 séances d\'1h',
        'Plan d\'action personnalisé',
        'Suivi entre séances',
        'Exercices pratiques'
      ]
    },
    {
      id: 'formule-3',
      icon: '🚀',
      title: 'Transformation',
      description: 'Accompagnement intensif sur 3 mois pour une transformation profonde',
      price: '650€',
      features: [
        '10 séances d\'1h',
        'Accompagnement complet',
        'Accès ressources exclusives',
        'Bilan final approfondi'
      ]
    }
  ];

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Qu\'est-ce que le coaching ?',
      answer: 'Le coaching est un accompagnement personnalisé qui vous aide à atteindre vos objectifs en développant vos ressources internes. Ce n\'est ni de la thérapie, ni du conseil, mais un partenariat pour révéler votre potentiel.'
    },
    {
      id: 'faq-2',
      question: 'Combien de séances sont nécessaires ?',
      answer: 'Cela dépend de vos objectifs. Une séance découverte peut suffire pour un déclic, mais un accompagnement de 5 à 10 séances est généralement optimal pour un changement durable.'
    },
    {
      id: 'faq-3',
      question: 'Les séances sont-elles confidentielles ?',
      answer: 'Absolument. Tout ce qui se dit en séance reste strictement confidentiel. C\'est la base d\'une relation de confiance nécessaire au coaching.'
    },
    {
      id: 'faq-4',
      question: 'Comment se déroulent les séances ?',
      answer: 'Les séances durent 1h et peuvent se faire en présentiel (Paris 15e) ou en visio. Nous travaillons ensemble sur vos objectifs avec des outils de coaching éprouvés.'
    }
  ];

  // Gestion conditionnelle du wrapper selon le mode
  const wrapperProps = hideThemeSelector
    ? { className: 'templateWrapper' } // Mode configurateur → aucun data-theme interne
    : { className: 'templateWrapper', 'data-theme': 'zen' }; // Mode autonome → thème zen

  return (
    <div {...wrapperProps}>
      {!hideThemeSelector && <ThemeSelector />}
      
      {/* Navbar */}
      {isSectionEnabled('navbar') && (
        <Navbar 
          brand={getSectionProps('navbar')?.brand || getNavbarBrandText()}
          logoUrl={getSectionProps('navbar')?.logoUrl || navbarProps?.logoUrl || formData?.logoUrl}
          layout={getSectionProps('navbar')?.layout || navbarProps?.layout as 'classic' | 'centered' | 'split' || 'split'}
          items={getSectionProps('navbar')?.items || [
            { label: 'Accueil', href: '#hero', active: true },
            { label: 'Coaching', href: '#domains' },
            { label: 'Processus', href: '#process' },
            { label: 'Services', href: '#services' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Contact', href: '#contact' }
          ]}
        />
      )}

      {/* Hero */}
      {isSectionEnabled('hero') && (
        <HeroSection
          title={heroTitleOverride || getSectionProps('hero')?.title || "Révélez votre potentiel"}
          subtitle={heroSubtitleOverride || getSectionProps('hero')?.subtitle || "Coach certifiée - Accompagnement bienveillant et transformateur"}
          description={getSectionProps('hero')?.description || "Ensemble, clarifions vos objectifs et construisons le chemin vers la vie que vous souhaitez"}
          primaryCTA={getSectionProps('hero')?.primaryCTA || { text: "Prendre rendez-vous", href: "#booking" }}
          secondaryCTA={getSectionProps('hero')?.secondaryCTA || { text: "En savoir plus", href: "#about" }}
        />
      )}

      {/* About */}
      {isSectionEnabled('about') && (
        <section style={{ padding: '4rem 2rem' }}>
          <AboutSection
            title={getSectionProps('about')?.title || "Mon Parcours"}
            description={getSectionProps('about')?.description || "Diplômée en psychologie et certifiée coach professionnel (ICF), j'accompagne depuis 10 ans des personnes en quête de sens, de changement ou d'accomplissement. Mon approche allie écoute empathique, questionnement puissant et outils concrets pour vous aider à vous révéler."}
            image={getSectionProps('about')?.image || "/placeholder-coach.jpg"}
            values={getSectionProps('about')?.values || [
              { icon: '🎓', title: 'Certifiée ICF', description: 'Coach professionnelle certifiée' },
              { icon: '💪', title: '+200 clients', description: 'Accompagnés avec succès' }
            ]}
          />
        </section>
      )}

      {/* Approach (using Process) */}
      {isSectionEnabled('approach') && (
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <ProcessTimeline
            title={getSectionProps('approach')?.title || "Ma Méthode"}
            subtitle={getSectionProps('approach')?.subtitle || "Un accompagnement structuré et bienveillant"}
            steps={getSectionProps('approach')?.steps || approachSteps}
          />
        </section>
      )}

      {/* Domains (using Features) */}
      {isSectionEnabled('domains') && (
        <section style={{ padding: '4rem 2rem' }}>
          <FeaturesGrid
            title={getSectionProps('domains')?.title || "Mes Domaines d'Accompagnement"}
            subtitle={getSectionProps('domains')?.subtitle || "Des accompagnements adaptés à vos besoins"}
            features={getSectionProps('domains')?.features || domains}
            columns={4}
          />
        </section>
      )}

      {/* Services */}
      {isSectionEnabled('services') && (
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <ServicesGrid
            title={getSectionProps('services')?.title || "Mes Formules"}
            subtitle={getSectionProps('services')?.subtitle || "Choisissez l'accompagnement qui vous correspond"}
            services={getSectionProps('services')?.services || formules}
          />
        </section>
      )}

      {/* Certifications - Placeholder */}
      {isSectionEnabled('certifications') && (
        <section style={{ padding: '4rem 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Formations & Certifications</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ textAlign: 'center', color: '#aaa' }}>
              📚 Timeline formations à venir<br/>
              (Diplômes, certifications, spécialisations)
            </p>
          </div>
        </section>
      )}

      {/* Testimonials - Placeholder */}
      {isSectionEnabled('testimonials') && (
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Témoignages</h2>
          <p style={{ textAlign: 'center', color: '#aaa' }}>Section témoignages clients à venir</p>
        </section>
      )}

      {/* FAQ */}
      {isSectionEnabled('faq') && (
        <section style={{ padding: '4rem 2rem' }}>
          <FAQSection
            title={getSectionProps('faq')?.title || "Questions Fréquentes"}
            subtitle={getSectionProps('faq')?.subtitle || "Tout ce que vous devez savoir sur le coaching"}
            faqs={getSectionProps('faq')?.faqs || faqs}
          />
        </section>
      )}

      {/* Booking - Placeholder Cal.com */}
      {isSectionEnabled('booking') && (
        <section id="booking" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Prendre Rendez-vous</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              📅 Réservez votre séance découverte gratuite de 30 minutes
            </p>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '2px dashed rgba(255,255,255,0.2)' }}>
              <p style={{ color: '#aaa', marginBottom: '1rem' }}>
                Widget Cal.com ici
              </p>
              <p style={{ fontSize: '0.9rem', color: '#888' }}>
                (Intégration calendrier en ligne à configurer)
              </p>
            </div>
            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#aaa' }}>
              📞 Ou contactez-moi : 06 12 34 56 78
            </p>
          </div>
        </section>
      )}

      {/* Contact */}
      {isSectionEnabled('contact') && (
        <section style={{ padding: '4rem 2rem' }}>
          <ContactForm
            title={getSectionProps('contact')?.title || "Me Contacter"}
            subtitle={getSectionProps('contact')?.subtitle || "Une question ? N'hésitez pas à m'écrire"}
            onSubmit={(data) => console.log('Contact:', data)}
            submitText="Envoyer"
            showPhone={true}
          />
        </section>
      )}

      {/* Footer placeholder */}
      {isSectionEnabled('footer') && (
        <footer style={{ padding: '2rem', background: 'rgba(0,0,0,0.5)', textAlign: 'center', color: '#aaa' }}>
          © 2025 Sophie Martin - Coach Professionnelle Certifiée ICF
        </footer>
      )}
    </div>
  );
};

export default Coach;