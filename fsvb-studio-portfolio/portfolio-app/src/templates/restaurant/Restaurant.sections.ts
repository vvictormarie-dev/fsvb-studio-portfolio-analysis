/*
=== STRUCTURE SECTIONS RESTAURANT ===
Configuration pour l'activation/désactivation des sections du template Restaurant
*/

export interface RestaurantSectionConfig {
  id: string;
  label: string;
  enabled: boolean;
  required?: boolean; // Sections obligatoires qui ne peuvent pas être désactivées
  configurable?: boolean; // Si la section accepte des props configurables
  description?: string; // Description de la section
  props?: Record<string, any>; // Props disponibles pour la configuration
}

/*
ANALYSE STRUCTURELLE - 12 SECTIONS IDENTIFIÉES :
1. Navbar - Navigation principale (OBLIGATOIRE)
2. Hero - Section d'accueil restaurant (OBLIGATOIRE) 
3. Specialties - Spécialités de la maison (OPTIONNELLE)
4. Menu - Carte complète avec prix (OBLIGATOIRE)
5. Gallery - Photos restaurant et plats (OPTIONNELLE)
6. About - Histoire du restaurant (OPTIONNELLE)
7. Testimonials - Avis clients (OPTIONNELLE)
8. Hours Location - Horaires et localisation (OBLIGATOIRE)
9. Reservation - Formulaire réservation (OBLIGATOIRE)
10. Events - Événements et privatisation (OPTIONNELLE)
11. Contact - Informations de contact (OPTIONNELLE)
12. Footer - Pied de page (OBLIGATOIRE)
*/

export const restaurantSectionsDefault: RestaurantSectionConfig[] = [
  {
    id: "navbar",
    label: "Navigation",
    enabled: true,
    required: true,
    configurable: true
  },
  {
    id: "hero",
    label: "En-tête principal",
    enabled: true,
    required: true,
    configurable: true
  },
  {
    id: "specialties",
    label: "Nos spécialités",
    enabled: true,
    required: false,
    configurable: true,
    description: "Mise en avant des plats signatures"
  },
  {
    id: "menu",
    label: "Notre carte",
    enabled: true,
    required: true,
    configurable: true,
    description: "Menu complet avec prix"
  },
  {
    id: "gallery",
    label: "Galerie photos",
    enabled: true,
    required: false,
    configurable: true,
    description: "Photos du restaurant et des plats"
  },
  {
    id: "about",
    label: "Notre histoire",
    enabled: true,
    required: false,
    configurable: true,
    description: "Présentation du restaurant"
  },
  {
    id: "testimonials",
    label: "Avis clients",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "hoursLocation",
    label: "Horaires & Localisation",
    enabled: true,
    required: true,
    configurable: true,
    description: "Horaires d'ouverture et carte"
  },
  {
    id: "reservation",
    label: "Réservation",
    enabled: true,
    required: true,
    configurable: true,
    description: "Formulaire de réservation"
  },
  {
    id: "events",
    label: "Événements",
    enabled: true,
    required: false,
    configurable: true,
    description: "Événements et privatisation"
  },
  {
    id: "contact",
    label: "Contact",
    enabled: true,
    required: false,
    configurable: true
  },
  {
    id: "footer",
    label: "Pied de page",
    enabled: true,
    required: true,
    configurable: true
  }
];

export type RestaurantSectionId = keyof typeof restaurantSections;

// Export des sections sous forme d'objet pour l'accès facile
export const restaurantSections = Object.fromEntries(
  restaurantSectionsDefault.map(section => [section.id, section])
) as Record<string, RestaurantSectionConfig>;