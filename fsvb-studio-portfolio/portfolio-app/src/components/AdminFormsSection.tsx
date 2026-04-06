import React, { useEffect, useState } from 'react';
import type { PreSessionFormData, FormStatus } from '../types/preSession';
import { PreSessionFormService } from '../services/preSessionFormService';
import styles from './AdminFormsSection.module.css';

interface AdminFormsSectionProps {
  className?: string;
}

const AdminFormsSection: React.FC<AdminFormsSectionProps> = ({ className }) => {
  const [forms, setForms] = useState<PreSessionFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<PreSessionFormData | null>(null);
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);

  // Charger tous les formulaires
  const loadForms = async () => {
    try {
      setLoading(true);
      const formsData = await PreSessionFormService.getAllForms();
      setForms(formsData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des formulaires');
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le statut d'un formulaire
  const updateFormStatus = async (formId: string, newStatus: FormStatus) => {
    try {
      setUpdateLoading(formId);
      await PreSessionFormService.updateFormStatus(formId, newStatus);
      await loadForms(); // Recharger la liste
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour');
    } finally {
      setUpdateLoading(null);
    }
  };

  // Supprimer un formulaire
  const deleteForm = async (formId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ?')) {
      return;
    }

    try {
      setUpdateLoading(formId);
      await PreSessionFormService.deleteForm(formId);
      await loadForms(); // Recharger la liste
      setSelectedForm(null); // Fermer le détail si ouvert
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
    } finally {
      setUpdateLoading(null);
    }
  };

  // Générer le JSON pour le configurateur
  const generateConfiguratorJSON = (form: PreSessionFormData) => {
    // Convertir les réponses du formulaire en format sectionsConfig
    const configJSON = {
      templateType: form.templateType,
      responses: form.responses,
      generatedAt: new Date().toISOString(),
      sessionId: form.sessionId,
      clientEmail: form.clientEmail,
      // TODO: Mapping vers sectionsConfig selon le template
      mappedSections: mapToSectionsConfig(form)
    };

    // Télécharger le JSON
    const dataStr = JSON.stringify(configJSON, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `config_${form.sessionId}_${form.templateType}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Mapping des réponses vers sectionsConfig (à implémenter selon tes besoins)
  const mapToSectionsConfig = (form: PreSessionFormData) => {
    const responses = form.responses as any;
    
    if (form.templateType === 'coach') {
      // Mapping spécifique pour le template Coach
      const sectionsConfig = [
        {
          id: "navbar",
          label: "Navigation",
          enabled: true,
          required: true,
          configurable: true,
          props: {
            logoText: responses.activityName || responses.coachName
          }
        },
        {
          id: "hero",
          label: "En-tête principal",
          enabled: true,
          required: true,
          configurable: true,
          props: {
            title: responses.coachName,
            subtitle: responses.activityDescription,
            coachingType: responses.coachingType,
            ctaText: responses.hasCalendly === 'manual' ? 'Me contacter' : 'Prendre RDV'
          }
        },
        {
          id: "about",
          label: "Mon parcours",
          enabled: responses.sectionsEnabled?.about || false,
          required: false,
          configurable: true,
          props: {
            yearsExperience: responses.yearsExperience,
            hasPortraitPhoto: responses.hasPortraitPhoto
          }
        },
        {
          id: "approach",
          label: "Ma méthode",
          enabled: responses.sectionsEnabled?.method || false,
          required: false,
          configurable: true,
          props: {
            targetAudience: responses.targetAudience,
            sessionFormats: responses.sessionFormats,
            typicalDuration: responses.typicalDuration
          }
        },
        {
          id: "domains",
          label: "Mes domaines",
          enabled: responses.sectionsEnabled?.domains || false,
          required: true,
          configurable: true,
          props: {
            coachingType: responses.coachingType,
            targetAudience: responses.targetAudience
          }
        },
        {
          id: "services",
          label: "Mes formules",
          enabled: true,
          required: true,
          configurable: true,
          props: {
            sessionFormats: responses.sessionFormats,
            typicalDuration: responses.typicalDuration
          }
        },
        {
          id: "certifications",
          label: "Formations / Certifications",
          enabled: responses.sectionsEnabled?.certifications || false,
          required: false,
          configurable: true,
          props: {
            hasCertifications: responses.hasCertifications,
            yearsExperience: responses.yearsExperience
          }
        },
        {
          id: "testimonials",
          label: "Témoignages clients",
          enabled: responses.sectionsEnabled?.testimonials || false,
          required: false,
          configurable: true,
          props: {}
        },
        {
          id: "faq",
          label: "FAQ - Questions fréquentes",
          enabled: responses.sectionsEnabled?.faq || false,
          required: false,
          configurable: true,
          props: {
            coachingType: responses.coachingType
          }
        },
        {
          id: "booking",
          label: "Prise de RDV",
          enabled: true,
          required: true,
          configurable: true,
          props: {
            hasCalendly: responses.hasCalendly,
            bookingUrl: responses.bookingUrl
          }
        },
        {
          id: "contact",
          label: "Contact",
          enabled: true,
          required: false,
          configurable: true,
          props: {
            email: responses.email,
            phone: responses.phone,
            hasExistingSite: responses.hasExistingSite,
            existingSiteUrl: responses.existingSiteUrl
          }
        },
        {
          id: "footer",
          label: "Pied de page",
          enabled: true,
          required: true,
          configurable: true,
          props: {
            coachName: responses.coachName,
            activityName: responses.activityName
          }
        }
      ];

      // Ajouter les données globales de style et couleurs
      return {
        sectionsConfig,
        globalProps: {
          colors: {
            type: responses.colorsType,
            value: responses.colorsValue,
            ambiance: responses.ambiance
          },
          content: {
            textsStatus: responses.textsStatus,
            photosStatus: responses.photosStatus,
            photosCount: responses.photosCount
          },
          business: {
            coachingType: responses.coachingType,
            yearsExperience: responses.yearsExperience,
            hasSocialMedia: responses.hasSocialMedia
          },
          notes: responses.notes
        }
      };
    }
    
    // Pour les autres templates, retourner les réponses brutes en attendant leur implémentation
    return form.responses;
  };

  useEffect(() => {
    loadForms();
  }, []);

  const getStatusBadge = (status: FormStatus) => {
    const statusConfig: Record<FormStatus, { label: string; className: string }> = {
      'pending': { label: 'En attente', className: styles.statusPending },
      'in-progress': { label: 'En cours', className: styles.statusInProgress },
      'reviewed': { label: 'Traité', className: styles.statusReviewed }
    };

    const config = statusConfig[status];
    return <span className={`${styles.statusBadge} ${config.className}`}>{config.label}</span>;
  };

  const getTemplateIcon = (templateType: string) => {
    const icons = {
      'landing-solo': '💼',
      'restaurant': '🍽️',
      'coach': '👨‍💼'
    };
    return icons[templateType as keyof typeof icons] || '📄';
  };

  if (loading) {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Chargement des formulaires...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <h2>📋 Formulaires Pré-Session</h2>
        <div className={styles.headerActions}>
          <button 
            onClick={loadForms} 
            className={styles.refreshButton}
            disabled={loading}
          >
            🔄 Actualiser
          </button>
          <div className={styles.statsInfo}>
            Total: <strong>{forms.length}</strong> formulaires
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <strong>❌ Erreur:</strong> {error}
          <button onClick={() => setError(null)} className={styles.closeError}>×</button>
        </div>
      )}

      {forms.length === 0 ? (
        <div className={styles.emptyState}>
          <p>📭 Aucun formulaire soumis pour le moment</p>
          <small>Les formulaires remplis par les clients apparaîtront ici.</small>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.formsList}>
            {forms.map((form) => (
              <div 
                key={form.id} 
                className={`${styles.formCard} ${selectedForm?.id === form.id ? styles.formCardActive : ''}`}
                onClick={() => setSelectedForm(form)}
              >
                <div className={styles.formHeader}>
                  <div className={styles.formInfo}>
                    <span className={styles.templateIcon}>
                      {getTemplateIcon(form.templateType)}
                    </span>
                    <div>
                      <h3>{form.sessionId}</h3>
                      <p className={styles.templateType}>{form.templateType}</p>
                    </div>
                  </div>
                  {getStatusBadge(form.status)}
                </div>
                
                <div className={styles.formMeta}>
                  <span>👤 {form.clientEmail}</span>
                  <span>📅 {form.createdAt ? new Date(form.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
                </div>

                <div className={styles.formActions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      generateConfiguratorJSON(form);
                    }}
                    className={styles.exportButton}
                    title="Télécharger JSON pour configurateur"
                  >
                    📥 Export JSON
                  </button>

                  {form.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (form.id) updateFormStatus(form.id, 'in-progress');
                      }}
                      disabled={updateLoading === form.id}
                      className={styles.actionButton}
                    >
                      {updateLoading === form.id ? '⏳' : '⚡'} Traiter
                    </button>
                  )}

                  {form.status === 'in-progress' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (form.id) updateFormStatus(form.id, 'reviewed');
                      }}
                      disabled={updateLoading === form.id}
                      className={styles.actionButton}
                    >
                      {updateLoading === form.id ? '⏳' : '✅'} Finaliser
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (form.id) deleteForm(form.id);
                    }}
                    disabled={updateLoading === form.id}
                    className={styles.deleteButton}
                  >
                    {updateLoading === form.id ? '⏳' : '🗑️'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedForm && (
            <div className={styles.formDetail}>
              <div className={styles.detailHeader}>
                <h3>📄 Détails du Formulaire</h3>
                <button 
                  onClick={() => setSelectedForm(null)}
                  className={styles.closeDetailButton}
                >
                  ×
                </button>
              </div>

              <div className={styles.detailContent}>
                <div className={styles.detailSection}>
                  <h4>ℹ️ Informations générales</h4>
                  <div className={styles.detailGrid}>
                    <div><strong>Session ID:</strong> {selectedForm.sessionId}</div>
                    <div><strong>Template:</strong> {selectedForm.templateType}</div>
                    <div><strong>Email client:</strong> {selectedForm.clientEmail}</div>
                    <div><strong>Statut:</strong> {getStatusBadge(selectedForm.status)}</div>
                    <div><strong>Créé le:</strong> {selectedForm.createdAt ? new Date(selectedForm.createdAt).toLocaleString('fr-FR') : 'Date inconnue'}</div>
                    {selectedForm.reviewedAt && (
                      <div><strong>Traité le:</strong> {new Date(selectedForm.reviewedAt).toLocaleString('fr-FR')}</div>
                    )}
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h4>📝 Réponses du client</h4>
                  <div className={styles.responsesContainer}>
                    <pre className={styles.responsesJSON}>
                      {JSON.stringify(selectedForm.responses, null, 2)}
                    </pre>
                  </div>
                </div>

                {selectedForm.filesUrls && Object.keys(selectedForm.filesUrls).length > 0 && (
                  <div className={styles.detailSection}>
                    <h4>📎 Fichiers joints</h4>
                    <div className={styles.filesContainer}>
                      {Object.entries(selectedForm.filesUrls).map(([key, url]) => (
                        <a 
                          key={key} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.fileLink}
                        >
                          🔗 {key}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminFormsSection;