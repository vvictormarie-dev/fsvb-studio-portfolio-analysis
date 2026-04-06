import React, { useState } from 'react';
import styles from './OrderValidation.module.css';
import PayPalButton from './PayPalButton';
import { updateOrderStatus } from '../config/supabase';
import type { OrderRecord } from '../types/orders';

interface OrderValidationProps {
  order: OrderRecord;
  onSuccess: (paymentData?: any) => void;
  onError: (error: any) => void;
}

type PaymentMethod = 'marketplace' | 'direct';

const OrderValidation: React.FC<OrderValidationProps> = ({
  order,
  onSuccess,
  onError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('direct');
  const [isValidating, setIsValidating] = useState(false);
  const [marketplaceOrderId, setMarketplaceOrderId] = useState('');

  const price = order.total_amount || 350;

  // Validation commande marketplace (ComUp/Malt)
  const handleMarketplaceValidation = async () => {
    if (!marketplaceOrderId.trim()) {
      alert('Veuillez saisir votre numéro de commande marketplace');
      return;
    }

    setIsValidating(true);
    
    try {
      // Mettre à jour le statut dans Supabase
      const updateResult = await updateOrderStatus(order.order_id, {
        payment_status: 'paid',
        payment_source: 'comeup', // ou 'malt' selon le choix
        marketplace_order_id: marketplaceOrderId,
        status: 'in_progress'
      });
      
      if (updateResult.success) {
        console.log('✅ Commande marketplace validée:', order.order_id);
        onSuccess({
          source: 'marketplace',
          orderNumber: order.order_id,
          marketplaceOrderId
        });
      } else {
        console.error('❌ Erreur validation marketplace:', updateResult.error);
        onError(new Error('Erreur lors de la validation de la commande'));
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      onError(error);
    } finally {
      setIsValidating(false);
    }
  };

  // Gestionnaire PayPal (existant)
  const handlePayPalSuccess = async (paymentData: any) => {
    try {
      const updateResult = await updateOrderStatus(order.order_id, {
        payment_status: 'paid',
        payment_source: 'paypal',
        stripe_payment_id: paymentData.paymentID,
        status: 'in_progress'
      });
      
      if (updateResult.success) {
        onSuccess(paymentData);
      } else {
        onError(new Error('Erreur lors de la mise à jour du paiement'));
      }
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>💳 Finaliser votre commande</h2>
        <p className={styles.subtitle}>
          Sélectionnez votre mode de validation selon votre situation
        </p>
      </div>

      {/* Sélection méthode */}
      <div className={styles.methodSelection}>
        <div className={styles.methodOption}>
          <label className={`${styles.methodLabel} ${selectedMethod === 'marketplace' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="marketplace"
              checked={selectedMethod === 'marketplace'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className={styles.radioInput}
            />
            <div className={styles.methodContent}>
              <div className={styles.methodIcon}>🏪</div>
              <div className={styles.methodInfo}>
                <h3 className={styles.methodTitle}>ComUp / Malt / Fiverr</h3>
                <p className={styles.methodDescription}>
                  J'ai déjà payé sur une plateforme freelance
                </p>
              </div>
            </div>
          </label>
        </div>

        <div className={styles.methodOption}>
          <label className={`${styles.methodLabel} ${selectedMethod === 'direct' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="direct"
              checked={selectedMethod === 'direct'}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
              className={styles.radioInput}
            />
            <div className={styles.methodContent}>
              <div className={styles.methodIcon}>💳</div>
              <div className={styles.methodInfo}>
                <h3 className={styles.methodTitle}>Contact direct</h3>
                <p className={styles.methodDescription}>
                  Je paie maintenant avec PayPal ({price}€)
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Section validation selon méthode choisie */}
      <div className={styles.validationSection}>
        {selectedMethod === 'marketplace' ? (
          <div className={styles.marketplaceValidation}>
            <h3 className={styles.validationTitle}>
              ✅ Validation commande marketplace
            </h3>
            <p className={styles.validationDescription}>
              Saisissez votre numéro de commande ComUp/Malt pour finaliser
            </p>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                N° de commande marketplace :
              </label>
              <input
                type="text"
                placeholder="Ex: CP-123456 ou ML-789012"
                value={marketplaceOrderId}
                onChange={(e) => setMarketplaceOrderId(e.target.value)}
                className={styles.orderIdInput}
                disabled={isValidating}
              />
            </div>
            
            <button
              onClick={handleMarketplaceValidation}
              disabled={isValidating || !marketplaceOrderId.trim()}
              className={`${styles.validateButton} ${styles.marketplaceButton}`}
            >
              {isValidating ? (
                <>
                  <div className={styles.spinner}></div>
                  Validation en cours...
                </>
              ) : (
                '✅ Valider ma commande'
              )}
            </button>
            
            <div className={styles.securityNote}>
              <p>🔒 <strong>Sécurisé :</strong> Nous validons uniquement la correspondance des informations</p>
            </div>
          </div>
        ) : (
          <div className={styles.paypalValidation}>
            <h3 className={styles.validationTitle}>
              💳 Paiement sécurisé PayPal
            </h3>
            <p className={styles.validationDescription}>
              Finalisez votre commande avec un paiement sécurisé
            </p>
            
            <div className={styles.paymentDetails}>
              <div className={styles.priceRow}>
                <span>Montant total :</span>
                <span className={styles.price}>{price}€</span>
              </div>
              <div className={styles.deliveryRow}>
                <span>Livraison :</span>
                <span>5 jours maximum</span>
              </div>
            </div>
            
            <div className={styles.paypalContainer}>
              <PayPalButton
                amount={price.toString()}
                orderId={order.order_id}
                companyName={order.company_name}
                onSuccess={handlePayPalSuccess}
                onError={onError}
              />
            </div>
            
            <div className={styles.securityNote}>
              <p>🔒 <strong>Paiement 100% sécurisé</strong> - Aucune donnée bancaire stockée</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderValidation;