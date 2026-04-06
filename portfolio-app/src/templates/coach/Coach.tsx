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
import { EditButton } from '../../components/EditButton';

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
  onEditSection?: (sectionId: string) => void;
}

export const Coach: React.FC<CoachProps> = ({ 
  hideThemeSelector = false,
  sectionsConfig = coachSectionsDefault,
  heroTitleOverride,
  heroSubtitleOverride,
  formData: _formData,
  navbarProps: _navbarProps,
  footerProps: _footerProps,
  onEditSection
}) => {
  
  // Helper pour vérifier si une section est activée
  const isSectionEnabled = (sectionId: string): boolean => {
    const section = sectionsConfig.find(s => s.id === sectionId);
    return section ? section.enabled : false;
  };

  // Helper pour récupérer les props d'une section depuis sectionsConfig
  const getSectionProps = (sectionId: string) => {
    const section = sectionsConfig.find(s => s.id === sectionId);
    return section?.props || {};
  };

  // Brand data helpers (avec fallbacks)
  const formData = _formData;
  const navbarProps = _navbarProps; 
  
  const getNavbarBrandText = (): string => {
    return navbarProps?.logoText || formData?.companyName || 'Sophie Martin - Coach';
  };

  // Section props from configurator
  const heroProps = getSectionProps('hero');
  const approachProps = getSectionProps('approach');
  const domainsProps = getSectionProps('domains');
  const certificationsProps = getSectionProps('certifications');
  const bookingProps = getSectionProps('booking');
  const aboutProps = getSectionProps('about');
  const contactProps = getSectionProps('contact');
  // const footerPropsConfig = getSectionProps('footer');
  // const navbarPropsConfig = getSectionProps('navbar');

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
          brand={getNavbarBrandText()}
          logoUrl={navbarProps?.logoUrl || formData?.logoUrl}
          layout={navbarProps?.layout as 'classic' | 'centered' | 'split' || 'split'}
          items={[
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
        <section data-section="hero" style={{ position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="hero" onEdit={onEditSection} />
          )}
          <HeroSection
            title={heroTitleOverride || heroProps?.title || "Révélez votre potentiel"}
            subtitle={heroSubtitleOverride || heroProps?.subtitle || "Coach certifiée - Accompagnement bienveillant et transformateur"}
            description={heroProps?.description || "Ensemble, clarifions vos objectifs et construisons le chemin vers la vie que vous souhaitez"}
            primaryCTA={{ text: heroProps?.ctaText || "Prendre rendez-vous", href: "#booking" }}
            secondaryCTA={{ text: "En savoir plus", href: "#about" }}
          />
        </section>
      )}

      {/* About */}
      {isSectionEnabled('about') && (
        <section data-section="about" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="about" onEdit={onEditSection} />
          )}
          <AboutSection
            title={aboutProps?.title || "Mon Parcours"}
            description={aboutProps?.description || "Diplômée en psychologie et certifiée coach professionnel (ICF), j'accompagne depuis 10 ans des personnes en quête de sens, de changement ou d'accomplissement. Mon approche allie écoute empathique, questionnement puissant et outils concrets pour vous aider à vous révéler."}
            image={aboutProps?.image || "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=400&fit=crop&crop=face"}
            values={aboutProps?.values && aboutProps?.values.length > 0 ? aboutProps?.values : [
              { icon: '🎓', title: 'Certifiée ICF', description: 'Coach professionnelle certifiée' },
              { icon: '💪', title: '+200 clients', description: 'Accompagnés avec succès' }
            ]}
          />
        </section>
      )}

      {/* Approach (using Process) */}
      {isSectionEnabled('approach') && (
        <section data-section="approach" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="approach" onEdit={onEditSection} />
          )}
          <ProcessTimeline
            title={approachProps?.title || "Ma Méthode"}
            subtitle={approachProps?.subtitle || "Un accompagnement structuré et bienveillant"}
            steps={approachProps?.steps && approachProps?.steps.length > 0 ? approachProps?.steps : approachSteps}
          />
        </section>
      )}

      {/* Domains (using Features) */}
      {isSectionEnabled('domains') && (
        <section data-section="domains" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="domains" onEdit={onEditSection} />
          )}
          <FeaturesGrid
            title={domainsProps?.sectionTitle || "Mes Domaines d'Accompagnement"}
            subtitle={domainsProps?.sectionSubtitle || "Des accompagnements adaptés à vos besoins"}
            features={domainsProps?.items && domainsProps?.items.length > 0 ? domainsProps?.items : domains}
            columns={4}
          />
        </section>
      )}

      {/* Services */}
      {isSectionEnabled('services') && (
        <section data-section="services" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="services" onEdit={onEditSection} />
          )}
          <ServicesGrid
            title="Mes Formules"
            subtitle="Choisissez l'accompagnement qui vous correspond"
            services={formules}
          />
        </section>
      )}

      {/* Certifications */}
      {isSectionEnabled('certifications') && (
        <section data-section="certifications" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="certifications" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{certificationsProps?.title || "Formations & Certifications"}</h2>
            <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
              {certificationsProps?.subtitle || "Un parcours de formation continue pour vous accompagner au mieux"}
            </p>
            
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--template-accent)', transform: 'translateX(-50%)' }}></div>
              
              {/* Timeline items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <div style={{ flex: 1, textAlign: 'right', paddingRight: '2rem' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Certification ICF Coach Professionnel</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>International Coach Federation - Niveau PCC</p>
                  </div>
                  <div style={{ width: '20px', height: '20px', background: 'var(--template-accent)', borderRadius: '50%', position: 'relative', zIndex: 1 }}></div>
                  <div style={{ flex: 1, paddingLeft: '2rem' }}>
                    <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>2023</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <div style={{ flex: 1, textAlign: 'right', paddingRight: '2rem' }}>
                    <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>2022</span>
                  </div>
                  <div style={{ width: '20px', height: '20px', background: 'var(--template-accent)', borderRadius: '50%', position: 'relative', zIndex: 1 }}></div>
                  <div style={{ flex: 1, paddingLeft: '2rem' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Formation PNL Praticien</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Programmation Neuro-Linguistique</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <div style={{ flex: 1, textAlign: 'right', paddingRight: '2rem' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Master en Psychologie</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Spécialisation Psychologie du Travail</p>
                  </div>
                  <div style={{ width: '20px', height: '20px', background: 'var(--template-accent)', borderRadius: '50%', position: 'relative', zIndex: 1 }}></div>
                  <div style={{ flex: 1, paddingLeft: '2rem' }}>
                    <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>2020</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <div style={{ flex: 1, textAlign: 'right', paddingRight: '2rem' }}>
                    <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>2019</span>
                  </div>
                  <div style={{ width: '20px', height: '20px', background: 'var(--template-accent)', borderRadius: '50%', position: 'relative', zIndex: 1 }}></div>
                  <div style={{ flex: 1, paddingLeft: '2rem' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Certification Mindfulness</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Méditation de pleine conscience (MBSR)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {isSectionEnabled('testimonials') && (
        <section data-section="testimonials" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="testimonials" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{getSectionProps('testimonials')?.title || "Témoignages de mes clients"}</h2>
            <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
              {getSectionProps('testimonials')?.subtitle || "Leurs résultats et transformations"}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--template-accent), var(--template-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>SM</span>
                  </div>
                  <div>
                    <strong>Sophie Martin</strong><br/>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Dirigeante startup</span>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "En 6 mois de coaching, j'ai réussi à structurer ma startup, développer mon leadership et lever 500K€. Les sessions m'ont donné la confiance et les outils pour transformer mes idées en réalité."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>Résultat :</span>
                  <span style={{ fontSize: '0.9rem' }}>Levée de fonds réussie</span>
                </div>
              </div>
              
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--template-accent), var(--template-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>JL</span>
                  </div>
                  <div>
                    <strong>Jean Leroy</strong><br/>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Manager IT</span>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "Après un burn-out, ce coaching m'a aidé à retrouver un équilibre vie pro/perso. Aujourd'hui, je manage mon équipe avec bienveillance et efficacité. Ma productivité a augmenté de 40%."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>Résultat :</span>
                  <span style={{ fontSize: '0.9rem' }}>Équilibre retrouvé + promotion</span>
                </div>
              </div>
              
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--template-accent), var(--template-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>CG</span>
                  </div>
                  <div>
                    <strong>Claire Giraud</strong><br/>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Reconversion professionnelle</span>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "À 45 ans, j'ai osé changer de carrière grâce à ce coaching. De comptable à consultante RH, j'ai découvert ma vraie passion. Le processus m'a donné la clarté et le courage nécessaires."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--template-accent)', fontWeight: 'bold' }}>Résultat :</span>
                  <span style={{ fontSize: '0.9rem' }}>Reconversion réussie</span>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--template-accent)' }}>🏆 Statistiques de réussite</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--template-accent)' }}>95%</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Objectifs atteints</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--template-accent)' }}>6 mois</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Durée moyenne</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--template-accent)' }}>100+</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Clients accompagnés</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {isSectionEnabled('faq') && (
        <section data-section="faq" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="faq" onEdit={onEditSection} />
          )}
          <FAQSection
            title="Questions Fréquentes"
            subtitle="Tout ce que vous devez savoir sur le coaching"
            faqs={faqs}
          />
        </section>
      )}

      {/* Booking */}
      {isSectionEnabled('booking') && (
        <section id="booking" data-section="booking" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="booking" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{bookingProps?.title || "Prendre Rendez-vous"}</h2>
            <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem', opacity: 0.9 }}>
              {bookingProps?.subtitle || "🎆 Réservez votre séance découverte gratuite de 30 minutes"}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--template-accent)' }}>🔍 Séance Découverte</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>GRATUIT</div>
                <div style={{ opacity: 0.7, marginBottom: '1.5rem' }}>30 minutes - Visio ou présentiel</div>
                <ul style={{ textAlign: 'left', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
                  <li>✓ Analyse de votre situation</li>
                  <li>✓ Définition d'objectifs clairs</li>
                  <li>✓ Plan d'action personnalisé</li>
                  <li>✓ Sans engagement</li>
                </ul>
              </div>
              
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center', border: '2px solid var(--template-accent)' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--template-accent)' }}>🚀 Accompagnement Complet</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>150€/séance</div>
                <div style={{ opacity: 0.7, marginBottom: '1.5rem' }}>60 minutes - Formule flexible</div>
                <ul style={{ textAlign: 'left', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
                  <li>✓ Coaching individuel intensif</li>
                  <li>✓ Suivi entre séances</li>
                  <li>✓ Outils et exercices personnalisés</li>
                  <li>✓ Résultats garantis</li>
                </ul>
              </div>
            </div>
            
            {/* Calendar Widget Placeholder */}
            <div style={{ padding: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '2rem', color: 'var(--template-accent)' }}>📅 Choisissez votre créneau</h3>
              <div style={{ padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '2px dashed rgba(255,255,255,0.2)', marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Calendrier de réservation en ligne</p>
                <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Intégration Cal.com/Calendly - Disponibilités en temps réel</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.9rem' }}>Lun-Ven: 9h-18h</div>
                  <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.9rem' }}>Sam: 9h-13h</div>
                  <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.9rem' }}>Visio/Présentiel</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Ou contactez-moi directement</p>
                  <a href={`tel:${bookingProps?.phone || '0612345678'}`} style={{ color: 'var(--template-accent)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    📱 {bookingProps?.phoneDisplay || '06 12 34 56 78'}
                  </a>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Par email</p>
                  <a href={`mailto:${bookingProps?.email || 'contact@coach.fr'}`} style={{ color: 'var(--template-accent)', textDecoration: 'none', fontWeight: 'bold' }}>
                    ✉️ {bookingProps?.emailDisplay || 'contact@coach.fr'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      {isSectionEnabled('contact') && (
        <section data-section="contact" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="contact" onEdit={onEditSection} />
          )}
          <ContactForm
            title={contactProps?.title || "Me Contacter"}
            subtitle={contactProps?.subtitle || "Une question ? N'hésitez pas à m'écrire"}
            onSubmit={(data) => console.log('Contact:', data)}
            submitText={contactProps?.ctaText || "Envoyer"}
            showPhone={true}
            // email={contactProps?.email || formData?.email}
            // phone={contactProps?.phone || formData?.phone}
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