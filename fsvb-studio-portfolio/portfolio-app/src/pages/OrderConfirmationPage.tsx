import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByOrderId, type OrderRecord } from '../config/supabase';
import LandingPreview from '../components/LandingPreview';
import OrderValidation from '../components/OrderValidation'; // NOUVEAU COMPOSANT
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

  // Gestionnaire de succès unifié (PayPal + Marketplace)
  const handleOrderSuccess = async (paymentData?: any) => {
    const isMarketplace = paymentData?.source === 'marketplace';
    const paymentId = isMarketplace ? paymentData.marketplaceOrderId : paymentData?.paymentID;
    
    console.log(isMarketplace ? '✅ Commande marketplace validée' : '✅ Paiement PayPal réussi', paymentData);
    
    // Redirection vers page de confirmation
    const params = new URLSearchParams({
      orderNumber: order?.order_id || '',
      ...(paymentId && { paymentId }),
      ...(isMarketplace && { source: 'marketplace' })
    });
    
    navigate(`/confirmation?${params.toString()}`);
  };

  // Gestionnaire d'erreur unifié
  const handleOrderError = (error: any) => {
    console.error('❌ Erreur validation commande:', error);
    alert('Erreur lors de la validation. Veuillez réessayer ou contacter le support.');
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
            <LandingPreview
              selectedTemplate={order.template as 'landing-solo' | 'restaurant' | 'coach'}
              formData={order.form_data}
              sectionsConfig={order.sections_config || []}
              restaurantSectionsConfig={order.template === 'restaurant' ? order.sections_config : []}
              coachSectionsConfig={order.template === 'coach' ? order.sections_config : []}
              theme={order.theme}
              className={styles.previewFrame}
            />
          </div>
        </section>

        {/* Section Validation */}
        <section className={styles.payment}>
          <OrderValidation
            order={order}
            onSuccess={handleOrderSuccess}
            onError={handleOrderError}
          />
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