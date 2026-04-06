/**
 * Template Assets Configuration
 * 
 * Cette configuration centralise toutes les ressources visuelles
 * utilisées dans la page Templates pour faciliter la maintenance
 */

export const templateImages = {
  // Landing Solo Template
  landingSolo: {
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template Landing Solo - page d\'accueil moderne avec design minimaliste'
  },

  // Restaurant Template
  restaurant: {
    preview: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template Restaurant - site élégant pour établissement culinaire'
  },

  // Coach Template
  coach: {
    preview: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template Coach - plateforme professionnelle pour coach sportif'
  },

  // E-commerce Template (Coming Soon)
  ecommerce: {
    preview: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template E-commerce - boutique en ligne moderne'
  },

  // Blog Template (Coming Soon)
  blog: {
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68e2c67421?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template Blog - plateforme de publication moderne'
  },

  // Portfolio Template (Coming Soon)
  portfolio: {
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template Portfolio - showcase créatif professionnel'
  },

  // SaaS Template (Coming Soon)
  saas: {
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Aperçu du template SaaS - application web moderne'
  },

  // Default fallback
  placeholder: {
    preview: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Image de placeholder - design en cours de développement'
  }
};

export const templateDemos = {
  landingSolo: 'https://landing-solo-demo.netlify.app',
  restaurant: 'https://restaurant-template-demo.netlify.app',
  coach: 'https://coach-template-demo.netlify.app'
};

export const templateFeatures = {
  landingSolo: [
    { icon: '⚡', text: 'Performance optimisée' },
    { icon: '📱', text: 'Design responsive' },
    { icon: '🎨', text: 'Interface moderne' },
    { icon: '🔧', text: 'Facile à personnaliser' },
    { icon: '🚀', text: 'Déploiement rapide' },
    { icon: '💡', text: 'SEO optimisé' }
  ],
  
  restaurant: [
    { icon: '🍽️', text: 'Menu interactif' },
    { icon: '📞', text: 'Système de réservation' },
    { icon: '📍', text: 'Localisation GPS' },
    { icon: '⭐', text: 'Avis clients' },
    { icon: '📸', text: 'Galerie photos' },
    { icon: '🔄', text: 'Mise à jour facile' }
  ],
  
  coach: [
    { icon: '💪', text: 'Planning séances' },
    { icon: '📊', text: 'Suivi progression' },
    { icon: '💬', text: 'Chat client' },
    { icon: '📈', text: 'Tableaux de bord' },
    { icon: '🎯', text: 'Objectifs personnalisés' },
    { icon: '📱', text: 'App mobile ready' }
  ]
};