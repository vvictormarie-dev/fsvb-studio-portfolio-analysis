import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './ConfirmationPage.module.css';

const ConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isMarketplaceOrder, setIsMarketplaceOrder] = useState(false);

  useEffect(() => {
    // Récupérer les détails depuis les paramètres URL
    const paymentId = searchParams.get('paymentId');
    const orderNumber = searchParams.get('orderNumber');
    const source = searchParams.get('source');
    
    // Déterminer si c'est une commande marketplace
    const isMarketplace = source === 'marketplace';
    setIsMarketplaceOrder(isMarketplace);
    
    console.log('Confirmation params:', { paymentId, orderNumber, source, isMarketplace });

    // Récupérer les détails de commande depuis localStorage
    const savedOrder = localStorage.getItem('pendingOrder');
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder);
      setOrderDetails({
        ...orderData,
        orderNumber,
        paymentId,
        source: isMarketplace ? 'marketplace' : 'paypal'
      });
    } else if (orderNumber) {
      // Fallback si pas de localStorage
      setOrderDetails({
        orderNumber,
        paymentId,
        source: isMarketplace ? 'marketplace' : 'paypal'
      });
    }
  }, [searchParams]);

  return (
    <div className={styles.confirmation}>
      <div className={styles.container}>
        {/* Icône et titre selon le type de validation */}
        <div className={styles.successIcon}>
          {isMarketplaceOrder ? '🏪' : '✅'}
        </div>
        
        <h1 className={styles.title}>
          {isMarketplaceOrder ? 'Commande marketplace validée !' : 'Paiement confirmé !'}
        </h1>
        
        <div className={styles.message}>
          {isMarketplaceOrder ? (
            <>
              <p>✅ Votre commande marketplace a été validée avec succès.</p>
              <p>Nous avons bien reçu votre confirmation de paiement via la plateforme.</p>
            </>
          ) : (
            <>
              <p>✅ Votre paiement PayPal a été traité avec succès.</p>
              <p>Votre commande est maintenant confirmée.</p>
            </>
          )}
          <p>Vous allez recevoir un email de confirmation avec le lien Calendly pour réserver votre session.</p>
        </div>

        {orderDetails && (
          <div className={styles.orderSummary}>
            <h2>📋 Résumé de votre commande</h2>
            <div className={styles.details}>
              {orderDetails.orderNumber && (
                <div className={styles.item}>
                  <span>N° de commande :</span>
                  <span className={styles.orderNumber}>{orderDetails.orderNumber}</span>
                </div>
              )}
              {isMarketplaceOrder && orderDetails.paymentId && (
                <div className={styles.item}>
                  <span>ID Marketplace :</span>
                  <span>{orderDetails.paymentId}</span>
                </div>
              )}
              {!isMarketplaceOrder && orderDetails.paymentId && (
                <div className={styles.item}>
                  <span>ID Paiement :</span>
                  <span>{orderDetails.paymentId}</span>
                </div>
              )}
              <div className={styles.item}>
                <span>Source :</span>
                <span className={styles.source}>
                  {isMarketplaceOrder ? '🏪 Plateforme marketplace' : '💳 Paiement direct'}
                </span>
              </div>
              {orderDetails.template && (
                <div className={styles.item}>
                  <span>Template :</span>
                  <span>{orderDetails.template}</span>
                </div>
              )}
              {orderDetails.companyName && (
                <div className={styles.item}>
                  <span>Entreprise :</span>
                  <span>{orderDetails.companyName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.nextSteps}>
          <h2>🚀 Prochaines étapes</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <div>
                <h3>📧 Email automatique</h3>
                <p>
                  Vous recevrez un email dans les prochaines minutes avec le lien Calendly 
                  pour réserver votre session de brief
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <div>
                <h3>📞 Session de brief</h3>
                <p>
                  Réservez un créneau pour discuter de vos besoins spécifiques 
                  et finaliser les détails de votre site
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <div>
                <h3>🎨 Développement</h3>
                <p>Création de votre site selon vos spécifications</p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>4</span>
              <div>
                <h3>🚀 Livraison</h3>
                <p>Livraison complète en 5 jours maximum</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions différentes selon la source */}
        <div className={styles.actions}>
          <Button variant="primary" size="large" href="/">
            🏠 Retour à l'accueil
          </Button>
          
          {isMarketplaceOrder ? (
            <Button variant="ghost" size="large" href="mailto:contact@fsvbstudio.com?subject=Commande%20Marketplace%20-%20Question">
              ❓ Question sur ma commande
            </Button>
          ) : (
            <Button variant="ghost" size="large" href="mailto:contact@fsvbstudio.com?subject=Commande%20PayPal%20-%20Question">
              📞 Nous contacter
            </Button>
          )}
        </div>

        {/* Note de sécurité */}
        <div className={styles.securityNote}>
          <p>
            🔒 <strong>Informations sécurisées</strong> - 
            {isMarketplaceOrder 
              ? ' Votre validation est protégée et vos données marketplace restent confidentielles.' 
              : ' Votre paiement PayPal est sécurisé et aucune donnée bancaire n\'est stockée.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;