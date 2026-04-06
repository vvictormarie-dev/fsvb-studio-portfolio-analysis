/*
=== AUDIT CONFIGURATEUR - ÉTAT ACTUEL ===

TEMPLATES CONNECTÉS :
✅ LandingSolo - Prix: 350€ - Fonctionnel avec composants complets
✅ Restaurant - Prix: 400€ - Template basique avec placeholder
✅ Coach - Prix: 500€ - Template basique avec placeholder

PROPS ACTUELLEMENT PASSÉES AUX TEMPLATES :
✅ hideThemeSelector: true (pour masquer le sélecteur dans le configurateur)
✅ data-theme wrapper: utilise formData.theme pour appliquer le thème sélectionné

INFORMATIONS DU FORMULAIRE UTILISÉES DANS LA PREVIEW :
✅ selectedTemplate: détermine quel template afficher
✅ theme: appliqué via data-theme wrapper

INFORMATIONS DU FORMULAIRE NON UTILISÉES DANS LA PREVIEW :
❌ companyName: collecté mais pas injecté dans les templates
❌ email: collecté mais pas utilisé
❌ phone: collecté mais pas utilisé
❌ primaryColor: collecté mais pas appliqué aux templates
❌ secondaryColor: collecté mais pas appliqué aux templates
❌ accentColor: collecté mais pas appliqué aux templates

TODO PRIORITÉS :
1. Passer les données du formulaire (companyName, colors) comme props aux templates
2. Créer les composants manquants pour Restaurant et Coach templates
3. Implémenter l'injection dynamique des couleurs personnalisées
4. Ajouter la logique de preview en temps réel des modifications
*/

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ConfigurationModal from '../components/ConfigurationModal';
import ConfigurationCaptureModalAdaptive from '../components/ConfigurationCaptureModalAdaptive';
import LandingPreview from '../components/LandingPreview';
import PreviewModal from '../components/PreviewModal';
import styles from './ConfiguratorPage.module.css';
import { landingSectionsDefault, type LandingSectionConfig } from '../templates/landing-solo/LandingSolo.sections';
import { restaurantSectionsDefault, type RestaurantSectionConfig } from '../templates/restaurant/Restaurant.sections';
import { coachSectionsDefault, type CoachSectionConfig } from '../templates/coach/Coach.sections';
import {
  commonSections,
  templateSpecificSections,
} from '../config/sectionsConfig';
import { SECTIONS_MAPPING } from '../config/sectionsMapping';
import bridgeModalToConfigurator from '../config/modalBridge';
import { insertOrder, uploadProjectImage, type OrderRecord, isSupabaseConfigured, getSupabaseConfigError } from '../config/supabase';

// Association automatique template → thème pour une meilleure cohérence visuelle
const TEMPLATE_THEME_MAP: Record<string, string> = {
  'landing-solo': 'empire',    // Tech/SaaS, moderne, professionnel
  'restaurant': 'chaleur',     // Convivial, chaleureux, gourmand 
  'coach': 'zen'               // Bien-être, calme, professionnel
};

// Constantes pour éviter les problèmes de parsing TSX avec les accents
const DEFAULT_TEXTS = {
  HERO_SUBTITLE: 'Livres en 3 jours',
  HERO_DESCRIPTION: 'Transformez votre vision en realite digitale',
  ABOUT_TITLE: 'Pourquoi Me Choisir ?',
  ABOUT_DESCRIPTION: 'Passionnee par la creation digitale...',
  CONTACT_TITLE: 'Pret a Demarrer Votre Projet ?',
  CONTACT_SUBTITLE: 'Discutons ensemble de vos besoins',
  SERVICES_TITLE: 'Nos Services',
  SERVICES_DESCRIPTION: 'Decouvrez nos offres adaptees a vos besoins',
  PORTFOLIO_TITLE: 'Nos Realisations',
  PORTFOLIO_SUBTITLE: 'Des projets qui font la difference',
  FEATURES_TITLE: 'Pourquoi Nous Choisir ?',
  FEATURES_SUBTITLE: 'Ce qui nous rend uniques',
  SPECIALTIES_TITLE: 'Nos Specialites',
  SPECIALTIES_DESCRIPTION: 'Decouvrez nos plats signatures',
  APPROACH_TITLE: 'Ma Methode d\'Accompagnement',
  APPROACH_DESCRIPTION: 'Une approche bienveillante et personnalisee',
  FAQ_TITLE: 'Questions Frequentes',
  FAQ_SUBTITLE: 'Tout ce que vous devez savoir',
  MENU_TITLE: 'Notre Carte',
  MENU_DESCRIPTION: 'Une cuisine authentique et savoureuse',
  DOMAINS_TITLE: 'Mes Domaines d\'Expertise',
  DOMAINS_SUBTITLE: 'Des accompagnements personnalises'
};

// Déclaration globale pour PayPal
declare global {
  interface Window {
    paypal?: any;
  }
}

