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
import { EditButton } from '../../components/EditButton';

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
  onEditSection?: (sectionId: string) => void;
}

export const Restaurant: React.FC<RestaurantProps> = ({ 
  hideThemeSelector = false,
  sectionsConfig = restaurantSectionsDefault,
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
    return navbarProps?.logoText || formData?.companyName || 'Ristorante Bella Vista';
  };

  // Section props from configurator
  const heroProps = getSectionProps('hero');
  const specialtiesProps = getSectionProps('specialties');
  const galleryProps = getSectionProps('gallery');
  const aboutProps = getSectionProps('about');
  const menuProps = getSectionProps('menu');
  const reservationProps = getSectionProps('reservation');
  const contactProps = getSectionProps('contact');
  // const footerPropsConfig = getSectionProps('footer');
  // const navbarPropsConfig = getSectionProps('navbar');

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
          brand={getNavbarBrandText()}
          logoUrl={navbarProps?.logoUrl || formData?.logoUrl}
          layout={navbarProps?.layout as 'classic' | 'centered' | 'split' || 'classic'}
          items={[
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
        <section data-section="hero" style={{ position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="hero" onEdit={onEditSection} />
          )}
          <HeroSection
            title={heroTitleOverride || heroProps?.title || "Bienvenue au Ristorante Bella Vista"}
            subtitle={heroSubtitleOverride || heroProps?.subtitle || "Cuisine italienne authentique depuis 1985"}
            description={heroProps?.description || "Découvrez nos spécialités dans une ambiance chaleureuse et familiale"}
            primaryCTA={{ text: heroProps?.ctaText || "Réserver une table", href: "#reservation" }}
            secondaryCTA={{ text: "Voir la carte", href: "#menu" }}
          />
        </section>
      )}

      {/* Specialties (using Features) */}
      {isSectionEnabled('specialties') && (
        <section data-section="specialties" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="specialties" onEdit={onEditSection} />
          )}
          <FeaturesGrid
            title={specialtiesProps?.sectionTitle || "Nos Spécialités"}
            subtitle={specialtiesProps?.sectionSubtitle || "Ce qui fait notre différence"}
            features={specialtiesProps?.items && specialtiesProps?.items.length > 0 ? specialtiesProps?.items : specialties}
            columns={4}
          />
        </section>
      )}

      {/* Menu */}
      {isSectionEnabled('menu') && (
        <section data-section="menu" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="menu" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{menuProps?.title || "Notre Carte"}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
              {/* Entrées */}
              <div>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--template-accent)', borderBottom: '2px solid var(--template-accent)', paddingBottom: '0.5rem' }}>🥗 Entrées</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Bruschetta alla Nonna</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Tomates, basilic, ail, huile d'olive</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>12€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Antipasti della Casa</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Sélection de charcuteries et fromages</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>18€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Carpaccio di Manzo</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Beef carpaccio, roquette, parmesan</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>16€</span>
                  </div>
                </div>
              </div>
              
              {/* Plats */}
              <div>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--template-accent)', borderBottom: '2px solid var(--template-accent)', paddingBottom: '0.5rem' }}>🍝 Plats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Spaghetti Carbonara</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Œufs, pancetta, pecorino, poivre</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>22€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Osso Buco alla Milanese</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Jarret de veau braisé, risotto safran</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>28€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Pizza Margherita</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Mozzarella di bufala, basilic frais</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>18€</span>
                  </div>
                </div>
              </div>
              
              {/* Desserts */}
              <div>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--template-accent)', borderBottom: '2px solid var(--template-accent)', paddingBottom: '0.5rem' }}>🍰 Dolci</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Tiramisu della Nonna</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Recette familiale traditionnelle</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>8€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Panna Cotta</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Fruits rouges, coulis de fraise</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>7€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Gelato Artigianale</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>3 boules, parfums du moment</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>6€</span>
                  </div>
                </div>
              </div>
              
              {/* Vins */}
              <div>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--template-accent)', borderBottom: '2px solid var(--template-accent)', paddingBottom: '0.5rem' }}>🍷 Vini</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Chianti Classico DOCG</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Toscane, verre/bouteille</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>8€/35€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Pinot Grigio</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>Vénétie, frais et fruité</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>7€/28€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px dotted rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>Prosecco di Valdobbiadene</h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>DOCG, coupe/bouteille</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--template-accent)' }}>9€/42€</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <p style={{ marginBottom: '1rem' }}>🍽️ <strong>Menu du jour</strong> - Du mardi au vendredi</p>
              <p style={{ fontSize: '1.2rem', color: 'var(--template-accent)', fontWeight: 'bold' }}>Entrée + Plat + Dessert = 32€</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>Boisson non comprise • Carte sujette à modifications selon arrivages</p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery (using Portfolio) */}
      {isSectionEnabled('gallery') && (
        <section data-section="gallery" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="gallery" onEdit={onEditSection} />
          )}
          <PortfolioGrid
            title={galleryProps?.sectionTitle || "Galerie"}
            subtitle={galleryProps?.sectionSubtitle || "Découvrez notre restaurant en images"}
            items={galleryProps?.projects && galleryProps?.projects.length > 0 ? galleryProps?.projects : galleryItems}
            columns={3}
          />
        </section>
      )}

      {/* About */}
      {isSectionEnabled('about') && (
        <section data-section="about" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="about" onEdit={onEditSection} />
          )}
          <AboutSection
            title={aboutProps?.title || "Notre Histoire"}
            description={aboutProps?.description || "Depuis 1985, la famille Rossi vous accueille dans son restaurant pour vous faire découvrir la vraie cuisine italienne. Nos recettes sont transmises de génération en génération."}
            image={aboutProps?.image || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=400&fit=crop"}
            values={aboutProps?.values && aboutProps?.values.length > 0 ? aboutProps?.values : [
              { icon: '👨‍🍳', title: 'Chef Passion', description: '35 ans d\'expérience' },
              { icon: '🇮🇹', title: 'Authenticité', description: 'Recettes traditionnelles' }
            ]}
          />
        </section>
      )}

      {/* Testimonials */}
      {isSectionEnabled('testimonials') && (
        <section data-section="testimonials" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="testimonials" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{getSectionProps('testimonials')?.title || "Avis de nos clients"}</h2>
            <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
              {getSectionProps('testimonials')?.subtitle || "Ce qu'ils pensent de notre restaurant"}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#ffd700' }}>⭐</span>)}
                </div>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "Une expérience culinaire exceptionnelle ! Les pâtes carbonara étaient parfaites, exactement comme en Italie. L'accueil chaleureux et l'ambiance authentique font de ce restaurant un incontournable."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--template-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>ML</div>
                  <div>
                    <strong>Marie Laurent</strong><br/>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Google Reviews • Il y a 2 semaines</span>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#ffd700' }}>⭐</span>)}
                </div>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "Le meilleur restaurant italien de Paris ! Service impeccable, produits de qualité, et cette ambiance familiale qui nous fait nous sentir comme à la maison. Merci Chef Rossi !"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--template-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>AD</div>
                  <div>
                    <strong>Antoine Dubois</strong><br/>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>TripAdvisor • Il y a 1 mois</span>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#ffd700' }}>⭐</span>)}
                </div>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "Soirée mémorable ! Nous avons privatisé la salle pour notre anniversaire de mariage. Menu exceptionnel, service aux petits soins. Tous nos invités ont adoré !"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--template-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>SB</div>
                  <div>
                    <strong>Sophie & Bruno</strong><br/>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Facebook • Il y a 3 semaines</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ marginBottom: '1rem', opacity: 0.8 }}>Plus de 200 avis 5 étoiles sur</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}>Google ⭐ 4.9/5</span>
                <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}>TripAdvisor ⭐ 4.8/5</span>
                <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}>Yelp ⭐ 4.9/5</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hours & Location */}
      {isSectionEnabled('hoursLocation') && (
        <section data-section="hoursLocation" id="horaires" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="hoursLocation" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{getSectionProps('hoursLocation')?.title || "Horaires & Localisation"}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
              {/* Horaires */}
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '2rem', color: 'var(--template-accent)' }}>🕰️ Horaires d'ouverture</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span>Lundi</span>
                    <span style={{ color: '#ff6b6b' }}>Fermé</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span>Mardi - Vendredi</span>
                    <span>12h-14h30 | 19h-22h30</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span>Samedi</span>
                    <span>12h-15h | 19h-23h</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span>Dimanche</span>
                    <span>12h-15h | 19h-22h</span>
                  </div>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.7 }}>Service continu le weekend</p>
              </div>
              
              {/* Contact & Localisation */}
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '2rem', color: 'var(--template-accent)', textAlign: 'center' }}>📍 Nous trouver</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📍</span>
                    <div>
                      <strong>123 Rue de la Gastronomie</strong><br/>
                      <span style={{ opacity: 0.7 }}>75001 Paris, France</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📞</span>
                    <a href={`tel:${getSectionProps('hoursLocation')?.phone || '+33123456789'}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <strong>{getSectionProps('hoursLocation')?.phoneDisplay || '01 23 45 67 89'}</strong>
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🚇</span>
                    <div>
                      <strong>Métro Louvre-Rivoli</strong><br/>
                      <span style={{ opacity: 0.7 }}>Lignes 1 et 7 • 2 min à pied</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🅿️</span>
                    <div>
                      <strong>Parking Rivoli</strong><br/>
                      <span style={{ opacity: 0.7 }}>50m • -20% avec justificatif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map placeholder */}
            <div style={{ marginTop: '3rem', padding: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.2)' }}>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🗺️ Plan interactif</p>
              <p style={{ opacity: 0.7 }}>Intégration Google Maps • Cliquez pour voir l'itinéraire</p>
              <button style={{ marginTop: '1rem', padding: '0.8rem 2rem', background: 'var(--template-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Voir sur Google Maps
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Reservation */}
      {isSectionEnabled('reservation') && (
        <section id="reservation" data-section="reservation" style={{ padding: '4rem 2rem', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="reservation" onEdit={onEditSection} />
          )}
          <ContactForm
            title={reservationProps?.title || "Réserver une table"}
            subtitle={reservationProps?.subtitle || "Nous reviendrons vers vous sous 24h pour confirmer"}
            onSubmit={(data) => console.log('Reservation:', data)}
            submitText={reservationProps?.ctaText || "Réserver"}
            showPhone={true}
          />
        </section>
      )}

      {/* Events */}
      {isSectionEnabled('events') && (
        <section data-section="events" style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
          {onEditSection && (
            <EditButton sectionId="events" onEdit={onEditSection} />
          )}
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>{getSectionProps('events')?.title || "Événements & Privatisation"}</h2>
            <p style={{ marginBottom: '3rem', opacity: 0.8 }}>
              {getSectionProps('events')?.subtitle || "Organisez vos événements dans un cadre unique"}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '1rem' }}>🎉 Événements privés</h3>
                <p style={{ marginBottom: '1rem' }}>Anniversaires, fêtes d'entreprise, célébrations</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Jusqu'à 50 personnes</p>
              </div>
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '1rem' }}>💼 Séminaires</h3>
                <p style={{ marginBottom: '1rem' }}>Réunions d'équipe, formations, conférences</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Équipements audiovisuels disponibles</p>
              </div>
              <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '1rem' }}>💒 Mariages</h3>
                <p style={{ marginBottom: '1rem' }}>Réceptions intimistes et raffinées</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Menu personnalisé disponible</p>
              </div>
            </div>
            
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h3 style={{ marginBottom: '1rem' }}>📞 Contactez-nous pour votre événement</h3>
              <p style={{ marginBottom: '1.5rem' }}>Nous étudions chaque demande pour vous proposer une solution sur-mesure</p>
              <a href={`tel:${getSectionProps('events')?.phone || '+33123456789'}`} style={{ color: 'var(--template-accent)', textDecoration: 'none', fontWeight: 'bold' }}>
                📱 {getSectionProps('events')?.phoneDisplay || '01 23 45 67 89'}
              </a>
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
            title={contactProps?.title || "Nous contacter"}
            subtitle={contactProps?.subtitle || "Une question ? N'hésitez pas à nous écrire"}
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
          © 2025 Ristorante Bella Vista - Tous droits réservés
        </footer>
      )}
    </div>
  );
};

export default Restaurant;