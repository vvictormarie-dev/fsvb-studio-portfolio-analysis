import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByOrderId, updateOrderStatus, type OrderRecord } from '../config/supabase';
import LandingPreview from '../components/LandingPreview';
import PayPalButton from '../components/PayPalButton';
import styles from './OrderConfirmationPage.module.css';

interface OrderConfirmationPageProps {}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger la commande depuis Supabase
  useEffect(() => {
    const loadOrder = async () => {
      if (!id) {
        setError('ID de commande manquant');
        setLoading(false);
        return;
      }

      try {
        const result = await getOrderByOrderId(id);
        
        if (result.success && result.data) {
          setOrder(result.data);
          console.log('✅ Commande chargée:', result.data);
        } else {
          setError('Commande non trouvée');
          console.error('❌ Erreur de chargement:', result.error);
        }
      } catch (error) {
        setError('Erreur lors du chargement de la commande');
        console.error('❌ Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  // Gestionnaire de succès PayPal
  const handlePayPalSuccess = async (paymentData: any) => {
    if (!order) return;

    try {
      // Mettre à jour le statut de paiement dans Supabase
      const updateResult = await updateOrderStatus(order.order_id, {
        payment_status: 'paid',
        stripe_payment_id: paymentData.paymentID, // Stockage de l'ID PayPal
        status: 'in_progress' // Changer le statut à "en cours"
      });
      
      if (updateResult.success) {
        console.log('✅ Statut de paiement mis à jour');
        // Rediriger vers la page de confirmation
        navigate(`/confirmation?paymentId=${paymentData.paymentID}&orderNumber=${order.order_id}`);
      } else {
        console.error('❌ Erreur mise à jour:', updateResult.error);
        alert('Paiement réussi mais erreur de mise à jour. Veuillez contacter le support.');
      }
    } catch (error) {
      console.error('❌ Erreur paiement:', error);
      alert('Erreur lors du traitement du paiement. Veuillez réessayer.');
    }
  };

  // Gestionnaire d'erreur PayPal
  const handlePayPalError = (error: any) => {
    console.error('❌ Erreur PayPal:', error);
    alert('Erreur PayPal. Veuillez réessayer.');
  };

  // Chargement
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  // Erreur
  if (error || !order) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>😕 Commande introuvable</h1>
          <p>{error || 'Cette commande n\'existe pas ou a été supprimée.'}</p>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/')}
          >
            🏠 Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const templateName = order.template === 'landing-solo' ? 'Site Sur-Mesure' : 
                      order.template === 'restaurant' ? 'Site Restaurant' : 
                      'Site Coach';
                      
  const price = order.total_amount || 350;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>🎯 Confirmation de commande</h1>
          <p className={styles.subtitle}>
            Vérifiez votre commande et procédez au paiement sécurisé
          </p>
        </div>

        {/* Section Récapitulatif */}
        <section className={styles.summary}>
          <h2 className={styles.sectionTitle}>📋 Récapitulatif de votre commande</h2>
          
          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Produit :</span>
              <span className={styles.value}>{templateName}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span className={styles.label}>Template :</span>
              <span className={styles.value}>{order.template}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span className={styles.label}>Entreprise :</span>
              <span className={styles.value}>{order.company_name}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span className={styles.label}>Email :</span>
              <span className={styles.value}>{order.email}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span className={styles.label}>N° de commande :</span>
              <span className={styles.value}>{order.order_id}</span>
            </div>
            
            <div className={`${styles.summaryRow} ${styles.priceRow}`}>
              <span className={styles.label}>Prix total :</span>
              <span className={styles.price}>{price}€</span>
            </div>
          </div>
        </section>

        {/* Section Preview */}
        <section className={styles.preview}>
          <h2 className={styles.sectionTitle}>🔍 Aperçu de votre site</h2>
          <div className={styles.previewContainer}>
            {/* DEBUG: Afficher les données reçues */}
            {console.log('🔍 OrderConfirmationPage DEBUG:', {
              template: order.template,
              hasFormData: !!order.form_data,
              formDataKeys: Object.keys(order.form_data || {}),
              colorMode: order.color_mode,
              formDataColors: {
                primary: order.form_data?.primaryColor,
                secondary: order.form_data?.secondaryColor,
                accent: order.form_data?.accentColor,
                background: order.form_data?.backgroundColor,
                text: order.form_data?.textColor
              },
              hasSectionsConfig: !!order.sections_config,
              sectionsConfigLength: Array.isArray(order.sections_config) ? order.sections_config.length : 'Not array',
              theme: order.theme
            })}
            <LandingPreview
              selectedTemplate={order.template as 'landing-solo' | 'restaurant' | 'coach'}
              formData={order.form_data}
              colorMode={order.color_mode as 'auto' | 'custom'}
              sectionsConfig={order.sections_config || []}
              restaurantSectionsConfig={order.template === 'restaurant' ? order.sections_config : []}
              coachSectionsConfig={order.template === 'coach' ? order.sections_config : []}
              theme={order.theme}
              className={styles.previewFrame}
            />
          </div>
        </section>

        {/* Section Paiement */}
        <section className={styles.payment}>
          <h2 className={styles.sectionTitle}>💳 Paiement sécurisé</h2>
          
          <div className={styles.paymentContent}>
            <div className={styles.paymentInfo}>
              <p className={styles.paymentDescription}>
                🔒 Paiement sécurisé via PayPal - Aucune donnée bancaire n'est stockée sur nos serveurs
              </p>
              
              <div className={styles.paymentDetails}>
                <div className={styles.paymentRow}>
                  <span>Montant à payer :</span>
                  <span className={styles.paymentAmount}>{price}€</span>
                </div>
                <div className={styles.paymentRow}>
                  <span>Livraison :</span>
                  <span>5 jours maximum</span>
                </div>
              </div>
            </div>
            
            {/* Container PayPal */}
            <div className={styles.paypalSection}>
              <PayPalButton
                amount={price.toString()}
                orderId={order.order_id}
                companyName={order.company_name}
                onSuccess={handlePayPalSuccess}
                onError={handlePayPalError}
              />
            </div>
          </div>
        </section>
        
        {/* Footer Actions */}
        <div className={styles.actions}>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/configurator')}
          >
            ← Modifier la configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;