export type FormData = {
  companyName: string;
  tagline: string;
  ctaLabel: string;
  email: string;
  phone: string;
  logoUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  theme: string;

  // Note libre du client
  specialRequest?: string;
  
  // Nouvelles sections Landing-Solo
  trustbar: {
    stats: Array<{
      value: string;
      label: string;
      icon: string;
    }>;
  };
  
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    packages: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
      highlighted: boolean;
      ctaText: string;
    }>;
  };
  
  portfolio: {
    sectionTitle: string;
    sectionSubtitle: string;
    projects: Array<{
      title: string;
      category: string;
      description: string;
      imageUrl: string;
      projectUrl: string;
    }>;
  };
  
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{
      name: string;
      role: string;
      content: string;
      rating: number;
      avatarUrl: string;
    }>;
  };
  
  approach?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  domains?: {
    sectionTitle: string;
    sectionSubtitle?: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  specialties?: {
    sectionTitle: string;
    sectionSubtitle?: string;
    items: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
  
  gallery?: {
    sectionTitle: string;
    sectionSubtitle?: string;
    photos: Array<{
      title: string;
      imageUrl: string;
      category: string;
    }>;
  };
  
  faq?: {
    sectionTitle: string;
    sectionSubtitle?: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
};

interface ClientOrder {
  orderId: string;                     // ID unique de commande
  template: string;
  theme: string;
  formData: FormData;
  contactInfo: {                       // Infos contact consolidées
    companyName: string;
    email: string;
    phone: string;
    social: {
      instagram?: string;
      linkedin?: string;
    };
  };
  assets: {                           // URLs d'images garanties
    logoUrl?: string;
  };
  sectionsConfig: LandingSectionConfig[] | RestaurantSectionConfig[] | CoachSectionConfig[];
  colorMode?: 'auto' | 'custom';
  createdAt: string;
}

const ConfiguratorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateFromUrl = searchParams.get('template') as 'landing-solo' | 'restaurant' | 'coach' | null;
  
  // États pour le système de modal slides
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // États pour le modal de capture
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);
  
  // États pour le modal preview
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  
  // Slides configuration
  const slides = [
    {
      title: "Choisissez votre template",
      subtitle: "Sélectionnez le design qui correspond à votre activité",
      content: (
        <div>
          <p>Nos templates sont conçus spécialement pour différents secteurs :</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Coach Premium</strong> - Pour les coachs et consultants (500€)</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Restaurant Premium</strong> - Pour les restaurants et cafés (400€)</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Sur-Mesure</strong> - Design entièrement personnalisé (350€)</li>
          </ul>
        </div>
      )
    },
    {
      title: "Configuration personnalisée",
      subtitle: "Adaptez le design à votre image de marque",
      content: (
        <div>
          <p>Personnalisation complète incluse :</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>🎨 Couleurs et thème visuel</li>
            <li style={{ marginBottom: '0.5rem' }}>📝 Textes et contenus</li>
            <li style={{ marginBottom: '0.5rem' }}>🖼️ Images et médias</li>
            <li style={{ marginBottom: '0.5rem' }}>📱 Responsive design</li>
          </ul>
        </div>
      )
    },
    {
      title: "Livraison rapide",
      subtitle: "Votre site sera prêt en 5 jours maximum",
      content: (
        <div>
          <p>Processus de livraison :</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>💳 Paiement sécurisé avec PayPal</li>
            <li style={{ marginBottom: '0.5rem' }}>📋 Questionnaire de personnalisation</li>
            <li style={{ marginBottom: '0.5rem' }}>🎨 Développement sur-mesure</li>
            <li style={{ marginBottom: '0.5rem' }}>🚀 Livraison et mise en ligne</li>
          </ul>
        </div>
      )
    }
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const openModal = () => {
    setIsModalOpen(true);
    setCurrentSlide(0);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const openCaptureModal = () => {
    setIsCaptureModalOpen(true);
  };
  
  const closeCaptureModal = () => {
    setIsCaptureModalOpen(false);
  };
  
  const handleCaptureComplete = (capturedData: any) => {
    console.log('🎯 handleCaptureComplete - Données reçues du modal:', capturedData);
    
    // 1. Transformer les données du modal vers le format du configurateur
    const bridgedData = bridgeModalToConfigurator(capturedData.formData);
    
    // 2. FORCER nouvelles références pour déclencher useEffect
    const newFormData = {
      ...formData,
      ...bridgedData,
      // Forcer nouvelles références pour objects
      services: bridgedData.services ? { ...bridgedData.services } : formData.services,
      portfolio: bridgedData.portfolio ? { ...bridgedData.portfolio } : formData.portfolio,
      features: bridgedData.features ? { ...bridgedData.features } : formData.features,
      testimonials: bridgedData.testimonials ? { ...bridgedData.testimonials } : formData.testimonials
    };
    
    // 3. Mettre à jour formData
    setFormData(newFormData);
    
    // 4. MISE À JOUR DIRECTE sectionsConfig (bypass useEffect)
    setSectionsConfig(prevSections => {
      return prevSections.map(section => {
        // Services
        if (section.id === 'services' && bridgedData.services) {
          return {
            ...section,
            props: {
              sectionTitle: bridgedData.services.sectionTitle,
              sectionSubtitle: bridgedData.services.sectionSubtitle,
              packages: bridgedData.services.packages
            }
          };
        }
        
        // Portfolio
        if (section.id === 'portfolio' && bridgedData.portfolio) {
          return {
            ...section,
            props: {
              sectionTitle: bridgedData.portfolio.sectionTitle,
              sectionSubtitle: bridgedData.portfolio.sectionSubtitle,
              projects: bridgedData.portfolio.projects
            }
          };
        }
        
        // Features
        if (section.id === 'features' && bridgedData.features) {
          return {
            ...section,
            props: {
              sectionTitle: bridgedData.features.sectionTitle,
              sectionSubtitle: bridgedData.features.sectionSubtitle,
              items: bridgedData.features.items
            }
          };
        }
        
        // Testimonials
        if (section.id === 'testimonials' && bridgedData.testimonials) {
          return {
            ...section,
            props: {
              sectionTitle: bridgedData.testimonials.sectionTitle,
              sectionSubtitle: bridgedData.testimonials.sectionSubtitle,
              items: bridgedData.testimonials.items
            }
          };
        }
        
        return section;
      });
    });
    
    // Mettre à jour le template sélectionné si nécessaire
    if (capturedData.selectedTemplate) {
      setSelectedTemplate(capturedData.selectedTemplate as 'landing-solo' | 'restaurant' | 'coach');
    }
    
    setIsCaptureModalOpen(false);
    
    // Log pour debugging
    console.log('✅ Preview mise à jour:', {
      services: bridgedData.services?.packages.length || 0,
      portfolio: bridgedData.portfolio?.projects.length || 0,
      features: bridgedData.features?.items.length || 0
    });
    
    // Feedback utilisateur
    alert('✨ Configuration appliquée ! Consultez la prévisualisation pour voir les changements.');
  };
  
  const openPreviewModal = () => {
    setIsPreviewModalOpen(true);
  };
  
  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };
  
  const handleValidatePreview = async () => {
    // Validation avant commande
    const validation = validateConfiguration();
    
    if (!validation.isValid) {
      alert(`❌ Impossible de valider la commande:\n\n${validation.errors.join('\n')}`);
      return;
    }
    
    // Confirmation avec warnings si présents
    if (validation.warnings.length > 0) {
      const warningsText = validation.warnings.join('\n');
      const confirmed = window.confirm(
        `⚠️ Recommandations avant commande:\n\n${warningsText}\n\nVoulez-vous continuer malgré ces recommandations ?`
      );
      if (!confirmed) return;
    }
    
    console.log('🔄 VALIDATION DE LA COMMANDE - Validation OK');
    
    try {
      // Appeler handleOrder() existant pour créer la commande
      await handleOrder();
      
      // Si la commande a été créée avec succès, extraire l'order_id
      if (orderStatus === 'success' && clientOrderJson) {
        const clientOrder = JSON.parse(clientOrderJson);
        const orderId = clientOrder.orderId;
        
        // Fermer le modal
        closePreviewModal();
        
        // Rediriger vers /order/:id avec navigate
        navigate(`/order/${orderId}`);
      } else {
        // Si pas encore de succès, attendre un peu et réessayer
        setTimeout(() => {
          if (orderStatus === 'success' && clientOrderJson) {
            const clientOrder = JSON.parse(clientOrderJson);
            const orderId = clientOrder.orderId;
            closePreviewModal();
            navigate(`/order/${orderId}`);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      alert('Erreur lors de la création de la commande. Veuillez réessayer.');
    }
  };
  
  const [selectedTemplate, setSelectedTemplate] = useState<'landing-solo' | 'restaurant' | 'coach'>(
    templateFromUrl || 'landing-solo'
  );
  const [isThemeManuallySet, setIsThemeManuallySet] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    tagline: '',
    ctaLabel: '',
    email: '',
    phone: '',
    logoUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    primaryColor: '#2563EB',
    secondaryColor: '#1E40AF',
    accentColor: '#FBBF24',
    backgroundColor: '#04040E',
    textColor: '#FFFFFF',
    theme: 'empire',
    specialRequest: '',

    // Valeurs par défaut des nouvelles sections
    trustbar: {
      stats: [
        {value: "500+", label: "Clients satisfaits", icon: "users"},
        {value: "10 ans", label: "D'expérience", icon: "calendar"},
        {value: "98%", label: "Taux de satisfaction", icon: "star"},
        {value: "48h", label: "Délai de livraison", icon: "clock"}
      ]
    },
    
    services: {
      sectionTitle: "Mes Offres",
      sectionSubtitle: "Choisissez la formule adaptée à vos besoins",
      packages: [
        {
          name: "Formule Starter",
          price: "350€",
          description: "Idéal pour démarrer votre présence en ligne",
          features: ["Site 3 pages", "Design responsive", "Formulaire de contact", "SEO basique"],
          highlighted: false,
          ctaText: "Choisir Starter"
        },
        {
          name: "Formule Business",
          price: "500€",
          description: "Solution complète pour votre entreprise",
          features: ["Site 5 pages", "Design premium", "SEO optimisé", "Analytics intégré", "Support 30 jours"],
          highlighted: true,
          ctaText: "Choisir Business"
        },
        {
          name: "Formule Premium",
          price: "800€",
          description: "Pour aller plus loin dans votre croissance",
          features: ["Pages illimitées", "Design sur-mesure", "SEO avancé", "Blog intégré", "Support prioritaire"],
          highlighted: false,
          ctaText: "Choisir Premium"
        }
      ]
    },
    
    portfolio: {
      sectionTitle: "Mes Réalisations",
      sectionSubtitle: "Découvrez quelques projets que j'ai réalisés",
      projects: [
        {
          title: "Site E-commerce Mode",
          category: "E-commerce",
          description: "Boutique en ligne responsive avec paiement sécurisé",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
          projectUrl: ""
        },
        {
          title: "Portfolio Photographe",
          category: "Portfolio",
          description: "Site vitrine élégant avec galerie photos",
          imageUrl: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800",
          projectUrl: ""
        },
        {
          title: "Blog Lifestyle",
          category: "Blog",
          description: "Blog moderne avec système de commentaires",
          imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
          projectUrl: ""
        }
      ]
    },
    
    features: {
      sectionTitle: "Pourquoi Me Choisir",
      sectionSubtitle: "Les avantages de travailler avec moi",
      items: [
        {title: "Livraison Rapide", description: "Votre site prêt en 48-72h", icon: "zap"},
        {title: "Design Moderne", description: "Interface élégante et professionnelle", icon: "star"},
        {title: "Support Réactif", description: "Assistance complète incluse", icon: "headphones"},
        {title: "SEO Optimisé", description: "Visible sur Google dès le départ", icon: "search"},
        {title: "Mobile First", description: "Parfait sur tous les écrans", icon: "smartphone"},
        {title: "Garantie Satisfait", description: "Modifications jusqu'à satisfaction", icon: "shield"}
      ]
    },
    
    testimonials: {
      sectionTitle: "Ce Qu'ils Disent de Moi",
      sectionSubtitle: "Retours de clients satisfaits",
      items: [
        {
          name: "Sophie Martin",
          role: "Gérante, Boutique Mode",
          content: "Site magnifique livré en 48h ! Mon chiffre d'affaires a doublé en 3 mois.",
          rating: 5,
          avatarUrl: ""
        },
        {
          name: "Thomas Durand",
          role: "Coach Sportif",
          content: "Professionnel, réactif et à l'écoute. Je recommande les yeux fermés !",
          rating: 5,
          avatarUrl: ""
        },
        {
          name: "Julie Petit",
          role: "Photographe Freelance",
          content: "Exactement ce que je voulais. Portfolio élégant qui met en valeur mon travail.",
          rating: 5,
          avatarUrl: ""
        }
      ]
    },
    
    approach: {
      sectionTitle: "Ma Méthode de Coaching",
      sectionSubtitle: "Un processus éprouvé en 4 étapes",
      steps: [
        {
          number: 1,
          title: "Entretien Découverte",
          description: "Identification de vos objectifs, blocages et motivation profonde. Cette première étape est cruciale pour personnaliser votre accompagnement.",
          icon: "search"
        },
        {
          number: 2,
          title: "Diagnostic Personnalisé",
          description: "Analyse approfondie de votre situation et co-création d'un plan d'action sur-mesure adapté à vos besoins spécifiques.",
          icon: "target"
        },
        {
          number: 3,
          title: "Séances de Coaching",
          description: "Accompagnement régulier avec outils concrets, exercices pratiques et défis progressifs pour atteindre vos objectifs.",
          icon: "users"
        },
        {
          number: 4,
          title: "Bilan & Ajustements",
          description: "Évaluation des progrès réalisés, célébration des victoires et ajustements de la stratégie pour la suite de votre parcours.",
          icon: "trophy"
        }
      ]
    },
    
    domains: {
      sectionTitle: "Mes Domaines d'Expertise",
      sectionSubtitle: "Accompagnement spécialisé pour tous vos défis",
      items: [
        {
          title: "Coaching Professionnel",
          description: "Évolution de carrière, leadership, reconversion professionnelle et développement des compétences managériales.",
          icon: "briefcase"
        },
        {
          title: "Coaching Personnel",
          description: "Confiance en soi, développement personnel, gestion du stress et équilibre vie privée/professionnelle.",
          icon: "heart"
        },
        {
          title: "Coaching de Performance",
          description: "Optimisation de vos capacités, dépassement de vos limites et atteinte d'objectifs ambitieux.",
          icon: "rocket"
        }
      ]
    },
    
    specialties: {
      sectionTitle: "Nos Spécialités",
      sectionSubtitle: "Les plats qui font notre réputation",
      items: [
        {
          name: "Paella Valenciana",
          description: "Recette traditionnelle espagnole, riz au safran, fruits de mer frais du marché quotidien.",
          icon: "chef"
        },
        {
          name: "Entrecôte Grillée",
          description: "Viande maturée 21 jours, sauce maison, accompagnement du jour et pommes de terre rôties.",
          icon: "meat"
        },
        {
          name: "Tarte Tatin Maison",
          description: "Pommes caramélisées, pâte feuilletée croustillante, boule de glace vanille et crème fraîche.",
          icon: "dessert"
        }
      ]
    },
    
    gallery: {
      sectionTitle: "Notre Établissement",
      sectionSubtitle: "Découvrez notre ambiance chaleureuse",
      photos: [
        {
          title: "Notre Salle Principale",
          imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
          category: "Salle"
        },
        {
          title: "Plats du Chef",
          imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600",
          category: "Plats"
        },
        {
          title: "Terrasse d'Été",
          imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
          category: "Terrasse"
        }
      ]
    },
    
    faq: {
      sectionTitle: "Questions Fréquentes",
      sectionSubtitle: "Tout ce que vous devez savoir",
      items: [
        {
          question: "Quels sont vos délais de livraison ?",
          answer: "Nous livrons votre site en 3 jours ouvrables maximum. Pour des projets complexes, nous vous communiquerons un délai précis lors de votre commande."
        },
        {
          question: "Comment vous contacter ?",
          answer: "Vous pouvez nous joindre par email, téléphone ou via le formulaire de contact. Nous répondons sous 24h maximum."
        },
        {
          question: "Proposez-vous une garantie ?",
          answer: "Oui, nous proposons une garantie satisfaction. Nous modifions votre site jusqu'à ce qu'il réponde parfaitement à vos attentes."
        }
      ]
    }
  });
  const [clientOrderJson, setClientOrderJson] = useState<string | null>(null);
  const [sectionsConfig, setSectionsConfig] = useState<LandingSectionConfig[]>(landingSectionsDefault);
  const [restaurantSectionsConfig, setRestaurantSectionsConfig] = useState<RestaurantSectionConfig[]>(restaurantSectionsDefault);
  const [coachSectionsConfig, setCoachSectionsConfig] = useState<CoachSectionConfig[]>(coachSectionsDefault);
  
  // État pour la commande (utilisé pour generateOrder interne)
  const [orderStatus, setOrderStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  type ColorMode = 'auto' | 'custom';
  const [colorMode, setColorMode] = useState<ColorMode>('auto');

  // État pour l'accordéon des props de sections
  const [openSections, setOpenSections] = useState<string[]>([]); // Toutes fermées par défaut
  const [showTooltip, setShowTooltip] = useState(false);

  // État de validation pré-commande
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  // Fermer le tooltip quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showTooltip && !target.closest(`.${styles.tooltipIcon}`)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTooltip]);

  // Calcul du pourcentage de progression
  const calculateProgress = () => {
    let totalSections = 0;
    let completedSections = 0;
    
    // 1. Informations essentielles (poids: 20%) - Plus flexible pour particuliers
    const requiredFields = [formData.email]; // ✅ Email toujours obligatoire
    const recommendedFields = [formData.companyName, formData.tagline]; // ✅ Nom/tagline recommandés
    const optionalFields = [formData.ctaLabel, formData.logoUrl, formData.phone];
    
    totalSections += 20;
    const filledRequired = requiredFields.filter(field => field && field.trim() !== '').length;
    const filledRecommended = recommendedFields.filter(field => field && field.trim() !== '').length;
    const filledOptional = optionalFields.filter(field => field && field.trim() !== '').length;
    
    // ✅ Nouvelle logique: Email obligatoire + recommandés/optionnels pour score
    if (filledRequired === 1 && filledRecommended >= 2 && filledOptional >= 2) completedSections += 20;
    else if (filledRequired === 1 && filledRecommended >= 2 && filledOptional >= 1) completedSections += 15;
    else if (filledRequired === 1 && filledRecommended >= 1) completedSections += 10;
    else if (filledRequired === 1) completedSections += 5;
    
    // 2. Sections activées (poids: 80%)
    let currentSections: any[] = [];
    if (selectedTemplate === 'landing-solo') {
      currentSections = sectionsConfig;
    } else if (selectedTemplate === 'restaurant') {
      currentSections = restaurantSectionsConfig;
    } else if (selectedTemplate === 'coach') {
      currentSections = coachSectionsConfig;
    }
    
    const sectionsEnabled = currentSections.reduce((acc: any, section: any) => {
      acc[section.id] = section.enabled;
      return acc;
    }, {});
    
    const enabledSectionsCount = Object.values(sectionsEnabled).filter(Boolean).length;
    const maxSections = Object.keys(sectionsEnabled).length;
    
    if (enabledSectionsCount > 0) {
      totalSections += 80;
      completedSections += Math.round((enabledSectionsCount / maxSections) * 80);
    }
    
    return Math.min(100, Math.round((completedSections / totalSections) * 100));
  };

  // Messages de progression dynamiques
  const getProgressMessage = () => {
    const progress = calculateProgress();
    let currentSections: any[] = [];
    if (selectedTemplate === 'landing-solo') {
      currentSections = sectionsConfig;
    } else if (selectedTemplate === 'restaurant') {
      currentSections = restaurantSectionsConfig;
    } else if (selectedTemplate === 'coach') {
      currentSections = coachSectionsConfig;
    }
    
    const sectionsEnabled = currentSections.reduce((acc: any, section: any) => {
      acc[section.id] = section.enabled;
      return acc;
    }, {});
    const enabledCount = Object.values(sectionsEnabled).filter(Boolean).length;
    
    if (progress < 15) {
      return "🚀 Commençons par les informations essentielles";
    } else if (progress < 30) {
      return "📝 Bonnes bases ! Ajoutez quelques sections";
    } else if (progress < 60) {
      return `⚡ En bonne voie ! ${enabledCount} section(s) configurée(s)`;
    } else if (progress < 90) {
      return `🔥 Excellent progrès ! Presque terminé`;
    } else {
      return `🎉 Configuration complète ! Site prêt à générer`;
    }
  };

  // Auto-application du thème selon le template sélectionné
  useEffect(() => {
    if (selectedTemplate && TEMPLATE_THEME_MAP[selectedTemplate]) {
      const defaultTheme = TEMPLATE_THEME_MAP[selectedTemplate];
      
      // Ne change le thème que si l'utilisateur n'a pas déjà fait un choix manuel
      // OU si c'est le premier chargement/changement de template
      if (!isThemeManuallySet || !formData.theme || formData.theme === '') {
        setFormData(prev => ({
          ...prev,
          theme: defaultTheme
        }));
      }
    }
  }, [selectedTemplate, isThemeManuallySet]);

  // Auto-application du thème au chargement depuis URL
  useEffect(() => {
    if (templateFromUrl && TEMPLATE_THEME_MAP[templateFromUrl] && !formData.theme) {
      setFormData(prev => ({
        ...prev,
        theme: TEMPLATE_THEME_MAP[templateFromUrl]
      }));
    }
  }, [templateFromUrl]);

  // Thème par défaut si aucun template ni thème sélectionné
  useEffect(() => {
    if (!selectedTemplate && !formData.theme) {
      setFormData(prev => ({
        ...prev,
        theme: 'empire'
      }));
    }
  }, []);

  const toggleSectionProps = (sectionId: string) => {
    setOpenSections(prev => {
      const isCurrentlyOpen = prev.includes(sectionId);
      const newSections = isCurrentlyOpen
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId];

      // Si on ouvre la section (pas si on la ferme), scroll vers preview
      if (!isCurrentlyOpen && !isCaptureModalOpen) {
        setTimeout(() => {
          scrollToPreviewSection(sectionId);
        }, 150); // 150ms = temps pour animation d'ouverture accordéon
      }

      return newSections;
    });
  };

  // Dérivation des sections communes et spécifiques basées sur le template sélectionné
  const commonSectionIds = commonSections;
  const templateKeyMap: Record<string, keyof typeof templateSpecificSections> = {
    "landing-solo": "landing",
    restaurant: "restaurant",
    coach: "coach",
  };
  const templateKey = templateKeyMap[selectedTemplate] ?? "landing";
  const specificSectionIds = templateSpecificSections[templateKey] ?? [];

  // Auto-application du thème selon le template sélectionné
  useEffect(() => {
    if (selectedTemplate && TEMPLATE_THEME_MAP[selectedTemplate]) {
      const defaultTheme = TEMPLATE_THEME_MAP[selectedTemplate];
      
      // Ne change le thème que si l'utilisateur n'a pas déjà fait un choix manuel
      // OU si c'est le premier chargement/changement de template
      if (!isThemeManuallySet || !formData.theme || formData.theme === '') {
        setFormData(prev => ({
          ...prev,
          theme: defaultTheme
        }));
      }
    }
  }, [selectedTemplate, isThemeManuallySet]);

  // Auto-application du thème au chargement depuis URL
  useEffect(() => {
    if (templateFromUrl && TEMPLATE_THEME_MAP[templateFromUrl] && !formData.theme) {
      setFormData(prev => ({
        ...prev,
        theme: TEMPLATE_THEME_MAP[templateFromUrl]
      }));
    }
  }, [templateFromUrl]);

  // Thème par défaut si aucun template ni thème sélectionné
  useEffect(() => {
    if (!selectedTemplate && !formData.theme) {
      setFormData(prev => ({
        ...prev,
        theme: 'empire'
      }));
    }
  }, []);

  // Tableau des sections du template sélectionné
  const currentSections =
    selectedTemplate === "landing-solo"
      ? sectionsConfig
      : selectedTemplate === "restaurant"
      ? restaurantSectionsConfig
      : coachSectionsConfig;

  // Fonction utilitaire pour mettre à jour les props d'une section
  const updateSectionProps = (sectionId: string, newProps: Record<string, any>) => {
    const update = <T extends { id: string; props?: Record<string, any> }>(
      _sections: T[],
      setSections: React.Dispatch<React.SetStateAction<T[]>>
    ) => {
      setSections(prev =>
        prev.map(section =>
          section.id === sectionId
            ? {
                ...section,
                props: {
                  ...(section.props || {}),
                  ...newProps,
                },
              }
            : section
        )
      );
    };

    if (selectedTemplate === "landing-solo") {
      update(sectionsConfig, setSectionsConfig);
    } else if (selectedTemplate === "restaurant") {
      update(restaurantSectionsConfig, setRestaurantSectionsConfig);
    } else if (selectedTemplate === "coach") {
      update(coachSectionsConfig, setCoachSectionsConfig);
    }
  };

  // Gestionnaire de changement de template avec auto-application thème
  const handleTemplateChange = (newTemplate: 'landing-solo' | 'restaurant' | 'coach') => {
    const recommendedTheme = TEMPLATE_THEME_MAP[newTemplate];
    
    // Application automatique du thème recommandé
    if (recommendedTheme) {
      setFormData(prev => ({
        ...prev,
        theme: recommendedTheme
      }));
      // Reset du flag manuel car l'utilisateur change de template
      setIsThemeManuallySet(false);
    }
    
    setSelectedTemplate(newTemplate);
  };

  // Ref pour appliquer les couleurs personnalisées
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll vers preview avec gestion intelligente
  const scrollToPreview = useCallback(() => {
    const previewElement = previewRef.current;
    if (!previewElement) return;

    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Sur mobile, scroll plus agressif car preview souvent hors vue
      previewElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // Sur desktop, scroll seulement si preview pas visible
      const rect = previewElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top <= (window.innerHeight * 0.3);
      
      if (!isVisible) {
        previewElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
  }, []);

  // Auto-scroll vers section spécifique dans preview
  const scrollToPreviewSection = useCallback((sectionId: string) => {
    // Chercher la section spécifique dans le preview
    const sectionElement = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (sectionElement) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' // Centrer pour meilleure visibilité
      });
    } else {
      // Fallback: scroll vers le haut du preview
      scrollToPreview();
    }
  }, [scrollToPreview]);

  // Auto-scroll vers preview sur changements majeurs (template/thème)
  useEffect(() => {
    // Ne pas scroller au premier chargement ou si modal ouvert
    if (!isInitialLoad && !isCaptureModalOpen && selectedTemplate && formData.theme) {
      const timer = setTimeout(() => {
        scrollToPreview();
      }, 300); // 300ms = temps optimal pour le rendu React
      
      return () => clearTimeout(timer);
    }
    
    // Marquer comme chargé après le premier rendu
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [selectedTemplate, formData.theme, isInitialLoad, isCaptureModalOpen, scrollToPreview]);

  // ✅ SUPPRIMÉ: useEffect de couleurs - maintenant géré par LandingPreview directement
  // Plus de duplication ou conflit entre ConfiguratorPage et LandingPreview
  // LandingPreview gère les couleurs selon colorMode reçu en prop

  // ✅ MISE À JOUR AUTOMATIQUE DES PROPS DES SECTIONS
  
  // 1. Mise à jour de la section Hero
  useEffect(() => {
    if (formData.companyName || formData.tagline || formData.ctaLabel) {
      updateSectionProps('hero', {
        title: formData.companyName ? `${formData.companyName} - Sites Vitrines Premium` : "Sites Vitrines Premium",
        subtitle: formData.tagline || "Livrés en 3 jours",
        description: formData.companyName ? `Transformez ${formData.companyName} en réalité digitale avec nos sites sur-mesure` : "Transformez votre vision en réalité digitale avec nos sites sur-mesure",
        primaryCtaText: formData.ctaLabel || "Commander mon site",
        primaryCtaLink: "#contact",
        secondaryCtaText: "Voir portfolio",
        secondaryCtaLink: "#portfolio"
      });
    }
  }, [formData.companyName, formData.tagline, formData.ctaLabel]);

  // 2. Mise à jour de la section Contact
  useEffect(() => {
    if (formData.email || formData.phone || formData.companyName) {
      updateSectionProps('contact', {
        title: formData.companyName ? `Prêt à Lancer ${formData.companyName} ?` : "Prêt à Démarrer Votre Projet ?",
        subtitle: "Discutons ensemble de vos besoins",
        email: formData.email || "contact@fsvbstudio.com",
        phone: formData.phone || "+33 6 12 34 56 78",
        address: "Lyon, France",
        formTitle: formData.companyName ? `Parlons de ${formData.companyName}` : "Parlons de votre projet",
        ctaText: "Envoyer le message"
      });
    }
  }, [formData.email, formData.phone, formData.companyName]);

  // 3. Mise à jour de la section Footer
  useEffect(() => {
    if (formData.instagramUrl || formData.linkedinUrl || formData.companyName || formData.logoUrl) {
      updateSectionProps('footer', {
        brandText: formData.companyName || "FSVB Studio",
        brandLogoUrl: formData.logoUrl || undefined,
        instagramUrl: formData.instagramUrl || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
        year: new Date().getFullYear(),
        legalLinks: [
          { text: "Mentions légales", href: "/legal" },
          { text: "Conditions générales", href: "/terms" },
          { text: "Politique de confidentialité", href: "/privacy" }
        ]
      });
    }
  }, [formData.instagramUrl, formData.linkedinUrl, formData.companyName, formData.logoUrl]);

  // 4. Mise à jour de la section About (ne pas écraser les valeurs manuelles) - ✅ CORRIGÉ AVEC MAPPING
  useEffect(() => {
    if (formData.companyName) {
      const currentSection = sectionsConfig.find(s => s.id === 'about');
      const hasManualTitle = currentSection?.props?.title && 
        currentSection.props.title !== `Pourquoi Choisir ${formData.companyName} ?` && 
        currentSection.props.title !== "Pourquoi Me Choisir ?" &&
        currentSection.props.title !== "";
      
      updateSectionProps('about', {
        title: hasManualTitle ? currentSection?.props?.title : 
          (formData.companyName ? `Pourquoi Choisir ${formData.companyName} ?` : "Pourquoi Me Choisir ?"),
        description: formData.companyName ? `${formData.companyName} se distingue par son approche personnalisée et son expertise digitale` : 
          "Passionnée par la création digitale, je transforme vos idées en sites web performants",
        image: formData.logoUrl || "/api/placeholder/400/300",
        values: [
          { 
            icon: "⚡", 
            title: "Livraison Express", 
            description: formData.companyName ? `${formData.companyName} livré en 3 jours maximum` : "Votre site prêt en 3 jours maximum"
          },
          { 
            icon: "🎨", 
            title: "Design Sur-Mesure", 
            description: formData.companyName ? `Création unique adaptée à l'image de ${formData.companyName}` : "Création unique adaptée à votre image"
          },
          { 
            icon: "📱", 
            title: "100% Responsive", 
            description: "Parfait sur mobile, tablette et desktop" 
          }
        ]
      });
    }
  }, [formData.companyName, formData.logoUrl]);

  // 5. Adaptation des témoignages pour le template Coach
  useEffect(() => {
    if (selectedTemplate === 'coach') {
      setFormData(prev => ({
        ...prev,
        testimonials: {
          ...prev.testimonials,
          sectionTitle: "Ce que disent mes clients",
          sectionSubtitle: "Témoignages de coaching réussis",
          items: [
            {
              name: "Marie Dubois",
              role: "Cadre Dirigeante, TechCorp",
              content: "Grâce au coaching, j'ai réussi ma transition vers un poste de direction. Accompagnement exceptionnel et résultats concrets en 6 mois.",
              rating: 5,
              avatarUrl: ""
            },
            {
              name: "Thomas Martin",
              role: "Entrepreneur, StartupInno",
              content: "Le coaching m'a aidé à franchir le cap des 100k€ de CA. Méthode structurée et outils pratiques pour booster mon business.",
              rating: 5,
              avatarUrl: ""
            },
            {
              name: "Sophie Laurent",
              role: "Manager, Fashion Store",
              content: "J'ai retrouvé l'équilibre vie pro/perso et gagné en confiance. Transformation profonde en quelques séances.",
              rating: 5,
              avatarUrl: ""
            }
          ]
        }
      }));
    } else if (selectedTemplate === 'restaurant') {
      setFormData(prev => ({
        ...prev,
        testimonials: {
          ...prev.testimonials,
          sectionTitle: "Ce que disent nos clients",
          sectionSubtitle: "Avis authentiques sur notre cuisine",
          items: [
            {
              name: "Jean-Michel L.",
              role: "Client Régulier",
              content: "Meilleur restaurant du quartier ! Accueil chaleureux, cuisine savoureuse et prix raisonnables. Une adresse à retenir absolument.",
              rating: 5,
              avatarUrl: ""
            },
            {
              name: "Claire & Antoine",
              role: "Couple",
              content: "Soirée parfaite pour notre anniversaire. Cuisine raffinée, service impeccable et cadre romantique. Nous reviendrons !",
              rating: 5,
              avatarUrl: ""
            },
            {
              name: "Famille Dubois",
              role: "En famille",
              content: "Ambiance conviviale et menu enfants excellent. Les portions sont généreuses et tout était délicieux. Parfait pour un repas en famille.",
              rating: 5,
              avatarUrl: ""
            }
          ]
        }
      }));
    }
  }, [selectedTemplate]);

  // 6. Adaptation des questions FAQ selon le template
  useEffect(() => {
    if (selectedTemplate === 'landing-solo') {
      setFormData(prev => ({
        ...prev,
        faq: {
          ...prev.faq,
          sectionTitle: "Questions Fréquentes",
          sectionSubtitle: "Tout ce que vous devez savoir",
          items: [
            {
              question: "Quels sont vos délais de livraison ?",
              answer: "Nous livrons votre site en 3 jours ouvrables maximum. Pour des projets complexes, nous vous communiquerons un délai précis lors de votre commande."
            },
            {
              question: "Comment vous contacter ?", 
              answer: "Vous pouvez nous joindre par email, téléphone ou via le formulaire de contact. Nous répondons sous 24h maximum."
            },
            {
              question: "Proposez-vous une garantie ?",
              answer: "Oui, nous proposons une garantie satisfaction. Nous modifions votre site jusqu'à ce qu'il réponde parfaitement à vos attentes."
            }
          ]
        }
      }));
    } else if (selectedTemplate === 'coach') {
      setFormData(prev => ({
        ...prev,
        faq: {
          ...prev.faq,
          sectionTitle: "Questions Fréquentes",
          sectionSubtitle: "Vos questions sur le coaching",
          items: [
            {
              question: "Combien de temps dure un coaching ?",
              answer: "Un accompagnement dure généralement entre 3 à 6 mois, selon vos objectifs. Nous adaptons la durée à vos besoins spécifiques."
            },
            {
              question: "Quel est le tarif d'une séance ?",
              answer: "Les tarifs varient selon le type d'accompagnement. Contactez-moi pour un devis personnalisé adapté à votre situation."
            },
            {
              question: "Proposez-vous des séances en ligne ?",
              answer: "Oui, je propose des séances en visioconférence pour s'adapter à votre emploi du temps et votre localisation."
            }
          ]
        }
      }));
    }
  }, [selectedTemplate]);

  // 5. Mise à jour de la section Services - ✅ CORRIGÉ AVEC MAPPING
  useEffect(() => {
    if (formData.companyName || (formData.services && formData.services.packages.length > 0)) {
      updateSectionProps('services', {
        title: "Nos Offres",
        subtitle: formData.companyName ? `Des solutions adaptées aux besoins de ${formData.companyName}` : "Des solutions adaptées à tous vos besoins",
        services: formData.services?.packages || [
          {
            id: "flash",
            title: "Site Flash",
            price: "350€",
            description: `Parfait pour lancer ${formData.companyName || 'votre entreprise'} en ligne rapidement`,
            features: ["Site 1-3 pages", "Design responsive", "Formulaire contact", "WhatsApp intégré"]
          },
          {
            id: "start", 
            title: "Site Start",
            price: "400€",
            description: `Solution complète pour ${formData.companyName || 'votre entreprise'}`,
            features: ["Site 5-10 pages", "Blog intégré", "SEO optimisé", "Google Maps"]
          },
          {
            id: "pro",
            title: "Site Pro", 
            price: "800€",
            description: `Formule premium pour ${formData.companyName || 'votre entreprise'}`,
            features: ["Site avancé", "Réservation en ligne", "Galerie photos", "Support prioritaire"]
          }
        ]
      });
    }
  }, [formData.companyName, formData.services]);

  // 6. Mise à jour de la section Portfolio - ✅ AJOUTÉ AVEC MAPPING
  useEffect(() => {
    if (formData.portfolio && formData.portfolio.projects.length > 0) {
      updateSectionProps('portfolio', {
        title: formData.portfolio.sectionTitle || "Nos Réalisations",
        subtitle: formData.portfolio.sectionSubtitle || "Découvrez nos dernières créations",
        projects: formData.portfolio.projects
      });
    }
  }, [formData.portfolio]);

  // 7. Mise à jour de la section Features - ✅ AJOUTÉ AVEC MAPPING
  useEffect(() => {
    if (formData.features && formData.features.items.length > 0) {
      updateSectionProps('features', {
        title: formData.features.sectionTitle || "Pourquoi Nous Choisir",
        subtitle: formData.features.sectionSubtitle || "Nos avantages concurrentiels",
        features: formData.features.items
      });
    }
  }, [formData.features]);

  // 🌊 BRIDGE REAL-TIME SYNC: Synchronisation automatique de toutes les sections
  // Ce useEffect détecte les changements dans formData et synchronise automatiquement
  // toutes les sections avec leurs props correspondantes via le système de mapping
  useEffect(() => {
    // Debounce pour éviter les boucles infinies
    const timeoutId = setTimeout(() => {
      console.log('🔄 Bridge Real-Time Sync: formData changed, syncing all sections...');
      
      // Utiliser le mapping pour synchroniser toutes les sections automatiquement
      Object.entries(SECTIONS_MAPPING).forEach(([sectionId, mapping]) => {
        try {
          if (mapping.extractFormData && mapping.generateProps) {
            const sectionData = mapping.extractFormData(formData);
            if (sectionData && Object.keys(sectionData).length > 0) {
              const props = mapping.generateProps(sectionData);
              console.log(`🔄 Auto-sync section ${sectionId}:`, props);
              updateSectionProps(sectionId, props);
            }
          }
        } catch (error) {
          console.warn(`⚠️ Auto-sync failed for section ${sectionId}:`, error);
        }
      });
    }, 100); // Debounce de 100ms
    
    return () => clearTimeout(timeoutId);
  }, [
    // Surveiller seulement les champs critiques pour éviter les boucles
    formData.companyName,
    formData.services?.packages,
    formData.portfolio?.projects,
    formData.features?.items,
    JSON.stringify(formData.services?.packages || []),
    JSON.stringify(formData.portfolio?.projects || []),
    JSON.stringify(formData.features?.items || [])
  ]);

  // TODO: customColors sera réutilisé lors de l'implémentation du mode "Personnalisé"
  // const customColors = {
  //   primary: formData.primaryColor || '#2563EB',
  //   secondary: formData.secondaryColor || '#1E40AF',
  //   accent: formData.accentColor || '#FBBF24'
  // };

  // Validation pré-commande
  const validateConfiguration = (): { isValid: boolean; errors: string[]; warnings: string[] } => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // === VALIDATION OBLIGATOIRE ===
    // ✅ Nom plus flexible - peut être nom d'entreprise OU nom personnel
    if (!formData.companyName.trim()) {
      warnings.push('Nom recommandé (entreprise ou personnel)');
    }
    if (!formData.email.trim()) {
      errors.push('Email requis');
    }
    if (formData.email && !formData.email.includes('@')) {
      errors.push('Email invalide');
    }

    // === VALIDATION RECOMMANDÉE ===
    if (!formData.tagline.trim()) {
      warnings.push('Slogan recommandé pour plus d\'impact');
    }
    if (!formData.logoUrl.trim()) {
      warnings.push('Logo recommandé pour l\'identité visuelle');
    }
    if (!formData.phone.trim()) {
      warnings.push('Téléphone recommandé pour la crédibilité');
    }

    // === VALIDATION SECTIONS SPÉCIFIQUES ===
    const currentSectionsConfig = (() => {
      switch(selectedTemplate) {
        case 'restaurant': return restaurantSectionsConfig;
        case 'coach': return coachSectionsConfig;
        default: return sectionsConfig;
      }
    })();

    const enabledSections = currentSectionsConfig.filter(section => section.enabled);
    if (enabledSections.length < 3) {
      warnings.push('Au moins 3 sections recommandées pour un site complet');
    }

    // Validation spécifique par template
    if (selectedTemplate === 'restaurant') {
      if (restaurantSectionsConfig.find(s => s.id === 'gallery')?.enabled && 
          (!formData.gallery?.photos || formData.gallery.photos.length === 0)) {
        warnings.push('Section Galerie activée mais aucune photo ajoutée');
      }
    }

    if (selectedTemplate === 'landing-solo') {
      if (sectionsConfig.find(s => s.id === 'portfolio')?.enabled && 
          (!formData.portfolio?.projects || formData.portfolio.projects.length === 0)) {
        warnings.push('Section Portfolio activée mais aucun projet ajouté');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  };

  // Mise à jour automatique de la validation
  React.useEffect(() => {
    const validation = validateConfiguration();
    setValidationErrors(validation.errors);
    setValidationWarnings(validation.warnings);
  }, [formData, selectedTemplate, sectionsConfig, restaurantSectionsConfig, coachSectionsConfig]);

  // Fonction Export Preview pour validation client
  const handleExportPreview = async () => {
    // Validation basique
    if (!formData.companyName || !formData.email) {
      alert('Veuillez remplir au minimum le nom de l\'entreprise et l\'email avant l\'export preview.');
      return;
    }

    try {
      // Génération date
      const dateStr = new Date().toISOString().split('T')[0];
      
      // Création du contenu HTML complet de la preview
      const previewElement = previewRef.current;
      if (!previewElement) {
        alert('Erreur : impossible de capturer la preview');
        return;
      }
      
      // Génération HTML standalone
      const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview ${formData.companyName} - ${selectedTemplate}</title>
  <style>
    body { margin: 0; font-family: system-ui; background: #0a0a0f; color: white; }
    .preview-header { padding: 20px; background: rgba(255,255,255,0.05); text-align: center; }
    .preview-content { ${previewElement.getAttribute('style') || ''} }
  </style>
</head>
<body>
  <div class="preview-header">
    <h1>🎯 Preview validée - ${formData.companyName}</h1>
    <p>Template: ${selectedTemplate} | Généré le: ${new Date().toLocaleString('fr-FR')}</p>
    <p>Email client: ${formData.email} | Thème: ${formData.theme}</p>
  </div>
  <div class="preview-content">
    ${previewElement.innerHTML}
  </div>
</body>
</html>`;
      
      // Création et téléchargement du fichier HTML
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `preview-${formData.companyName.replace(/[^a-zA-Z0-9]/g, '-')}-${selectedTemplate}-${dateStr}.html`;
      a.click();
      URL.revokeObjectURL(url);

      console.log('📸 Preview HTML exportée:', {
        company: formData.companyName,
        template: selectedTemplate,
        timestamp: dateStr
      });
      alert('✅ Preview exportée ! Fichier HTML téléchargé pour validation client.');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'export preview:', error);
      alert('❌ Erreur lors de l\'export. Vérifiez la console.');
    }
  };

  // Fonction Export JSON pour workflow avec Claude
  const handleExportJSON = () => {
    // Validation basique
    if (!formData.companyName || !formData.email) {
      alert('Veuillez remplir au minimum le nom de l\'entreprise et l\'email avant l\'export.');
      return;
    }

    try {
      // Génération orderId unique
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const orderId = `ORDER-${timestamp}-${random.toUpperCase()}`;

      // Création de l'objet commande client enrichi (même structure que la commande)
      const clientOrder: ClientOrder = {
        orderId,
        template: selectedTemplate,
        theme: formData.theme,
        formData,
        contactInfo: {
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          social: {
            instagram: formData.instagramUrl || undefined,
            linkedin: formData.linkedinUrl || undefined
          }
        },
        assets: {
          logoUrl: formData.logoUrl || undefined
        },
        sectionsConfig: (() => {
          switch(selectedTemplate) {
            case 'landing-solo': return sectionsConfig;
            case 'restaurant': return restaurantSectionsConfig;
            case 'coach': return coachSectionsConfig;
            default: return sectionsConfig;
          }
        })(),
        colorMode,
        createdAt: new Date().toISOString()
      };

      // Sérialisation en JSON formaté
      const json = JSON.stringify(clientOrder, null, 2);
      
      // Création et téléchargement du fichier
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fsvb-studio-${selectedTemplate}-${formData.companyName.replace(/[^a-zA-Z0-9]/g, '-')}-${orderId}.json`;
      a.click();
      URL.revokeObjectURL(url);

      console.log('📄 JSON exporté pour workflow Claude:', clientOrder);
      alert('✅ Configuration exportée ! Fichier JSON téléchargé.');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'export JSON:', error);
      alert('❌ Erreur lors de l\'export. Vérifiez la console.');
    }
  };

  const handleOrder = async () => {
    // Validation basique
    if (!formData.companyName || !formData.email) {
      alert('Veuillez remplir au minimum le nom de l\'entreprise et l\'email.');
      return;
    }

    // Vérification configuration Supabase avant l'envoi
    const configError = getSupabaseConfigError();
    if (configError && !isSupabaseConfigured) {
      // Mode JSON uniquement - on continue mais on informe l'utilisateur
      console.warn('Supabase non configuré, génération JSON uniquement:', configError);
    }

    setOrderStatus('saving');

    try {
      // Génération orderId unique
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const orderId = `ORDER-${timestamp}-${random.toUpperCase()}`;

      // Création de l'objet commande client enrichi
      const clientOrder: ClientOrder = {
        orderId,
        template: selectedTemplate,
        theme: formData.theme,
        formData,
        contactInfo: {
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          social: {
            instagram: formData.instagramUrl || undefined,
            linkedin: formData.linkedinUrl || undefined
          }
        },
        assets: {
          logoUrl: formData.logoUrl || undefined
        },
        sectionsConfig: (() => {
          switch(selectedTemplate) {
            case 'landing-solo': return sectionsConfig;
            case 'restaurant': return restaurantSectionsConfig;
            case 'coach': return coachSectionsConfig;
            default: return sectionsConfig;
          }
        })(),
        colorMode,
        createdAt: new Date().toISOString()
      };

      // Sérialisation en JSON pour l'affichage
      const json = JSON.stringify(clientOrder, null, 2);
      setClientOrderJson(json);
      console.log('COMMANDE CLIENT', json);

      // Préparation des données pour Supabase
      const orderRecord: OrderRecord = {
        order_id: orderId,
        template: selectedTemplate,
        theme: formData.theme,
        company_name: formData.companyName,
        email: formData.email,
        phone: formData.phone || undefined,
        form_data: formData,
        config: clientOrder.sectionsConfig, // Utiliser la colonne config existante
        sections_config: clientOrder.sectionsConfig,
        contact_info: clientOrder.contactInfo,
        assets: clientOrder.assets,
        color_mode: colorMode,
        
        // ✅ NOUVEAUX CHAMPS FSVB STUDIO
        product_type: 'site-vitrine', // Par défaut pour le configurateur principal
        status: 'pending', // Statut initial
        payment_status: 'unpaid', // Pas encore payé
        total_amount: selectedTemplate === 'landing-solo' ? 350 : 550, // Prix selon template
        
        created_at: new Date().toISOString()
      };

      // 🔍 AUDIT SUPABASE - Payload exact avant insertion
      console.log('📤 PAYLOAD EXACT ENVOYÉ À SUPABASE:');
      console.log(JSON.stringify(orderRecord, null, 2));
      
      console.log('🔑 CLÉS PRÉSENTES DANS LE PAYLOAD:', Object.keys(orderRecord));
      console.log('📋 SECTIONS_CONFIG détail:', orderRecord.sections_config);
      console.log('📝 FORM_DATA détail:', orderRecord.form_data);
      console.log('📞 CONTACT_INFO détail:', orderRecord.contact_info);
      console.log('🖼️ ASSETS détail:', orderRecord.assets);

      // 🔍 AUDIT CRITIQUE: Vérification du contenu des sections
      console.log('🚨 AUDIT SECTIONS - Contenu réel sauvé?');
      
      if (orderRecord.sections_config && orderRecord.sections_config.length > 0) {
        orderRecord.sections_config.forEach((section: any) => {
          console.log(`📄 Section "${section.id}":`, {
            enabled: section.enabled,
            hasProps: !!section.props,
            propsCount: section.props ? Object.keys(section.props).length : 0,
            propsContent: section.props || 'PAS DE PROPS - CONTENU HARDCODÉ?'
          });
        });
        
        // Recherche de props personnalisées
        const sectionsWithProps = orderRecord.sections_config.filter((s: any) => s.props);
        console.log(`📊 RÉSUMÉ: ${sectionsWithProps.length}/${orderRecord.sections_config.length} sections ont des props personnalisées`);
        
        if (sectionsWithProps.length > 0) {
          console.log('✅ SECTIONS AVEC PROPS TROUVÉES:', sectionsWithProps.map((s: any) => s.id));
          console.log('🎯 EXEMPLE PROPS HERO:', sectionsWithProps.find((s: any) => s.id === 'hero')?.props);
        } else {
          console.warn('⚠️ AUCUNE PROP PERSONNALISÉE TROUVÉE - Le contenu semble être hardcodé dans les templates!');
        }
      }

      // Insertion dans Supabase (si configuré)
      const result = await insertOrder(orderRecord);

      if (result.success) {
        setOrderStatus('success');
        console.log('✅ Commande sauvegardée dans Supabase:', result.data);
      } else {
        // Vérification si c'est un problème de configuration
        if ((result as any).isConfigError) {
          setOrderStatus('success'); // On traite ça comme un succès partiel
          console.warn('⚠️ Configuration Supabase manquante');
        } else {
          setOrderStatus('error');
          console.error('❌ Erreur Supabase:', result.error);
        }
      }

    } catch (error) {
      setOrderStatus('error');
      console.error('❌ Erreur lors de la commande:', error);
    }
  };

  // PayPal sera affiché sur la page /order/:id, pas ici
  useEffect(() => {
    if (orderStatus === 'success' && typeof window.paypal !== 'undefined') {
      const price = selectedTemplate === 'landing-solo' ? '350.00' : selectedTemplate === 'restaurant' ? '400.00' : '500.00';
      
      window.paypal.Buttons({
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: price,
                currency_code: 'EUR'
              },
              description: `Site ${selectedTemplate} - ${formData.companyName || 'FSVB Studio'}`
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((_details: any) => {
            // Créer l'ordre client
            const clientOrderData = {
              template: selectedTemplate,
              theme: formData.theme,
              formData: formData,
              contactInfo: {
                companyName: formData.companyName,
                email: formData.email,
                phone: formData.phone,
                social: {
                  instagram: formData.instagramUrl,
                  linkedin: formData.linkedinUrl,
                },
              },
              assets: {
                logoUrl: formData.logoUrl,
              },
              sectionsConfig: sectionsConfig,
              colorMode: colorMode,
              createdAt: new Date().toISOString(),
            };
            
            // Sauvegarder les détails de commande
            localStorage.setItem('pendingOrder', JSON.stringify({
              ...clientOrderData,
              paymentId: data.paymentID,
              payerId: data.payerID,
              template: selectedTemplate,
              companyName: formData.companyName,
              price: `${price}€`
            }));
            
            // Rediriger vers la page de confirmation
            window.location.href = `/confirmation?paymentId=${data.paymentID}&PayerID=${data.payerID}&token=${data.paymentToken}`;
          });
        },
        onError: (err: any) => {
          console.error('Erreur PayPal:', err);
          alert('Erreur lors du paiement PayPal. Veuillez réessayer.');
        }
      }).render('#paypal-button-container');
    }
  }, [orderStatus, selectedTemplate, formData.companyName]);

  return (
    <div className={styles.configurator}>
      <aside className={styles.sidebar}>
        <h1>Personnalisez votre site</h1>
        
        {/* Dropdown Template */}
        <div className={styles.formGroup}>
          <label htmlFor="template-select" className={styles.label}>
            Choisissez votre template
          </label>
          <select 
            id="template-select"
            value={selectedTemplate}
            onChange={(e) => handleTemplateChange(e.target.value as 'landing-solo' | 'restaurant' | 'coach')}
            className={styles.select}
          >
            <option value="landing-solo">Landing Solo - 350€</option>
            <option value="restaurant">Restaurant - 400€</option>
            <option value="coach">Coach/Thérapeute - 500€</option>
          </select>
        </div>

        {/* Indicateur de progression */}
        <div className={styles.progressDisplay}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Progression :</span>
            <span className={styles.progressValue}>{calculateProgress()}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className={styles.progressHint}>
            {getProgressMessage()}
          </div>
        </div>

        {/* Informations */}
        <div className={styles.sectionAccordion}>
          <div 
            className={styles.sectionHeader}
            onClick={() => setOpenSections(prev => 
              prev.includes('informations') 
                ? prev.filter(id => id !== 'informations')
                : [...prev, 'informations']
            )}
          >
            <h3 className={styles.sectionHeaderTitle}>📋 Informations</h3>
            <span className={`${styles.sectionToggle} ${openSections.includes('informations') ? styles.open : ''}`}>
              ▼
            </span>
          </div>
          <div className={`${styles.sectionContent} ${!openSections.includes('informations') ? styles.hidden : ''}`}>
            <div className={styles.formGroup}>
            <label htmlFor="company-name" className={styles.label}>
              Nom de l'entreprise *
            </label>
            <input
              id="company-name"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              placeholder="Ex: Boulangerie du Coin"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tagline" className={styles.label}>
              Phrase d'accroche
            </label>
            <input
              id="tagline"
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              placeholder="Ex: Votre boulangerie artisanale depuis 1980"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cta-label" className={styles.label}>
              Texte du bouton principal
            </label>
            <input
              id="cta-label"
              type="text"
              value={formData.ctaLabel}
              onChange={(e) => setFormData({...formData, ctaLabel: e.target.value})}
              placeholder="Ex: Découvrir nos produits"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="logo-url" className={styles.label}>
              Logo
            </label>
            
            <div className={styles.imageUploadSection}>
              <div className={styles.uploadOptions}>
                <div>
                  <label className={styles.fieldLabel}>Option 1 : Coller une URL</label>
                  <input 
                    type="url"
                    className={styles.input}
                    placeholder="https://mon-site.com/logo.png"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                  />
                </div>
                
                <div className={styles.divider}>OU</div>
                
                <div>
                  <label className={styles.fieldLabel}>Option 2 : Uploader une image</label>
                  <input 
                    type="file"
                    className={styles.input}
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const result = await uploadProjectImage(file);
                        if (result.success && result.url) {
                          setFormData({...formData, logoUrl: result.url});
                        }
                      }
                    }}
                  />
                  <p className={styles.hint}>JPG, PNG, WebP (max 2MB) - Logo recommandé</p>
                </div>
              </div>
              
              {formData.logoUrl && (
                <img 
                  src={formData.logoUrl} 
                  alt="Preview Logo"
                  className={styles.logoPreview}
                  style={{ maxWidth: '200px', maxHeight: '80px', objectFit: 'contain', marginTop: '1rem', border: '1px solid #ddd', borderRadius: '4px', padding: '0.5rem' }}
                />
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instagram-url" className={styles.label}>
              Instagram (URL)
            </label>
            <input
              id="instagram-url"
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
              placeholder="Ex: https://instagram.com/moncompte"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="linkedin-url" className={styles.label}>
              LinkedIn (URL)
            </label>
            <input
              id="linkedin-url"
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
              placeholder="Ex: https://linkedin.com/company/monentreprise"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="contact@exemple.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Téléphone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+33 6 12 34 56 78"
              className={styles.input}
            />
          </div>
          </div>
        </div>

        {/* Couleurs */}
        <div className={styles.sectionAccordion}>
          <div 
            className={styles.sectionHeader}
            onClick={() => setOpenSections(prev => 
              prev.includes('personnalisation') 
                ? prev.filter(id => id !== 'personnalisation')
                : [...prev, 'personnalisation']
            )}
          >
            <h3 className={styles.sectionHeaderTitle}>🎨 Personnalisation</h3>
            <span className={`${styles.sectionToggle} ${openSections.includes('personnalisation') ? styles.open : ''}`}>
              ▼
            </span>
          </div>
          <div className={`${styles.sectionContent} ${!openSections.includes('personnalisation') ? styles.hidden : ''}`}>
            
          <div className={styles.colorGrid}>
            <div className={styles.colorPicker}>
              <label htmlFor="primary-color" className={styles.label}>
                Couleur des boutons
              </label>
              <div className={styles.hint} style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                Utilisée pour les boutons d'action
              </div>
              <div className={styles.colorInputWrapper}>
                <input
                  id="primary-color"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                  disabled={colorMode === 'auto'}
                  className={styles.colorInput}
                />
                <span className={styles.colorValue}>{formData.primaryColor}</span>
              </div>
            </div>

            <div className={styles.colorPicker}>
              <label htmlFor="secondary-color" className={styles.label}>
                Couleur des titres
              </label>
              <div className={styles.hint} style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                Utilisée pour les grands titres
              </div>
              <div className={styles.colorInputWrapper}>
                <input
                  id="secondary-color"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                  disabled={colorMode === 'auto'}
                  className={styles.colorInput}
                />
                <span className={styles.colorValue}>{formData.secondaryColor}</span>
              </div>
            </div>

            <div className={styles.colorPicker}>
              <label htmlFor="accent-color" className={styles.label}>
                Couleur des liens
              </label>
              <div className={styles.hint} style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                Utilisée pour les liens cliquables
              </div>
              <div className={styles.colorInputWrapper}>
                <input
                  id="accent-color"
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                  disabled={colorMode === 'auto'}
                  className={styles.colorInput}
                />
                <span className={styles.colorValue}>{formData.accentColor}</span>
              </div>
            </div>

            <div className={styles.colorPicker}>
              <label htmlFor="background-color" className={styles.label}>
                Couleur d'arrière-plan
              </label>
              <div className={styles.hint} style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                Fond principal du site
              </div>
              <div className={styles.colorInputWrapper}>
                <input
                  id="background-color"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
                  disabled={colorMode === 'auto'}
                  className={styles.colorInput}
                />
                <span className={styles.colorValue}>{formData.backgroundColor}</span>
              </div>
            </div>

            <div className={styles.colorPicker}>
              <label htmlFor="text-color" className={styles.label}>
                Couleur du texte
              </label>
              <div className={styles.hint} style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                Couleur du texte principal
              </div>
              <div className={styles.colorInputWrapper}>
                <input
                  id="text-color"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => setFormData({...formData, textColor: e.target.value})}
                  disabled={colorMode === 'auto'}
                  className={styles.colorInput}
                />
                <span className={styles.colorValue}>{formData.textColor}</span>
              </div>
            </div>
          </div>
          
          {/* Thème visuel */}
          <div className={styles.formGroup}>
            <label htmlFor="theme" className={styles.label}>
              Thème visuel
            </label>
            {selectedTemplate && (
              <span className={styles.hint}>
                💡 Thème recommandé pour {selectedTemplate} : {TEMPLATE_THEME_MAP[selectedTemplate] || 'empire'}
              </span>
            )}
            <select 
              id="theme"
              value={formData.theme || 'empire'}
              onChange={(e) => {
                setFormData({...formData, theme: e.target.value});
                setIsThemeManuallySet(true); // Marquer comme changement manuel
              }}
              className={styles.select}
            >
              <option value="empire">Empire (Tech/SaaS)</option>
              <option value="lumiere">Lumière (Professionnel)</option>
              <option value="chaleur">Chaleur (Restaurant)</option>
              <option value="zen">Zen (Bien-être)</option>
              <option value="minimaliste">Minimaliste (Designer)</option>
            </select>
            
            {/* Mode couleur intégré */}
            <div className={styles.colorModeSection}>
              <label className={styles.label}>Mode couleur</label>
              <div className={styles.colorModeOptions}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="colorMode"
                    value="auto"
                    checked={colorMode === 'auto'}
                    onChange={() => setColorMode('auto')}
                  />
                  <span>Automatique</span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="colorMode"
                    value="custom"
                    checked={colorMode === 'custom'}
                    onChange={() => setColorMode('custom')}
                  />
                  <span>Personnalisé</span>
                </label>
              </div>
              <p className={styles.blockHint}>
                Automatique : couleurs du thème • Personnalisé : color pickers actifs
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Sections du site */}
        <div className={styles.sectionAccordion}>
          <div 
            className={styles.sectionHeader}
            onClick={() => setOpenSections(prev => 
              prev.includes('sections') 
                ? prev.filter(id => id !== 'sections')
                : [...prev, 'sections']
            )}
          >
            <h3 className={styles.sectionHeaderTitle}>
              <span className={styles.sectionTitleWithTooltip}>
                🎯 Sections du site
                <span 
                  className={`${styles.tooltipIcon} ${showTooltip ? styles.tooltipActive : ''}`}
                  onClick={() => {
                    console.log('Tooltip clicked! Current state:', showTooltip);
                    setShowTooltip(!showTooltip);
                  }}
                  data-tooltip="Choisissez les sections à afficher sur votre site. Certaines sections sont toujours incluses."
                  style={{ backgroundColor: showTooltip ? '#CFB160' : 'transparent' }}
                >
                  ℹ️
                  {showTooltip && (
                    <div className={styles.tooltipContent}>
                      Choisissez les sections à afficher sur votre site. Certaines sections sont toujours incluses.
                    </div>
                  )}
                </span>
              </span>
            </h3>
            <span className={`${styles.sectionToggle} ${openSections.includes('sections') ? styles.open : ''}`}>
              ▼
            </span>
          </div>
          <div className={`${styles.sectionContent} ${!openSections.includes('sections') ? styles.hidden : ''}`}>
            
            {/* Sections Communes - Accordéon */}
            <div className={styles.sectionAccordion}>
              <div 
                className={styles.sectionHeader}
                onClick={() => setOpenSections(prev => 
                  prev.includes('sections-communes') 
                    ? prev.filter(id => id !== 'sections-communes')
                    : [...prev, 'sections-communes']
                )}
              >
                <h4 className={styles.sectionHeaderTitle}>📋 Sections communes</h4>
                <span className={`${styles.sectionToggle} ${openSections.includes('sections-communes') ? styles.open : ''}`}>
                  ▼
                </span>
              </div>
              <div className={`${styles.sectionContent} ${!openSections.includes('sections-communes') ? styles.hidden : ''}`}>
                <p className={styles.sectionsSubtitle}>Sections présentes sur tous les templates</p>
                
              {/* PREMIERE OCCURRENCE - SECTIONS COMMUNES - FALLBACKS BLOC_1 */}
              {commonSectionIds.map((sectionId) => {
                let section;
                let handleSectionToggle;
                
                if (selectedTemplate === 'landing-solo') {
                  section = sectionsConfig.find(s => s.id === sectionId);
                  handleSectionToggle = (checked: boolean) => {
                    setSectionsConfig(prev =>
                      prev.map(s =>
                        s.id === sectionId ? { ...s, enabled: checked } : s
                      )
                    );
                  };
                } else if (selectedTemplate === 'restaurant') {
                  section = restaurantSectionsConfig.find(s => s.id === sectionId);
                  handleSectionToggle = (checked: boolean) => {
                    setRestaurantSectionsConfig(prev =>
                      prev.map(s =>
                        s.id === sectionId ? { ...s, enabled: checked } : s
                      )
                    );
                  };
                } else if (selectedTemplate === 'coach') {
                  section = coachSectionsConfig.find(s => s.id === sectionId);
                  handleSectionToggle = (checked: boolean) => {
                    setCoachSectionsConfig(prev =>
                      prev.map(s =>
                        s.id === sectionId ? { ...s, enabled: checked } : s
                      )
                    );
                  };
                } else {
                  return null;
                }
                
                if (!section || !handleSectionToggle) return null;
                
                return (
                  <div key={sectionId} className={styles.sectionItem}>
                    <div className={styles.sectionHeader}>
                      <label className={styles.sectionHeaderLabel}>
                        <input
                          type="checkbox"
                          checked={section.required || section.enabled}
                          disabled={section.required}
                          onChange={(e) => handleSectionToggle(e.target.checked)}
                          className={styles.sectionCheckbox}
                        />
                        <span className={styles.sectionLabel}>
                          {section.label}
                          {section.required && <span className={styles.sectionTag}>Obligatoire</span>}
                          {section.description && <span className={styles.sectionDescription}> - {section.description}</span>}
                        </span>
                      </label>
                    </div>
                    
                    {(section.required || section.enabled) && (
                      <div className={styles.sectionActions}>
                        <button
                          type="button"
                          className={styles.sectionToggleButton}
                          onClick={() => toggleSectionProps(section.id)}
                        >
                          <span className={styles.sectionToggleLabel}>
                            Personnalisez cette section
                          </span>
                          <span className={styles.sectionToggleIcon}>
                            {openSections.includes(section.id) ? "▾" : "▸"}
                          </span>
                        </button>

                        {openSections.includes(section.id) && (
                          <div className={styles.sectionProps}>
                            {section.id === "navbar" ? (
                              <>
                                {/* Logo configuration */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Texte du logo</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.logoText as string) || formData.companyName}
                                    placeholder="Nom de votre entreprise"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { logoText: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>URL du logo (optionnel)</label>
                                  <input
                                    type="url"
                                    className={styles.fieldInput}
                                    value={(section.props?.logoUrl as string) || formData.logoUrl}
                                    placeholder="https://exemple.com/logo.png"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { logoUrl: e.target.value })
                                    }
                                  />
                                </div>

                                {/* Style de navigation */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Style de navigation</label>
                                  <select
                                    className={styles.fieldSelect}
                                    value={(section.props?.layout as string) || "classic"}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { layout: e.target.value })
                                    }
                                  >
                                    <option value="classic">Classique</option>
                                    <option value="centered">Centrée</option>
                                    <option value="split">Séparée</option>
                                  </select>
                                </div>

                                {/* Liens internes */}
                                <div className={styles.fieldGroup}>
                                  <p className={styles.fieldLabel}>
                                    Sections à afficher dans la navigation
                                  </p>
                                  <div className={styles.checkboxList}>
                                    {currentSections.map((targetSection) => {
                                      if (targetSection.id === "navbar" || targetSection.id === "footer") {
                                        return null;
                                      }
                                      const visibleIds = (section.props?.visibleSectionIds as string[]) || [];
                                      const checked = visibleIds.includes(targetSection.id);

                                      const toggle = () => {
                                        const next = checked
                                          ? visibleIds.filter((id) => id !== targetSection.id)
                                          : [...visibleIds, targetSection.id];

                                        updateSectionProps(section.id, { visibleSectionIds: next });
                                      };

                                      return (
                                        <label key={targetSection.id} className={styles.checkboxItem}>
                                          <input type="checkbox" checked={checked} onChange={toggle} />
                                          <span>{targetSection.label}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              </>
                            ) : section.id === "footer" ? (
                              <>
                                {/* Marque / logo */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>
                                    Nom de la marque dans le pied de page
                                  </label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.brandText as string) || formData.companyName}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { brandText: e.target.value })
                                    }
                                    placeholder="Ex : Suzanne Dev — Sites vitrines premium"
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>URL du logo (optionnel)</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.brandLogoUrl as string) || formData.logoUrl}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { brandLogoUrl: e.target.value })
                                    }
                                    placeholder="Ex : https://mon-site.com/logo-footer.png"
                                  />
                                </div>

                                {/* Texte légal */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Texte légal / Copyright</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    rows={2}
                                    value={(section.props?.legalText as string) || ""}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { legalText: e.target.value })
                                    }
                                    placeholder="Ex : © 2025 Suzanne Dev — Tous droits réservés."
                                  />
                                </div>

                                {/* Liens internes */}
                                <div className={styles.fieldGroup}>
                                  <p className={styles.fieldLabel}>
                                    Sections à afficher dans le pied de page
                                  </p>
                                  <div className={styles.checkboxList}>
                                    {currentSections.map((targetSection) => {
                                      if (targetSection.id === "navbar" || targetSection.id === "footer") {
                                        return null;
                                      }

                                      const selectedIds =
                                        (section.props?.footerSectionIds as string[]) || [];
                                      const checked = selectedIds.includes(targetSection.id);

                                      const toggle = () => {
                                        const next = checked
                                          ? selectedIds.filter((id) => id !== targetSection.id)
                                          : [...selectedIds, targetSection.id];

                                        updateSectionProps(section.id, { footerSectionIds: next });
                                      };

                                      return (
                                        <label
                                          key={targetSection.id}
                                          className={styles.checkboxItem}
                                        >
                                          <input type="checkbox" checked={checked} onChange={toggle} />
                                          <span>{targetSection.label}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Liens externes simples */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Lien Instagram (optionnel)</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.instagramUrl as string) || formData.instagramUrl}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { instagramUrl: e.target.value })
                                    }
                                    placeholder="Ex : https://instagram.com/moncompte"
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Lien LinkedIn (optionnel)</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.linkedinUrl as string) || formData.linkedinUrl}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { linkedinUrl: e.target.value })
                                    }
                                    placeholder="Ex : https://linkedin.com/in/monprofil"
                                  />
                                </div>
                              </>
                            ) : section.id === "hero" ? (
                              <>
                                {/* Configuration Hero */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre principal</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? "Sites Vitrines Premium"}
                                    placeholder="Votre titre accrocheur"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.subtitle as string) ?? DEFAULT_TEXTS.HERO_SUBTITLE}
                                    placeholder="Votre sous-titre"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { subtitle: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Description</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    value={(section.props?.description as string) ?? DEFAULT_TEXTS.HERO_DESCRIPTION}
                                    placeholder="Description de votre offre"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { description: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Texte bouton principal</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.primaryCtaText as string) || "Commander mon site"}
                                    placeholder="Texte du bouton"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { primaryCtaText: e.target.value })
                                    }
                                  />
                                </div>
                              </>
                            ) : section.id === "about" ? (
                              <>
                                {/* Configuration About */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.ABOUT_TITLE}
                                    placeholder="Titre de votre section à propos"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Description</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    value={(section.props?.description as string) ?? DEFAULT_TEXTS.ABOUT_DESCRIPTION}
                                    placeholder="Présentez votre expertise"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { description: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>URL de l'image</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.image as string) || "/api/placeholder/400/300"}
                                    placeholder="https://exemple.com/image.jpg"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { image: e.target.value })
                                    }
                                  />
                                </div>
                              </>
                            ) : section.id === "contact" ? (
                              <>
                                {/* Configuration Contact */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.CONTACT_TITLE}
                                    placeholder="Titre de votre section contact"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.subtitle as string) ?? DEFAULT_TEXTS.CONTACT_SUBTITLE}
                                    placeholder="Sous-titre encourageant"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { subtitle: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Email professionnel</label>
                                  <input
                                    type="email"
                                    className={styles.fieldInput}
                                    value={(section.props?.email as string) || formData.email}
                                    placeholder="contact@exemple.com"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { email: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Téléphone</label>
                                  <input
                                    type="tel"
                                    className={styles.fieldInput}
                                    value={(section.props?.phone as string) || formData.phone}
                                    placeholder="+33 6 12 34 56 78"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { phone: e.target.value })
                                    }
                                  />
                                </div>
                              </>
                            ) : section.id === "services" ? (
                              <>
                                {/* Configuration Services */}
                                <div className={styles.sectionHeader}>
                                  <h4>💼 Offres & Services</h4>
                                  <span className={styles.tooltip} title="Présentez vos offres/packages avec prix et fonctionnalités. Mettez en avant votre offre principale avec le badge 'Recommandé'.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.services?.sectionTitle || ''}
                                  required
                                  onChange={(e) =>
                                    setFormData({...formData, services: {...formData.services, sectionTitle: e.target.value}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.services?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, services: {...formData.services, sectionSubtitle: e.target.value}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos packages (3 maximum)</h5>
                                
                                {[0, 1, 2].map(index => (
                                  <div key={index} className={styles.packageCard}>
                                    <h6>Package {index + 1}</h6>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Nom de l'offre *"
                                      value={formData.services?.packages?.[index]?.name || ''}
                                      required
                                      onChange={(e) => {
                                        const newPackages = [...(formData.services?.packages || [])];
                                        newPackages[index] = {...newPackages[index], name: e.target.value};
                                        setFormData({...formData, services: {...formData.services, packages: newPackages}});
                                      }}
                                    />
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Prix (ex: 350€, À partir de 50€/mois) *"
                                      value={formData.services?.packages?.[index]?.price || ''}
                                      required
                                      onChange={(e) => {
                                        const newPackages = [...(formData.services?.packages || [])];
                                        newPackages[index] = {...newPackages[index], price: e.target.value};
                                        setFormData({...formData, services: {...formData.services, packages: newPackages}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Description courte *"
                                      rows={2}
                                      value={formData.services?.packages?.[index]?.description || ''}
                                      required
                                      onChange={(e) => {
                                        const newPackages = [...(formData.services?.packages || [])];
                                        newPackages[index] = {...newPackages[index], description: e.target.value};
                                        setFormData({...formData, services: {...formData.services, packages: newPackages}});
                                      }}
                                    />
                                    
                                    <label className={styles.fieldLabel}>Fonctionnalités incluses (une par ligne) :</label>
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Fonctionnalité 1&#10;Fonctionnalité 2&#10;Fonctionnalité 3"
                                      rows={4}
                                      value={formData.services?.packages?.[index]?.features?.join('\n') || ''}
                                      onChange={(e) => {
                                        const features = e.target.value.split('\n').filter(f => f.trim());
                                        const newPackages = [...(formData.services?.packages || [])];
                                        newPackages[index] = {...newPackages[index], features};
                                        setFormData({...formData, services: {...formData.services, packages: newPackages}});
                                      }}
                                    />
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Texte du bouton (ex: Choisir cette offre)"
                                      value={formData.services?.packages?.[index]?.ctaText || ''}
                                      onChange={(e) => {
                                        const newPackages = [...(formData.services?.packages || [])];
                                        newPackages[index] = {...newPackages[index], ctaText: e.target.value};
                                        setFormData({...formData, services: {...formData.services, packages: newPackages}});
                                      }}
                                    />
                                    
                                    <label className={styles.checkboxLabel}>
                                      <input 
                                        type="checkbox"
                                        checked={formData.services?.packages?.[index]?.highlighted || false}
                                        onChange={(e) => {
                                          const newPackages = [...(formData.services?.packages || [])];
                                          newPackages[index] = {...newPackages[index], highlighted: e.target.checked};
                                          setFormData({...formData, services: {...formData.services, packages: newPackages}});
                                        }}
                                      />
                                      Mettre en avant cette offre (badge "Recommandé")
                                    </label>
                                  </div>
                                ))}
                              </>
                            ) : section.id === "portfolio" ? (
                              <>
                                {/* Configuration Portfolio */}
                                <div className={styles.sectionHeader}>
                                  <h4>🎨 Portfolio / Réalisations</h4>
                                  <span className={styles.tooltip} title="Présentez vos meilleurs projets avec images. Vous pouvez uploader des images ou coller des URLs.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.portfolio?.sectionTitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, portfolio: {...formData.portfolio, sectionTitle: e.target.value}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.portfolio?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, portfolio: {...formData.portfolio, sectionSubtitle: e.target.value}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos projets (6 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                  <div key={index} className={styles.projectCard}>
                                    <h6>Projet {index + 1}</h6>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Titre du projet *"
                                      value={formData.portfolio?.projects?.[index]?.title || ''}
                                      onChange={(e) => {
                                        const newProjects = [...(formData.portfolio?.projects || [])];
                                        newProjects[index] = {...newProjects[index], title: e.target.value};
                                        setFormData({...formData, portfolio: {...formData.portfolio, projects: newProjects}});
                                      }}
                                    />
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Catégorie (ex: E-commerce, Vitrine, Blog)"
                                      value={formData.portfolio?.projects?.[index]?.category || ''}
                                      onChange={(e) => {
                                        const newProjects = [...(formData.portfolio?.projects || [])];
                                        newProjects[index] = {...newProjects[index], category: e.target.value};
                                        setFormData({...formData, portfolio: {...formData.portfolio, projects: newProjects}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Description courte"
                                      rows={2}
                                      value={formData.portfolio?.projects?.[index]?.description || ''}
                                      onChange={(e) => {
                                        const newProjects = [...(formData.portfolio?.projects || [])];
                                        newProjects[index] = {...newProjects[index], description: e.target.value};
                                        setFormData({...formData, portfolio: {...formData.portfolio, projects: newProjects}});
                                      }}
                                    />
                                    
                                    <div className={styles.imageUploadSection}>
                                      <label className={styles.fieldLabel}>Image du projet :</label>
                                      
                                      <div className={styles.uploadOptions}>
                                        <div>
                                          <label className={styles.fieldLabel}>Option 1 : Coller une URL</label>
                                          <input 
                                            type="url"
                                            className={styles.fieldInput}
                                            placeholder="https://mon-image.com/projet.jpg"
                                            value={formData.portfolio?.projects?.[index]?.imageUrl || ''}
                                            onChange={(e) => {
                                              const newProjects = [...(formData.portfolio?.projects || [])];
                                              newProjects[index] = {...newProjects[index], imageUrl: e.target.value};
                                              setFormData({...formData, portfolio: {...formData.portfolio, projects: newProjects}});
                                            }}
                                          />
                                        </div>
                                        
                                        <div className={styles.divider}>OU</div>
                                        
                                        <div>
                                          <label className={styles.fieldLabel}>Option 2 : Uploader une image</label>
                                          <input 
                                            type="file"
                                            className={styles.fieldInput}
                                            accept="image/*"
                                            onChange={async (e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                const result = await uploadProjectImage(file);
                                                if (result.success && result.url) {
                                                  const newProjects = [...(formData.portfolio?.projects || [])];
                                                  newProjects[index] = {...newProjects[index], imageUrl: result.url};
                                                  setFormData({...formData, portfolio: {...formData.portfolio, projects: newProjects}});
                                                }
                                              }
                                            }}
                                          />
                                          <p className={styles.hint}>JPG, PNG, WebP (max 5MB)</p>
                                        </div>
                                      </div>
                                      
                                      {formData.portfolio?.projects?.[index]?.imageUrl && (
                                        <img 
                                          src={formData.portfolio.projects[index].imageUrl} 
                                          alt="Preview"
                                          className={styles.imagePreview}
                                        />
                                      )}
                                    </div>
                                    
                                    <input 
                                      type="url"
                                      className={styles.fieldInput}
                                      placeholder="Lien vers le projet (optionnel)"
                                      value={formData.portfolio?.projects?.[index]?.projectUrl || ''}
                                      onChange={(e) => {
                                        const newProjects = [...(formData.portfolio?.projects || [])];
                                        newProjects[index] = {...newProjects[index], projectUrl: e.target.value};
                                        setFormData({...formData, portfolio: {...formData.portfolio, projects: newProjects}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "features" ? (
                              <>
                                {/* Configuration Features */}
                                <div className={styles.sectionHeader}>
                                  <h4>⭐ Avantages / Pourquoi Me Choisir</h4>
                                  <span className={styles.tooltip} title="Mettez en avant vos points forts, ce qui vous différencie de la concurrence.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.features?.sectionTitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, features: {...formData.features, sectionTitle: e.target.value}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.features?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, features: {...formData.features, sectionSubtitle: e.target.value}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos avantages (6 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                  <div key={index} className={styles.featureCard}>
                                    <h6>Avantage {index + 1}</h6>
                                    
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.features?.items?.[index]?.icon || 'zap'}
                                      onChange={(e) => {
                                        const newItems = [...(formData.features?.items || [])];
                                        newItems[index] = {...newItems[index], icon: e.target.value};
                                        setFormData({...formData, features: {...formData.features, items: newItems}});
                                      }}
                                    >
                                      <option value="zap">⚡ Rapidité</option>
                                      <option value="shield">🛡️ Sécurité</option>
                                      <option value="star">⭐ Qualité</option>
                                      <option value="headphones">🎧 Support</option>
                                      <option value="award">🏆 Expertise</option>
                                      <option value="heart">❤️ Passion</option>
                                      <option value="search">🔍 SEO</option>
                                      <option value="smartphone">📱 Mobile</option>
                                    </select>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Titre *"
                                      value={formData.features?.items?.[index]?.title || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.features?.items || [])];
                                        newItems[index] = {...newItems[index], title: e.target.value};
                                        setFormData({...formData, features: {...formData.features, items: newItems}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Description *"
                                      rows={3}
                                      value={formData.features?.items?.[index]?.description || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.features?.items || [])];
                                        newItems[index] = {...newItems[index], description: e.target.value};
                                        setFormData({...formData, features: {...formData.features, items: newItems}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "testimonials" ? (
                              <>
                                {/* Configuration Testimonials */}
                                <div className={styles.sectionHeader}>
                                  <h4>💬 Témoignages Clients</h4>
                                  <span className={styles.tooltip} title="Partagez les retours positifs de vos clients. Certifiez leur authenticité.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <div className={styles.disclaimer}>
                                  ⚠️ Vous certifiez l'authenticité des témoignages affichés
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.testimonials?.sectionTitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, testimonials: {...formData.testimonials, sectionTitle: e.target.value}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.testimonials?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, testimonials: {...formData.testimonials, sectionSubtitle: e.target.value}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Témoignages (6 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                  <div key={index} className={styles.testimonialCard}>
                                    <h6>Témoignage {index + 1}</h6>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Nom du client *"
                                      value={formData.testimonials?.items?.[index]?.name || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.testimonials?.items || [])];
                                        newItems[index] = {...newItems[index], name: e.target.value};
                                        setFormData({...formData, testimonials: {...formData.testimonials, items: newItems}});
                                      }}
                                    />
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Rôle / Entreprise (ex: CEO, TechCorp)"
                                      value={formData.testimonials?.items?.[index]?.role || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.testimonials?.items || [])];
                                        newItems[index] = {...newItems[index], role: e.target.value};
                                        setFormData({...formData, testimonials: {...formData.testimonials, items: newItems}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Témoignage *"
                                      rows={4}
                                      maxLength={300}
                                      value={formData.testimonials?.items?.[index]?.content || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.testimonials?.items || [])];
                                        newItems[index] = {...newItems[index], content: e.target.value};
                                        setFormData({...formData, testimonials: {...formData.testimonials, items: newItems}});
                                      }}
                                    />
                                    
                                    <label className={styles.fieldLabel}>Note :</label>
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.testimonials?.items?.[index]?.rating || 5}
                                      onChange={(e) => {
                                        const newItems = [...(formData.testimonials?.items || [])];
                                        newItems[index] = {...newItems[index], rating: parseInt(e.target.value)};
                                        setFormData({...formData, testimonials: {...formData.testimonials, items: newItems}});
                                      }}
                                    >
                                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                      <option value="3">⭐⭐⭐ (3/5)</option>
                                    </select>
                                    
                                    <input 
                                      type="url"
                                      className={styles.fieldInput}
                                      placeholder="Photo du client (optionnel)"
                                      value={formData.testimonials?.items?.[index]?.avatarUrl || ''}
                                      onChange={(e) => {
                                        const newItems = [...(formData.testimonials?.items || [])];
                                        newItems[index] = {...newItems[index], avatarUrl: e.target.value};
                                        setFormData({...formData, testimonials: {...formData.testimonials, items: newItems}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "approach" ? (
                              <>
                                {/* Configuration Approach */}
                                <div className={styles.sectionHeader}>
                                  <h4>🎯 Ma Méthode de Coaching</h4>
                                  <span className={styles.tooltip} title="Présentez votre processus de coaching en étapes claires. Rassurez vos clients sur votre méthodologie.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.approach?.sectionTitle || ''}
                                  required
                                  onChange={(e) =>
                                    setFormData({...formData, approach: {sectionTitle: e.target.value, sectionSubtitle: formData.approach?.sectionSubtitle || '', steps: formData.approach?.steps || []}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.approach?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, approach: {sectionTitle: formData.approach?.sectionTitle || '', sectionSubtitle: e.target.value, steps: formData.approach?.steps || []}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos étapes de coaching (6 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                  <div key={index} className={styles.featureCard}>
                                    <h6>Étape {index + 1}</h6>
                                    
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.approach?.steps?.[index]?.icon || 'target'}
                                      onChange={(e) => {
                                        const newSteps = [...(formData.approach?.steps || [])];
                                        newSteps[index] = {...newSteps[index], icon: e.target.value, number: index + 1};
                                        setFormData({...formData, approach: {sectionTitle: formData.approach?.sectionTitle || '', sectionSubtitle: formData.approach?.sectionSubtitle || '', steps: newSteps}});
                                      }}
                                    >
                                      <option value="target">🎯 Ciblage</option>
                                      <option value="search">🔍 Diagnostic</option>
                                      <option value="lightbulb">💡 Insight</option>
                                      <option value="users">👥 Accompagnement</option>
                                      <option value="chart">📈 Suivi</option>
                                      <option value="trophy">🏆 Résultats</option>
                                    </select>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Titre de l'étape *"
                                      value={formData.approach?.steps?.[index]?.title || ''}
                                      required
                                      onChange={(e) => {
                                        const newSteps = [...(formData.approach?.steps || [])];
                                        newSteps[index] = {...newSteps[index], title: e.target.value, number: index + 1};
                                        setFormData({...formData, approach: {sectionTitle: formData.approach?.sectionTitle || '', sectionSubtitle: formData.approach?.sectionSubtitle || '', steps: newSteps}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Description de l'étape *"
                                      rows={3}
                                      value={formData.approach?.steps?.[index]?.description || ''}
                                      required
                                      onChange={(e) => {
                                        const newSteps = [...(formData.approach?.steps || [])];
                                        newSteps[index] = {...newSteps[index], description: e.target.value, number: index + 1};
                                        setFormData({...formData, approach: {sectionTitle: formData.approach?.sectionTitle || '', sectionSubtitle: formData.approach?.sectionSubtitle || '', steps: newSteps}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "domains" ? (
                              <>
                                {/* Configuration Domains */}
                                <div className={styles.sectionHeader}>
                                  <h4>🌟 Domaines d'Expertise</h4>
                                  <span className={styles.tooltip} title="Listez vos domaines de coaching : professionnel, personnel, sportif, etc. Soyez spécifique pour attirer les bons clients.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.domains?.sectionTitle || ''}
                                  required
                                  onChange={(e) =>
                                    setFormData({...formData, domains: {sectionTitle: e.target.value, sectionSubtitle: formData.domains?.sectionSubtitle || '', items: formData.domains?.items || []}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.domains?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, domains: {sectionTitle: formData.domains?.sectionTitle || '', sectionSubtitle: e.target.value, items: formData.domains?.items || []}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos domaines d'expertise (6 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                  <div key={index} className={styles.featureCard}>
                                    <h6>Domaine {index + 1}</h6>
                                    
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.domains?.items?.[index]?.icon || 'briefcase'}
                                      onChange={(e) => {
                                        const newItems = [...(formData.domains?.items || [])];
                                        newItems[index] = {...newItems[index], icon: e.target.value};
                                        setFormData({...formData, domains: {sectionTitle: formData.domains?.sectionTitle || '', sectionSubtitle: formData.domains?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    >
                                      <option value="briefcase">💼 Professionnel</option>
                                      <option value="heart">❤️ Personnel</option>
                                      <option value="users">👥 Équipe</option>
                                      <option value="dumbbell">🏋️ Performance</option>
                                      <option value="brain">🧠 Mental</option>
                                      <option value="balance">⚖️ Équilibre</option>
                                      <option value="rocket">🚀 Croissance</option>
                                      <option value="compass">🧭 Direction</option>
                                    </select>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Nom du domaine *"
                                      value={formData.domains?.items?.[index]?.title || ''}
                                      required
                                      onChange={(e) => {
                                        const newItems = [...(formData.domains?.items || [])];
                                        newItems[index] = {...newItems[index], title: e.target.value};
                                        setFormData({...formData, domains: {sectionTitle: formData.domains?.sectionTitle || '', sectionSubtitle: formData.domains?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Description du domaine *"
                                      rows={3}
                                      value={formData.domains?.items?.[index]?.description || ''}
                                      required
                                      onChange={(e) => {
                                        const newItems = [...(formData.domains?.items || [])];
                                        newItems[index] = {...newItems[index], description: e.target.value};
                                        setFormData({...formData, domains: {sectionTitle: formData.domains?.sectionTitle || '', sectionSubtitle: formData.domains?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "specialties" ? (
                              <>
                                {/* Configuration Specialties */}
                                <div className={styles.sectionHeader}>
                                  <h4>🍽️ Spécialités Culinaires</h4>
                                  <span className={styles.tooltip} title="Mettez en avant vos plats signatures. Décrivez ce qui les rend uniques et savoureux.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.specialties?.sectionTitle || ''}
                                  required
                                  onChange={(e) =>
                                    setFormData({...formData, specialties: {sectionTitle: e.target.value, sectionSubtitle: formData.specialties?.sectionSubtitle || '', items: formData.specialties?.items || []}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.specialties?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, specialties: {sectionTitle: formData.specialties?.sectionTitle || '', sectionSubtitle: e.target.value, items: formData.specialties?.items || []}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos spécialités (6 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                  <div key={index} className={styles.featureCard}>
                                    <h6>Spécialité {index + 1}</h6>
                                    
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.specialties?.items?.[index]?.icon || 'chef'}
                                      onChange={(e) => {
                                        const newItems = [...(formData.specialties?.items || [])];
                                        newItems[index] = {...newItems[index], icon: e.target.value};
                                        setFormData({...formData, specialties: {sectionTitle: formData.specialties?.sectionTitle || '', sectionSubtitle: formData.specialties?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    >
                                      <option value="chef">👨‍🍳 Chef</option>
                                      <option value="flame">🔥 Grillé</option>
                                      <option value="leaf">🌿 Végétarien</option>
                                      <option value="fish">🐟 Poisson</option>
                                      <option value="meat">🥩 Viande</option>
                                      <option value="dessert">🍰 Dessert</option>
                                    </select>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Nom du plat *"
                                      value={formData.specialties?.items?.[index]?.name || ''}
                                      required
                                      onChange={(e) => {
                                        const newItems = [...(formData.specialties?.items || [])];
                                        newItems[index] = {...newItems[index], name: e.target.value};
                                        setFormData({...formData, specialties: {sectionTitle: formData.specialties?.sectionTitle || '', sectionSubtitle: formData.specialties?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Description du plat *"
                                      rows={3}
                                      value={formData.specialties?.items?.[index]?.description || ''}
                                      required
                                      onChange={(e) => {
                                        const newItems = [...(formData.specialties?.items || [])];
                                        newItems[index] = {...newItems[index], description: e.target.value};
                                        setFormData({...formData, specialties: {sectionTitle: formData.specialties?.sectionTitle || '', sectionSubtitle: formData.specialties?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "gallery" ? (
                              <>
                                {/* Configuration Gallery */}
                                <div className={styles.sectionHeader}>
                                  <h4>📷 Galerie Photos</h4>
                                  <span className={styles.tooltip} title="Partagez l'ambiance de votre restaurant. Photos de qualité professionnelle recommandées.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.gallery?.sectionTitle || ''}
                                  required
                                  onChange={(e) =>
                                    setFormData({...formData, gallery: {sectionTitle: e.target.value, sectionSubtitle: formData.gallery?.sectionSubtitle || '', photos: formData.gallery?.photos || []}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.gallery?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, gallery: {sectionTitle: formData.gallery?.sectionTitle || '', sectionSubtitle: e.target.value, photos: formData.gallery?.photos || []}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Vos photos (9 maximum)</h5>
                                
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
                                  <div key={index} className={styles.projectCard}>
                                    <h6>Photo {index + 1}</h6>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Titre/Légende *"
                                      value={formData.gallery?.photos?.[index]?.title || ''}
                                      required
                                      onChange={(e) => {
                                        const newPhotos = [...(formData.gallery?.photos || [])];
                                        newPhotos[index] = {...newPhotos[index], title: e.target.value};
                                        setFormData({...formData, gallery: {sectionTitle: formData.gallery?.sectionTitle || '', sectionSubtitle: formData.gallery?.sectionSubtitle || '', photos: newPhotos}});
                                      }}
                                    />
                                    
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.gallery?.photos?.[index]?.category || 'Salle'}
                                      onChange={(e) => {
                                        const newPhotos = [...(formData.gallery?.photos || [])];
                                        newPhotos[index] = {...newPhotos[index], category: e.target.value};
                                        setFormData({...formData, gallery: {sectionTitle: formData.gallery?.sectionTitle || '', sectionSubtitle: formData.gallery?.sectionSubtitle || '', photos: newPhotos}});
                                      }}
                                    >
                                      <option value="Salle">🏛️ Salle</option>
                                      <option value="Terrasse">🌿 Terrasse</option>
                                      <option value="Plats">🍽️ Plats</option>
                                      <option value="Ambiance">✨ Ambiance</option>
                                      <option value="Chef">👨‍🍳 Chef</option>
                                    </select>
                                    
                                    <div className={styles.imageUploadSection}>
                                      <label className={styles.fieldLabel}>Image :</label>
                                      
                                      <div className={styles.uploadOptions}>
                                        <div>
                                          <label className={styles.fieldLabel}>Option 1 : Coller une URL</label>
                                          <input 
                                            type="url"
                                            className={styles.fieldInput}
                                            placeholder="https://mon-restaurant.com/photo.jpg"
                                            value={formData.gallery?.photos?.[index]?.imageUrl || ''}
                                            onChange={(e) => {
                                              const newPhotos = [...(formData.gallery?.photos || [])];
                                              newPhotos[index] = {...newPhotos[index], imageUrl: e.target.value};
                                              setFormData({...formData, gallery: {sectionTitle: formData.gallery?.sectionTitle || '', sectionSubtitle: formData.gallery?.sectionSubtitle || '', photos: newPhotos}});
                                            }}
                                          />
                                        </div>
                                        
                                        <div className={styles.divider}>OU</div>
                                        
                                        <div>
                                          <label className={styles.fieldLabel}>Option 2 : Uploader une image</label>
                                          <input 
                                            type="file"
                                            className={styles.fieldInput}
                                            accept="image/*"
                                            onChange={async (e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                const result = await uploadProjectImage(file);
                                                if (result.success && result.url) {
                                                  const newPhotos = [...(formData.gallery?.photos || [])];
                                                  newPhotos[index] = {...newPhotos[index], imageUrl: result.url};
                                                  setFormData({...formData, gallery: {sectionTitle: formData.gallery?.sectionTitle || '', sectionSubtitle: formData.gallery?.sectionSubtitle || '', photos: newPhotos}});
                                                }
                                              }
                                            }}
                                          />
                                          <p className={styles.hint}>JPG, PNG, WebP (max 5MB)</p>
                                        </div>
                                      </div>
                                      
                                      {formData.gallery?.photos?.[index]?.imageUrl && (
                                        <img 
                                          src={formData.gallery.photos[index].imageUrl} 
                                          alt="Preview"
                                          className={styles.imagePreview}
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : section.id === "faq" ? (
                              <>
                                {/* Configuration FAQ */}
                                <div className={styles.sectionHeader}>
                                  <h4>❓ Questions Fréquentes</h4>
                                  <span className={styles.tooltip} title="Questions fréquentes de vos clients. Vous pouvez modifier les questions suggérées ou ajouter les vôtres.">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Titre de la section *"
                                  value={formData.faq?.sectionTitle || ''}
                                  required
                                  onChange={(e) =>
                                    setFormData({...formData, faq: {sectionTitle: e.target.value, sectionSubtitle: formData.faq?.sectionSubtitle || '', items: formData.faq?.items || []}})
                                  }
                                />
                                
                                <input 
                                  type="text"
                                  className={styles.fieldInput}
                                  placeholder="Sous-titre (optionnel)"
                                  value={formData.faq?.sectionSubtitle || ''}
                                  onChange={(e) =>
                                    setFormData({...formData, faq: {sectionTitle: formData.faq?.sectionTitle || '', sectionSubtitle: e.target.value, items: formData.faq?.items || []}})
                                  }
                                />
                                
                                <h5 className={styles.fieldLabel}>Questions & Réponses (8 maximum)</h5>
                                <p className={styles.hint}>💡 Les questions sont pré-remplies selon votre template, vous pouvez les modifier</p>
                                
                                {[0, 1, 2, 3, 4, 5, 6, 7].map(index => (
                                  <div key={index} className={styles.featureCard}>
                                    <h6>Question {index + 1}</h6>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Question (modifiable) *"
                                      value={formData.faq?.items?.[index]?.question || ''}
                                      required
                                      onChange={(e) => {
                                        const newItems = [...(formData.faq?.items || [])];
                                        newItems[index] = {...newItems[index], question: e.target.value};
                                        setFormData({...formData, faq: {sectionTitle: formData.faq?.sectionTitle || '', sectionSubtitle: formData.faq?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    />
                                    
                                    <textarea 
                                      className={styles.fieldTextarea}
                                      placeholder="Réponse détaillée *"
                                      rows={4}
                                      value={formData.faq?.items?.[index]?.answer || ''}
                                      required
                                      onChange={(e) => {
                                        const newItems = [...(formData.faq?.items || [])];
                                        newItems[index] = {...newItems[index], answer: e.target.value};
                                        setFormData({...formData, faq: {sectionTitle: formData.faq?.sectionTitle || '', sectionSubtitle: formData.faq?.sectionSubtitle || '', items: newItems}});
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            ) : section.id === "trustbar" ? (
                              <>
                                {/* Configuration Trustbar */}
                                <div className={styles.sectionHeader}>
                                  <h4>🏆 Statistiques de confiance</h4>
                                  <span className={styles.tooltip} title="Affichez vos chiffres clés pour inspirer confiance : clients, années d'expérience, taux de satisfaction. Soyez honnête, vos statistiques renforcent votre crédibilité !">
                                    ℹ️
                                  </span>
                                </div>
                                
                                <p className={styles.hint}>Ajoutez jusqu'à 4 statistiques impactantes</p>
                                
                                {[0, 1, 2, 3].map(index => (
                                  <div key={index} className={styles.statInput}>
                                    <label className={styles.fieldLabel}>Statistique {index + 1}</label>
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Valeur (ex: 500+, 10 ans, 98%)"
                                      value={formData.trustbar?.stats?.[index]?.value || ''}
                                      onChange={(e) => {
                                        const newStats = [...(formData.trustbar?.stats || [])];
                                        newStats[index] = {...newStats[index], value: e.target.value};
                                        updateSectionProps('trustbar', {
                                          stat1Value: newStats[0]?.value || '',
                                          stat1Label: newStats[0]?.label || '',
                                          stat1Icon: newStats[0]?.icon || '',
                                          stat2Value: newStats[1]?.value || '',
                                          stat2Label: newStats[1]?.label || '',
                                          stat2Icon: newStats[1]?.icon || '',
                                          stat3Value: newStats[2]?.value || '',
                                          stat3Label: newStats[2]?.label || '',
                                          stat3Icon: newStats[2]?.icon || '',
                                          stat4Value: newStats[3]?.value || '',
                                          stat4Label: newStats[3]?.label || '',
                                          stat4Icon: newStats[3]?.icon || ''
                                        });
                                      }}
                                    />
                                    
                                    <input 
                                      type="text"
                                      className={styles.fieldInput}
                                      placeholder="Description (ex: Clients satisfaits)"
                                      value={formData.trustbar?.stats?.[index]?.label || ''}
                                      onChange={(e) => {
                                        const newStats = [...(formData.trustbar?.stats || [])];
                                        newStats[index] = {...newStats[index], label: e.target.value};
                                        updateSectionProps('trustbar', {
                                          stat1Value: newStats[0]?.value || '',
                                          stat1Label: newStats[0]?.label || '',
                                          stat1Icon: newStats[0]?.icon || '',
                                          stat2Value: newStats[1]?.value || '',
                                          stat2Label: newStats[1]?.label || '',
                                          stat2Icon: newStats[1]?.icon || '',
                                          stat3Value: newStats[2]?.value || '',
                                          stat3Label: newStats[2]?.label || '',
                                          stat3Icon: newStats[2]?.icon || '',
                                          stat4Value: newStats[3]?.value || '',
                                          stat4Label: newStats[3]?.label || '',
                                          stat4Icon: newStats[3]?.icon || ''
                                        });
                                      }}
                                    />
                                    
                                    <select
                                      className={styles.fieldInput}
                                      value={formData.trustbar?.stats?.[index]?.icon || 'users'}
                                      onChange={(e) => {
                                        const newStats = [...(formData.trustbar?.stats || [])];
                                        newStats[index] = {...newStats[index], icon: e.target.value};
                                        updateSectionProps('trustbar', {
                                          stat1Value: newStats[0]?.value || '',
                                          stat1Label: newStats[0]?.label || '',
                                          stat1Icon: newStats[0]?.icon || '',
                                          stat2Value: newStats[1]?.value || '',
                                          stat2Label: newStats[1]?.label || '',
                                          stat2Icon: newStats[1]?.icon || '',
                                          stat3Value: newStats[2]?.value || '',
                                          stat3Label: newStats[2]?.label || '',
                                          stat3Icon: newStats[2]?.icon || '',
                                          stat4Value: newStats[3]?.value || '',
                                          stat4Label: newStats[3]?.label || '',
                                          stat4Icon: newStats[3]?.icon || ''
                                        });
                                      }}
                                    >
                                      <option value="users">👥 Clients</option>
                                      <option value="calendar">📅 Années</option>
                                      <option value="star">⭐ Satisfaction</option>
                                      <option value="check">✅ Projets</option>
                                      <option value="clock">⏰ Disponibilité</option>
                                      <option value="award">🏆 Certifications</option>
                                    </select>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <p className={styles.sectionPropsPlaceholder}>
                                Zone de contenu pour cette section (textes, images, prompts…)
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
                </div>
              </div>
            </div>
            
            {/* Sections Spécifiques - Accordéon */}
            <div className={styles.sectionAccordion}>
              <div 
                className={styles.sectionHeader}
                onClick={() => setOpenSections(prev => 
                  prev.includes('sections-specifiques') 
                    ? prev.filter(id => id !== 'sections-specifiques')
                    : [...prev, 'sections-specifiques']
                )}
              >
                <h4 className={styles.sectionHeaderTitle}>🎯 Sections spécifiques</h4>
                <span className={`${styles.sectionToggle} ${openSections.includes('sections-specifiques') ? styles.open : ''}`}>
                  ▼
                </span>
              </div>
              <div className={`${styles.sectionContent} ${!openSections.includes('sections-specifiques') ? styles.hidden : ''}`}>
                <p className={styles.sectionsSubtitle}>Sections uniques à ce template</p>
                <div className="sections-group sections-group--specific">
              {/* DEUXIEME OCCURRENCE - SECTIONS SPECIFIQUES - FALLBACKS BLOC_2 */}
              {specificSectionIds.map((sectionId) => {
                let section;
                let handleSectionToggle;
                
                if (selectedTemplate === 'landing-solo') {
                  section = sectionsConfig.find(s => s.id === sectionId);
                  handleSectionToggle = (checked: boolean) => {
                    setSectionsConfig(prev =>
                      prev.map(s =>
                        s.id === sectionId ? { ...s, enabled: checked } : s
                      )
                    );
                  };
                } else if (selectedTemplate === 'restaurant') {
                  section = restaurantSectionsConfig.find(s => s.id === sectionId);
                  handleSectionToggle = (checked: boolean) => {
                    setRestaurantSectionsConfig(prev =>
                      prev.map(s =>
                        s.id === sectionId ? { ...s, enabled: checked } : s
                      )
                    );
                  };
                } else if (selectedTemplate === 'coach') {
                  section = coachSectionsConfig.find(s => s.id === sectionId);
                  handleSectionToggle = (checked: boolean) => {
                    setCoachSectionsConfig(prev =>
                      prev.map(s =>
                        s.id === sectionId ? { ...s, enabled: checked } : s
                      )
                    );
                  };
                } else {
                  return null;
                }
                
                if (!section || !handleSectionToggle) return null;
                
                return (
                  <div key={sectionId} className={styles.sectionItem}>
                    <div className={styles.sectionHeader}>
                      <label className={styles.sectionHeaderLabel}>
                        <input
                          type="checkbox"
                          checked={section.required || section.enabled}
                          disabled={section.required}
                          onChange={(e) => handleSectionToggle(e.target.checked)}
                          className={styles.sectionCheckbox}
                        />
                        <span className={styles.sectionLabel}>
                          {section.label}
                          {section.required && <span className={styles.sectionTag}>Obligatoire</span>}
                          {section.description && <span className={styles.sectionDescription}> - {section.description}</span>}
                        </span>
                      </label>
                    </div>
                    
                    {(section.required || section.enabled) && (
                      <div className={styles.sectionActions}>
                        <button
                          type="button"
                          className={styles.sectionToggleButton}
                          onClick={() => toggleSectionProps(section.id)}
                        >
                          <span className={styles.sectionToggleLabel}>
                            Personnalisez cette section
                          </span>
                          <span className={styles.sectionToggleIcon}>
                            {openSections.includes(section.id) ? "▾" : "▸"}
                          </span>
                        </button>

                        {openSections.includes(section.id) && (
                          <div className={styles.sectionProps}>
                            {section.id === "navbar" ? (
                              <>
                                {/* Logo configuration */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Texte du logo</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.logoText as string) || formData.companyName}
                                    placeholder="Nom de votre entreprise"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { logoText: e.target.value })
                                    }
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>URL du logo (optionnel)</label>
                                  <input
                                    type="url"
                                    className={styles.fieldInput}
                                    value={(section.props?.logoUrl as string) || formData.logoUrl}
                                    placeholder="https://exemple.com/logo.png"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { logoUrl: e.target.value })
                                    }
                                  />
                                </div>

                                {/* Style de navigation */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Style de navigation</label>
                                  <select
                                    className={styles.fieldSelect}
                                    value={(section.props?.layout as string) || "classic"}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { layout: e.target.value })
                                    }
                                  >
                                    <option value="classic">Classique</option>
                                    <option value="centered">Centrée</option>
                                    <option value="split">Séparée</option>
                                  </select>
                                </div>

                                {/* Liens internes */}
                                <div className={styles.fieldGroup}>
                                  <p className={styles.fieldLabel}>
                                    Sections à afficher dans la navigation
                                  </p>
                                  <div className={styles.checkboxList}>
                                    {currentSections.map((targetSection) => {
                                      if (targetSection.id === "navbar" || targetSection.id === "footer") {
                                        return null;
                                      }
                                      const visibleIds = (section.props?.visibleSectionIds as string[]) || [];
                                      const checked = visibleIds.includes(targetSection.id);

                                      const toggle = () => {
                                        const next = checked
                                          ? visibleIds.filter((id) => id !== targetSection.id)
                                          : [...visibleIds, targetSection.id];

                                        updateSectionProps(section.id, { visibleSectionIds: next });
                                      };

                                      return (
                                        <label key={targetSection.id} className={styles.checkboxItem}>
                                          <input type="checkbox" checked={checked} onChange={toggle} />
                                          <span>{targetSection.label}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              </>
                            ) : section.id === "footer" ? (
                              <>
                                {/* Marque / logo */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>
                                    Nom de la marque dans le pied de page
                                  </label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.brandText as string) || formData.companyName}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { brandText: e.target.value })
                                    }
                                    placeholder="Ex : Suzanne Dev — Sites vitrines premium"
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>URL du logo (optionnel)</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.brandLogoUrl as string) || formData.logoUrl}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { brandLogoUrl: e.target.value })
                                    }
                                    placeholder="Ex : https://mon-site.com/logo-footer.png"
                                  />
                                </div>

                                {/* Texte légal */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Texte légal / Copyright</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    rows={2}
                                    value={(section.props?.legalText as string) || ""}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { legalText: e.target.value })
                                    }
                                    placeholder="Ex : © 2025 Suzanne Dev — Tous droits réservés."
                                  />
                                </div>

                                {/* Liens internes */}
                                <div className={styles.fieldGroup}>
                                  <p className={styles.fieldLabel}>
                                    Sections à afficher dans le pied de page
                                  </p>
                                  <div className={styles.checkboxList}>
                                    {currentSections.map((targetSection) => {
                                      if (targetSection.id === "navbar" || targetSection.id === "footer") {
                                        return null;
                                      }

                                      const selectedIds =
                                        (section.props?.footerSectionIds as string[]) || [];
                                      const checked = selectedIds.includes(targetSection.id);

                                      const toggle = () => {
                                        const next = checked
                                          ? selectedIds.filter((id) => id !== targetSection.id)
                                          : [...selectedIds, targetSection.id];

                                        updateSectionProps(section.id, { footerSectionIds: next });
                                      };

                                      return (
                                        <label
                                          key={targetSection.id}
                                          className={styles.checkboxItem}
                                        >
                                          <input type="checkbox" checked={checked} onChange={toggle} />
                                          <span>{targetSection.label}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Liens externes simples */}
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Lien Instagram (optionnel)</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.instagramUrl as string) || formData.instagramUrl}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { instagramUrl: e.target.value })
                                    }
                                    placeholder="Ex : https://instagram.com/moncompte"
                                  />
                                </div>

                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Lien LinkedIn (optionnel)</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.linkedinUrl as string) || formData.linkedinUrl}
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { linkedinUrl: e.target.value })
                                    }
                                    placeholder="Ex : https://linkedin.com/in/monprofil"
                                  />
                                </div>
                              </>
                            ) : section.id === "services" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.SERVICES_TITLE}
                                    placeholder="Titre de vos services"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    rows={3}
                                    value={(section.props?.sectionSubtitle as string) ?? DEFAULT_TEXTS.SERVICES_DESCRIPTION}
                                    placeholder="Sous-titre de la section services"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { sectionSubtitle: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les services détaillés se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "portfolio" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.PORTFOLIO_TITLE}
                                    placeholder="Titre de votre portfolio"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.subtitle as string) ?? DEFAULT_TEXTS.PORTFOLIO_SUBTITLE}
                                    placeholder="Sous-titre accrocheur"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { subtitle: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les projets détaillés se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "features" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.FEATURES_TITLE}
                                    placeholder="Titre de vos avantages"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.subtitle as string) ?? DEFAULT_TEXTS.FEATURES_SUBTITLE}
                                    placeholder="Sous-titre convaincant"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { subtitle: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les avantages détaillés se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "specialties" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.SPECIALTIES_TITLE}
                                    placeholder="Titre de vos spécialités"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Description</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    rows={3}
                                    value={(section.props?.description as string) ?? DEFAULT_TEXTS.SPECIALTIES_DESCRIPTION}
                                    placeholder="Description de vos spécialités"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { description: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les spécialités détaillées se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "approach" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de votre approche</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.APPROACH_TITLE}
                                    placeholder="Titre de votre approche"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Description de votre philosophie</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    rows={4}
                                    value={(section.props?.description as string) ?? DEFAULT_TEXTS.APPROACH_DESCRIPTION}
                                    placeholder="Décrivez votre méthode de coaching"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { description: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les détails de votre méthode se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "faq" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de la section</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.FAQ_TITLE}
                                    placeholder="Titre de vos FAQ"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.subtitle as string) ?? DEFAULT_TEXTS.FAQ_SUBTITLE}
                                    placeholder="Sous-titre informatif"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { subtitle: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les questions détaillées se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "menu" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre du menu</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.MENU_TITLE}
                                    placeholder="Titre de votre menu"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Description</label>
                                  <textarea
                                    className={styles.fieldTextarea}
                                    rows={2}
                                    value={(section.props?.description as string) ?? DEFAULT_TEXTS.MENU_DESCRIPTION}
                                    placeholder="Description de votre carte"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { description: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les plats et prix se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : section.id === "domains" ? (
                              <>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Titre de vos domaines</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.title as string) ?? DEFAULT_TEXTS.DOMAINS_TITLE}
                                    placeholder="Titre de vos spécialités coaching"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { title: e.target.value })
                                    }
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Sous-titre</label>
                                  <input
                                    type="text"
                                    className={styles.fieldInput}
                                    value={(section.props?.subtitle as string) ?? DEFAULT_TEXTS.DOMAINS_SUBTITLE}
                                    placeholder="Sous-titre descriptif"
                                    onChange={(e) =>
                                      updateSectionProps(section.id, { subtitle: e.target.value })
                                    }
                                  />
                                </div>
                                <p className={styles.sectionNote}>
                                  💡 Les domaines détaillés se configurent dans le modal de capture rapide
                                </p>
                              </>
                            ) : (
                              <p className={styles.sectionPropsPlaceholder}>
                                Zone de contenu pour cette section (textes, images, prompts…)
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
                </div>
              </div>
            </div>

        {/* === NOTE LIBRE - Section séparée === */}
        <div className={styles.sectionAccordion}>
          <div 
            className={styles.sectionHeader}
            onClick={() => setOpenSections(prev => 
              prev.includes('note-libre') 
                ? prev.filter(id => id !== 'note-libre')
                : [...prev, 'note-libre']
            )}
          >
            <h3 className={styles.sectionHeaderTitle}>📝 Note libre</h3>
            <span className={`${styles.sectionToggle} ${openSections.includes('note-libre') ? styles.open : ''}`}>
              ▼
            </span>
          </div>
          <div className={`${styles.sectionContent} ${!openSections.includes('note-libre') ? styles.hidden : ''}`}>
            <p className={styles.sectionDescription}>
              Ajoutez vos demandes spécifiques ou notes importantes pour personnaliser votre site
            </p>
            
            <div className={styles.formGroup}>
              <label htmlFor="special-request-accordion" className={styles.label}>
                Votre demande spécifique (facultatif)
              </label>
              <textarea
                id="special-request-accordion"
                value={formData.specialRequest || ''}
                onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
                placeholder="Exemples :
• Intégrer un système de réservation en ligne
• Ajouter une galerie photo spécifique  
• Personnaliser la section contact
• Modifier l'organisation des sections
• Ajouter des fonctionnalités particulières..."
                className={styles.textarea}
                rows={6}
                maxLength={500}
              />
              <div className={styles.textCounter}>
                {(formData.specialRequest || '').length}/500 caractères
              </div>
              <div className={styles.noteHint}>
                💡 Cette note aide nos développeurs à personnaliser votre site selon vos besoins spécifiques
              </div>
            </div>
          </div>
        </div>

        {/* === VALIDATION PRÉ-COMMANDE === */}
        {(validationErrors.length > 0 || validationWarnings.length > 0) && (
          <div className={styles.validationSection}>
            {validationErrors.length > 0 && (
              <div className={styles.validationErrors}>
                <h4 className={styles.validationTitle}>❌ Requis pour commander :</h4>
                <ul className={styles.validationList}>
                  {validationErrors.map((error, index) => (
                    <li key={index} className={styles.validationError}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validationWarnings.length > 0 && (
              <div className={styles.validationWarnings}>
                <h4 className={styles.validationTitle}>⚠️ Recommandé :</h4>
                <ul className={styles.validationList}>
                  {validationWarnings.map((warning, index) => (
                    <li key={index} className={styles.validationWarning}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Indicateur statut Supabase */}
        <div className={styles.supabaseStatus}>
          {isSupabaseConfigured ? (
            <span className={styles.statusConnected}>🟢 Supabase connecté</span>
          ) : (
            <div className={styles.statusError}>
              <span className={styles.statusDisconnected}>🟡 Mode JSON uniquement</span>
              <small className={styles.configError}>
                {getSupabaseConfigError()}
              </small>
            </div>
          )}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className={styles.orderSection}>
          <button 
            className={styles.orderButton}
            onClick={openPreviewModal}
          >
            🔍 Voir le résultat
          </button>

          {/* NOUVEAU: Bouton Export Preview */}
          <button 
            className={styles.previewExportButton}
            onClick={handleExportPreview}
            title="Exporter la preview pour validation client"
          >
            📸 Export Preview
          </button>

          {/* NOUVEAU: Bouton Export JSON */}
          <button 
            className={styles.exportButton}
            onClick={handleExportJSON}
            title="Exporter la configuration complète en JSON"
          >
            📄 Exporter JSON
          </button>
          
          {/* Nouveau bouton Valider la commande */}
          <button 
            className={`${styles.orderButton} ${styles.validateOrderButton} ${validationErrors.length > 0 ? styles.buttonDisabled : ''}`}
            onClick={handleValidatePreview}
            disabled={orderStatus === 'saving' || validationErrors.length > 0}
            title={validationErrors.length > 0 ? `Impossible de commander: ${validationErrors.join(', ')}` : ''}
          >
            {validationErrors.length > 0 && '🚫 '}
            {orderStatus === 'saving' ? '⏳ Création...' : 
             validationErrors.length > 0 ? 'Remplir les champs requis' : 
             '✅ Valider cette commande'}
          </button>
        </div>

        {/* Prix en bas */}
        <div className={styles.priceDisplayBottom}>
          <span className={styles.priceLabelBottom}>Prix final :</span>
          <span className={styles.priceValueBottom}>
            {selectedTemplate === 'landing-solo' ? '350€' : selectedTemplate === 'restaurant' ? '400€' : '500€'}
          </span>
        </div>
      </aside>
      
      <main className={styles.preview}>
        {/* Header preview avec bouton fullscreen */}
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Prévisualisation</h2>
          <div className={styles.previewActions}>
            <button 
              className={styles.modalButton}
              onClick={openModal}
              title="Guide étape par étape"
            >
              🎯 Guide commande
            </button>
            <button 
              className={styles.modalButton}
              onClick={openCaptureModal}
              title="Configuration rapide"
              style={{ marginLeft: '10px', backgroundColor: '#10B981' }}
            >
              🏠 Créez votre site
            </button>
            <button 
              className={styles.modalButton}
              onClick={openPreviewModal}
              title="Prévisualiser en plein écran"
              style={{ marginLeft: '10px', backgroundColor: '#8B5CF6' }}
            >
              🔍 Prévisualiser
            </button>
            <button 
              className={styles.fullscreenButton}
              onClick={() => window.open(`/templates/${selectedTemplate}`, '_blank')}
              title="Ouvrir en plein écran"
            >
              ⛶ Plein écran
            </button>
          </div>
        </div>

        {/* Template preview avec scroll */}
        <div ref={previewRef}>
          <LandingPreview
            selectedTemplate={selectedTemplate}
            formData={formData}
            colorMode={colorMode}
            sectionsConfig={sectionsConfig}
            restaurantSectionsConfig={restaurantSectionsConfig}
            coachSectionsConfig={coachSectionsConfig}
            theme={formData.theme}
            className={styles.templateWrapper}
          />
        </div>
      </main>
      
      {/* Modal slides */}
      {isModalOpen && (
        <ConfigurationModal
          slides={slides}
          currentSlide={currentSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
          onClose={closeModal}
          isFirstSlide={currentSlide === 0}
          isLastSlide={currentSlide === slides.length - 1}
        />
      )}
      
      {/* Modal de capture */}
      {isCaptureModalOpen && (
        <ConfigurationCaptureModalAdaptive
          isOpen={isCaptureModalOpen}
          onClose={closeCaptureModal}
          onComplete={handleCaptureComplete}
          initialTemplate={selectedTemplate}
          initialFormData={formData}
          onRealTimeUpdate={(modalFormData) => {
            console.log('🔄 Modal temps réel:', modalFormData);
            
            // ⚠️ PROTECTION BOUCLE: Debouncing intelligent
            clearTimeout((window as any).modalSyncTimeout);
            (window as any).modalSyncTimeout = setTimeout(() => {
              // Transformation immédiate des données du modal vers le configurateur
              const transformedData = bridgeModalToConfigurator(modalFormData);
              
              // Ne mettre à jour que si les données ont vraiment changé
              setFormData(prev => {
                const hasRealChanges = JSON.stringify(transformedData) !== JSON.stringify({
                  companyName: prev.companyName,
                  email: prev.email,
                  phone: prev.phone,
                  tagline: prev.tagline,
                  services: prev.services,
                  portfolio: prev.portfolio,
                  features: prev.features
                });
                
                if (!hasRealChanges) {
                  console.log('🚫 Modal sync: Pas de changements réels détectés');
                  return prev;
                }
                
                console.log('✅ Modal sync: Mise à jour confirmée');
                return {
                  ...prev,
                  ...transformedData
                };
              });
            }, 150); // Debouncing de 150ms pour éviter les appels trop fréquents
          }}
        />
      )}
      
      {/* Modal de prévisualisation */}
      {isPreviewModalOpen && (
        <PreviewModal
          isOpen={isPreviewModalOpen}
          config={{
            selectedTemplate,
            formData,
            sectionsConfig,
            restaurantSectionsConfig,
            coachSectionsConfig,
            theme: formData.theme
          }}
          onClose={closePreviewModal}
          onValidate={handleValidatePreview}
        />
      )}
    </div>
  );
};

export default ConfiguratorPage;
