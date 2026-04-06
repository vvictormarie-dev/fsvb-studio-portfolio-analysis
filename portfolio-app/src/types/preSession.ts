// Types pour le système de formulaires pré-session
export type TemplateType = 'landing-solo' | 'restaurant' | 'coach';

export type FormStatus = 'pending' | 'in-progress' | 'reviewed';

export interface PreSessionFormData {
  id?: string;
  sessionId: string;
  templateType: TemplateType;
  clientEmail: string;
  responses: Record<string, any>;
  filesUrls?: Record<string, string>;
  status: FormStatus;
  createdAt?: string;
  reviewedAt?: string;
}

// Structures de réponses par template
export interface LandingSoloResponses {
  // Informations entreprise
  companyName: string;
  logoUrl?: string;
  description: string;
  
  // Services
  services: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  
  // Tarifs
  pricing: Array<{
    name: string;
    price: string;
    features: string[];
  }>;
  
  // Portfolio
  portfolio: Array<{
    name: string;
    description: string;
    imageUrl?: string;
    url?: string;
  }>;
  
  // Contact
  email: string;
  phone: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface RestaurantResponses {
  // Section 1: Informations de base (5 questions)
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  restaurantType: string;
  
  // Section 2: Sections souhaitées (5 checkboxes)
  sectionsEnabled: {
    specialties: boolean;
    gallery: boolean;
    history: boolean;
    testimonials: boolean;
    events: boolean;
  };
  
  // Section 3: Contenus disponibles (5 questions)
  hasLogo: 'yes' | 'no';
  menuStatus: 'pdf-ready' | 'to-create' | 'need-help';
  photosStatus: 'ready' | 'to-prepare';
  photosCount?: number;
  textsStatus: 'all-ready' | 'ideas-only' | 'need-help';
  
  // Section 4: Couleurs & Style (3 questions)
  colorsType: 'precise' | 'general-ideas' | 'suggestions';
  colorsValue?: string;
  styleWanted?: string;
  
  // Section 5: Informations pratiques (3 questions)
  address: string;
  hours: string;
  services?: string[];
  
  // Section 6: Réservation (2 questions)
  reservationSystem: 'phone' | 'email' | 'external' | 'other';
  reservationUrl?: string;
  
  // Section 7: Présence en ligne & Notes (6 questions)
  hasExistingSite: 'yes' | 'no';
  existingSiteUrl?: string;
  hasGoogleMyBusiness?: 'yes' | 'no';
  googleMyBusinessUrl?: string;
  hasSocialMedia?: 'yes' | 'no';
  labels?: string;
  notes?: string;
}

export interface CoachResponses {
  // Section 1: Informations (6 questions)
  coachName: string;
  email: string;
  phone: string;
  activityName?: string;
  coachingType: string;
  activityDescription: string;
  
  // Section 2: Sections souhaitées (6 checkboxes)
  sectionsEnabled: {
    about: boolean;
    method: boolean; // approach section
    domains: boolean;
    certifications: boolean;
    testimonials: boolean;
    faq: boolean;
  };
  
  // Section 3: Contenus disponibles (4 questions)
  hasPortraitPhoto: 'yes' | 'to-take' | 'alternative';
  photosStatus?: 'ready' | 'to-prepare';
  photosCount?: number;
  textsStatus: 'all-ready' | 'ideas-only' | 'need-help';
  
  // Section 4: Expertise (2 questions)
  yearsExperience?: number;
  hasCertifications?: 'yes' | 'no';
  
  // Section 5: Approche (3 questions)
  targetAudience?: string[];
  sessionFormats?: string[];
  typicalDuration?: string;
  
  // Section 6: Réservation (2 questions)
  hasCalendly: 'calendly' | 'other-tool' | 'manual';
  bookingUrl?: string;
  
  // Section 7: Couleurs & Style (3 questions)
  colorsType: 'precise' | 'general-ideas' | 'coaching-suggestions';
  colorsValue?: string;
  ambiance?: string;
  
  // Section 8: Présence en ligne & Notes (4 questions)
  hasExistingSite: 'yes' | 'no';
  existingSiteUrl?: string;
  hasSocialMedia?: 'yes' | 'no';
  notes?: string;
  
  // Champs existants conservés pour compatibilité
  bio?: string;
  photoUrl?: string;
  approche?: Array<{
    etape: string;
    description: string;
  }>;
  domaines?: Array<{
    title: string;
    description: string;
  }>;
  formules?: Array<{
    name: string;
    price: string;
    duree: string;
    features: string[];
  }>;
  temoignages?: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  siteWeb?: string;
}

export type FormResponses = LandingSoloResponses | RestaurantResponses | CoachResponses;