import React from 'react';
import { restaurantSectionsDefault, type RestaurantSectionConfig } from './Restaurant.sections';
import { ThemeSelector } from '../components/ThemeSelector';

// Import composants existants
import { HeroSection } from '../components/hero/HeroSection';
import { FeaturesGrid } from '../components/sections/FeaturesGrid';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactForm } from '../components/sections/ContactForm';
import { Navbar } from '../components/ui/Navbar';

import type { Feature, PortfolioItem } from '../components/types';

interface RestaurantProps {
  hideThemeSelector?: boolean;
  sectionsConfig?: RestaurantSectionConfig[];
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

export const Restaurant: React.FC<RestaurantProps> = ({ 
  hideThemeSelector = false,
  sectionsConfig = restaurantSectionsDefault,
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
    return navbarProps?.logoText || formData?.companyName || 'Ristorante Bella Vista';
  };

  // Helper pour récupérer les props d'une section spécifique avec fallbacks
  const getSectionProps = (sectionId: string) => {
    const section = sectionsConfig?.find(s => s.id === sectionId);
    return section?.props || {};
  };

  // Data restaurant exemple
  const specialties: Feature[] = [
    {
      id: 'specialty-1',
      icon: '🍝',
      title: 'Pâtes fraîches maison',
      description: 'Préparées chaque jour avec des ingrédients locaux'
    },
    {
      id: 'specialty-2',
      icon: '🍕',
      title: 'Pizza au feu de bois',
      description: 'Cuites dans notre four traditionnel italien'
    },
    {
      id: 'specialty-3',
      icon: '🍷',
      title: 'Cave sélectionnée',
      description: 'Plus de 50 références de vins italiens'
    },
    {
      id: 'specialty-4',
      icon: '🍰',
      title: 'Desserts artisanaux',
      description: 'Tiramisus et panna cottas fait maison'
    }
  ];

  const galleryItems: PortfolioItem[] = [
    {
      id: 'photo-1',
      title: 'Salle principale',
      description: 'Ambiance chaleureuse et conviviale',
      image: '/placeholder-restaurant-1.jpg',
      category: 'Ambiance'
    },
    {
      id: 'photo-2',
      title: 'Nos pizzas',
      description: 'Cuites au feu de bois',
      image: '/placeholder-food-1.jpg',
      category: 'Plats'
    },
    {
      id: 'photo-3',
      title: 'Terrasse',
      description: 'Profitez des beaux jours',
      image: '/placeholder-restaurant-2.jpg',
      category: 'Ambiance'
    },
    {
      id: 'photo-4',
      title: 'Pâtes fraîches',
      description: 'Faites maison chaque jour',
      image: '/placeholder-food-2.jpg',
      category: 'Plats'
    },
    {
      id: 'photo-5',
      title: 'Desserts',
      description: 'Tiramisus et douceurs italiennes',
      image: '/placeholder-dessert.jpg',
      category: 'Desserts'
    },
    {
      id: 'photo-6',
      title: 'Bar',
      description: 'Apéritifs et digestifs',
      image: '/placeholder-bar.jpg',
      category: 'Ambiance'
    }
  ];

  // Gestion conditionnelle du wrapper selon le mode
  const wrapperProps = hideThemeSelector
    ? { className: 'templateWrapper' } // Mode configurateur → aucun data-theme interne
    : { className: 'templateWrapper', 'data-theme': 'chaleur' }; // Mode autonome → thème chaleur

  return (
    <div {...wrapperProps}>
      {!hideThemeSelector && <ThemeSelector />}
      
      {/* Navbar */}
      {isSectionEnabled('navbar') && (
        <Navbar 
          brand={getSectionProps('navbar')?.brand || getNavbarBrandText()}
          logoUrl={getSectionProps('navbar')?.logoUrl || navbarProps?.logoUrl || formData?.logoUrl}
          layout={getSectionProps('navbar')?.layout || navbarProps?.layout as 'classic' | 'centered' | 'split' || 'centered'}
          items={getSectionProps('navbar')?.items || [
            { label: 'Accueil', href: '#hero', active: true },
            { label: 'Menu', href: '#specialties' },
            { label: 'Photos', href: '#portfolio' },
            { label: 'À propos', href: '#about' },
            { label: 'Réservation', href: '#contact' }
          ]}
        />
      )}

      {/* Hero */}
      {isSectionEnabled('hero') && (
        <HeroSection
          title={heroTitleOverride || getSectionProps('hero')?.title || "Bienvenue au Ristorante Bella Vista"}
          subtitle={heroSubtitleOverride || getSectionProps('hero')?.subtitle || "Cuisine italienne authentique depuis 1985"}
          description={getSectionProps('hero')?.description || "Découvrez nos spécialités dans une ambiance chaleureuse et familiale"}
          primaryCTA={getSectionProps('hero')?.primaryCTA || { text: "Réserver une table", href: "#reservation" }}
          secondaryCTA={getSectionProps('hero')?.secondaryCTA || { text: "Voir la carte", href: "#menu" }}
        />
      )}

      {/* Specialties (using Features) */}
      {isSectionEnabled('specialties') && (
        <section style={{ padding: '4rem 2rem' }}>
          <FeaturesGrid
            title={getSectionProps('specialties')?.title || "Nos spécialités"}
            subtitle={getSectionProps('specialties')?.subtitle || "Ce qui fait notre réputation"}
            features={getSectionProps('specialties')?.features || specialties}
            columns={4}
          />
        </section>
      )}

      {/* Menu - Placeholder pour l'instant */}
      {isSectionEnabled('menu') && (
        <section id="menu" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Notre Carte</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <p style={{ textAlign: 'center', color: '#aaa' }}>
              📋 Section Menu complète à venir<br/>
              (Entrées, Plats, Desserts, Vins)
            </p>
          </div>
        </section>
      )}

      {/* Gallery (using Portfolio) */}
      {isSectionEnabled('gallery') && (
        <section style={{ padding: '4rem 2rem' }}>
          <PortfolioGrid
            title={getSectionProps('gallery')?.title || "Galerie"}
            subtitle={getSectionProps('gallery')?.subtitle || "Découvrez notre restaurant en images"}
            items={getSectionProps('gallery')?.items || galleryItems}
            columns={3}
          />
        </section>
      )}

      {/* About */}
      {isSectionEnabled('about') && (
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <AboutSection
            title={getSectionProps('about')?.title || "Notre Histoire"}
            description={getSectionProps('about')?.description || "Depuis 1985, la famille Rossi vous accueille dans son restaurant pour vous faire découvrir la vraie cuisine italienne. Nos recettes sont transmises de génération en génération."}
            image={getSectionProps('about')?.image || "/placeholder-chef.jpg"}
            values={getSectionProps('about')?.values || [
              { icon: '👨‍🍳', title: 'Chef Passion', description: '35 ans d\'expérience' },
              { icon: '🇮🇹', title: 'Authenticité', description: 'Recettes traditionnelles' }
            ]}
          />
        </section>
      )}

      {/* Testimonials - Placeholder */}
      {isSectionEnabled('testimonials') && (
        <section style={{ padding: '4rem 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Avis de nos clients</h2>
          <p style={{ textAlign: 'center', color: '#aaa' }}>Section témoignages à venir</p>
        </section>
      )}

      {/* Hours & Location - Placeholder */}
      {isSectionEnabled('hoursLocation') && (
        <section id="horaires" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Horaires & Localisation</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p>📍 123 Rue de la Gastronomie, 75001 Paris</p>
            <p>📞 01 23 45 67 89</p>
            <p>🕐 Ouvert du mardi au dimanche, 12h-14h30 & 19h-22h30</p>
            <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <p style={{ color: '#aaa' }}>📍 Carte Google Maps ici</p>
            </div>
          </div>
        </section>
      )}

      {/* Reservation */}
      {isSectionEnabled('reservation') && (
        <section id="reservation" style={{ padding: '4rem 2rem' }}>
          <ContactForm
            title="Réserver une table"
            subtitle="Nous reviendrons vers vous sous 24h pour confirmer"
            onSubmit={(data) => console.log('Reservation:', data)}
            submitText="Réserver"
            showPhone={true}
          />
        </section>
      )}

      {/* Events - Placeholder */}
      {isSectionEnabled('events') && (
        <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Événements & Privatisation</h2>
          <p style={{ textAlign: 'center', color: '#aaa' }}>Section événements à venir</p>
        </section>
      )}

      {/* Contact */}
      {isSectionEnabled('contact') && (
        <section style={{ padding: '4rem 2rem' }}>
          <ContactForm
            title={getSectionProps('contact')?.title || "Nous contacter"}
            subtitle={getSectionProps('contact')?.subtitle || "Une question ? N'hésitez pas à nous écrire"}
            onSubmit={(data) => console.log('Contact:', data)}
            submitText="Envoyer"
            showPhone={true}
          />
        </section>
      )}

      {/* Footer placeholder */}
      {isSectionEnabled('footer') && (
        <footer style={{ padding: '2rem', background: 'rgba(0,0,0,0.5)', textAlign: 'center', color: '#aaa' }}>
          © 2025 Ristorante Bella Vista - Tous droits réservés
        </footer>
      )}
    </div>
  );
};

export default Restaurant;