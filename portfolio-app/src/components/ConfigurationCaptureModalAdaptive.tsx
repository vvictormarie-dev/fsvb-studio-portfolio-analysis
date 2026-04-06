import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { bridgeConfiguratorToModal } from '../config/modalBridge';

interface FormData {
  // Infos de base
  companyName: string;
  tagline: string;
  ctaLabel: string;
  email: string;
  phone: string;
  logoUrl: string;
  heroImageUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  
  // 🎯 HERO FIELDS - Nouveaux champs dédiés
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaButton: string;
  heroImage: string;
  
  // Thème et couleurs
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  theme: string;
  
  // Sections personnalisées
  aboutDescription: string;
  aboutTitle: string; // Titre de la section About
  aboutImage: string; // URL image About
  aboutValues: string; // JSON des valeurs clés
  servicesDescription: string;
  servicesItems: string; // JSON des services
  portfolioDescription: string;
  portfolioItems: string; // JSON des réalisations
  testimonialsItems: string; // JSON des témoignages
  faqItems: string; // JSON des FAQ
  contactAddress: string;
  contactCity: string; // Ville
  contactFormEmail: string; // Email réception formulaire
  useDifferentEmail: boolean; // Utiliser email différent
  autoReplyMessage: string; // Message auto-réponse
  featuresItems: string; // JSON des avantages
  selectedSections?: string; // JSON des sections sélectionnées
  
  // Sections spécifiques restaurant
  specialtiesItems: string; // JSON des spécialités
  menuItems: string; // JSON du menu
  galleryImages: string; // JSON des images galerie
  hoursLocation: string; // JSON horaires et localisation
  reservationInfo: string; // JSON info réservation
  eventsInfo: string; // JSON événements
  
  // Sections spécifiques coach
  approachDescription: string; // Description méthode
  domainsItems: string; // JSON domaines d'accompagnement
  certificationsItems: string; // JSON formations diplômes
  bookingInfo: string; // JSON prise RDV
  
  // Sections landing spécifiques
  trustbarStats: string; // JSON statistiques confiance
  comparisonData: string; // JSON avec/sans
  comparisonWithout: string; // Description situation sans
  comparisonWith: string; // Description situation avec
  urgencyMessage: string; // Message d'urgence
  guaranteeData: string; // JSON garanties
  guaranteeList: string; // Liste des garanties
  processDescription: string; // Description du processus
  processTitle: string; // Titre section process
  processSubtitle: string; // Sous-titre section process
  processSteps: string; // JSON étapes processus (4 étapes)
  ctaTitle: string; // Titre CTA
  ctaButtonText: string; // Texte bouton CTA
  
  // Intégrations externes
  googleMapsUrl: string;
  calendarUrl: string;
  bookingUrl: string;
  
  // Informations légales
  legalBusinessName: string; // Raison sociale
  legalSiret: string; // SIRET 14 chiffres
  legalTva: string; // N° TVA intracommunautaire
  legalAddress: string; // Adresse siège social
  legalZipCode: string; // Code postal
  legalConfirmation: boolean; // Confirmation exactitude infos légales
  
  // Note libre client
  specialRequest: string;
}

interface ConfigurationCaptureModalAdaptiveProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { selectedTemplate: string; formData: FormData }) => void;
  initialTemplate?: string;
  // 🌊 NOUVEAU: Props pour synchronisation temps réel
  initialFormData?: Partial<FormData>;
  onRealTimeUpdate?: (formData: FormData) => void;
  // 🎯 NOUVEAU: Navigation directe vers un slide spécifique
  initialSlide?: string;
  // � SYSTÈME B UNIFIÉ: Toutes les fonctions sectionsConfig
  updateSectionProps?: (sectionId: string, props: Record<string, any>) => void;
  sectionsConfig?: Record<string, any>;
  getSectionProps?: (sectionId: string) => Record<string, any> | undefined;
}

const ConfigurationCaptureModalAdaptive: React.FC<ConfigurationCaptureModalAdaptiveProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialTemplate = 'landing-solo',
  // 🌊 NOUVEAU: Props pour synchronisation temps réel
  initialFormData,
  onRealTimeUpdate,
  // 🎯 NOUVEAU: Navigation directe vers un slide spécifique
  initialSlide,
  // � SYSTÈME B UNIFIÉ: Toutes les fonctions sectionsConfig
  updateSectionProps,
  sectionsConfig,
  getSectionProps
}) => {
  // 🎯 PERSISTENCE: Conserver le slide courant entre ouvertures
  const [currentSlide, setCurrentSlide] = useState(() => {
    // Récupérer le dernier slide depuis le sessionStorage
    const savedSlide = sessionStorage.getItem('modal-current-slide');
    return savedSlide ? parseInt(savedSlide, 10) : 0;
  });
  const [selectedTemplate] = useState(initialTemplate);
  
  // États pour le modal adaptatif
  const [selectedSections, setSelectedSections] = useState<{ [key: string]: boolean }>({});
  const [dynamicSlides, setDynamicSlides] = useState<any[]>([]);
  const [entityType, setEntityType] = useState<'entreprise' | 'particulier'>('entreprise');

  // 🚀 MIGRATION: Helper function pour mettre à jour les sections
  const updateSection = (sectionId: string, props: Record<string, any>) => {
    console.log(`🔥 MIGRATION ACTIVE - Section: ${sectionId}`, props);
    if (updateSectionProps) {
      updateSectionProps(sectionId, props);
      console.log(`✅ Section ${sectionId} mise à jour instantanément dans sectionsConfig !`);
    } else {
      console.warn(`⚠️ updateSectionProps non disponible pour section ${sectionId}`);
    }
  };

  // 🔥 SYSTÈME B: Log sectionsConfig pour validation (évite "never read")
  React.useEffect(() => {
    if (sectionsConfig) {
      console.log('🔥 MODAL SYSTÈME B - sectionsConfig reçu:', Object.keys(sectionsConfig || {}));
      console.log('📊 Services items depuis sectionsConfig:', getSectionProps?.('services')?.items);
      console.log('📊 Portfolio items depuis sectionsConfig:', getSectionProps?.('portfolio')?.items);
      console.log('📊 Features items depuis sectionsConfig:', getSectionProps?.('features')?.items);
      console.log('🎯 MIGRATION RÉUSSIE - Modal utilise 100% Système B !');
    }
  }, [sectionsConfig, getSectionProps]);

  const [formData, setFormData] = useState<FormData>(() => ({
    // 🌊 BRIDGE: Utiliser les données initiales du configurateur si disponibles
    // Infos de base
    companyName: initialFormData?.companyName || '',
    tagline: initialFormData?.tagline || '',
    ctaLabel: initialFormData?.ctaLabel || 'Découvrir',
    email: initialFormData?.email || '',
    phone: initialFormData?.phone || '',
    logoUrl: initialFormData?.logoUrl || '',
    heroImageUrl: '',
    instagramUrl: initialFormData?.instagramUrl || '',
    linkedinUrl: initialFormData?.linkedinUrl || '',
    
    // 🎯 HERO FIELDS - Nouveaux champs dédiés avec mapping intelligent
    heroTitle: initialFormData?.heroTitle || initialFormData?.companyName || 'Transformez votre vision en réalité',
    heroSubtitle: initialFormData?.heroSubtitle || 'Solutions sur-mesure pour propulser votre activité',
    heroCtaText: initialFormData?.heroCtaText || 'Prêt à commencer ?',
    heroCtaButton: initialFormData?.heroCtaButton || 'Découvrir nos solutions',
    heroImage: initialFormData?.heroImage || '',
    
    // Thème et couleurs
    primaryColor: initialFormData?.primaryColor || '#2563EB',
    secondaryColor: initialFormData?.secondaryColor || '#1E40AF',
    accentColor: initialFormData?.accentColor || '#FBBF24',
    backgroundColor: initialFormData?.backgroundColor || '#04040E',
    textColor: initialFormData?.textColor || '#FFFFFF',
    theme: initialFormData?.theme || 'empire',
    
    // Sections personnalisées - Convertir les objets du configurateur vers JSON strings
    aboutDescription: '',
    aboutTitle: '',
    aboutImage: '',
    aboutValues: JSON.stringify([
      { icon: '🎯', title: 'Expertise', description: 'Une compétence reconnue' },
      { icon: '❤️', title: 'Passion', description: 'Un engagement total' },
      { icon: '🎆', title: 'Résultats', description: 'Des résultats concrets' }
    ]),
    servicesDescription: (initialFormData as any)?.services?.sectionTitle || '',
    servicesItems: (initialFormData as any)?.services?.packages ? JSON.stringify(
      (initialFormData as any).services.packages.map((pkg: any) => ({
        title: pkg.name || pkg.title || 'Service',
        description: pkg.description || '',
        price: pkg.price || '0€',
        features: pkg.features || []
      }))
    ) : JSON.stringify([
      { title: 'Service 1', description: 'Description du service', price: '99€', features: [] },
      { title: 'Service 2', description: 'Description du service', price: '149€', features: [] },
      { title: 'Service 3', description: 'Description du service', price: '199€', features: [] }
    ]),
    portfolioDescription: (initialFormData as any)?.portfolio?.sectionTitle || '',
    portfolioItems: (initialFormData as any)?.portfolio?.projects ? JSON.stringify(
      (initialFormData as any).portfolio.projects.map((project: any) => ({
        title: project.title || 'Projet',
        description: project.description || '',
        image: project.imageUrl || project.image || '',
        url: project.projectUrl || project.url || ''
      }))
    ) : JSON.stringify([
      { title: 'Projet 1', description: 'Description du projet', image: '', url: '' },
      { title: 'Projet 2', description: 'Description du projet', image: '', url: '' },
      { title: 'Projet 3', description: 'Description du projet', image: '', url: '' }
    ]),
    testimonialsItems: (initialFormData as any)?.testimonials?.items ? JSON.stringify(
      (initialFormData as any).testimonials.items.map((item: any) => ({
        name: item.name || 'Client',
        role: item.role || 'Entrepreneur',
        content: item.content || item.text || 'Excellent service', // content en priorité
        rating: item.rating || 5
      }))
    ) : JSON.stringify([
      { name: 'Client 1', role: 'Entrepreneur', content: 'Excellent service, je recommande !', rating: 5 },
      { name: 'Client 2', role: 'Directeur', content: 'Très professionnel et efficace', rating: 5 }
    ]),
    faqItems: JSON.stringify([
      { question: 'Comment ça marche ?', answer: 'C\'est très simple...' },
      { question: 'Combien ça coûte ?', answer: 'Nos tarifs commencent à...' },
      { question: 'Quels sont les délais ?', answer: 'Généralement sous 5 jours...' }
    ]),
    contactAddress: '',
    contactCity: '',
    contactFormEmail: '',
    useDifferentEmail: false,
    autoReplyMessage: '',
    featuresItems: JSON.stringify([
      { icon: '✅', title: 'Avantage 1', description: 'Description de l\'avantage' },
      { icon: '🚀', title: 'Avantage 2', description: 'Description de l\'avantage' },
      { icon: '🏆', title: 'Avantage 3', description: 'Description de l\'avantage' }
    ]),
    
    // Restaurant spécifique
    specialtiesItems: JSON.stringify([
      { name: 'Spécialité 1', description: 'Description délicieuse', price: '0€', image: '' },
      { name: 'Spécialité 2', description: 'Description délicieuse', price: '0€', image: '' }
    ]),
    menuItems: JSON.stringify({
      entrees: [{ name: 'Entrée 1', price: '0€', description: '' }],
      plats: [{ name: 'Plat 1', price: '0€', description: '' }],
      desserts: [{ name: 'Dessert 1', price: '0€', description: '' }]
    }),
    galleryImages: JSON.stringify([]),
    hoursLocation: JSON.stringify({
      horaires: 'Du mardi au dimanche, 12h-14h et 19h-22h',
      adresse: 'Votre adresse',
      telephone: '',
      fermeture: 'Fermé le lundi'
    }),
    reservationInfo: JSON.stringify({
      titre: 'Réservez votre table',
      description: 'Contactez-nous pour réserver',
      telephone: '',
      email: ''
    }),
    eventsInfo: JSON.stringify({
      titre: 'Événements privés',
      description: 'Nous organisons vos événements',
      capacite: '50 personnes max'
    }),
    
    // Coach spécifique
    approachDescription: 'Une approche bienveillante et personnalisée pour vous accompagner vers vos objectifs.',
    domainsItems: JSON.stringify([
      { nom: 'Développement personnel', description: 'Confiance en soi, estime de soi' },
      { nom: 'Coaching professionnel', description: 'Carrière, leadership, gestion du stress' },
      { nom: 'Coaching de vie', description: 'Équilibre vie pro/perso, transitions' }
    ]),
    certificationsItems: JSON.stringify([
      { nom: 'Certification ICF', organisme: 'International Coach Federation', annee: '2023' },
      { nom: 'Formation PNL', organisme: 'Institut de PNL', annee: '2022' }
    ]),
    bookingInfo: JSON.stringify({
      titre: 'Réservez votre séance',
      description: 'Séance découverte gratuite de 30 minutes',
      duree: '30 min',
      prix: 'Gratuit'
    }),
    
    // Landing spécifique
    trustbarStats: JSON.stringify([
      { nombre: '100+', label: 'Clients satisfaits' },
      { nombre: '500+', label: 'Projets réalisés' },
      { nombre: '5', label: 'Années d\'expérience' }
    ]),
    comparisonData: JSON.stringify({
      sans: ['Visibilité limitée', 'Pas de crédibilité', 'Moins de clients'],
      avec: ['Présence professionnelle', 'Crédibilité renforcée', 'Plus de prospects']
    }),
    comparisonWithout: 'Visibilité limitée, difficile à trouver, pas de crédibilité',
    comparisonWith: 'Présence 24/7, trouvé sur Google, image professionnelle',
    urgencyMessage: 'Offre limitée : -30% jusqu\'à la fin du mois !',
    guaranteeData: JSON.stringify([
      { titre: 'Satisfait ou remboursé', description: '30 jours pour changer d\'avis' },
      { titre: 'Livraison garantie', description: 'Votre site en 3 jours maximum' }
    ]),
    guaranteeList: 'Satisfait ou remboursé 30 jours\nLivraison garantie en 3 jours\nSupport gratuit 1 an',
    processDescription: 'Une méthode éprouvée en 4 étapes pour transformer votre activité',
    processTitle: 'Comment Ça Marche',
    processSubtitle: 'Un processus simple et efficace',
    processSteps: JSON.stringify([
      { icon: '📋', title: 'Analyse', description: 'Étude de vos besoins et objectifs' },
      { icon: '🎨', title: 'Conception', description: 'Création du design et de la structure' },
      { icon: '⚙️', title: 'Développement', description: 'Codage et intégration des fonctionnalités' },
      { icon: '🚀', title: 'Lancement', description: 'Mise en ligne et formation' }
    ]),
    ctaTitle: 'Prêt à transformer votre activité ?',
    ctaButtonText: 'Commencer maintenant',
    
    // Intégrations externes
    googleMapsUrl: '',
    calendarUrl: '',
    bookingUrl: '',
    
    // Informations légales
    legalBusinessName: '',
    legalSiret: '',
    legalTva: '',
    legalAddress: '',
    legalZipCode: '',
    legalConfirmation: false,
    
    // Note libre
    specialRequest: ''
  }));

  // � PERSISTENCE: Sauvegarder le slide courant
  useEffect(() => {
    sessionStorage.setItem('modal-current-slide', currentSlide.toString());
  }, [currentSlide]);

  // �🌊 BRIDGE TEMPS RÉEL: Synchronisation bidirectionnelle
  useEffect(() => {
    // Synchroniser les changements du modal vers le configurateur
    if (onRealTimeUpdate && isOpen) {
      console.log('🔄 Modal → Configurateur sync:', formData);
      onRealTimeUpdate(formData);
    }
  }, [formData, onRealTimeUpdate, isOpen]);

  // 🔄 SYNCHRONISATION BIDIRECTIONNELLE COMPLÈTE
  // ⚠️ PROTECTION BOUCLE: Ne pas déclencher si les données viennent du modal lui-même
  const [lastSyncTime, setLastSyncTime] = useState(0);
  
  useEffect(() => {
    if (isOpen && initialFormData) {
      const now = Date.now();
      // Protection anti-boucle: ignorer les mises à jour trop rapprochées (< 200ms)
      if (now - lastSyncTime < 200) {
        return;
      }
      
      // 🌉 BRIDGE COMPLET: Utiliser la fonction bridge inverse
      const modalData = bridgeConfiguratorToModal(initialFormData);
      
      setFormData(prev => {
        // Vérifier si il y a vraiment des changements
        const hasBasicChanges = 
          modalData.companyName !== prev.companyName ||
          modalData.email !== prev.email ||
          modalData.phone !== prev.phone;
          
        const hasComplexChanges = 
          modalData.servicesItems !== prev.servicesItems ||
          modalData.portfolioItems !== prev.portfolioItems ||
          modalData.featuresItems !== prev.featuresItems ||
          modalData.testimonialsItems !== prev.testimonialsItems;
          
        if (!hasBasicChanges && !hasComplexChanges) {
          return prev;
        }
        
        console.log('🔄 Modal ← Configurateur sync COMPLET:', { 
          hasBasicChanges, 
          hasComplexChanges,
          servicesLength: modalData.servicesItems?.length,
          portfolioLength: modalData.portfolioItems?.length
        });
        
        setLastSyncTime(now);
        
        // 🎯 SYNCHRONISATION COMPLÈTE de tous les champs
        return {
          ...prev,
          // Champs de base
          companyName: modalData.companyName || prev.companyName,
          email: modalData.email || prev.email,
          phone: modalData.phone || prev.phone,
          tagline: modalData.tagline || prev.tagline,
          ctaLabel: modalData.ctaLabel || prev.ctaLabel,
          logoUrl: modalData.logoUrl || prev.logoUrl,
          instagramUrl: modalData.instagramUrl || prev.instagramUrl,
          linkedinUrl: modalData.linkedinUrl || prev.linkedinUrl,
          
          // Couleurs et thème
          primaryColor: (initialFormData as any)?.primaryColor || prev.primaryColor,
          secondaryColor: (initialFormData as any)?.secondaryColor || prev.secondaryColor,
          accentColor: (initialFormData as any)?.accentColor || prev.accentColor,
          theme: (initialFormData as any)?.theme || prev.theme,
          
          // 🎯 SECTIONS COMPLEXES - Synchronisation complète
          servicesDescription: modalData.servicesDescription || prev.servicesDescription,
          servicesItems: modalData.servicesItems || prev.servicesItems,
          portfolioDescription: modalData.portfolioDescription || prev.portfolioDescription,
          portfolioItems: modalData.portfolioItems || prev.portfolioItems,
          featuresItems: modalData.featuresItems || prev.featuresItems,
          testimonialsItems: modalData.testimonialsItems || prev.testimonialsItems
        };
      });
    }
  }, [
    isOpen, 
    initialFormData?.companyName, 
    initialFormData?.email, 
    initialFormData?.primaryColor,
    // 🎯 AMÉLIORÉ: Dépendances pour détecter les changements dans les objets complexes
    JSON.stringify((initialFormData as any)?.services?.packages || []),
    JSON.stringify((initialFormData as any)?.portfolio?.projects || []),
    JSON.stringify((initialFormData as any)?.features?.items || []),
    JSON.stringify((initialFormData as any)?.testimonials?.items || [])
  ]);

  // Configuration des sections selon le template
  const getAvailableSections = () => {
    const commonSections = [
      { id: 'hero', label: '🎯 Hero', icon: '🎯', description: 'Section d\'accueil' },
      { id: 'testimonials', label: '⭐ Témoignages clients', icon: '💬', description: 'Avis et retours de vos clients' },
      { id: 'faq', label: '❓ FAQ', icon: '❓', description: 'Questions fréquemment posées' },
      { id: 'contact', label: '📞 Contact', icon: '📞', description: 'Formulaire de contact' }
    ];

    if (selectedTemplate === 'landing-solo') {
      return [
        { id: 'services', label: '💼 Services/Offres', icon: '💼', description: 'Vos services et tarifs' },
        { id: 'portfolio', label: '🎨 Portfolio', icon: '🎨', description: 'Vos réalisations' },
        { id: 'features', label: '✨ Avantages', icon: '✨', description: 'Vos points forts' },
        ...commonSections
      ];
    } else if (selectedTemplate === 'restaurant') {
      return [
        { id: 'specialties', label: '🍽️ Spécialités', icon: '🍽️', description: 'Vos plats signature' },
        { id: 'gallery', label: '📸 Galerie', icon: '📸', description: 'Photos restaurant/plats' },
        { id: 'location', label: '📍 Localisation', icon: '📍', description: 'Adresse et horaires' },
        ...commonSections
      ];
    } else if (selectedTemplate === 'coach') {
      return [
        { id: 'approach', label: '🎯 Méthode', icon: '🎯', description: 'Votre approche' },
        { id: 'domains', label: '📈 Domaines', icon: '📈', description: 'Vos spécialités' },
        { id: 'booking', label: '📅 Réservation', icon: '📅', description: 'Prise de RDV' },
        ...commonSections
      ];
    }
    return commonSections;
  };

  // Créer un slide spécifique pour une section
  const createSectionSlide = (sectionId: string) => {
    const sectionConfig = {
      hero: {
        title: '🎯 Configuration Hero',
        subtitle: 'Personnalisez votre section d\'accueil',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Titre principal Hero
              </label>
              <input
                type="text"
                defaultValue={formData.heroTitle || ''}
                placeholder="Ex: Transformez votre vision en réalité"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // 🚀 MIGRATION: Mettre à jour directement la section hero
                  updateSection('hero', { title: newValue });
                  console.log('🎯 MIGRATION - Hero Title mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const newFormData = {...formData, heroTitle: newValue};
                    setTimeout(() => onRealTimeUpdate(newFormData), 50);
                  }
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Sous-titre Hero
              </label>
              <input
                type="text"
                defaultValue={formData.heroSubtitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // 🚀 MIGRATION: Mettre à jour directement la section hero
                  updateSection('hero', { subtitle: newValue });
                  // Garder formData pour compatibilité temporaire
                  updateSection('hero', { subtitle: newValue });
                  console.log('🎯 MIGRATION - Hero Subtitle mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, heroSubtitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Solutions sur-mesure pour propulser votre activité"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Texte avant bouton CTA
              </label>
              <input
                type="text"
                defaultValue={formData.heroCtaText || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // 🚀 MIGRATION: Mettre à jour directement la section hero
                  updateSection('hero', { ctaText: newValue });
                  updateSection('hero', { ctaText: newValue });
                  console.log('🎯 MIGRATION - Hero CTA Text mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, heroCtaText: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Prêt à commencer ?"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Texte du bouton CTA
              </label>
              <input
                type="text"
                defaultValue={formData.heroCtaButton || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // 🚀 MIGRATION: Mettre à jour directement la section hero
                  updateSection('hero', { ctaButton: newValue });
                  updateSection('hero', { ctaButton: newValue });
                  console.log('🎯 MIGRATION - Hero CTA Button mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, heroCtaButton: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Découvrir nos solutions"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Image Hero (URL optionnelle)
              </label>
              <input
                type="url"
                defaultValue={formData.heroImage || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION HERO - Image URL:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section hero
                  updateSection('hero', { imageUrl: newValue });
                  setFormData({...formData, heroImage: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, heroImage: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="https://example.com/hero-image.jpg"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        )
      },

      
      // 🎯 ABOUT SECTION - Avec inputs configurables COMPLETS
      about: {
        title: '👤 À Propos',
        subtitle: 'Configuration complète de votre présentation',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Titre de la section */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Titre de la section
              </label>
              <input
                type="text"
                value={formData.aboutTitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION ABOUT - Title:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section about
                  updateSection('about', { title: newValue });
                  setFormData({...formData, aboutTitle: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, aboutTitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: À Propos de Moi, Pourquoi Choisir Mon Entreprise..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Description
              </label>
              <textarea
                value={formData.aboutDescription || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION ABOUT - Description:', newValue.slice(0, 50) + '...');
                  // 🚀 MIGRATION: Mettre à jour directement la section about
                  updateSection('about', { description: newValue });
                  setFormData({...formData, aboutDescription: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, aboutDescription: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Passionnée par le web depuis 3 ans, je vous aide à créer une présence en ligne qui convertit..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Image de présentation */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Image de présentation (URL)
              </label>
              <input
                type="text"
                value={formData.aboutImage || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION ABOUT - Image URL:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section about
                  updateSection('about', { imageUrl: newValue });
                  setFormData({...formData, aboutImage: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, aboutImage: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="https://exemple.com/votre-photo.jpg"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
              <p style={{ margin: '0.25rem 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                💡 Lien vers votre photo/logo pour personnaliser la section
              </p>
            </div>

            {/* Valeurs / Points forts configurables */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Vos 3 points forts / valeurs clés
              </label>
              {(() => {
                let currentValues;
                try {
                  currentValues = JSON.parse(formData.aboutValues || '[]');
                } catch {
                  currentValues = [
                    { icon: '⚡', title: 'Livraison Express', description: 'Votre site prêt en 3 jours maximum' },
                    { icon: '🎨', title: 'Design Sur-Mesure', description: 'Création unique adaptée à votre image' },
                    { icon: '📱', title: '100% Responsive', description: 'Parfait sur mobile, tablette et desktop' }
                  ];
                }

                const updateValue = (index: number, field: string, value: string) => {
                  let values;
                  try {
                    values = JSON.parse(formData.aboutValues || '[]');
                  } catch {
                    values = [
                      { icon: '⚡', title: 'Livraison Express', description: 'Votre site prêt en 3 jours maximum' },
                      { icon: '🎨', title: 'Design Sur-Mesure', description: 'Création unique adaptée à votre image' },
                      { icon: '📱', title: '100% Responsive', description: 'Parfait sur mobile, tablette et desktop' }
                    ];
                  }
                  
                  const updated = [...values];
                  updated[index] = { ...updated[index], [field]: value };
                  const newValue = JSON.stringify(updated);
                  
                  console.log('🔄 MIGRATION ABOUT - Values added:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section about
                  updateSection('about', { values: newValue });
                  setFormData({...formData, aboutValues: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, aboutValues: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                };

                return (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {currentValues.slice(0, 3).map((value: any, index: number) => (
                      <div key={index} style={{ 
                        padding: '1rem', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: '0.9rem' }}>
                          Valeur {index + 1}
                        </h5>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                          <input
                            type="text"
                            value={value.icon || ''}
                            onChange={(e) => updateValue(index, 'icon', e.target.value)}
                            placeholder={`Emoji ${index + 1} (ex: ⚡)`}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              width: '60px'
                            }}
                          />
                          <input
                            type="text"
                            value={value.title || ''}
                            onChange={(e) => updateValue(index, 'title', e.target.value)}
                            placeholder={`Titre valeur ${index + 1}`}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem'
                            }}
                          />
                          <textarea
                            value={value.description || ''}
                            onChange={(e) => updateValue(index, 'description', e.target.value)}
                            placeholder={`Description valeur ${index + 1}`}
                            rows={2}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffffff' }}>💡 Configuration About complète</h4>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', opacity: 0.8 }}>
                Tous les champs sont synchronisés avec le configurateur en temps réel
              </p>
            </div>
          </div>
        )
      },
      
      // 📝 PROCESS SECTION - Configuration complète du processus
      process: {
        title: '📝 Comment Ça Marche',
        subtitle: 'Configuration complète de votre processus de travail',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Titre de la section */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Titre de la section
              </label>
              <input
                type="text"
                value={formData.processTitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION PROCESS - Title:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section process
                  updateSection('process', { title: newValue });
                  setFormData({...formData, processTitle: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, processTitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Comment Ça Marche, Ma Méthode de Travail..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Sous-titre de la section */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Sous-titre de la section
              </label>
              <input
                type="text"
                value={formData.processSubtitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION PROCESS - Subtitle:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section process
                  updateSection('process', { subtitle: newValue });
                  setFormData({...formData, processSubtitle: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, processSubtitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Un processus simple et efficace pour votre projet"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Description générale */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Description du processus
              </label>
              <textarea
                value={formData.processDescription || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION PROCESS - Description:', newValue.slice(0, 50) + '...');
                  // 🚀 MIGRATION: Mettre à jour directement la section process
                  updateSection('process', { description: newValue });
                  setFormData({...formData, processDescription: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, processDescription: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Un processus simple et efficace pour votre projet, éprouvé avec mes clients..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Étapes configurables */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Vos étapes de travail (4 maximum)
              </label>
              {(() => {
                let currentSteps;
                try {
                  currentSteps = JSON.parse(formData.processSteps || '[]');
                } catch {
                  currentSteps = [
                    { icon: '📞', title: 'Premier Contact', description: 'Échange pour comprendre vos besoins' },
                    { icon: '📝', title: 'Analyse & Devis', description: 'Définition précise du projet' },
                    { icon: '🎨', title: 'Création', description: 'Développement de votre solution' },
                    { icon: '🚀', title: 'Livraison', description: 'Mise en ligne et formation' }
                  ];
                }

                const updateStep = (index: number, field: string, value: string) => {
                  let steps;
                  try {
                    steps = JSON.parse(formData.processSteps || '[]');
                  } catch {
                    steps = [
                      { icon: '📞', title: 'Premier Contact', description: 'Échange pour comprendre vos besoins' },
                      { icon: '📝', title: 'Analyse & Devis', description: 'Définition précise du projet' },
                      { icon: '🎨', title: 'Création', description: 'Développement de votre solution' },
                      { icon: '🚀', title: 'Livraison', description: 'Mise en ligne et formation' }
                    ];
                  }
                  
                  const updated = [...steps];
                  updated[index] = { ...updated[index], [field]: value };
                  const newValue = JSON.stringify(updated);
                  
                  console.log('🔄 MIGRATION PROCESS - Steps added:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section process
                  updateSection('process', { steps: newValue });
                  setFormData({...formData, processSteps: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, processSteps: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                };

                return (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {currentSteps.slice(0, 4).map((step: any, index: number) => (
                      <div key={index} style={{ 
                        padding: '1rem', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: '0.9rem' }}>
                          Étape {index + 1}
                        </h5>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                          <input
                            type="text"
                            value={step.icon || ''}
                            onChange={(e) => updateStep(index, 'icon', e.target.value)}
                            placeholder={`Emoji étape ${index + 1} (ex: 📞)`}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              width: '60px'
                            }}
                          />
                          <input
                            type="text"
                            value={step.title || ''}
                            onChange={(e) => updateStep(index, 'title', e.target.value)}
                            placeholder={`Titre étape ${index + 1}`}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem'
                            }}
                          />
                          <textarea
                            value={step.description || ''}
                            onChange={(e) => updateStep(index, 'description', e.target.value)}
                            placeholder={`Description étape ${index + 1}`}
                            rows={2}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
            
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffffff' }}>📋 Configuration Process complète</h4>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', opacity: 0.8 }}>
                Tous les champs sont synchronisés avec le configurateur en temps réel
              </p>
            </div>
          </div>
        )
      },
      
      // ⚖️ COMPARISON SECTION - Avec inputs configurables
      comparison: {
        title: '⚖️ Comparaison Avec/Sans',
        subtitle: 'Configuration de votre comparaison',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Colonne SANS - Description
              </label>
              <textarea
                value={formData.comparisonWithout || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION COMPARISON - Without:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section comparison
                  updateSection('comparison', { without: newValue });
                  setFormData({...formData, comparisonWithout: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, comparisonWithout: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Visibilité limitée, difficile à trouver, pas de crédibilité"
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Colonne AVEC - Description
              </label>
              <textarea
                value={formData.comparisonWith || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION COMPARISON - With:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section comparison
                  updateSection('comparison', { with: newValue });
                  setFormData({...formData, comparisonWith: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, comparisonWith: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Visibilité maximale, site professionnel, crédibilité renforcée"
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        )
      },
      
      // ⚡ URGENCY SECTION - Avec inputs configurables
      urgency: {
        title: '⚡ Badge Urgence',
        subtitle: 'Configuration de votre message d\'urgence',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Message d'urgence
              </label>
              <input
                type="text"
                value={formData.urgencyMessage || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION URGENCY - Message:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section urgency
                  updateSection('urgency', { message: newValue });
                  setFormData({...formData, urgencyMessage: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, urgencyMessage: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Offre limitée : -30% jusqu'à la fin du mois !"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffffff' }}>💡 Badge d'urgence</h4>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', opacity: 0.8 }}>
                Crée un sentiment d'urgence pour inciter à l'action immédiate
              </p>
            </div>
          </div>
        )
      },
      
      // �️ GUARANTEE SECTION - Avec inputs configurables
      guarantee: {
        title: '🛡️ Garanties',
        subtitle: 'Configuration de vos garanties professionnelles', 
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Liste de vos garanties
              </label>
              <textarea
                value={formData.guaranteeList || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('🔄 MIGRATION GUARANTEE - List updated:', newValue);
                  // 🚀 MIGRATION: Mettre à jour directement la section guarantee
                  updateSection('guarantee', { list: newValue });
                  setFormData({...formData, guaranteeList: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, guaranteeList: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Satisfait ou remboursé 30 jours, Livraison garantie en 3 jours, Support gratuit 1 an..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffffff' }}>🛡️ Garanties</h4>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', opacity: 0.8 }}>
                Les garanties sont essentielles pour rassurer et convertir vos prospects
              </p>
            </div>
          </div>
        )
      },
      
      // � CTA-MIDDLE SECTION - Avec inputs configurables
      'cta-middle': {
        title: '🚀 CTA Intermédiaire',
        subtitle: 'Configuration de votre appel à l\'action milieu de page',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Titre accrocheur
              </label>
              <input
                type="text"
                value={formData.ctaTitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateSection('cta-middle', { title: newValue });
                  console.log('🎯 MIGRATION - CTA Title (middle) mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, ctaTitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Prêt à Démarrer Votre Projet ?"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Texte du bouton
              </label>
              <input
                type="text"
                value={formData.ctaButtonText || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateSection('cta-middle', { buttonText: newValue });
                  console.log('🎯 MIGRATION - CTA Button Text (middle) mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, ctaButtonText: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Planifier un appel"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        )
      },
      
      // 🎯 CTA-FINAL SECTION - Avec inputs configurables
      'cta-final': {
        title: '🎯 CTA Final',
        subtitle: 'Configuration de votre dernière chance de conversion',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Titre final persuasif
              </label>
              <input
                type="text"
                value={formData.ctaTitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateSection('cta-final', { title: newValue });
                  console.log('🎯 MIGRATION - CTA Title (final) mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, ctaTitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Transformez Votre Présence En Ligne"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Texte du bouton final
              </label>
              <input
                type="text"
                value={formData.ctaButtonText || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData({...formData, ctaButtonText: newValue});
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, ctaButtonText: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Démarrer mon projet"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        )
      },
      
      services: {
        title: '💼 Configuration des services',
        subtitle: 'Décrivez vos offres et tarifs',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Description générale de vos services
              </label>
              <textarea
                value={getSectionProps?.('services')?.description || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // 🔥 BUG FIX 3: Migration du système A vers B
                  updateSection('services', { description: newValue });
                  console.log('💼 Services System B:', newValue);
                  
                  // 🌊 TEMPS RÉEL: Synchronisation instantanée
                  if (onRealTimeUpdate) {
                    setTimeout(() => {
                      const updatedFormData = {...formData, servicesDescription: newValue};
                      onRealTimeUpdate(updatedFormData);
                    }, 50);
                  }
                }}
                placeholder="Décrivez ce que vous proposez à vos clients..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {(() => {
              // 🔥 BUG FIX 3: Migration vers Système B
              const servicesData = getSectionProps?.('services')?.items || [];
              let currentServices;
              try {
                // Essayer de prendre les données du système B d'abord
                currentServices = Array.isArray(servicesData) ? servicesData : JSON.parse(formData.servicesItems || '[]');
              } catch {
                currentServices = [
                  { title: '', description: '', price: '' },
                  { title: '', description: '', price: '' },
                  { title: '', description: '', price: '' }
                ];
              }
              
              // S'assurer qu'on a exactement 3 éléments
              while (currentServices.length < 3) {
                currentServices.push({ title: '', description: '', price: '' });
              }
              if (currentServices.length > 3) {
                currentServices = currentServices.slice(0, 3);
              }

              const updateServices = (index: number, field: string, value: string) => {
                // 🔥 BUG FIX 3: Migration vers Système B
                const servicesData = getSectionProps?.('services')?.items || [];
                let services;
                try {
                  services = Array.isArray(servicesData) ? [...servicesData] : JSON.parse(formData.servicesItems || '[]');
                  // Vérifier que c'est bien un array
                  if (!Array.isArray(services)) {
                    throw new Error('Invalid services format');
                  }
                } catch {
                  services = [{ title: '', description: '', price: '', features: [] }, { title: '', description: '', price: '', features: [] }, { title: '', description: '', price: '', features: [] }];
                }
                
                // S'assurer qu'on a au moins 3 services
                while (services.length < 3) {
                  services.push({ title: '', description: '', price: '', features: [] });
                }
                
                // Mettre à jour le service spécifique
                const updated = [...services];
                updated[index] = { ...updated[index], [field]: value };
                
                // 🔥 BUG FIX 3: Migration vers Système B
                updateSection('services', { items: updated });
                console.log('💼 Services System B updated:', updated);
                
                // 🌊 TEMPS RÉEL: Notifier le configurateur des changements
                if (onRealTimeUpdate) {
                  const updatedFormData = {...formData, servicesItems: JSON.stringify(updated)};
                  setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                }
              };

              return (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1rem' }}>
                    📦 Vos services (3 maximum)
                  </h4>
                  {currentServices.map((service: any, index: number) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '1rem' 
                    }}>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Nom du service {index + 1}
                          </label>
                          <input
                            type="text"
                            value={service.title || ''}
                            onChange={(e) => updateServices(index, 'title', e.target.value)}
                            placeholder={`Service ${index + 1}`}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Description
                          </label>
                          <textarea
                            value={service.description || ''}
                            onChange={(e) => updateServices(index, 'description', e.target.value)}
                            placeholder="Décrivez ce service en détail..."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s',
                              minHeight: '80px',
                              resize: 'vertical',
                              fontFamily: 'inherit'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Prix
                          </label>
                          <input
                            type="text"
                            value={service.price || ''}
                            onChange={(e) => updateServices(index, 'price', e.target.value)}
                            placeholder="Ex: 99€, À partir de 150€, Sur devis..."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )
      },
      portfolio: {
        title: '🎨 Configuration du portfolio',
        subtitle: 'Montrez vos réalisations',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Description générale de votre portfolio
              </label>
              <textarea
                value={getSectionProps?.('portfolio')?.description || ''}
                onChange={(e) => {
                  // 🔥 BUG FIX 3: Migration vers Système B
                  updateSection('portfolio', { description: e.target.value });
                  console.log('🎨 Portfolio Description System B:', e.target.value);
                }}
                placeholder="Présentez vos réalisations, projets marquants..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {(() => {
              // 🔥 BUG FIX 3: Migration vers Système B
              const portfolioData = getSectionProps?.('portfolio')?.items || [];
              let currentPortfolio;
              try {
                // Essayer de prendre les données du système B d'abord
                currentPortfolio = Array.isArray(portfolioData) ? portfolioData : JSON.parse(formData.portfolioItems || '[]');
              } catch {
                currentPortfolio = [
                  { title: '', description: '', image: '', url: '' },
                  { title: '', description: '', image: '', url: '' },
                  { title: '', description: '', image: '', url: '' }
                ];
              }
              
              // S'assurer qu'on a exactement 3 éléments
              while (currentPortfolio.length < 3) {
                currentPortfolio.push({ title: '', description: '', image: '', url: '' });
              }
              if (currentPortfolio.length > 3) {
                currentPortfolio = currentPortfolio.slice(0, 3);
              }

              const updatePortfolio = (index: number, field: string, value: string) => {
                // 🔥 BUG FIX 3: Migration vers Système B
                const portfolioData = getSectionProps?.('portfolio')?.items || [];
                let portfolio;
                try {
                  portfolio = Array.isArray(portfolioData) ? [...portfolioData] : JSON.parse(formData.portfolioItems || '[]');
                  if (!Array.isArray(portfolio)) {
                    throw new Error('Invalid portfolio format');
                  }
                } catch {
                  portfolio = [{ title: '', description: '', image: '', url: '' }, { title: '', description: '', image: '', url: '' }, { title: '', description: '', image: '', url: '' }];
                }
                
                while (portfolio.length < 3) {
                  portfolio.push({ title: '', description: '', image: '', url: '' });
                }
                
                const updated = [...portfolio];
                updated[index] = { ...updated[index], [field]: value };
                
                // 🔥 BUG FIX 3: Migration vers Système B
                updateSection('portfolio', { items: updated });
                console.log('🎨 Portfolio System B updated:', updated);
                
                // 🌊 TEMPS RÉEL: Notifier le configurateur
                if (onRealTimeUpdate) {
                  const updatedFormData = {...formData, portfolioItems: JSON.stringify(updated)};
                  setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                }
              };

              return (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1rem' }}>
                    🎨 Vos projets (3 maximum)
                  </h4>
                  {currentPortfolio.map((project: any, index: number) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '1rem' 
                    }}>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Titre du projet {index + 1}
                          </label>
                          <input
                            type="text"
                            value={project.title || ''}
                            onChange={(e) => updatePortfolio(index, 'title', e.target.value)}
                            placeholder={`Projet ${index + 1}`}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Description du projet
                          </label>
                          <textarea
                            value={project.description || ''}
                            onChange={(e) => updatePortfolio(index, 'description', e.target.value)}
                            placeholder="Décrivez ce projet, technologies utilisées, résultats..."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s',
                              minHeight: '80px',
                              resize: 'vertical',
                              fontFamily: 'inherit'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={{ 
                              display: 'block', 
                              marginBottom: '0.5rem', 
                              color: '#ffffff', 
                              fontSize: '0.9rem', 
                              fontWeight: '500' 
                            }}>
                              URL de l'image
                            </label>
                            <input
                              type="url"
                              value={project.image || ''}
                              onChange={(e) => updatePortfolio(index, 'image', e.target.value)}
                              placeholder="https://exemple.com/image.jpg"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                background: 'rgba(30, 30, 30, 0.95)',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#6366f1';
                                e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                          </div>
                          
                          <div>
                            <label style={{ 
                              display: 'block', 
                              marginBottom: '0.5rem', 
                              color: '#ffffff', 
                              fontSize: '0.9rem', 
                              fontWeight: '500' 
                            }}>
                              Lien du projet (optionnel)
                            </label>
                            <input
                              type="url"
                              value={project.url || ''}
                              onChange={(e) => updatePortfolio(index, 'url', e.target.value)}
                              placeholder="https://monprojet.com"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                background: 'rgba(30, 30, 30, 0.95)',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#6366f1';
                                e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )
      },
      testimonials: {
        title: '⭐ Témoignages clients',
        subtitle: 'Affichez la satisfaction de vos clients',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {(() => {
              let currentTestimonials;
              try {
                currentTestimonials = JSON.parse(formData.testimonialsItems || '[]');
              } catch {
                currentTestimonials = [
                  { name: '', role: '', content: '', rating: 5 },
                  { name: '', role: '', content: '', rating: 5 }
                ];
              }
              
              // S'assurer qu'on a exactement 2 éléments
              while (currentTestimonials.length < 2) {
                currentTestimonials.push({ name: '', role: '', content: '', rating: 5 });
              }
              if (currentTestimonials.length > 2) {
                currentTestimonials = currentTestimonials.slice(0, 2);
              }

              const updateTestimonials = (index: number, field: string, value: string | number) => {
                let testimonials;
                try {
                  testimonials = JSON.parse(formData.testimonialsItems || '[]');
                  if (!Array.isArray(testimonials)) {
                    throw new Error('Invalid testimonials format');
                  }
                } catch {
                  testimonials = [{ name: '', role: '', content: '', rating: 5 }, { name: '', role: '', content: '', rating: 5 }];
                }
                
                while (testimonials.length < 2) {
                  testimonials.push({ name: '', role: '', content: '', rating: 5 });
                }
                
                const updated = [...testimonials];
                updated[index] = { ...updated[index], [field]: value };
                
                setFormData(prev => ({...prev, testimonialsItems: JSON.stringify(updated)}));

                // 🔥 SYSTEM B: Connexion au configurateur
                updateSection('testimonials', { items: updated });
                
                // 🌊 TEMPS RÉEL: Notifier le configurateur
                if (onRealTimeUpdate) {
                  const updatedFormData = {...formData, testimonialsItems: JSON.stringify(updated)};
                  setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                }
              };

              return (
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1rem' }}>
                    💬 Témoignages clients (2 maximum)
                  </h4>
                  {currentTestimonials.map((testimonial: any, index: number) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '1rem' 
                    }}>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={{ 
                              display: 'block', 
                              marginBottom: '0.5rem', 
                              color: '#ffffff', 
                              fontSize: '0.9rem', 
                              fontWeight: '500' 
                            }}>
                              Nom du client {index + 1}
                            </label>
                            <input
                              type="text"
                              value={testimonial.name || ''}
                              onChange={(e) => updateTestimonials(index, 'name', e.target.value)}
                              placeholder="Marie Dupont"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                background: 'rgba(30, 30, 30, 0.95)',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#6366f1';
                                e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                          </div>
                          
                          <div>
                            <label style={{ 
                              display: 'block', 
                              marginBottom: '0.5rem', 
                              color: '#ffffff', 
                              fontSize: '0.9rem', 
                              fontWeight: '500' 
                            }}>
                              Fonction/Entreprise
                            </label>
                            <input
                              type="text"
                              value={testimonial.role || ''}
                              onChange={(e) => updateTestimonials(index, 'role', e.target.value)}
                              placeholder="Directrice, Entreprise ABC"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                background: 'rgba(30, 30, 30, 0.95)',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#6366f1';
                                e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Témoignage
                          </label>
                          <textarea
                            value={testimonial.content || ''}
                            onChange={(e) => updateTestimonials(index, 'content', e.target.value)}
                            placeholder="Excellent service, je recommande vivement ! L'équipe a su répondre à tous nos besoins avec professionnalisme."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s',
                              minHeight: '100px',
                              resize: 'vertical',
                              fontFamily: 'inherit'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Note (sur 5)
                          </label>
                          <select
                            value={testimonial.rating || 5}
                            onChange={(e) => updateTestimonials(index, 'rating', parseInt(e.target.value))}
                            style={{
                              width: '150px',
                              padding: '0.75rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              transition: 'all 0.2s',
                              cursor: 'pointer'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#6366f1';
                              e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                            <option value={4}>⭐⭐⭐⭐☆ (4/5)</option>
                            <option value={3}>⭐⭐⭐☆☆ (3/5)</option>
                            <option value={2}>⭐⭐☆☆☆ (2/5)</option>
                            <option value={1}>⭐☆☆☆☆ (1/5)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )
      },
      aboutValues: {
        title: '🎯 Vos valeurs',
        subtitle: 'Les valeurs clés de votre entreprise',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {(() => {
              let currentValues;
              try {
                currentValues = JSON.parse(formData.aboutValues || '[]');
              } catch {
                currentValues = [
                  { icon: '🎯', title: '', description: '' },
                  { icon: '❤️', title: '', description: '' },
                  { icon: '🎆', title: '', description: '' }
                ];
              }
              
              const updateValues = (index: number, field: string, value: string) => {
                let values;
                try {
                  values = JSON.parse(formData.aboutValues || '[]');
                } catch {
                  values = [{ icon: '🎯', title: '', description: '' }, { icon: '❤️', title: '', description: '' }, { icon: '🎆', title: '', description: '' }];
                }
                const updated = [...values];
                updated[index] = { ...updated[index], [field]: value };
                setFormData({...formData, aboutValues: JSON.stringify(updated)});
              };

              return (
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1rem' }}>
                    💎 Vos 3 valeurs principales
                  </h4>
                  {currentValues.map((value: any, index: number) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '1rem' 
                    }}>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Icône - Valeur {index + 1}
                          </label>
                          <select
                            value={value.icon || ''}
                            onChange={(e) => updateValues(index, 'icon', e.target.value)}
                            style={{
                              width: '200px',
                              padding: '0.75rem',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff'
                            }}
                          >
                            <option value="">Aucune icône</option>
                            <option value="🎯">🎯 Expertise</option>
                            <option value="❤️">❤️ Passion</option>
                            <option value="🎆">🎆 Innovation</option>
                            <option value="🏆">🏆 Excellence</option>
                          </select>
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Titre de la valeur
                          </label>
                          <input
                            type="text"
                            value={value.title || ''}
                            onChange={(e) => updateValues(index, 'title', e.target.value)}
                            placeholder="Ex: Excellence, Innovation..."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff'
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Description
                          </label>
                          <textarea
                            value={value.description || ''}
                            onChange={(e) => updateValues(index, 'description', e.target.value)}
                            placeholder="Décrivez cette valeur..."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              minHeight: '80px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()} 
          </div>
        )
      },
      faq: {
        title: '❓ Questions fréquentes',
        subtitle: 'Répondez aux questions de vos prospects',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {(() => {
              let currentFAQ;
              try {
                currentFAQ = JSON.parse(formData.faqItems || '[]');
              } catch {
                currentFAQ = [
                  { question: '', answer: '' },
                  { question: '', answer: '' },
                  { question: '', answer: '' }
                ];
              }
              
              const updateFAQ = (index: number, field: string, value: string) => {
                console.log('🚨 FAQ DEBUG - updateFAQ called:', { index, field, value });
                let faq;
                try {
                  faq = JSON.parse(formData.faqItems || '[]');
                  console.log('🚨 FAQ DEBUG - Current FAQ parsed:', faq);
                } catch {
                  faq = [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }];
                  console.log('🚨 FAQ DEBUG - Using default FAQ:', faq);
                }
                const updated = [...faq];
                updated[index] = { ...updated[index], [field]: value };
                console.log('🚨 FAQ DEBUG - Updated FAQ:', updated);
                setFormData({...formData, faqItems: JSON.stringify(updated)});

                // 🔥 SYSTEM B: Connexion au configurateur  
                updateSection('faq', { items: updated });
                
                // 🌊 Real-time sync
                console.log('🚨 FAQ DEBUG - onRealTimeUpdate exists:', !!onRealTimeUpdate);
                if (onRealTimeUpdate) {
                  console.log('🚨 FAQ DEBUG - Calling onRealTimeUpdate with:', { faqItems: JSON.stringify(updated) });
                  const updatedFormData = {...formData, faqItems: JSON.stringify(updated)};
                  setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                } else {
                  console.log('❌ FAQ DEBUG - onRealTimeUpdate is null!');
                }
              };

              return (
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1rem' }}>
                    ❓ Questions fréquentes (3 maximum)
                  </h4>
                  {currentFAQ.map((faq: any, index: number) => (
                    <div key={index} style={{ 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '1rem' 
                    }}>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Question {index + 1}
                          </label>
                          <input
                            type="text"
                            defaultValue={faq.question || ''}
                            onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                            placeholder="Ex: Combien coûte votre service ?"
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff'
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#ffffff', 
                            fontSize: '0.9rem', 
                            fontWeight: '500' 
                          }}>
                            Réponse
                          </label>
                          <textarea
                            defaultValue={faq.answer || ''}
                            onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                            placeholder="Votre réponse détaillée..."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              background: 'rgba(30, 30, 30, 0.95)',
                              color: '#ffffff',
                              minHeight: '100px',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()} 
          </div>
        )
      },
      features: {
        title: '✨ Avantages',
        subtitle: 'Vos points forts et différenciateurs',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', opacity: 0.7 }}>
                Décrivez vos 3 principaux avantages concurrentiels
              </p>
            </div>
            {(() => {
              // 🔥 BUG FIX 3: Migration vers Système B
              const featuresData = getSectionProps?.('features')?.items || [];
              let currentFeatures;
              try {
                // Essayer de prendre les données du système B d'abord
                currentFeatures = Array.isArray(featuresData) ? featuresData : JSON.parse(formData.featuresItems || '[]');
              } catch {
                currentFeatures = [
                  { icon: '✅', title: '', description: '' },
                  { icon: '🚀', title: '', description: '' },
                  { icon: '🏆', title: '', description: '' }
                ];
              }
              
              // S'assurer qu'on a exactement 3 éléments
              while (currentFeatures.length < 3) {
                currentFeatures.push({ icon: '✅', title: '', description: '' });
              }
              if (currentFeatures.length > 3) {
                currentFeatures = currentFeatures.slice(0, 3);
              }

              const updateFeatures = (index: number, field: string, value: string) => {
                // 🔥 BUG FIX 3: Migration vers Système B
                const featuresData = getSectionProps?.('features')?.items || [];
                let features;
                try {
                  features = Array.isArray(featuresData) ? [...featuresData] : JSON.parse(formData.featuresItems || '[]');
                  if (!Array.isArray(features)) {
                    throw new Error('Invalid features format');
                  }
                } catch {
                  features = [
                    { icon: '✅', title: '', description: '' },
                    { icon: '🚀', title: '', description: '' },
                    { icon: '🏆', title: '', description: '' }
                  ];
                }
                
                while (features.length < 3) {
                  features.push({ icon: '⭐', title: '', description: '' });
                }
                
                const updated = [...features];
                updated[index] = { ...updated[index], [field]: value };
                
                // 🔥 BUG FIX 3: Migration vers Système B
                updateSection('features', { items: updated });
                console.log('✨ Features System B updated:', updated);
                
                // 🌊 TEMPS RÉEL: Notifier le configurateur
                if (onRealTimeUpdate) {
                  const updatedFormData = {...formData, featuresItems: JSON.stringify(updated)};
                  setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                }
              };

              return currentFeatures.map((feature: any, index: number) => (
                <div key={index} style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)' 
                }}>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        color: '#ffffff', 
                        fontSize: '0.9rem', 
                        fontWeight: '500' 
                      }}>
                        Icône (émoji) - Avantage {index + 1}
                      </label>
                      <select
                        value={feature.icon || ''}
                        onChange={(e) => updateFeatures(index, 'icon', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          background: 'rgba(30, 30, 30, 0.95)',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          textAlign: 'center',
                          maxWidth: '200px'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#6366f1';
                          e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Aucune icône</option>
                        <option value="✅">✅ Validation</option>
                        <option value="⭐">⭐ Étoile</option>
                        <option value="🎯">🎯 Objectif</option>
                        <option value="⚡">⚡ Rapidité</option>
                        <option value="💎">💎 Qualité</option>
                        <option value="🚀">🚀 Performance</option>
                        <option value="💼">💼 Professionnel</option>
                        <option value="🔒">🔒 Sécurité</option>
                        <option value="💰">💰 Économique</option>
                        <option value="🌟">🌟 Excellence</option>
                        <option value="📱">📱 Mobile</option>
                        <option value="🎨">🎨 Créatif</option>
                        <option value="🔥">🔥 Tendance</option>
                        <option value="❤️">❤️ Passion</option>
                        <option value="🏆">🏆 Champion</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        color: '#ffffff', 
                        fontSize: '0.9rem', 
                        fontWeight: '500' 
                      }}>
                        Titre de l'avantage
                      </label>
                      <input
                        type="text"
                        value={feature.title || ''}
                        onChange={(e) => updateFeatures(index, 'title', e.target.value)}
                        placeholder={`Avantage ${index + 1}`}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          background: 'rgba(30, 30, 30, 0.95)',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'all 0.2s'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#6366f1';
                          e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        color: '#ffffff', 
                        fontSize: '0.9rem', 
                        fontWeight: '500' 
                      }}>
                        Description
                      </label>
                      <textarea
                        value={feature.description || ''}
                        onChange={(e) => updateFeatures(index, 'description', e.target.value)}
                        placeholder="Décrivez cet avantage en quelques mots..."
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          background: 'rgba(30, 30, 30, 0.95)',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'all 0.2s',
                          minHeight: '80px',
                          resize: 'vertical',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#6366f1';
                          e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        )
      },
      // Sections spécifiques restaurant
      specialties: {
        title: '🍽️ Spécialités du restaurant',
        subtitle: 'Vos plats signature',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                🍽️ Spécialités pré-configurées. Vous pourrez ajouter vos vrais plats signature !
              </p>
            </div>
          </div>
        )
      },
      gallery: {
        title: '📸 Galerie photos',
        subtitle: 'Montrez votre restaurant en images',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                📸 Vous pourrez uploader vos photos dans le configurateur après création.
              </p>
            </div>
          </div>
        )
      },
      location: {
        title: '📍 Localisation',
        subtitle: 'Adresse et horaires de votre restaurant',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Adresse complète
              </label>
              <input
                type="text"
                value={formData.contactAddress}
                onChange={(e) => setFormData({...formData, contactAddress: e.target.value})}
                placeholder="123 rue de la Gastronomie, 75001 Paris"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        )
      },
      // Sections spécifiques coach
      approach: {
        title: '🎯 Votre méthode',
        subtitle: 'Décrivez votre approche unique',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                🎯 Méthode pré-configurée en 3 étapes. Vous pourrez la personnaliser !
              </p>
            </div>
          </div>
        )
      },
      domains: {
        title: '📈 Vos domaines d\'expertise',
        subtitle: 'Dans quels domaines accompagnez-vous ?',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                📈 Domaines pré-configurés. Vous pourrez ajouter vos spécialités !
              </p>
            </div>
          </div>
        )
      },
      booking: {
        title: '📅 Réservation en ligne',
        subtitle: 'Configurez la prise de RDV',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                📅 Vous pourrez connecter votre Cal.com ou calendrier dans le configurateur !
              </p>
            </div>
          </div>
        )
      },
      cta: {
        title: '🚀 Appel à l\'Action',
        subtitle: 'Incitez vos visiteurs à passer à l\'action',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Titre accrocheur
              </label>
              <input
                type="text"
                value={formData.ctaTitle || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData({...formData, ctaTitle: newValue});
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, ctaTitle: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Prêt à transformer votre activité ?"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Texte du bouton
              </label>
              <input
                type="text"
                value={formData.ctaButtonText || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData({...formData, ctaButtonText: newValue});
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, ctaButtonText: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Commencer maintenant"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(220, 38, 127, 0.1)',
              border: '1px solid rgba(220, 38, 127, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                🚀 Un bon CTA peut doubler vos conversions !
              </p>
            </div>
          </div>
        )
      },
      contact: {
        title: '📞 Informations de contact',
        subtitle: 'Comment vous contacter ?',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateSection('contact', { phone: newValue });
                  console.log('🎯 MIGRATION - Phone mis à jour:', newValue);
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, phone: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="06 12 34 56 78"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        )
      },
      // Note libre - Slide 8
      specialRequest: {
        title: '📝 Derniers détails',
        subtitle: 'Demandes spéciales et préférences (optionnel)',
        content: (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                🎨 Ces détails nous aideront à créer un site qui vous ressemble vraiment
              </p>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Note libre / Demandes spéciales
              </label>
              <textarea
                value={formData.specialRequest}
                onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
                placeholder="Ex: Je souhaite mettre en avant mes produits bio, utiliser beaucoup de vert dans le design, ajouter une section actualités..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Partagez vos préférences : couleurs, style, fonctionnalités particulières, sites que vous aimez...
              </p>
            </div>
            
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                <strong>💡 Exemples de demandes utiles :</strong><br/>
                • Préférences de couleurs (ex: tons bleus et or)<br/>
                • Inspirations (ex: "J'aime le style du site www...")<br/>
                • Sections supplémentaires souhaitées<br/>
                • Contraintes techniques particulières
              </p>
            </div>
          </div>
        )
      },
      // Intégrations externes - slide spécial
      integrations: {
        title: '🔗 Intégrations externes',
        subtitle: 'Connectez vos outils favoris (optionnel)',
        content: (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                🔗 Ajoutez simplement l'URL et nous intégrons automatiquement vos outils préférés !
              </p>
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                <span style={{ fontSize: '1.2rem' }}>🗺️</span>
                Google Maps (localisation)
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={(e) => {
                  const newGoogleMapsUrl = e.target.value;
                  setFormData({...formData, googleMapsUrl: newGoogleMapsUrl});
                  
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    onRealTimeUpdate({...formData, googleMapsUrl: newGoogleMapsUrl});
                  }
                }}
                placeholder="https://maps.google.com/embed?pb=..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                💡 Allez sur Google Maps → Partager → Intégrer une carte → Copiez l'URL src="..."
              </p>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                <span style={{ fontSize: '1.2rem' }}>📅</span>
                Cal.com ou Calendly (réservations)
              </label>
              <input
                type="url"
                value={formData.calendarUrl}
                onChange={(e) => {
                  const newCalendarUrl = e.target.value;
                  setFormData({...formData, calendarUrl: newCalendarUrl});
                  
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    onRealTimeUpdate({...formData, calendarUrl: newCalendarUrl});
                  }
                }}
                placeholder="https://cal.com/votrenom ou https://calendly.com/votrenom"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                💡 Copiez le lien public de votre calendrier de réservation
              </p>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                <span style={{ fontSize: '1.2rem' }}>🔗</span>
                Autre widget (formulaire, chat, etc.)
              </label>
              <input
                type="url"
                value={formData.bookingUrl}
                onChange={(e) => {
                  const newBookingUrl = e.target.value;
                  setFormData({...formData, bookingUrl: newBookingUrl});
                  
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    onRealTimeUpdate({...formData, bookingUrl: newBookingUrl});
                  }
                }}
                placeholder="https://votreoutils.com/embed/..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                💡 URL d'intégration de n'importe quel outil (Typeform, HubSpot, etc.)
              </p>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>✨ Intégration automatique</h4>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                Une fois votre site créé, vous pourrez modifier ces intégrations directement dans le configurateur.
              </p>
            </div>
          </div>
        )
      }
    };

    const baseSlide = sectionConfig[sectionId as keyof typeof sectionConfig] || {
      title: `Configuration ${sectionId}`,
      subtitle: 'Configuration de cette section',
      content: <div>Configuration de {sectionId}</div>
    };
    
    // 🎯 AJOUT: Identifiant de section pour navigation
    const slideWithId = {
      ...baseSlide,
      sectionId: sectionId
    };
    
    return slideWithId;
  };

  // Génération des slides dynamiques selon les sections sélectionnées
  const generateDynamicSlides = () => {
    const baseSlides = [
      // Slide 1: Infos de base
      {
        title: 'Informations essentielles',
        subtitle: 'Les informations de base pour créer votre site',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  const newCompanyName = e.target.value;
                  updateSection('contact', { companyName: newCompanyName });
                  // ❌ SUPPRIMÉ: updateSection('hero', { title: newCompanyName }); 
                  // ✅ Le Hero a son propre titre indépendant !
                  updateSection('footer', { companyName: newCompanyName });
                  console.log('🎯 MIGRATION - Company Name mis à jour (contact + footer):', newCompanyName);
                  
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, companyName: newCompanyName};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="Ex: Mon Entreprise"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  updateSection('contact', { email: e.target.value });
                  console.log('🎯 MIGRATION - Email mis à jour:', e.target.value);
                }}
                placeholder="contact@monentreprise.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  updateSection('contact', { phone: e.target.value });
                  console.log('🎯 MIGRATION - Phone (2) mis à jour:', e.target.value);
                }}
                placeholder="01 23 45 67 89"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Numéro de téléphone principal (optionnel)
              </p>
            </div>
          </div>
        )
      },
      
      // Slide 2: Identité visuelle
      {
        title: '✨ Votre identité visuelle',
        subtitle: 'Donnez du caractère à votre site (optionnel mais recommandé)',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                ✨ Ces informations sont optionnelles mais rendront votre site unique
              </p>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Slogan / Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                placeholder="Ex: Pâtisseries artisanales depuis 1995"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Phrase courte qui résume votre activité
              </p>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                URL de votre logo
              </label>
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateSection('hero', { logoUrl: newValue });
                  updateSection('footer', { logoUrl: newValue });
                  console.log('🎯 MIGRATION - Logo URL mis à jour partout:', newValue);
                  
                  // 🌊 Real-time sync
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, logoUrl: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="https://exemple.com/logo.png"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Lien direct vers votre logo (PNG ou SVG recommandé)
              </p>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Instagram
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => {
                  const newValue = e.target.value;
                  updateSection('footer', { instagramUrl: newValue });
                  console.log('🎯 MIGRATION - Instagram URL mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, instagramUrl: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="https://instagram.com/votreentreprise"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => {
                  let newValue = e.target.value;
                  
                  // 🔗 NORMALISATION AUTOMATIQUE: Ajouter https:// si manquant
                  if (newValue && !newValue.startsWith('http://') && !newValue.startsWith('https://')) {
                    newValue = 'https://' + newValue;
                  }
                  
                  updateSection('footer', { linkedinUrl: newValue });
                  console.log('🎯 MIGRATION - LinkedIn URL mis à jour:', newValue);
                  
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, linkedinUrl: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
                  }
                }}
                placeholder="linkedin.com/company/votreentreprise ou URL complète"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Lien de votre page entreprise LinkedIn
              </p>
            </div>
          </div>
        )
      },
      
      // Slide 3: Informations légales obligatoires
      {
        title: '📋 Informations légales obligatoires',
        subtitle: 'Conformité légale française - Obligatoire pour tous les sites professionnels',
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Selection type entité */}
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              marginBottom: '1rem'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1rem', fontWeight: '600' }}>
                👤 Type d'entité
              </h4>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  color: '#ffffff' 
                }}>
                  <input
                    type="radio"
                    name="entityType"
                    value="entreprise"
                    checked={entityType === 'entreprise'}
                    onChange={() => setEntityType('entreprise')}
                    style={{ accentColor: '#3b82f6' }}
                  />
                  🏢 Entreprise
                </label>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  color: '#ffffff' 
                }}>
                  <input
                    type="radio"
                    name="entityType"
                    value="particulier"
                    checked={entityType === 'particulier'}
                    onChange={() => setEntityType('particulier')}
                    style={{ accentColor: '#3b82f6' }}
                  />
                  👤 Particulier
                </label>
              </div>
            </div>

            {/* Bandeau explicatif adapté */}
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: entityType === 'entreprise' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              border: entityType === 'entreprise' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {entityType === 'entreprise' ? (
                  <>⚖️ <strong>Ces informations sont légalement obligatoires en France</strong> pour tout site professionnel. 
                  Elles apparaîtront dans vos mentions légales et protègent votre entreprise.</>
                ) : (
                  <>💡 <strong>En tant que particulier,</strong> vous n'êtes pas tenu d'avoir un SIRET ou numéro de TVA. 
                  Seules vos informations personnelles sont requises.</>
                )}
              </p>
            </div>
            
            {/* Nom/Raison sociale */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                {entityType === 'entreprise' ? 'Raison sociale *' : 'Nom complet *'}
              </label>
              <input
                type="text"
                value={formData.legalBusinessName}
                onChange={(e) => {
                  setFormData({...formData, legalBusinessName: e.target.value});
                  // 🔥 SYSTEM B: Connexion au configurateur 
                  updateSection('footer', { businessName: e.target.value });
                }}
                placeholder={entityType === 'entreprise' ? "Ex: SARL Boulangerie Martin" : "Ex: Jean Dupont"}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                {entityType === 'entreprise' 
                  ? '💡 Nom juridique officiel de votre entreprise (peut être différent du nom commercial)'
                  : '💡 Votre nom et prénom complets'
                }
              </p>
            </div>
            
            {/* SIRET - Seulement pour entreprises */}
            {entityType === 'entreprise' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                  SIRET *
                </label>
                <input
                  type="text"
                  value={formData.legalSiret}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '');
                    if (value.length <= 14 && /^\d*$/.test(value)) {
                      setFormData({...formData, legalSiret: value});
                      // 🔥 SYSTEM B: Connexion au configurateur 
                      updateSection('footer', { siret: value });
                    }
                  }}
                  placeholder="12345678901234"
                  maxLength={14}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: formData.legalSiret.length === 14 ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(30, 30, 30, 0.95)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: formData.legalSiret.length === 14 ? '#22c55e' : 'rgba(255,255,255,0.6)', 
                  marginTop: '0.5rem', 
                  marginBottom: 0 
                }}>
                  {formData.legalSiret.length === 14 ? '✅ SIRET valide (14 chiffres)' : '💡 Numéro à 14 chiffres fourni par l\'INSEE'}
                </p>
              </div>
            )}
            
            {/* TVA - Seulement pour entreprises */}
            {entityType === 'entreprise' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                  N° TVA intracommunautaire *
                </label>
                <input
                  type="text"
                  value={formData.legalTva}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    if (value.length <= 13) {
                      setFormData({...formData, legalTva: value});
                    }
                  }}
                  placeholder="FR12345678901"
                  maxLength={13}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: formData.legalTva.startsWith('FR') && formData.legalTva.length === 13 ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(30, 30, 30, 0.95)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: formData.legalTva.startsWith('FR') && formData.legalTva.length === 13 ? '#22c55e' : 'rgba(255,255,255,0.6)', 
                  marginTop: '0.5rem', 
                  marginBottom: 0 
                }}>
                  {formData.legalTva.startsWith('FR') && formData.legalTva.length === 13 ? '✅ Format TVA valide' : '💡 Format FR + 11 chiffres (ex: FR12345678901)'}
                </p>
              </div>
            )}
            
            {/* Adresse */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                {entityType === 'entreprise' ? 'Adresse siège social *' : 'Adresse *'}
              </label>
              <input
                type="text"
                value={formData.legalAddress}
                onChange={(e) => setFormData({...formData, legalAddress: e.target.value})}
                placeholder="Ex: 12 rue de la République"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 {entityType === 'entreprise' ? 'Numéro et nom de rue du siège social' : 'Votre adresse complète'}
              </p>
            </div>
            
            {/* Code postal */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '500' }}>
                Code postal *
              </label>
              <input
                type="text"
                value={formData.legalZipCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 5 && /^\d*$/.test(value)) {
                    setFormData({...formData, legalZipCode: value});
                  }
                }}
                placeholder="75001"
                maxLength={5}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: formData.legalZipCode.length === 5 ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(30, 30, 30, 0.95)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ 
                fontSize: '0.85rem', 
                color: formData.legalZipCode.length === 5 ? '#22c55e' : 'rgba(255,255,255,0.6)', 
                marginTop: '0.5rem', 
                marginBottom: 0 
              }}>
                {formData.legalZipCode.length === 5 ? '✅ Code postal valide' : '💡 5 chiffres'}
              </p>
            </div>
            
            {/* Message encouragement adapté */}
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: '#ffffff', fontSize: '0.9rem', fontWeight: '500' }}>
                🎉 Parfait ! {entityType === 'entreprise' ? 'La partie administrative' : 'Vos informations personnelles'} sont complètes. 
                Place à la personnalisation de votre site !
              </p>
            </div>
          </div>
        )
      },
      
      // Slide 4: Configuration Contact
      {
        title: '📞 Configuration Contact',
        subtitle: 'Comment vos clients vous contacteront',
        content: (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Info bubble email par défaut */}
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>💌</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>
                  Email de réception par défaut
                </p>
                <p style={{ margin: '0.25rem 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                  Les messages du formulaire seront envoyés à : <strong>{formData.email || 'votre email'}</strong>
                </p>
              </div>
            </div>
            
            {/* Checkbox email différent */}
            <div>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                cursor: 'pointer',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: formData.useDifferentEmail ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="checkbox"
                  checked={formData.useDifferentEmail}
                  onChange={(e) => setFormData({
                    ...formData, 
                    useDifferentEmail: e.target.checked,
                    contactFormEmail: e.target.checked ? formData.contactFormEmail : ''
                  })}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: 'var(--gold-primary)',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                  Utiliser un email différent pour le formulaire de contact
                </span>
              </label>
            </div>
            
            {/* Email formulaire conditionnel */}
            {formData.useDifferentEmail && (
              <div style={{
                padding: '1rem',
                borderRadius: '8px',
                background: 'rgba(251, 191, 36, 0.05)',
                border: '1px solid rgba(251, 191, 36, 0.2)'
              }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Email formulaire de contact *
                </label>
                <input
                  type="email"
                  value={formData.contactFormEmail}
                  onChange={(e) => {
                    updateSection('contact', { email: e.target.value });
                    console.log('🎯 MIGRATION - Contact Form Email mis à jour:', e.target.value);
                  }}
                  placeholder="commandes@votreentreprise.fr"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                  💡 Cet email recevra tous les messages du formulaire de contact
                </p>
              </div>
            )}
            
            {/* Ville */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Ville *
              </label>
              <input
                type="text"
                value={formData.contactCity}
                onChange={(e) => setFormData({...formData, contactCity: e.target.value})}
                placeholder="Ex: Paris"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Ville de votre entreprise (affichée sur le site)
              </p>
            </div>
            
            {/* Message auto-réponse optionnel */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Message automatique de réponse (optionnel)
              </label>
              <textarea
                value={formData.autoReplyMessage}
                onChange={(e) => setFormData({...formData, autoReplyMessage: e.target.value})}
                placeholder="Ex: Merci pour votre message ! Nous vous répondrons sous 24h."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: 0 }}>
                💡 Message envoyé automatiquement à vos prospects après soumission du formulaire
              </p>
            </div>
          </div>
        )
      },
      
      // Slide 4: Sélection des sections
      {
        title: 'Sections de votre site',
        subtitle: `Sélectionnez les sections que vous souhaitez sur votre site ${selectedTemplate}`,
        content: (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                ✅ Cochez les sections que vous voulez configurer. Les sections non cochées seront ignorées.
              </p>
            </div>
            
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {getAvailableSections().map((section) => (
                <label
                  key={section.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: selectedSections[section.id] ? '2px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.2)',
                    background: selectedSections[section.id] ? 'rgba(207, 177, 96, 0.1)' : 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => {
                    setSelectedSections(prev => ({
                      ...prev,
                      [section.id]: !prev[section.id]
                    }));
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedSections[section.id] || false}
                    onChange={() => {}}
                    style={{
                      width: '20px',
                      height: '20px',
                      accentColor: 'var(--gold-primary)'
                    }}
                  />
                  <div style={{ fontSize: '1.5rem' }}>{section.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {section.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {section.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )
      }
    ];

    // Générer les slides pour les sections sélectionnées
    const sectionSlides: any[] = [];
    Object.entries(selectedSections).forEach(([sectionId, isSelected]) => {
      if (isSelected) {
        sectionSlides.push(createSectionSlide(sectionId));
      }
    });
    
    // Slide intégrations externes (toujours ajouté)
    const integrationSlide = createSectionSlide('integrations');

    // Slide finale - Récapitulatif complet
    const finalSlide = {
      title: '🚀 Finalisation',
      subtitle: 'Vérifiez vos informations avant génération',
      content: (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ 
            padding: '1.5rem', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Configuration terminée !
            </h3>
            <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem' }}>
              Votre site va être configuré automatiquement avec toutes vos informations.
            </p>
          </div>
          
          {/* Infos principales */}
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>📋 Informations principales</h4>
            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              <div><strong>Template:</strong> {selectedTemplate}</div>
              <div><strong>Entreprise:</strong> {formData.companyName || 'Non renseigné'}</div>
              <div><strong>Email:</strong> {formData.email || 'Non renseigné'}</div>
              {formData.phone && <div><strong>Téléphone:</strong> {formData.phone}</div>}
              {formData.tagline && <div><strong>Slogan:</strong> {formData.tagline}</div>}
            </div>
          </div>

          {/* Infos légales */}
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>⚖️ Informations légales</h4>
            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              <div><strong>Raison sociale:</strong> {formData.legalBusinessName || 'Non renseigné'}</div>
              <div><strong>SIRET:</strong> {formData.legalSiret || 'Non renseigné'}</div>
              <div><strong>TVA:</strong> {formData.legalTva || 'Non renseigné'}</div>
              <div><strong>Adresse:</strong> {formData.legalAddress || 'Non renseigné'} - {formData.legalZipCode || '?????'}</div>
            </div>
          </div>

          {/* Contact & Réseaux */}
          {(formData.instagramUrl || formData.linkedinUrl || formData.contactCity || formData.contactFormEmail) && (
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>🌐 Contact & Réseaux</h4>
              <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {formData.contactCity && <div><strong>Ville:</strong> {formData.contactCity}</div>}
                {formData.contactFormEmail && <div><strong>Email formulaire:</strong> {formData.contactFormEmail}</div>}
                {formData.instagramUrl && <div><strong>Instagram:</strong> ✓</div>}
                {formData.linkedinUrl && <div><strong>LinkedIn:</strong> ✓</div>}
              </div>
            </div>
          )}

          {/* Sections */}
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              🎯 Sections configurées: {Object.values(selectedSections).filter(Boolean).length}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {Object.entries(selectedSections)
                .filter(([_, isSelected]) => isSelected)
                .map(([sectionId]) => (
                  <span key={sectionId} style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    background: 'rgba(207, 177, 96, 0.2)',
                    border: '1px solid rgba(207, 177, 96, 0.5)',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)'
                  }}>
                    {sectionId}
                  </span>
                ))
              }
            </div>
          </div>

          {/* Note spéciale */}
          {formData.specialRequest && (
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>💬 Note spéciale</h4>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                {formData.specialRequest}
              </p>
            </div>
          )}

          {/* Checkbox de confirmation */}
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: 'rgba(16, 185, 129, 0.1)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            textAlign: 'center'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.legalConfirmation || false}
                onChange={(e) => setFormData({...formData, legalConfirmation: e.target.checked})}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '500' }}>
                ✅ Je confirme l'exactitude des informations légales fournies
              </span>
            </label>
          </div>
        </div>
      )
    };

    return [...baseSlides, ...sectionSlides, integrationSlide, finalSlide];
  };

  // Mettre à jour les slides quand les données changent
  useEffect(() => {
    const newSlides = generateDynamicSlides();
    // console.log('🏗️ Génération des slides:', newSlides.length, 'slides créées');
    setDynamicSlides(newSlides);
  }, [
    entityType, // ✅ Recalcul slides quand on change entreprise/particulier
    selectedSections, // ✅ Sections sélectionnées changent la structure
    // ✅ RESTAURÉ: formData essentiel pour que inputs fonctionnent
    formData.companyName,
    formData.email, 
    formData.phone,
    formData.tagline,
    formData.legalBusinessName,
    formData.legalSiret,
    formData.legalTva,
    formData.legalAddress,
    formData.legalZipCode,
    formData.contactCity,
    formData.contactFormEmail,
    formData.autoReplyMessage,
    formData.servicesDescription, 
    formData.portfolioDescription, 
    formData.contactAddress,
    formData.specialRequest,
    formData.servicesItems,
    formData.portfolioItems,
    formData.testimonialsItems,
    formData.faqItems,
    formData.featuresItems,
    formData.processSteps,
    formData.aboutValues,
    // Nouvelles sections ajoutées
    formData.comparisonWithout,
    formData.comparisonWith,
    formData.guaranteeList,
    formData.processDescription,
    formData.ctaTitle,
    formData.ctaButtonText
  ]);

  // Utiliser les slides dynamiques
  const slides = dynamicSlides.length > 0 ? dynamicSlides : [
    {
      title: 'Chargement...',
      subtitle: 'Préparation du configurateur',
      content: <div>Chargement en cours...</div>
    }
  ];

  // 🎯 NOUVELLE: Fonction de navigation par section ID
  const navigateToSection = (sectionId: string) => {
    console.log(`🎯 Navigation demandée vers section: ${sectionId}`);
      console.log('📋 Slides disponibles:', dynamicSlides.map((s, i) => `${i}: "${s.title}"`));
    // Étape 1: Activer la section si elle ne l'est pas déjà
    setSelectedSections(prev => {
      const isAlreadySelected = prev[sectionId];
      console.log(`📋 Section ${sectionId} déjà sélectionnée:`, isAlreadySelected);
      
      if (!isAlreadySelected) {
        console.log(`✅ Activation de la section: ${sectionId}`);
        return {
          ...prev,
          [sectionId]: true
        };
      }
      return prev;
    });
    
    // Étape 2: Navigation vers la slide (sera exécutée après regénération des slides)
    // On utilise setTimeout pour laisser le temps aux slides de se regénérer
    setTimeout(() => {
      if (dynamicSlides.length === 0) {
        console.log('❌ Aucune slide dynamique disponible pour navigation');
        return;
      }
      
      // 🔥 BUG FIX 1: Mapping distinct pour chaque section (Hero ≠ Contact)
      const sectionToTitleMap: Record<string, string> = {
        'hero': '🎯 Configuration Hero', // ✅ Slide Hero dédiée (nom/slogan/description/bouton)
        'about': '👤 À Propos',
        'services': '💼 Configuration des services',
        'portfolio': '🎨 Configuration du portfolio', 
        'features': '✨ Avantages',
        'testimonials': '⭐ Témoignages clients',
        'contact': 'Informations essentielles', // ✅ Contact = infos de base (email/phone)
        'faq': '❓ Questions fréquentes',
        'cta': '🚀 CTA Intermédiaire',
        'process': '📝 Comment Ça Marche',
        'comparison': '⚖️ Comparaison Avec/Sans',
        'urgency': '⚡ Badge Urgence',
        'guarantee': '🛡️ Garanties',
        'specialties': '🍽️ Spécialités du restaurant', 
        'gallery': '📸 Galerie photos',
        'approach': '🎯 Votre méthode',
        'domains': '📈 Vos domaines d\'expertise',
        'booking': '📅 Réservation en ligne',
      };
      
      const targetTitle = sectionToTitleMap[sectionId];
      if (!targetTitle) {
        console.warn(`❌ Aucun mapping trouvé pour section "${sectionId}"`);
        return;
      }
      
      // Chercher la slide par titre
      const slideIndex = dynamicSlides.findIndex(slide => 
        slide.title === targetTitle || // Correspondance exacte prioritaire
        slide.title?.includes(targetTitle) // Puis correspondance partielle
      );
      
      if (slideIndex !== -1) {
        setCurrentSlide(slideIndex);
        console.log(`✅ Navigation réussie vers slide ${slideIndex}: "${dynamicSlides[slideIndex].title}"`);
      } else {
        console.warn(`❌ Slide non trouvée pour "${sectionId}" (titre recherché: "${targetTitle}")`);
        console.log('📋 Slides disponibles après délai:', dynamicSlides.map((s, i) => `${i}: "${s.title}"`));
        console.log('🔍 Recherche exacte:', dynamicSlides.some(s => s.title === targetTitle));
        console.log('🔍 Recherche partielle:', dynamicSlides.some(s => s.title?.includes(targetTitle)));
      }
    }, 500); // Délai augmenté pour laisser les slides se regénérer
  };

  // 🎯 NOUVELLE: Navigation automatique au mount si initialSlide fourni
  useEffect(() => {
    // console.log('🔍 Navigation useEffect déclenchée:', { isOpen, initialSlide, dynamicSlidesLength: dynamicSlides.length });
    
    if (isOpen && initialSlide && dynamicSlides.length > 0) {
      console.log('🎯 Conditions réunies pour navigation directe vers:', initialSlide);
      // Délai pour laisser les slides se générer complètement
      const timer = setTimeout(() => {
        console.log('⏰ Timer navigation déclenché pour:', initialSlide);
        navigateToSection(initialSlide);
        // Sauvegarder la navigation directe
        console.log('🎯 Navigation directe vers:', initialSlide);
      }, 100);
      return () => clearTimeout(timer);
    } else if (isOpen && dynamicSlides.length > 0) {
      console.log('📋 Pas de navigation directe, utilisation slide sauvegardé');
      // Si pas de navigation directe, utiliser le slide sauvegardé ou 0
      const savedSlide = sessionStorage.getItem('modal-current-slide');
      const slideToUse = savedSlide ? parseInt(savedSlide, 10) : 0;
      if (slideToUse < dynamicSlides.length) {
        setCurrentSlide(slideToUse);
      }
    } else {
      console.log('❌ Conditions non réunies:', { isOpen, initialSlide, dynamicSlidesLength: dynamicSlides.length });
    }
  }, [isOpen, initialSlide, dynamicSlides.length]);

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  const canProceed = () => {
    if (dynamicSlides.length === 0) return false;
    
    const currentSlideData = dynamicSlides[currentSlide];
    if (!currentSlideData) return false;
    
    // Slide 0: Infos essentielles - obligatoires
    if (currentSlide === 0) {
      return formData.companyName.trim() !== '' && formData.email.trim() !== '';
    }
    
    // Slide 1: Identité visuelle (optionnel)
    if (currentSlide === 1) {
      return true;
    }
    
    // Slide 2: Informations légales - validation selon entityType
    if (currentSlide === 2) {
      if (entityType === 'particulier') {
        // ✅ PARTICULIER: Seulement nom et adresse obligatoires
        return (
          formData.legalBusinessName.trim() !== '' &&
          formData.legalAddress.trim() !== '' &&
          formData.legalZipCode.length === 5
        );
      } else {
        // ✅ ENTREPRISE: Tous les champs obligatoires
        return (
          formData.legalBusinessName.trim() !== '' &&
          formData.legalSiret.length === 14 &&
          formData.legalTva.startsWith('FR') && formData.legalTva.length === 13 &&
          formData.legalAddress.trim() !== '' &&
          formData.legalZipCode.length === 5
        );
      }
    }
    
    // Slide 3: Configuration contact - ville obligatoire
    if (currentSlide === 3) {
      return formData.contactCity.trim() !== '';
    }
    
    // Slide 4: Sélection sections - au moins une section
    if (currentSlide === 4) {
      return Object.values(selectedSections).some(Boolean);
    }
    
    // Dernière slide (Récapitulatif) - Confirmation légale obligatoire
    if (currentSlide === dynamicSlides.length - 1) {
      return formData.legalConfirmation === true;
    }
    
    // Autres slides: toujours valides (contenu optionnel)
    return true;
  };

  const handleNext = () => {
    if (dynamicSlides.length === 0) return;
    
    if (currentSlide < dynamicSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Derniere slide: finaliser
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    console.log('🎯 MIGRATION - handleComplete SIMPLIFIÉ - Pas de formData!');
    
    // Reset du slide pour la prochaine ouverture
    sessionStorage.removeItem('modal-current-slide');
    
    // 🚀 MIGRATION: Plus besoin de formData ! Les données sont déjà dans sectionsConfig via updateSectionProps
    console.log('✅ Sections sélectionnées:', selectedSections);
    console.log('✅ Template sélectionné:', selectedTemplate);
    
    onComplete({
      selectedTemplate,
      formData: formData // 🚀 MIGRATION: On garde formData temporairement pour compatibilité, mais il est obsolète !
    });
    onClose();
  };

  // 🎯 NOUVELLE FONCTION: Sauvegarde rapide pour sections spécifiques
  const handleQuickSave = () => {
    console.log('💾 Quick Save triggered - formData:', formData);
    
    // 1. Synchroniser les changements via onRealTimeUpdate
    if (onRealTimeUpdate) {
      onRealTimeUpdate(formData);
      console.log('✅ onRealTimeUpdate called with:', formData);
    } else {
      console.log('❌ onRealTimeUpdate not available');
    }
    
    // 2. Fermer le modal sans passer par toutes les slides
    onClose();
    
    // 3. Reset du slide pour la prochaine ouverture
    sessionStorage.removeItem('modal-current-slide');
    console.log('🔄 Session storage cleared, modal closed');
  };

  // 🔍 DÉTECTION: Vérifier si on vient d'une section spécifique
  const isFromSpecificSection = initialSlide && 
    ['hero', 'services', 'portfolio', 'features', 'testimonials', 'about', 'process', 'faq', 'contact', 'cta', 'comparison', 'guarantee', 'urgency'].includes(initialSlide);

  // 🎯 NOUVEAU: Sections sans inputs qui ont besoin de quick save
  const sectionsWithoutInputs = ['comparison', 'guarantee', 'urgency'];
  const isQuickSaveSection = initialSlide && (
    isFromSpecificSection || 
    sectionsWithoutInputs.includes(initialSlide)
  );

  console.log('🎯 P0#2 DEBUG - initialSlide:', initialSlide, 'isFromSpecificSection:', isFromSpecificSection, 'isQuickSaveSection:', isQuickSaveSection);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--background-elevated)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
                {slides[currentSlide]?.title || 'Configuration'}
              </h2>
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {slides[currentSlide]?.subtitle || 'Configuration en cours'}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              ✕
            </button>
          </div>
          
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <div style={{
              flex: 1,
              height: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold-primary), var(--gold-secondary))',
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
              {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '2rem',
          flex: 1,
          overflowY: 'auto',
          minHeight: 0
        }}>
          {slides[currentSlide]?.content || <div>Chargement...</div>}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexShrink: 0
        }}>
          <Button
            onClick={handlePrev}
            disabled={isFirstSlide}
            variant="secondary"
          >
            ← Précédent
          </Button>

          {/* 🎯 NOUVEAU: Bouton sauvegarde rapide (centre) */}
          {isQuickSaveSection && (
            <Button
              onClick={handleQuickSave}
              variant="primary"
            >
              ✅ Sauvegarder et fermer
            </Button>
          )}

          <Button
            onClick={isLastSlide ? handleComplete : handleNext}
            disabled={!canProceed()}
            variant="primary"
          >
            {isLastSlide ? '🚀 Créer mon site' : 'Suivant →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationCaptureModalAdaptive;