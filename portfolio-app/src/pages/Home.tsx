import React from 'react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { TemplateCard } from '../components/TemplateCardNew';
import sectionStyles from '../components/Section.module.css';

const Home: React.FC = () => {
  return (
    <>
      {/* HERO SECTION */}
      <Section background="transparent" className={sectionStyles.hero}>
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          maxWidth: '900px',
          margin: '0 auto',
          minHeight: '55vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: 'var(--font-size-hero-title)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--spacing-lg)',
            lineHeight: 'var(--leading-tight)'
          }}>
            Sites vitrines premium
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              livrés en 5 jours max
            </span>
          </h1>
          
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-2xl)',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Spécialiste sites Coach et Restaurant - Optimisés par IA
            <br />
            Solutions digitales sur-mesure pour entrepreneurs ambitieux.
          </p>
          
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button variant="ghost" size="large" href="#templates">
              Voir les templates
            </Button>
            <Button variant="primary" size="large" href="/configurator">
              Commander un site
            </Button>
          </div>
        </div>
      </Section>

      {/* TEMPLATES SECTION */}
      <Section 
        id="templates"
        background="transparent"
        title="Solutions digitales clé en main"
        subtitle="Choisissez votre template, personnalisez, et lancez en 5 jours maximum"
      >
        <div className="templates-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-xl)',
          alignItems: 'start'
        }}>
        <style>{`
          @media (max-width: 900px) {
            .templates-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
          <TemplateCard
            name="Site Vitrine Essentiel"
            description="Parfait pour entrepreneurs et freelances en lancement"
            screenshot="/images/digital-agency-web-services-page.webp"
            demoUrl="/templates/landing-solo"
            price="350€"
            deliveryTime="5 jours"
            features={['1 page', 'Formulaire contact', 'WhatsApp', 'Responsive']}
            templateKey="landing-solo"
          />
          <TemplateCard
            name="Restaurant / Café"
            description="Site vitrine complet avec menu et réservations"
            screenshot="/images/italian-restaurant-menu-specialties-website.webp"
            demoUrl="/templates/restaurant"
            price="400€"
            deliveryTime="5 jours maximum"
            features={['Menu interactif', 'Google Maps', 'Réservations', 'Galerie']}
            templateKey="restaurant"
          />
          <TemplateCard
            name="Coach / Thérapeute"
            description="Idéal pour coachs et thérapeutes avec prise de RDV"
            screenshot="/images/sophie-martin-coaching-website-homepage.webp"
            demoUrl="/templates/coach"
            price="500€"
            deliveryTime="5 jours maximum"
            features={['Services', 'Témoignages', 'Blog', 'Prise RDV']}
            templateKey="coach"
          />
        </div>
      </Section>

      {/* CTA FINAL */}
        <Section background="transparent">
          <div className="glassCard glassCardBordered" style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
            <h2 style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--spacing-md)'
            }}>
              Prêt à digitaliser votre business ?
            </h2>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--spacing-xl)',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-xl)'
            }}>
              FSVB Studio transforme vos idées en solutions digitales performantes.
              Sites premium, optimisés IA, livrés en maximum 5 jours après acceptation.
            </p>
            <Button variant="primary" size="large" href="/configurator">
              Configurer mon site
            </Button>
          </div>
        </Section>
    </>
  );
};

export default Home;