import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './ConfirmationPage.module.css';

const ConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Récupérer les détails de la commande depuis les paramètres URL ou localStorage
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');
    const token = searchParams.get('token');
    
    // Log des paramètres pour debug (peut être supprimé plus tard)
    console.log('Payment params:', { paymentId, payerId, token });

    // Simuler la récupération des détails de commande
    const savedOrder = localStorage.getItem('pendingOrder');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, [searchParams]);

  return (
    <div className={styles.confirmation}>
      <div className={styles.container}>
        <div className={styles.successIcon}>✅</div>
        
        <h1 className={styles.title}>Commande confirmée !</h1>
        
        <div className={styles.message}>
          <p>Félicitations ! Votre commande a été validée avec succès.</p>
          <p>Vous allez recevoir un email de confirmation sous peu avec tous les détails.</p>
        </div>

        {orderDetails && (
          <div className={styles.orderSummary}>
            <h2>Résumé de votre commande</h2>
            <div className={styles.details}>
              <div className={styles.item}>
                <span>Template :</span>
                <span>{orderDetails.template}</span>
              </div>
              <div className={styles.item}>
                <span>Entreprise :</span>
                <span>{orderDetails.companyName}</span>
              </div>
              <div className={styles.item}>
                <span>Prix :</span>
                <span>{orderDetails.price}</span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.nextSteps}>
          <h2>Prochaines étapes</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <div>
                <h3>Email de confirmation</h3>
                <p>Vous recevrez un email avec les détails de votre commande</p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <div>
                <h3>Développement</h3>
                <p>Nous commençons le développement de votre site</p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <div>
                <h3>Livraison</h3>
                <p>Votre site sera livré en 5 jours maximum</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="large" href="/">
            Retour à l'accueil
          </Button>
          <Button variant="ghost" size="large" href="mailto:contact@fsvbstudio.com">
            Nous contacter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;