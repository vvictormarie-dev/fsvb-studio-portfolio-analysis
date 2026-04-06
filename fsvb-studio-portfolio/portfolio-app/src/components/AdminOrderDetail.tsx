import React, { useState, useEffect } from 'react';
import { supabase, updateOrderStatus, deleteOrder, listProjectImages } from '../config/supabase';
import type { OrderRecord } from '../types/orders';
import LandingPreview from './LandingPreview';
import styles from './AdminOrderDetail.module.css';

interface AdminOrderDetailProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const AdminOrderDetail: React.FC<AdminOrderDetailProps> = ({ 
  orderId, 
  isOpen, 
  onClose 
}) => {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [projectImages, setProjectImages] = useState<Array<{name: string, url: string, path: string}>>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    if (orderId && isOpen) {
      loadOrderDetails();
      loadProjectImages();
    }
  }, [orderId, isOpen]);

  const loadProjectImages = async () => {
    if (!orderId) return;
    
    setLoadingImages(true);
    try {
      const result = await listProjectImages(orderId);
      if (result.success) {
        setProjectImages(result.images || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const loadOrderDetails = async () => {
    if (!orderId || !supabase) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Erreur lors du chargement de la commande:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      const result = await updateOrderStatus(order.order_id, { status: newStatus as OrderRecord['status'] });
      if (result.success) {
        setOrder({ ...order, status: newStatus as OrderRecord['status'] });
        // Forcer le rechargement des données pour synchroniser avec la table
        await loadOrderDetails();
        alert('✅ Statut mis à jour avec succès !');
      } else {
        const errorMsg = result.isConfigError 
          ? 'Configuration Supabase manquante - vérifiez vos variables d\'environnement'
          : (typeof result.error === 'string' ? result.error : 'Erreur de connexion à la base de données');
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('❌ Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(false);
    }
  };

  const handlePaymentUpdate = async (newPaymentStatus: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      const result = await updateOrderStatus(order.order_id, { 
        payment_status: newPaymentStatus as OrderRecord['payment_status'] 
      });
      
      if (result.success) {
        setOrder({ ...order, payment_status: newPaymentStatus as OrderRecord['payment_status'] });
        // Forcer le rechargement des données pour synchroniser avec la table
        await loadOrderDetails();
        alert('✅ Statut de paiement mis à jour !');
      } else {
        const errorMsg = result.isConfigError 
          ? 'Configuration Supabase manquante - vérifiez vos variables d\'environnement'
          : (typeof result.error === 'string' ? result.error : 'Erreur de connexion à la base de données');
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du paiement:', error);
      alert('❌ Erreur lors de la mise à jour du paiement');
    } finally {
      setUpdating(false);
    }
  };

  // Fonction pour confirmer et sauvegarder la commande
  const handleSaveAndConfirm = async () => {
    if (!order) return;

    setUpdating(true);
    try {
      const updates = {
        status: 'in_progress' as OrderRecord['status'],
        payment_status: 'paid' as OrderRecord['payment_status']
      };

      const result = await updateOrderStatus(order.order_id, updates);
      
      if (result.success) {
        // Mise à jour de l'état local
        setOrder({ ...order, ...updates });
        // Forcer le rechargement des données pour synchroniser avec la table
        await loadOrderDetails();
        
        // TODO: Envoyer email de confirmation au client
        alert('✅ Commande confirmée et sauvegardée !');
      } else {
        const errorMsg = result.isConfigError 
          ? 'Configuration Supabase manquante - vérifiez vos variables d\'environnement'
          : (typeof result.error === 'string' ? result.error : 'Erreur de connexion à la base de données');
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
      alert('❌ Erreur lors de la confirmation');
    } finally {
      setUpdating(false);
    }
  };

  // Fonction pour supprimer la commande
  const handleDeleteOrder = async () => {
    if (!order) return;
    
    const confirmed = window.confirm(
      `⚠️ Êtes-vous sûr de vouloir supprimer cette commande ?\n\n` +
      `Commande: ${order.order_id}\n` +
      `Client: ${order.company_name}\n\n` +
      `Cette action est irréversible !`
    );
    
    if (!confirmed) return;

    setUpdating(true);
    try {
      const result = await deleteOrder(order.order_id);
      
      if (result.success) {
        alert('✅ Commande supprimée avec succès !');
        onClose(); // Fermer le panneau de détails
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('❌ Erreur lors de la suppression de la commande');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getStatusOptions = () => [
    { value: 'pending', label: 'En attente' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'waiting_client', label: 'Attente client' },
    { value: 'done', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' }
  ];

  const getPaymentOptions = () => [
    { value: 'unpaid', label: 'Non payé' },
    { value: 'paid', label: 'Payé' },
    { value: 'refunded', label: 'Remboursé' }
  ];

  const getProductTypeLabel = (type: string) => {
    const labels = {
      'site-vitrine': 'Site vitrine',
      'fiches-produits': 'Fiches produits',
      'pack-complet': 'Pack complet'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Détails de la commande</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>Chargement...</div>
          ) : order ? (
            <>
              {/* Informations générales */}
              <section className={styles.section}>
                <h3>Informations générales</h3>
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label>ID Commande</label>
                    <span>{order.order_id}</span>
                  </div>
                  <div className={styles.field}>
                    <label>Date de création</label>
                    <span>{formatDate(order.created_at || '')}</span>
                  </div>
                  <div className={styles.field}>
                    <label>Produit</label>
                    <span>{getProductTypeLabel(order.product_type)}</span>
                  </div>
                  <div className={styles.field}>
                    <label>Montant total</label>
                    <span>{order.total_amount ? `${order.total_amount}€` : 'Non défini'}</span>
                  </div>
                </div>
              </section>

              {/* Informations client */}
              <section className={styles.section}>
                <h3>Informations client</h3>
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label>Nom de l'entreprise</label>
                    <span>{order.company_name}</span>
                  </div>
                  <div className={styles.field}>
                    <label>Email</label>
                    <span>{order.email}</span>
                  </div>
                  <div className={styles.field}>
                    <label>Secteur d'activité</label>
                    <span>{order.business_sector || 'Non spécifié'}</span>
                  </div>
                  <div className={styles.field}>
                    <label>Site web actuel</label>
                    <span>{order.current_website || 'Aucun'}</span>
                  </div>
                </div>
              </section>

              {/* Statuts */}
              <section className={styles.section}>
                <h3>Statuts</h3>
                
                {/* Bouton Sauvegarder & Confirmer */}
                <div className={styles.quickActions}>
                  <button
                    onClick={handleSaveAndConfirm}
                    disabled={updating || order.status === 'in_progress'}
                    className={styles.saveButton}
                  >
                    {updating ? '⏳ Traitement...' : '✅ Sauvegarder & Confirmer'}
                  </button>
                  <button
                    onClick={handleDeleteOrder}
                    disabled={updating}
                    className={styles.deleteButton}
                  >
                    {updating ? '⏳ Suppression...' : '🗑️ Supprimer la commande'}
                  </button>
                  <p className={styles.saveDescription}>
                    Confirme automatiquement la commande et marque le paiement comme reçu.
                  </p>
                </div>

                <div className={styles.statusGrid}>
                  <div className={styles.statusField}>
                    <label>Statut de la commande</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      disabled={updating}
                      className={styles.statusSelect}
                    >
                      {getStatusOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.statusField}>
                    <label>Statut du paiement</label>
                    <select
                      value={order.payment_status}
                      onChange={(e) => handlePaymentUpdate(e.target.value)}
                      disabled={updating}
                      className={styles.statusSelect}
                    >
                      {getPaymentOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Images uploadées par le client */}
              <section className={styles.section}>
                <h3>📷 Images uploadées par le client</h3>
                {loadingImages ? (
                  <div className={styles.loading}>Chargement des images...</div>
                ) : projectImages.length > 0 ? (
                  <div className={styles.imagesGrid}>
                    {projectImages.map((image) => (
                      <div key={image.path} className={styles.imageItem}>
                        <div className={styles.imageContainer}>
                          <img 
                            src={image.url} 
                            alt={image.name}
                            className={styles.imagePreview}
                            loading="lazy"
                          />
                        </div>
                        <div className={styles.imageInfo}>
                          <p className={styles.imageName}>{image.name}</p>
                          <button
                            onClick={() => window.open(image.url, '_blank')}
                            className={styles.imageLink}
                          >
                            🔗 Voir en grand
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noImages}>
                    <p>Aucune image uploadée par le client</p>
                    <small>Les images apparaîtront ici quand le client utilisera le formulaire de configuration</small>
                  </div>
                )}
              </section>

              {/* Configuration */}
              {order.sections_config && (
                <section className={styles.section}>
                  <h3>Configuration du site</h3>
                  <div className={styles.configContainer}>
                    <pre className={styles.configCode}>
                      {typeof order.sections_config === 'string' 
                        ? order.sections_config 
                        : JSON.stringify(order.sections_config, null, 2)
                      }
                    </pre>
                  </div>
                </section>
              )}

              {/* Preview client validé */}
              <section className={styles.section}>
                <h3>🔍 Preview validé par le client</h3>
                <div className={styles.previewContainer}>
                  {order.form_data ? (
                    <LandingPreview
                      selectedTemplate={order.template as 'landing-solo' | 'restaurant' | 'coach'}
                      formData={order.form_data}
                      sectionsConfig={order.template === 'landing-solo' ? (order.sections_config || []) : []}
                      restaurantSectionsConfig={order.template === 'restaurant' ? (order.sections_config || []) : []}
                      coachSectionsConfig={order.template === 'coach' ? (order.sections_config || []) : []}
                      theme={order.theme}
                      className={styles.adminPreview}
                    />
                  ) : (
                    <div className={styles.noPreview}>
                      <p>Aucune configuration de preview disponible</p>
                      <small>La preview apparaîtra ici une fois que le client aura configuré son site</small>
                    </div>
                  )}
                </div>
              </section>

              {/* Notes */}
              <section className={styles.section}>
                <h3>Description du projet</h3>
                <div className={styles.description}>
                  {order.project_description || 'Aucune description fournie'}
                </div>
              </section>
            </>
          ) : (
            <div className={styles.error}>
              Impossible de charger les détails de la commande
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;