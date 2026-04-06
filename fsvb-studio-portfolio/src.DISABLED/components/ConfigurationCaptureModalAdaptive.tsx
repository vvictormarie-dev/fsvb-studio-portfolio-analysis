import React, { useState, useEffect } from 'react';
import { Button } from './Button';

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
  
  // Thème et couleurs
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  theme: string;
  
  // Sections personnalisées
  aboutDescription: string;
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
  processSteps: string; // JSON des étapes
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
  urgencyMessage: string; // Message d'urgence
  guaranteeData: string; // JSON garanties
  
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
}

const ConfigurationCaptureModalAdaptive: React.FC<ConfigurationCaptureModalAdaptiveProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialTemplate = 'landing-solo',
  // 🌊 NOUVEAU: Props pour synchronisation temps réel
  initialFormData,
  onRealTimeUpdate
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTemplate] = useState(initialTemplate);
  
  // États pour le modal adaptatif
  const [selectedSections, setSelectedSections] = useState<{ [key: string]: boolean }>({});
  const [dynamicSlides, setDynamicSlides] = useState<any[]>([]);
  const [entityType, setEntityType] = useState<'entreprise' | 'particulier'>('entreprise');

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
    
    // Thème et couleurs
    primaryColor: initialFormData?.primaryColor || '#2563EB',
    secondaryColor: initialFormData?.secondaryColor || '#1E40AF',
    accentColor: initialFormData?.accentColor || '#FBBF24',
    backgroundColor: initialFormData?.backgroundColor || '#04040E',
    textColor: initialFormData?.textColor || '#FFFFFF',
    theme: initialFormData?.theme || 'empire',
    
    // Sections personnalisées - Convertir les objets du configurateur vers JSON strings
    aboutDescription: '',
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
        text: item.content || item.text || 'Excellent service',
        rating: item.rating || 5
      }))
    ) : JSON.stringify([
      { name: 'Client 1', role: 'Entrepreneur', text: 'Excellent service, je recommande !', rating: 5 },
      { name: 'Client 2', role: 'Directeur', text: 'Très professionnel et efficace', rating: 5 }
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
    processSteps: JSON.stringify([
      { icon: '📞', title: 'Étape 1', description: 'Premier contact' },
      { icon: '📝', title: 'Étape 2', description: 'Analyse de vos besoins' },
      { icon: '🎨', title: 'Étape 3', description: 'Création sur-mesure' }
    ]),
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
    urgencyMessage: 'Offre limitée : -30% jusqu\'à la fin du mois !',
    guaranteeData: JSON.stringify([
      { titre: 'Satisfait ou remboursé', description: '30 jours pour changer d\'avis' },
      { titre: 'Livraison garantie', description: 'Votre site en 3 jours maximum' }
    ]),
    
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

  // 🌊 BRIDGE TEMPS RÉEL: Synchronisation bidirectionnelle
  useEffect(() => {
    // Synchroniser les changements du modal vers le configurateur
    if (onRealTimeUpdate && isOpen) {
      console.log('🔄 Modal → Configurateur sync:', formData);
      onRealTimeUpdate(formData);
    }
  }, [formData, onRealTimeUpdate, isOpen]);

  // 🔄 MISE À JOUR LORS DE L'OUVERTURE: Si les données du configurateur changent
  // ⚠️ PROTECTION BOUCLE: Ne pas déclencher si les données viennent du modal lui-même
  const [lastSyncTime, setLastSyncTime] = useState(0);
  
  useEffect(() => {
    if (isOpen && initialFormData) {
      const now = Date.now();
      // Protection anti-boucle: ignorer les mises à jour trop rapprochées (< 100ms)
      if (now - lastSyncTime < 100) {
        return;
      }
      
      setFormData(prev => {
        // Ne synchroniser que si les valeurs sont vraiment différentes
        const hasChanges = 
          initialFormData.companyName !== prev.companyName ||
          initialFormData.email !== prev.email ||
          initialFormData.phone !== prev.phone ||
          initialFormData.primaryColor !== prev.primaryColor ||
          initialFormData.theme !== prev.theme;
          
        if (!hasChanges) return prev;
        
        console.log('🔄 Modal ← Configurateur sync:', { hasChanges });
        setLastSyncTime(now);
        
        return {
          ...prev,
          companyName: initialFormData.companyName || prev.companyName,
          email: initialFormData.email || prev.email,
          phone: initialFormData.phone || prev.phone,
          tagline: initialFormData.tagline || prev.tagline,
          ctaLabel: initialFormData.ctaLabel || prev.ctaLabel,
          logoUrl: initialFormData.logoUrl || prev.logoUrl,
          instagramUrl: initialFormData.instagramUrl || prev.instagramUrl,
          linkedinUrl: initialFormData.linkedinUrl || prev.linkedinUrl,
          primaryColor: initialFormData.primaryColor || prev.primaryColor,
          secondaryColor: initialFormData.secondaryColor || prev.secondaryColor,
          accentColor: initialFormData.accentColor || prev.accentColor,
          theme: initialFormData.theme || prev.theme
        };
      });
    }
  }, [isOpen, initialFormData?.companyName, initialFormData?.email, initialFormData?.primaryColor]);

  // Configuration des sections selon le template
  const getAvailableSections = () => {
    const commonSections = [
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
                value={formData.servicesDescription}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData({...formData, servicesDescription: newValue});
                  
                  // 🌊 TEMPS RÉEL: Synchronisation instantanée
                  if (onRealTimeUpdate) {
                    const updatedFormData = {...formData, servicesDescription: newValue};
                    setTimeout(() => onRealTimeUpdate(updatedFormData), 50);
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
              let currentServices;
              try {
                currentServices = JSON.parse(formData.servicesItems || '[]');
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
                let services;
                try {
                  services = JSON.parse(formData.servicesItems || '[]');
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
                
                // Utiliser une fonction de callback pour éviter les conflits d'état
                setFormData(prev => ({...prev, servicesItems: JSON.stringify(updated)}));
                
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
                value={formData.portfolioDescription}
                onChange={(e) => setFormData({...formData, portfolioDescription: e.target.value})}
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
              let currentPortfolio;
              try {
                currentPortfolio = JSON.parse(formData.portfolioItems || '[]');
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
                let portfolio;
                try {
                  portfolio = JSON.parse(formData.portfolioItems || '[]');
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
                
                setFormData(prev => ({...prev, portfolioItems: JSON.stringify(updated)}));
                
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
                  { name: '', role: '', text: '', rating: 5 },
                  { name: '', role: '', text: '', rating: 5 }
                ];
              }
              
              // S'assurer qu'on a exactement 2 éléments
              while (currentTestimonials.length < 2) {
                currentTestimonials.push({ name: '', role: '', text: '', rating: 5 });
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
                  testimonials = [{ name: '', role: '', text: '', rating: 5 }, { name: '', role: '', text: '', rating: 5 }];
                }
                
                while (testimonials.length < 2) {
                  testimonials.push({ name: '', role: '', text: '', rating: 5 });
                }
                
                const updated = [...testimonials];
                updated[index] = { ...updated[index], [field]: value };
                
                setFormData(prev => ({...prev, testimonialsItems: JSON.stringify(updated)}));
                
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
                            value={testimonial.text || ''}
                            onChange={(e) => updateTestimonials(index, 'text', e.target.value)}
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
                let faq;
                try {
                  faq = JSON.parse(formData.faqItems || '[]');
                } catch {
                  faq = [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }];
                }
                const updated = [...faq];
                updated[index] = { ...updated[index], [field]: value };
                setFormData({...formData, faqItems: JSON.stringify(updated)});
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
                            value={faq.question || ''}
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
                            value={faq.answer || ''}
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
              let currentFeatures;
              try {
                currentFeatures = JSON.parse(formData.featuresItems || '[]');
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
                let features;
                try {
                  features = JSON.parse(formData.featuresItems || '[]');
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
                
                setFormData(prev => ({...prev, featuresItems: JSON.stringify(updated)}));
                
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
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                onChange={(e) => setFormData({...formData, googleMapsUrl: e.target.value})}
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
                onChange={(e) => setFormData({...formData, calendarUrl: e.target.value})}
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
                onChange={(e) => setFormData({...formData, bookingUrl: e.target.value})}
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

    return sectionConfig[sectionId as keyof typeof sectionConfig] || {
      title: `Configuration ${sectionId}`,
      subtitle: 'Configuration de cette section',
      content: <div>Configuration de {sectionId}</div>
    };
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
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
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
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
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
                onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
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
                onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                placeholder="https://linkedin.com/company/votreentreprise"
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
                onChange={(e) => setFormData({...formData, legalBusinessName: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, contactFormEmail: e.target.value})}
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
    formData.aboutValues
  ]);

  // Utiliser les slides dynamiques
  const slides = dynamicSlides.length > 0 ? dynamicSlides : [
    {
      title: 'Chargement...',
      subtitle: 'Préparation du configurateur',
      content: <div>Chargement en cours...</div>
    }
  ];

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
    // Transmettre les sections sélectionnées dans le formData
    const updatedFormData = {
      ...formData,
      selectedSections: JSON.stringify(selectedSections)
    };
    
    onComplete({
      selectedTemplate,
      formData: updatedFormData
    });
    onClose();
  };

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
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))'
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
          maxHeight: 'calc(90vh - 180px)',
          overflowY: 'auto'
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
          gap: '1rem'
        }}>
          <Button
            onClick={handlePrev}
            disabled={isFirstSlide}
            variant="secondary"
          >
            ← Précédent
          </Button>

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