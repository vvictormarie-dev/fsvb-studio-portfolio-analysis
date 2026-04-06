import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PreSessionFormService } from '../services/preSessionFormService';
import type { TemplateType } from '../types/preSession';
import styles from './FormulairePréSession.module.css';

interface RouteParams extends Record<string, string | undefined> {
  templateType: TemplateType;
  sessionId?: string;
}

export const FormulairePréSession: React.FC = () => {
  const { templateType, sessionId: urlSessionId } = useParams<RouteParams>();
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<any>({});
  
  // Générer un sessionId automatique si absent de l'URL
  const [sessionId] = useState(() => urlSessionId || `${templateType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  // Vérifier si le formulaire existe déjà - Désactivé pour éviter erreur 406
  /*
  useEffect(() => {
    const checkExistingForm = async () => {
      if (!sessionId) return;
      
      try {
        const existingForm = await PreSessionFormService.getFormBySessionId(sessionId);
        if (existingForm) {
          setSubmitted(true);
        }
      } catch (err) {
        console.error('Erreur vérification formulaire:', err);
      }
    };

    checkExistingForm();
  }, [sessionId]);
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateType || !sessionId) return;

    // Validation des champs obligatoires selon le template
    let isValid = false;
    let missingFields: string[] = [];

    if (templateType === 'landing-solo') {
      const requiredFields = [
        { key: 'companyName', name: 'Nom/Entreprise' },
        { key: 'clientEmail', name: 'Email' },
        { key: 'phone', name: 'Téléphone' },
        { key: 'activityName', name: 'Nom de votre activité' },
        { key: 'description', name: 'Description' }
      ];
      
      requiredFields.forEach(field => {
        if (!responses[field.key]?.trim()) {
          missingFields.push(field.name);
        }
      });
      
      isValid = missingFields.length === 0;
    } 
    else if (templateType === 'coach') {
      const requiredFields = [
        { key: 'coachName', name: 'Votre nom' },
        { key: 'email', name: 'Email' },
        { key: 'phone', name: 'Téléphone' },
        { key: 'coachingType', name: 'Type de coaching' },
        { key: 'activityDescription', name: 'Description de votre activité' },
        { key: 'hasPortraitPhoto', name: 'Photo portrait' },
        { key: 'textsStatus', name: 'Statut des textes' },
        { key: 'colorsType', name: 'Couleurs' },
        { key: 'hasCalendly', name: 'Système de réservation' },
        { key: 'hasExistingSite', name: 'Site existant' }
      ];
      
      requiredFields.forEach(field => {
        if (!responses[field.key]) {
          missingFields.push(field.name);
        }
      });
      
      isValid = missingFields.length === 0;
    }
    else if (templateType === 'restaurant') {
      const requiredFields = [
        { key: 'restaurantName', name: 'Nom du restaurant' },
        { key: 'ownerName', name: 'Nom du propriétaire' },
        { key: 'email', name: 'Email' },
        { key: 'phone', name: 'Téléphone' },
        { key: 'cuisineType', name: 'Type de cuisine' },
        { key: 'address', name: 'Adresse' },
        { key: 'hasExistingMenu', name: 'Menu existant' },
        { key: 'textsStatus', name: 'Statut des textes' },
        { key: 'colorsType', name: 'Couleurs' },
        { key: 'reservationSystem', name: 'Système de réservation' },
        { key: 'hasExistingSite', name: 'Site existant' }
      ];
      
      requiredFields.forEach(field => {
        if (!responses[field.key]) {
          missingFields.push(field.name);
        }
      });
      
      isValid = missingFields.length === 0;
    }

    if (!isValid) {
      setError(`Veuillez remplir les champs obligatoires manquants : ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Utiliser l'email spécifique au template pour clientEmail
      const clientEmail = templateType === 'landing-solo' ? responses.clientEmail : responses.email;
      
      await PreSessionFormService.createForm({
        sessionId,
        templateType,
        clientEmail: clientEmail,
        responses,
        status: 'pending'
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const updateResponse = (field: string, value: any) => {
    setResponses((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!templateType) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Lien invalide</h2>
          <p>Ce lien de formulaire n'est pas valide.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <h2>✅ Formulaire envoyé !</h2>
          <p>Merci pour vos réponses. Je vais les examiner et vous recontacter rapidement pour organiser notre session de création.</p>
          <div className={styles.successDetails}>
            <p><strong>Session ID:</strong> {sessionId}</p>
            <p><strong>Template:</strong> {getTemplateDisplayName(templateType)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Formulaire de préparation</h1>
        <p>Template : <strong>{getTemplateDisplayName(templateType)}</strong></p>
        <div className={styles.intro}>
          <p>Ce formulaire va m'aider à préparer votre session de création et pré-remplir votre site avec vos informations.</p>
          <p>Prenez votre temps, chaque détail compte pour créer le site parfait ! ✨</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Email client */}
        <div className={styles.section}>
          <h3>Votre email</h3>
          <div className={styles.field}>
            <label htmlFor="clientEmail">
              Email de contact *
              <span className={styles.helper}>Pour vous recontacter et finaliser la session</span>
            </label>
            <input
              type="email"
              id="clientEmail"
              value={responses.email || ''}
              onChange={(e) => updateResponse('email', e.target.value)}
              required
              placeholder="votre@email.com"
            />
          </div>
        </div>

        {/* Questions spécifiques par template */}
        {renderTemplateQuestions(templateType, responses, updateResponse)}

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading || !responses.email?.trim()}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer mes informations'}
        </button>
      </form>
    </div>
  );
};

// Helper functions
function getTemplateDisplayName(templateType: TemplateType): string {
  switch (templateType) {
    case 'landing-solo':
      return 'Landing Solo (Freelance/Consultant)';
    case 'restaurant':
      return 'Restaurant';
    case 'coach':
      return 'Coach';
    default:
      return templateType;
  }
}



function renderTemplateQuestions(
  templateType: TemplateType, 
  responses: any, 
  updateResponse: (field: string, value: any) => void
) {
  switch (templateType) {
    case 'landing-solo':
      return renderLandingSoloQuestions(responses, updateResponse);
    case 'restaurant':
      return renderRestaurantQuestions(responses, updateResponse);
    case 'coach':
      return renderCoachQuestions(responses, updateResponse);
    default:
      return null;
  }
}

function renderLandingSoloQuestions(responses: any, updateResponse: (field: string, value: any) => void) {
  return (
    <>
      {/* SECTION 1 : INFORMATIONS (5 questions) */}
      <div className={styles.section}>
        <h3>📋 Section 1 : Vos informations</h3>
        <div className={styles.sectionDescription}>
          Ces informations de base nous permettront de personnaliser votre site et de vous recontacter.
        </div>
        
        <div className={styles.field}>
          <label htmlFor="companyName">
            Nom / Entreprise *
          </label>
          <input
            type="text"
            id="companyName"
            value={responses.companyName || ''}
            onChange={(e) => updateResponse('companyName', e.target.value)}
            placeholder="Empire Digital"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="clientEmail">
            Email *
          </label>
          <input
            type="email"
            id="clientEmail"
            value={responses.clientEmail || ''}
            onChange={(e) => updateResponse('clientEmail', e.target.value)}
            placeholder="contact@empire-digital.fr"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">
            Téléphone *
          </label>
          <input
            type="tel"
            id="phone"
            value={responses.phone || ''}
            onChange={(e) => updateResponse('phone', e.target.value)}
            placeholder="06 12 34 56 78"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="activityName">
            Nom de votre activité *
          </label>
          <input
            type="text"
            id="activityName"
            value={responses.activityName || ''}
            onChange={(e) => updateResponse('activityName', e.target.value)}
            placeholder="Consultant en transformation digitale"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">
            Description de votre activité *
          </label>
          <textarea
            id="description"
            value={responses.description || ''}
            onChange={(e) => updateResponse('description', e.target.value)}
            placeholder="En 1-2 phrases : ce que vous faites, pour qui, votre spécialité..."
            rows={3}
            required
          />
        </div>
      </div>

      {/* SECTION 2 : SECTIONS SOUHAITÉES */}
      <div className={styles.section}>
        <h3>🏗️ Section 2 : Sections souhaitées sur votre site</h3>
        <div className={styles.sectionDescription}>
          Choisissez les sections que vous souhaitez sur votre site. Chaque section a un rôle précis pour convaincre vos visiteurs !
          <br />
          <strong>Note :</strong> Les sections Hero (accueil) et Contact sont obligatoires et déjà incluses.
        </div>

        <div className={styles.sectionsGrid}>
          {[
            {
              id: 'about',
              icon: '👤',
              title: 'À propos',
              description: 'Votre histoire, mission, équipe - Crée connexion et confiance'
            },
            {
              id: 'services',
              icon: '💼',
              title: 'Services/Offres',
              description: 'Présentez votre offre avec clarté - Aide à la décision d\'achat'
            },
            {
              id: 'portfolio',
              icon: '🎨',
              title: 'Portfolio',
              description: 'Montrez vos réalisations - Preuve visuelle de votre expertise'
            },
            {
              id: 'testimonials',
              icon: '💬',
              title: 'Témoignages',
              description: 'Avis clients positifs - Preuve sociale la plus puissante'
            },
            {
              id: 'faq',
              icon: '❓',
              title: 'FAQ',
              description: 'Questions fréquentes - Lève les objections avant contact'
            },
            {
              id: 'features',
              icon: '⭐',
              title: 'Fonctionnalités',
              description: 'Vos points forts - Pourquoi vous choisir ?'
            },
            {
              id: 'process',
              icon: '🔄',
              title: 'Process',
              description: 'Votre méthode en étapes - Rassure le client'
            }
          ].map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <label className={styles.sectionLabel}>
                <input
                  type="checkbox"
                  checked={responses.sectionsEnabled?.[section.id] || false}
                  onChange={(e) => updateResponse('sectionsEnabled', {
                    ...responses.sectionsEnabled,
                    [section.id]: e.target.checked
                  })}
                />
                <div className={styles.sectionInfo}>
                  <h4>{section.icon} {section.title}</h4>
                  <p>{section.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3 : CONTENUS DISPONIBLES (3 questions) */}
      <div className={styles.section}>
        <h3>📄 Section 3 : Contenus disponibles</h3>
        <div className={styles.sectionDescription}>
          Ces informations nous aident à préparer votre site avec les éléments que vous possédez déjà.
        </div>

        <div className={styles.field}>
          <label>Logo</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasLogo"
                value="yes"
                checked={responses.hasLogo === 'yes'}
                onChange={(e) => updateResponse('hasLogo', e.target.value)}
              />
              J'ai un logo
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasLogo"
                value="no"
                checked={responses.hasLogo === 'no'}
                onChange={(e) => updateResponse('hasLogo', e.target.value)}
              />
              Je n'ai pas de logo
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label>Photos</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="photosStatus"
                value="ready"
                checked={responses.photosStatus === 'ready'}
                onChange={(e) => updateResponse('photosStatus', e.target.value)}
              />
              Photos prêtes
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="photosStatus"
                value="to-prepare"
                checked={responses.photosStatus === 'to-prepare'}
                onChange={(e) => updateResponse('photosStatus', e.target.value)}
              />
              À préparer
            </label>
          </div>
          
          {(responses.photosStatus === 'ready' || responses.photosStatus === 'to-prepare') && (
            <div className={styles.conditionalField}>
              <label htmlFor="photosCount">Combien de photos ?</label>
              <input
                type="number"
                id="photosCount"
                value={responses.photosCount || ''}
                onChange={(e) => updateResponse('photosCount', e.target.value)}
                placeholder="5"
                min="0"
                max="50"
              />
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label>Textes</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="all-ready"
                checked={responses.textsStatus === 'all-ready'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Tous rédigés
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="ideas-only"
                checked={responses.textsStatus === 'ideas-only'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Idées seulement
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="need-help"
                checked={responses.textsStatus === 'need-help'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Besoin d'aide
            </label>
          </div>
          
          <div className={styles.field}>
            <label htmlFor="slogan">
              Slogan / Phrase d'accroche (optionnel)
            </label>
            <input
              type="text"
              id="slogan"
              value={responses.slogan || ''}
              onChange={(e) => updateResponse('slogan', e.target.value)}
              placeholder="Votre partenaire digital de confiance"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4 : COULEURS & STYLE (2 questions) */}
      <div className={styles.section}>
        <h3>🎨 Section 4 : Couleurs & Style</h3>
        <div className={styles.sectionDescription}>
          Ces choix définiront l'apparence visuelle de votre site.
        </div>

        <div className={styles.field}>
          <label>Couleurs de votre marque</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="precise"
                checked={responses.colorsType === 'precise'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Couleurs précises
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="general"
                checked={responses.colorsType === 'general'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Idées générales
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="suggestions"
                checked={responses.colorsType === 'suggestions'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Je veux des suggestions
            </label>
          </div>

          {responses.colorsType === 'precise' && (
            <div className={styles.conditionalField}>
              <label htmlFor="preciseColors">Codes couleurs</label>
              <input
                type="text"
                id="preciseColors"
                value={responses.preciseColors || ''}
                onChange={(e) => updateResponse('preciseColors', e.target.value)}
                placeholder="#2563EB bleu, #FBBF24 or"
              />
            </div>
          )}

          {responses.colorsType === 'general' && (
            <div className={styles.conditionalField}>
              <label htmlFor="generalColors">Description des couleurs</label>
              <input
                type="text"
                id="generalColors"
                value={responses.generalColors || ''}
                onChange={(e) => updateResponse('generalColors', e.target.value)}
                placeholder="Bleu marine et or"
              />
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="style">Style souhaité</label>
          <select
            id="style"
            value={responses.style || ''}
            onChange={(e) => updateResponse('style', e.target.value)}
          >
            <option value="">Sélectionner un style</option>
            <option value="moderne">Moderne et épuré</option>
            <option value="elegant">Élégant et premium</option>
            <option value="colorful">Coloré et dynamique</option>
            <option value="minimal">Minimaliste</option>
            <option value="classic">Classique et sobre</option>
          </select>
        </div>
      </div>

      {/* SECTION 5 : INFOS COMPLÉMENTAIRES (4 questions) */}
      <div className={styles.section}>
        <h3>ℹ️ Section 5 : Informations complémentaires</h3>
        <div className={styles.sectionDescription}>
          Ces dernières informations nous aideront à mieux comprendre votre projet.
        </div>

        <div className={styles.field}>
          <label>Avez-vous un site web existant ?</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasWebsite"
                value="yes"
                checked={responses.hasWebsite === 'yes'}
                onChange={(e) => updateResponse('hasWebsite', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasWebsite"
                value="no"
                checked={responses.hasWebsite === 'no'}
                onChange={(e) => updateResponse('hasWebsite', e.target.value)}
              />
              Non
            </label>
          </div>

          {responses.hasWebsite === 'yes' && (
            <div className={styles.conditionalField}>
              <label htmlFor="websiteUrl">URL de votre site actuel</label>
              <input
                type="url"
                id="websiteUrl"
                value={responses.websiteUrl || ''}
                onChange={(e) => updateResponse('websiteUrl', e.target.value)}
                placeholder="https://votre-site.com"
              />
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label>Objectif principal de votre site</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="objective"
                value="contacts"
                checked={responses.objective === 'contacts'}
                onChange={(e) => updateResponse('objective', e.target.value)}
              />
              Générer des demandes de contact
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="objective"
                value="sell"
                checked={responses.objective === 'sell'}
                onChange={(e) => updateResponse('objective', e.target.value)}
              />
              Vendre mes services/produits
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="objective"
                value="portfolio"
                checked={responses.objective === 'portfolio'}
                onChange={(e) => updateResponse('objective', e.target.value)}
              />
              Présenter mon portfolio
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="objective"
                value="credibility"
                checked={responses.objective === 'credibility'}
                onChange={(e) => updateResponse('objective', e.target.value)}
              />
              Établir ma crédibilité
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="targetClients">
            Votre cible clients (optionnel)
          </label>
          <textarea
            id="targetClients"
            value={responses.targetClients || ''}
            onChange={(e) => updateResponse('targetClients', e.target.value)}
            placeholder="Ex: Entrepreneurs, TPE/PME, 30-50 ans"
            rows={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="freeNotes">
            Notes libres (optionnel)
          </label>
          <textarea
            id="freeNotes"
            value={responses.freeNotes || ''}
            onChange={(e) => updateResponse('freeNotes', e.target.value)}
            placeholder="Contraintes, préférences, deadline, etc."
            rows={3}
          />
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderRestaurantQuestions(responses: any, updateResponse: (field: string, value: any) => void) {
  return (
    <>
      {/* Section 1: Informations de base */}
      <div className={styles.section}>
        <h3>🍽️ Vos Informations</h3>
        <div className={styles.sectionDescription}>
          Informations générales sur votre restaurant
        </div>

        <div className={styles.field}>
          <label htmlFor="restaurantName">Nom du restaurant *</label>
          <input
            type="text"
            id="restaurantName"
            value={responses.restaurantName || ''}
            onChange={(e) => updateResponse('restaurantName', e.target.value)}
            placeholder="Bella Vista"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="ownerName">Votre nom (propriétaire/gérant) *</label>
          <input
            type="text"
            id="ownerName"
            value={responses.ownerName || ''}
            onChange={(e) => updateResponse('ownerName', e.target.value)}
            placeholder="Marco Rossi"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Téléphone *</label>
          <input
            type="tel"
            id="phone"
            value={responses.phone || ''}
            onChange={(e) => updateResponse('phone', e.target.value)}
            placeholder="01 23 45 67 89"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="restaurantType">Type de restaurant *</label>
          <select
            id="restaurantType"
            value={responses.restaurantType || ''}
            onChange={(e) => updateResponse('restaurantType', e.target.value)}
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="traditionnel">Restaurant traditionnel</option>
            <option value="gastronomique">Restaurant gastronomique</option>
            <option value="bistrot">Bistrot / Brasserie</option>
            <option value="italien">Restaurant italien</option>
            <option value="asiatique">Restaurant asiatique</option>
            <option value="pizzeria">Pizzeria</option>
            <option value="cafe">Café / Salon de thé</option>
            <option value="fast-good">Restaurant rapide / Fast-good</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      {/* Section 2: Sections souhaitées */}
      <div className={styles.section}>
        <h3>⭐ Sections souhaitées</h3>
        <div className={styles.sectionDescription}>
          Sélectionnez les sections que vous souhaitez sur votre site. Chaque section booste vos réservations !
        </div>
        <div className={styles.sectionDescription}>
          <strong>Sections obligatoires :</strong> Hero, Menu/Carte, Horaires & Localisation, Réservation, Contact
        </div>

        <div className={styles.sectionsGrid}>
          {[
            {
              id: 'specialties',
              icon: '🍴',
              title: 'Spécialités / Plats signature',
              description: 'Mettez en avant vos meilleurs plats avec photos - Les clients commandent ce qu\'ils voient !'
            },
            {
              id: 'gallery',
              icon: '📸',
              title: 'Galerie photos',
              description: 'Photos ambiance + plats - Augmente les réservations de 45%'
            },
            {
              id: 'history',
              icon: '👨‍🍳',
              title: 'Histoire / À propos',
              description: 'Histoire du chef, tradition - Les clients veulent une expérience'
            },
            {
              id: 'testimonials',
              icon: '💬',
              title: 'Témoignages / Avis',
              description: 'Avis Google/TripAdvisor - 95% des clients lisent les avis avant réserver'
            },
            {
              id: 'events',
              icon: '🎉',
              title: 'Événements / Privatisation',
              description: 'Événements privés, mariages - Chiffre d\'affaires important'
            }
          ].map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <label className={styles.sectionLabel}>
                <input
                  type="checkbox"
                  checked={responses.sectionsEnabled?.[section.id] || false}
                  onChange={(e) => updateResponse('sectionsEnabled', {
                    ...responses.sectionsEnabled,
                    [section.id]: e.target.checked
                  })}
                />
                <div className={styles.sectionInfo}>
                  <h4>{section.icon} {section.title}</h4>
                  <p>{section.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Contenus disponibles */}
      <div className={styles.section}>
        <h3>📁 Contenus disponibles</h3>
        <div className={styles.sectionDescription}>
          Évaluation de vos contenus existants
        </div>

        <div className={styles.field}>
          <label>Logo du restaurant</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasLogo"
                value="yes"
                checked={responses.hasLogo === 'yes'}
                onChange={(e) => updateResponse('hasLogo', e.target.value)}
              />
              J'ai un logo
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasLogo"
                value="no"
                checked={responses.hasLogo === 'no'}
                onChange={(e) => updateResponse('hasLogo', e.target.value)}
              />
              Je n'ai pas de logo
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label>Menu / Carte</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="menuStatus"
                value="pdf-ready"
                checked={responses.menuStatus === 'pdf-ready'}
                onChange={(e) => updateResponse('menuStatus', e.target.value)}
              />
              J'ai ma carte en PDF
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="menuStatus"
                value="to-create"
                checked={responses.menuStatus === 'to-create'}
                onChange={(e) => updateResponse('menuStatus', e.target.value)}
              />
              Je dois la créer
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="menuStatus"
                value="need-help"
                checked={responses.menuStatus === 'need-help'}
                onChange={(e) => updateResponse('menuStatus', e.target.value)}
              />
              J'ai besoin d'aide
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label>Photos disponibles</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="photosStatus"
                value="ready"
                checked={responses.photosStatus === 'ready'}
                onChange={(e) => updateResponse('photosStatus', e.target.value)}
              />
              Photos prêtes
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="photosStatus"
                value="to-prepare"
                checked={responses.photosStatus === 'to-prepare'}
                onChange={(e) => updateResponse('photosStatus', e.target.value)}
              />
              À préparer
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="photosCount">Combien de photos ?</label>
          <input
            type="number"
            id="photosCount"
            value={responses.photosCount || ''}
            onChange={(e) => updateResponse('photosCount', parseInt(e.target.value) || undefined)}
            placeholder="Ex: 8"
            min="0"
            max="100"
          />
        </div>

        <div className={styles.field}>
          <label>Textes</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="all-ready"
                checked={responses.textsStatus === 'all-ready'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Tous rédigés
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="ideas-only"
                checked={responses.textsStatus === 'ideas-only'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Idées seulement
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="need-help"
                checked={responses.textsStatus === 'need-help'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Besoin d'aide
            </label>
          </div>
        </div>
      </div>

      {/* Section 4: Couleurs & Style */}
      <div className={styles.section}>
        <h3>🎨 Couleurs & Style</h3>
        <div className={styles.sectionDescription}>
          Définition de l'identité visuelle
        </div>

        <div className={styles.field}>
          <label>Couleurs de votre marque</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="precise"
                checked={responses.colorsType === 'precise'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Couleurs précises
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="general-ideas"
                checked={responses.colorsType === 'general-ideas'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Idées générales
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="suggestions"
                checked={responses.colorsType === 'suggestions'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Je veux des suggestions
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="colorsValue">Indiquez vos couleurs (si vous en avez)</label>
          <input
            type="text"
            id="colorsValue"
            value={responses.colorsValue || ''}
            onChange={(e) => updateResponse('colorsValue', e.target.value)}
            placeholder="Ex: Rouge bordeaux #8B0000, Or #FFD700"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="styleWanted">Style visuel souhaité</label>
          <select
            id="styleWanted"
            value={responses.styleWanted || ''}
            onChange={(e) => updateResponse('styleWanted', e.target.value)}
          >
            <option value="">Choisir un style (optionnel)</option>
            <option value="traditionnel">Traditionnel / Authentique</option>
            <option value="moderne">Moderne / Contemporain</option>
            <option value="elegant">Élégant / Gastronomique</option>
            <option value="chaleureux">Chaleureux / Familial</option>
            <option value="rustique">Rustique / Campagnard</option>
            <option value="epure">Épuré / Minimaliste</option>
          </select>
        </div>
      </div>

      {/* Section 5: Informations pratiques */}
      <div className={styles.section}>
        <h3>📍 Informations pratiques</h3>
        <div className={styles.sectionDescription}>
          Détails essentiels pour vos clients
        </div>

        <div className={styles.field}>
          <label htmlFor="address">Adresse complète du restaurant *</label>
          <textarea
            id="address"
            value={responses.address || ''}
            onChange={(e) => updateResponse('address', e.target.value)}
            placeholder="123 Rue de la Gastronomie&#10;75001 Paris"
            rows={3}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="hours">Horaires d'ouverture *</label>
          <textarea
            id="hours"
            value={responses.hours || ''}
            onChange={(e) => updateResponse('hours', e.target.value)}
            placeholder="Lundi : Fermé&#10;Mardi-Samedi : 12h-14h / 19h-22h&#10;Dimanche : 12h-15h"
            rows={4}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Services proposés</label>
          <div className={styles.sectionsGrid}>
            {[
              {
                id: 'terrasse',
                icon: '🌿',
                title: 'Terrasse',
                description: 'Espace extérieur pour les beaux jours'
              },
              {
                id: 'parking',
                icon: '🅿️',
                title: 'Parking',
                description: 'Places de stationnement disponibles'
              },
              {
                id: 'handicap',
                icon: '♿',
                title: 'Accès handicapés',
                description: 'Restaurant accessible aux personnes à mobilité réduite'
              },
              {
                id: 'vegetarien',
                icon: '🌱',
                title: 'Menu végétarien/vegan',
                description: 'Options plant-based disponibles'
              },
              {
                id: 'gluten-free',
                icon: '🌾',
                title: 'Menu sans gluten',
                description: 'Options pour les intolérances au gluten'
              },
              {
                id: 'takeaway',
                icon: '📦',
                title: 'Plats à emporter',
                description: 'Service de vente à emporter'
              },
              {
                id: 'delivery',
                icon: '🚚',
                title: 'Livraison',
                description: 'Service de livraison à domicile'
              },
              {
                id: 'brunch',
                icon: '🍳',
                title: 'Brunch week-end',
                description: 'Brunch spécial samedi et dimanche'
              },
              {
                id: 'menu-jour',
                icon: '🍽️',
                title: 'Menu du jour',
                description: 'Plat du jour renouvelé régulièrement'
              }
            ].map((service) => (
              <div key={service.id} className={styles.sectionCard}>
                <label className={styles.sectionLabel}>
                  <input
                    type="checkbox"
                    checked={responses.services?.includes(service.id) || false}
                    onChange={(e) => {
                      const current = responses.services || [];
                      const updated = e.target.checked 
                        ? [...current, service.id]
                        : current.filter((item: string) => item !== service.id);
                      updateResponse('services', updated);
                    }}
                  />
                  <div className={styles.sectionInfo}>
                    <h4>{service.icon} {service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6: Réservation */}
      <div className={styles.section}>
        <h3>📞 Réservation</h3>
        <div className={styles.sectionDescription}>
          Gestion des réservations clients
        </div>
        <div className={styles.helpText}>
          💡 Un bouton "Réserver" sera visible partout sur votre site
        </div>

        <div className={styles.field}>
          <label>Comment gérez-vous actuellement les réservations ? *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="reservationSystem"
                value="phone"
                checked={responses.reservationSystem === 'phone'}
                onChange={(e) => updateResponse('reservationSystem', e.target.value)}
              />
              Par téléphone
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="reservationSystem"
                value="email"
                checked={responses.reservationSystem === 'email'}
                onChange={(e) => updateResponse('reservationSystem', e.target.value)}
              />
              Email
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="reservationSystem"
                value="external"
                checked={responses.reservationSystem === 'external'}
                onChange={(e) => updateResponse('reservationSystem', e.target.value)}
              />
              Plateforme externe
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="reservationSystem"
                value="other"
                checked={responses.reservationSystem === 'other'}
                onChange={(e) => updateResponse('reservationSystem', e.target.value)}
              />
              Autre
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="reservationUrl">Lien de réservation (si vous utilisez une plateforme)</label>
          <input
            type="url"
            id="reservationUrl"
            value={responses.reservationUrl || ''}
            onChange={(e) => updateResponse('reservationUrl', e.target.value)}
            placeholder="Ex: https://module.lafourchette.com/votre-restaurant"
          />
        </div>
      </div>

      {/* Section 7: Présence en ligne & Notes */}
      <div className={styles.section}>
        <h3>🌐 Présence en ligne & Notes</h3>
        <div className={styles.sectionDescription}>
          État de votre présence numérique et informations complémentaires
        </div>

        <div className={styles.field}>
          <label>Avez-vous un site web existant ? *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasExistingSite"
                value="yes"
                checked={responses.hasExistingSite === 'yes'}
                onChange={(e) => updateResponse('hasExistingSite', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasExistingSite"
                value="no"
                checked={responses.hasExistingSite === 'no'}
                onChange={(e) => updateResponse('hasExistingSite', e.target.value)}
              />
              Non
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="existingSiteUrl">URL de votre site actuel (si vous en avez un)</label>
          <input
            type="url"
            id="existingSiteUrl"
            value={responses.existingSiteUrl || ''}
            onChange={(e) => updateResponse('existingSiteUrl', e.target.value)}
            placeholder="https://votre-restaurant.fr"
          />
        </div>

        <div className={styles.field}>
          <label>Êtes-vous sur Google My Business ?</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasGoogleMyBusiness"
                value="yes"
                checked={responses.hasGoogleMyBusiness === 'yes'}
                onChange={(e) => updateResponse('hasGoogleMyBusiness', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasGoogleMyBusiness"
                value="no"
                checked={responses.hasGoogleMyBusiness === 'no'}
                onChange={(e) => updateResponse('hasGoogleMyBusiness', e.target.value)}
              />
              Non
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="googleMyBusinessUrl">Lien vers votre fiche Google (si vous l'avez)</label>
          <input
            type="url"
            id="googleMyBusinessUrl"
            value={responses.googleMyBusinessUrl || ''}
            onChange={(e) => updateResponse('googleMyBusinessUrl', e.target.value)}
            placeholder="https://g.page/votre-restaurant"
          />
          <div className={styles.helpText}>
            💡 Cherchez votre restaurant sur Google Maps pour trouver ce lien
          </div>
        </div>

        <div className={styles.field}>
          <label>Êtes-vous sur les réseaux sociaux ?</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasSocialMedia"
                value="yes"
                checked={responses.hasSocialMedia === 'yes'}
                onChange={(e) => updateResponse('hasSocialMedia', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasSocialMedia"
                value="no"
                checked={responses.hasSocialMedia === 'no'}
                onChange={(e) => updateResponse('hasSocialMedia', e.target.value)}
              />
              Non
            </label>
          </div>
          <div className={styles.helpText}>
            💡 Si oui, je récupérerai vos liens pendant la session de configuration
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="labels">Labels / Distinctions (optionnel)</label>
          <textarea
            id="labels"
            value={responses.labels || ''}
            onChange={(e) => updateResponse('labels', e.target.value)}
            placeholder="Ex: Maître Restaurateur, Guide Michelin, Gault&Millau"
            rows={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="notes">Notes libres</label>
          <textarea
            id="notes"
            value={responses.notes || ''}
            onChange={(e) => updateResponse('notes', e.target.value)}
            placeholder="Particularités, deadline, éléments spéciaux..."
            rows={3}
          />
        </div>
      </div>
    </>
  );
}

function renderCoachQuestions(responses: any, updateResponse: (field: string, value: any) => void) {
  return (
    <>
      {/* Section 1: Informations */}
      <div className={styles.section}>
        <h3>🧑‍💼 Vos Informations</h3>
        <div className={styles.sectionDescription}>
          Informations générales sur votre activité de coaching
        </div>

        <div className={styles.field}>
          <label htmlFor="coachName">Votre nom (prénom + nom) *</label>
          <input
            type="text"
            id="coachName"
            value={responses.coachName || ''}
            onChange={(e) => updateResponse('coachName', e.target.value)}
            placeholder="Sophie Martin"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Téléphone *</label>
          <input
            type="tel"
            id="phone"
            value={responses.phone || ''}
            onChange={(e) => updateResponse('phone', e.target.value)}
            placeholder="06 12 34 56 78"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="activityName">Nom de votre activité (si différent de votre nom)</label>
          <input
            type="text"
            id="activityName"
            value={responses.activityName || ''}
            onChange={(e) => updateResponse('activityName', e.target.value)}
            placeholder="Ex: Coaching Performance Pro"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="coachingType">Type de coaching / accompagnement *</label>
          <select
            id="coachingType"
            value={responses.coachingType || ''}
            onChange={(e) => updateResponse('coachingType', e.target.value)}
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="life-coaching">Life coaching / Coaching de vie</option>
            <option value="professional-coaching">Coaching professionnel / Carrière</option>
            <option value="business-coaching">Coaching d'entreprise / Leadership</option>
            <option value="sport-coaching">Coaching sportif / Performance</option>
            <option value="parental-coaching">Coaching parental</option>
            <option value="therapy">Thérapie / Psychothérapie</option>
            <option value="personal-development">Développement personnel</option>
            <option value="consulting">Consulting / Conseil</option>
            <option value="hypnose">Hypnose</option>
            <option value="sophrologie">Sophrologie</option>
            <option value="pnl">PNL (Programmation Neuro-Linguistique)</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="activityDescription">Décrivez votre activité en 1-2 phrases *</label>
          <textarea
            id="activityDescription"
            value={responses.activityDescription || ''}
            onChange={(e) => updateResponse('activityDescription', e.target.value)}
            placeholder="Ex: J'accompagne les entrepreneurs à surmonter leurs blocages et atteindre leurs objectifs business"
            rows={3}
            required
          />
        </div>
      </div>

      {/* Section 2: Sections souhaitées */}
      <div className={styles.section}>
        <h3>⭐ Sections souhaitées</h3>
        <div className={styles.sectionDescription}>
          Sélectionnez les sections que vous souhaitez sur votre site. Chaque section construit votre crédibilité et génère des clients !
        </div>
        <div className={styles.sectionDescription}>
          <strong>Sections obligatoires :</strong> Hero, Formules / Tarifs, Prise de RDV, Contact
        </div>

        <div className={styles.sectionsGrid}>
          {[
            {
              id: 'about',
              icon: '👤',
              title: 'Mon parcours / À propos',
              description: 'Votre histoire crée la connexion et la confiance - Les clients veulent savoir QUI les accompagne'
            },
            {
              id: 'method',
              icon: '🎯',
              title: 'Ma méthode / Approche',
              description: 'Votre méthodologie unique - Répond à "Pourquoi vous plutôt qu\'un autre coach ?"'
            },
            {
              id: 'domains',
              icon: '⭐',
              title: 'Domaines d\'intervention',
              description: 'Spécialisation = autorité = prix élevés - Les prospects cherchent un expert de LEUR problème'
            },
            {
              id: 'certifications',
              icon: '🎓',
              title: 'Formations / Certifications',
              description: 'Crédibilité = conversions - Certifications reconnues = légitimité professionnelle'
            },
            {
              id: 'testimonials',
              icon: '💬',
              title: 'Témoignages clients',
              description: 'Preuve sociale N°1 ! Les témoignages génèrent 3x plus de conversions'
            },
            {
              id: 'faq',
              icon: '❓',
              title: 'FAQ - Questions fréquentes',
              description: 'Chaque objection levée = +15% conversions - "Combien de séances ?" "Ça marche vraiment ?"'
            }
          ].map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <label className={styles.sectionLabel}>
                <input
                  type="checkbox"
                  checked={responses.sectionsEnabled?.[section.id] || false}
                  onChange={(e) => updateResponse('sectionsEnabled', {
                    ...responses.sectionsEnabled,
                    [section.id]: e.target.checked
                  })}
                />
                <div className={styles.sectionInfo}>
                  <h4>{section.icon} {section.title}</h4>
                  <p>{section.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Contenus disponibles */}
      <div className={styles.section}>
        <h3>📁 Contenus disponibles</h3>
        <div className={styles.sectionDescription}>
          Évaluation de vos contenus visuels et textuels
        </div>
        <div className={styles.helpText}>
          💡 Une photo portrait professionnelle est essentielle pour la crédibilité
        </div>

        <div className={styles.field}>
          <label>Photo portrait professionnelle *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasPortraitPhoto"
                value="yes"
                checked={responses.hasPortraitPhoto === 'yes'}
                onChange={(e) => updateResponse('hasPortraitPhoto', e.target.value)}
              />
              J'ai une photo
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasPortraitPhoto"
                value="to-take"
                checked={responses.hasPortraitPhoto === 'to-take'}
                onChange={(e) => updateResponse('hasPortraitPhoto', e.target.value)}
              />
              Je dois la faire prendre
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasPortraitPhoto"
                value="alternative"
                checked={responses.hasPortraitPhoto === 'alternative'}
                onChange={(e) => updateResponse('hasPortraitPhoto', e.target.value)}
              />
              Alternative
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label>Photos activité disponibles</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="photosStatus"
                value="ready"
                checked={responses.photosStatus === 'ready'}
                onChange={(e) => updateResponse('photosStatus', e.target.value)}
              />
              Photos prêtes
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="photosStatus"
                value="to-prepare"
                checked={responses.photosStatus === 'to-prepare'}
                onChange={(e) => updateResponse('photosStatus', e.target.value)}
              />
              À préparer
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="photosCount">Combien de photos ?</label>
          <input
            type="number"
            id="photosCount"
            value={responses.photosCount || ''}
            onChange={(e) => updateResponse('photosCount', parseInt(e.target.value) || undefined)}
            placeholder="Ex: 3"
            min="0"
            max="50"
          />
        </div>

        <div className={styles.field}>
          <label>Textes *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="all-ready"
                checked={responses.textsStatus === 'all-ready'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Tous rédigés
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="ideas-only"
                checked={responses.textsStatus === 'ideas-only'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Idées seulement
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="textsStatus"
                value="need-help"
                checked={responses.textsStatus === 'need-help'}
                onChange={(e) => updateResponse('textsStatus', e.target.value)}
              />
              Besoin d'aide
            </label>
          </div>
        </div>
      </div>

      {/* Section 4: Votre expertise */}
      <div className={styles.section}>
        <h3>🎓 Votre expertise</h3>
        <div className={styles.sectionDescription}>
          Expérience et formations professionnelles
        </div>

        <div className={styles.field}>
          <label htmlFor="yearsExperience">Depuis combien d'années exercez-vous ?</label>
          <input
            type="number"
            id="yearsExperience"
            value={responses.yearsExperience || ''}
            onChange={(e) => updateResponse('yearsExperience', parseInt(e.target.value) || undefined)}
            placeholder="Ex: 5"
            min="0"
            max="50"
          />
        </div>

        <div className={styles.field}>
          <label>Avez-vous des certifications professionnelles ?</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasCertifications"
                value="yes"
                checked={responses.hasCertifications === 'yes'}
                onChange={(e) => updateResponse('hasCertifications', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasCertifications"
                value="no"
                checked={responses.hasCertifications === 'no'}
                onChange={(e) => updateResponse('hasCertifications', e.target.value)}
              />
              Non
            </label>
          </div>
          <div className={styles.helpText}>
            💡 Si oui, nous les détaillerons pendant la session de configuration
          </div>
        </div>
      </div>

      {/* Section 5: Votre approche */}
      <div className={styles.section}>
        <h3>🎯 Votre approche</h3>
        <div className={styles.sectionDescription}>
          Votre public cible et méthodes d'accompagnement
        </div>

        <div className={styles.field}>
          <label>Votre public cible principal</label>
          <div className={styles.sectionsGrid}>
            {[
              {
                id: 'particuliers',
                icon: '👤',
                title: 'Particuliers',
                description: 'Accompagnement personnel et individuel'
              },
              {
                id: 'entrepreneurs',
                icon: '🚀',
                title: 'Entrepreneurs',
                description: 'Créateurs d\'entreprise et dirigeants'
              },
              {
                id: 'cadres-managers',
                icon: '👔',
                title: 'Cadres / Managers',
                description: 'Management et leadership en entreprise'
              },
              {
                id: 'equipes-entreprises',
                icon: '🏢',
                title: 'Équipes / Entreprises',
                description: 'Coaching d\'equipe et accompagnement collectif'
              },
              {
                id: 'jeunes-professionnels',
                icon: '🎆',
                title: 'Jeunes professionnels',
                description: 'Début de carrière et orientation'
              },
              {
                id: 'personnes-reconversion',
                icon: '🔄',
                title: 'Personnes en reconversion',
                description: 'Changement de carrière et transition'
              },
              {
                id: 'etudiants',
                icon: '🎓',
                title: 'Étudiants',
                description: 'Orientation et préparation professionnelle'
              },
              {
                id: 'sportifs',
                icon: '🏅',
                title: 'Sportifs',
                description: 'Performance sportive et préparation mentale'
              },
              {
                id: 'parents',
                icon: '👪',
                title: 'Parents',
                description: 'Accompagnement parental et familial'
              },
              {
                id: 'seniors',
                icon: '🧓',
                title: 'Seniors',
                description: 'Accompagnement des plus de 50 ans'
              },
              {
                id: 'autre',
                icon: '❓',
                title: 'Autre',
                description: 'Public spécifique non listé'
              }
            ].map((target) => (
              <div key={target.id} className={styles.sectionCard}>
                <label className={styles.sectionLabel}>
                  <input
                    type="checkbox"
                    checked={responses.targetAudience?.includes(target.id) || false}
                    onChange={(e) => {
                      const current = responses.targetAudience || [];
                      const updated = e.target.checked 
                        ? [...current, target.id]
                        : current.filter((item: string) => item !== target.id);
                      updateResponse('targetAudience', updated);
                    }}
                  />
                  <div className={styles.sectionInfo}>
                    <h4>{target.icon} {target.title}</h4>
                    <p>{target.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Formats de séances proposés</label>
          <div className={styles.sectionsGrid}>
            {[
              {
                id: 'individuel-presentiel',
                icon: '👥',
                title: 'Séances individuelles en présentiel',
                description: 'Accompagnement personnalisé en face à face'
              },
              {
                id: 'individuel-visio',
                icon: '📹',
                title: 'Séances individuelles en visio',
                description: 'Accompagnement à distance par vidéoconférence'
              },
              {
                id: 'seances-groupe',
                icon: '👥',
                title: 'Séances de groupe',
                description: 'Accompagnement collectif et dynamique de groupe'
              },
              {
                id: 'ateliers-formations',
                icon: '🎯',
                title: 'Ateliers / Formations',
                description: 'Formations structurées et ateliers thématiques'
              },
              {
                id: 'accompagnement-sur-mesure',
                icon: '🔧',
                title: 'Accompagnement sur mesure',
                description: 'Programme adapté aux besoins spécifiques'
              },
              {
                id: 'programmes-en-ligne',
                icon: '📱',
                title: 'Programmes en ligne',
                description: 'Formations et accompagnement digitalisés'
              },
              {
                id: 'autre',
                icon: '❓',
                title: 'Autre',
                description: 'Format spécifique non listé'
              }
            ].map((format) => (
              <div key={format.id} className={styles.sectionCard}>
                <label className={styles.sectionLabel}>
                  <input
                    type="checkbox"
                    checked={responses.sessionFormats?.includes(format.id) || false}
                    onChange={(e) => {
                      const current = responses.sessionFormats || [];
                      const updated = e.target.checked 
                        ? [...current, format.id]
                        : current.filter((item: string) => item !== format.id);
                      updateResponse('sessionFormats', updated);
                    }}
                  />
                  <div className={styles.sectionInfo}>
                    <h4>{format.icon} {format.title}</h4>
                    <p>{format.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="typicalDuration">Durée typique d'un accompagnement</label>
          <input
            type="text"
            id="typicalDuration"
            value={responses.typicalDuration || ''}
            onChange={(e) => updateResponse('typicalDuration', e.target.value)}
            placeholder="Ex: 3 à 6 mois"
          />
        </div>
      </div>

      {/* Section 6: Réservation */}
      <div className={styles.section}>
        <h3>📋 Réservation</h3>
        <div className={styles.sectionDescription}>
          Gestion des prises de rendez-vous
        </div>
        <div className={styles.helpText}>
          💡 Un système de réservation automatique augmente les conversions de +80%
        </div>

        <div className={styles.field}>
          <label>Utilisez-vous Calendly ou un système de réservation en ligne ? *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasCalendly"
                value="calendly"
                checked={responses.hasCalendly === 'calendly'}
                onChange={(e) => updateResponse('hasCalendly', e.target.value)}
              />
              Oui, j'ai Calendly
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasCalendly"
                value="other-tool"
                checked={responses.hasCalendly === 'other-tool'}
                onChange={(e) => updateResponse('hasCalendly', e.target.value)}
              />
              Oui, j'utilise un autre outil
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasCalendly"
                value="manual"
                checked={responses.hasCalendly === 'manual'}
                onChange={(e) => updateResponse('hasCalendly', e.target.value)}
              />
              Non, je gère manuellement
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="bookingUrl">Lien Calendly ou autre système (si vous en avez un)</label>
          <input
            type="url"
            id="bookingUrl"
            value={responses.bookingUrl || ''}
            onChange={(e) => updateResponse('bookingUrl', e.target.value)}
            placeholder="https://calendly.com/votre-profil"
          />
        </div>
      </div>

      {/* Section 7: Couleurs & Style */}
      <div className={styles.section}>
        <h3>🎨 Couleurs & Style</h3>
        <div className={styles.sectionDescription}>
          Définition de l'ambiance et de l'identité visuelle
        </div>

        <div className={styles.field}>
          <label>Couleurs de votre marque *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="precise"
                checked={responses.colorsType === 'precise'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Couleurs précises
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="general-ideas"
                checked={responses.colorsType === 'general-ideas'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Idées générales
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorsType"
                value="coaching-suggestions"
                checked={responses.colorsType === 'coaching-suggestions'}
                onChange={(e) => updateResponse('colorsType', e.target.value)}
              />
              Je veux des suggestions adaptées au coaching
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="colorsValue">Indiquez vos couleurs (si vous en avez)</label>
          <input
            type="text"
            id="colorsValue"
            value={responses.colorsValue || ''}
            onChange={(e) => updateResponse('colorsValue', e.target.value)}
            placeholder="Ex: Bleu apaisant #6A9FB5, Beige #F0E5D8"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="ambiance">Ambiance générale du site</label>
          <select
            id="ambiance"
            value={responses.ambiance || ''}
            onChange={(e) => updateResponse('ambiance', e.target.value)}
          >
            <option value="">Choisir une ambiance (optionnel)</option>
            <option value="confiance-serieux">Confiance et sérieux</option>
            <option value="bienveillance-ecoute">Bienveillance et écoute</option>
            <option value="energie-motivation">Energie et motivation</option>
            <option value="sagesse-experience">Sagesse et expérience</option>
            <option value="modernite-innovation">Modernité et innovation</option>
          </select>
        </div>
      </div>

      {/* Section 8: Présence en ligne & Notes */}
      <div className={styles.section}>
        <h3>🌐 Présence en ligne & Notes</h3>
        <div className={styles.sectionDescription}>
          Votre présence numérique et informations complémentaires
        </div>

        <div className={styles.field}>
          <label>Avez-vous un site web existant ? *</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasExistingSite"
                value="yes"
                checked={responses.hasExistingSite === 'yes'}
                onChange={(e) => updateResponse('hasExistingSite', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasExistingSite"
                value="no"
                checked={responses.hasExistingSite === 'no'}
                onChange={(e) => updateResponse('hasExistingSite', e.target.value)}
              />
              Non
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="existingSiteUrl">URL de votre site actuel (si vous en avez un)</label>
          <input
            type="url"
            id="existingSiteUrl"
            value={responses.existingSiteUrl || ''}
            onChange={(e) => updateResponse('existingSiteUrl', e.target.value)}
            placeholder="https://votre-coaching.fr"
          />
        </div>

        <div className={styles.field}>
          <label>Êtes-vous sur les réseaux sociaux ?</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasSocialMedia"
                value="yes"
                checked={responses.hasSocialMedia === 'yes'}
                onChange={(e) => updateResponse('hasSocialMedia', e.target.value)}
              />
              Oui
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="hasSocialMedia"
                value="no"
                checked={responses.hasSocialMedia === 'no'}
                onChange={(e) => updateResponse('hasSocialMedia', e.target.value)}
              />
              Non
            </label>
          </div>
          <div className={styles.helpText}>
            💡 Si oui, je récupérerai vos liens pendant la session de configuration
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="notes">Informations importantes / Notes libres</label>
          <textarea
            id="notes"
            value={responses.notes || ''}
            onChange={(e) => updateResponse('notes', e.target.value)}
            placeholder="Ce qui vous rend unique, particularités, deadline..."
            rows={4}
          />
        </div>
      </div>
    </>
  );
}


export default FormulairePréSession;