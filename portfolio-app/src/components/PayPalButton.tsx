import { useEffect, useState } from 'react';

interface PayPalButtonProps {
  amount: string;
  orderId: string;
  companyName: string;
  onSuccess: (paymentData: any) => Promise<void>;
  onError: (error: any) => void;
  disabled?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  orderId,
  companyName,
  onSuccess,
  onError,
  disabled = false
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('═══════════════════════════════════════════');
    console.log('🔍 ÉTAPE 1 : VÉRIFICATION CLIENT ID PAYPAL');
    console.log('═══════════════════════════════════════════');
    
    // Charger le script PayPal avec la variable d'environnement
    const mode = import.meta.env.VITE_PAYPAL_MODE || 'sandbox';
    const clientId = mode === 'live' 
      ? import.meta.env.VITE_PAYPAL_CLIENT_ID_LIVE
      : import.meta.env.VITE_PAYPAL_CLIENT_ID_SANDBOX;
    
    // ÉTAPE 1.1 : Afficher le Client ID
    console.log('📋 Client ID brut:', clientId);
    console.log('📏 Longueur Client ID:', clientId ? clientId.length : 0);
    console.log('🔤 Commence par:', clientId ? clientId.substring(0, 2) : 'N/A');
    console.log('👁️ Aperçu:', clientId ? `${clientId.substring(0, 15)}...${clientId.substring(clientId.length - 5)}` : 'MANQUANT');
    console.log('🔒 Contient espaces:', clientId ? (clientId.includes(' ') ? '⚠️ OUI (PROBLÈME!)' : '✅ Non') : 'N/A');
    console.log('🔒 Contient guillemets:', clientId ? (clientId.includes('"') || clientId.includes("'") ? '⚠️ OUI (PROBLÈME!)' : '✅ Non') : 'N/A');
    console.log('🎯 Mode PayPal:', mode);
    console.log('📦 Variables env disponibles:', {
      VITE_PAYPAL_MODE: import.meta.env.VITE_PAYPAL_MODE || '❌ MANQUANT',
      VITE_PAYPAL_CLIENT_ID_SANDBOX: import.meta.env.VITE_PAYPAL_CLIENT_ID_SANDBOX ? '✅ Défini' : '❌ MANQUANT',
      VITE_PAYPAL_CLIENT_ID_LIVE: import.meta.env.VITE_PAYPAL_CLIENT_ID_LIVE ? '✅ Défini' : '❌ MANQUANT'
    });
    
    if (!clientId) {
      console.error('═══════════════════════════════════════════');
      console.error(`❌ ERREUR CRITIQUE : VITE_PAYPAL_CLIENT_ID_${mode.toUpperCase()} non configuré`);
      console.error('🔧 Action requise : Vérifier fichier .env à la racine du projet');
      console.error('═══════════════════════════════════════════');
      onError(new Error('Configuration PayPal manquante'));
      return;
    }
    
    console.log('✅ Client ID trouvé et valide');
    console.log('═══════════════════════════════════════════');

    console.log('✅ Client ID trouvé et valide');
    console.log('═══════════════════════════════════════════');

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('🔍 ÉTAPE 3 : VÉRIFICATION URL SCRIPT PAYPAL');
    console.log('═══════════════════════════════════════════');

    // Vérifier si le script est déjà chargé
    if (window.paypal) {
      console.log('✅ Script PayPal déjà chargé dans window.paypal');
      setIsScriptLoaded(true);
      return;
    }

    // Créer et charger le script PayPal - CONFIGURATION MINIMALE
    const script = document.createElement('script');
    const scriptUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
    script.src = scriptUrl;
    script.async = true;
    
    console.log('🌐 URL complète du script:', scriptUrl);
    console.log('📝 Paramètres URL:', {
      'client-id': clientId.substring(0, 20) + '...',
      'currency': 'EUR'
    });
    console.log('⏳ Chargement du script en cours...');
    console.log('💡 Ouvrir DevTools > Network > Filter "paypal" pour voir la requête');
    console.log('═══════════════════════════════════════════');
    
    script.onload = () => {
      console.log('');
      console.log('═══════════════════════════════════════════');
      console.log('✅ SUCCÈS : Script PayPal chargé');
      console.log('═══════════════════════════════════════════');
      setIsScriptLoaded(true);
    };
    
    script.onerror = (error) => {
      console.log('');
      console.log('═══════════════════════════════════════════');
      console.error('❌ ERREUR : Échec chargement script PayPal');
      console.error('🔴 Erreur détaillée:', error);
      console.error('🌐 URL qui a échoué:', scriptUrl);
      console.error('');
      console.error('🔍 CHECKLIST ERREUR 400/406 :');
      console.error('   1. Client ID invalide ou expiré');
      console.error('   2. App PayPal pas en statut "Active"');
      console.error('   3. Mauvais environnement (sandbox vs live)');
      console.error('   4. Restriction IP/domaine sur PayPal Dashboard');
      console.error('');
      console.error('🔧 ACTIONS À FAIRE :');
      console.error('   1. Vérifier PayPal Dashboard: https://developer.paypal.com/dashboard');
      console.error('   2. Copier nouveau Client ID depuis Dashboard');
      console.error('   3. Remplacer dans .env');
      console.error('   4. Redémarrer serveur (Ctrl+C puis npm run dev)');
      console.error('═══════════════════════════════════════════');
      onError(new Error('Impossible de charger PayPal'));
    };
    
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (isScriptLoaded && window.paypal && !disabled) {
      // Nettoyer le container existant
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }

      // Initialiser les boutons PayPal avec options de taille
      window.paypal.Buttons({
        style: {
          layout: 'vertical',    // Layout vertical pour plus d'espace
          color: 'gold',         // Couleur or (default)
          shape: 'pill',         // Forme arrondie
          label: 'paypal',       // Label PayPal
          height: 50,            // Hauteur des boutons (35-55px)
          tagline: false         // Pas de tagline pour économiser l'espace
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: 'EUR'
              },
              description: `Site ${orderId} - ${companyName}`
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          setIsLoading(true);
          try {
            const details = await actions.order.capture();
            console.log('✅ Paiement PayPal capturé:', details);
            await onSuccess({
              paymentID: data.paymentID,
              details: details
            });
          } catch (error) {
            console.error('❌ Erreur lors du traitement:', error);
            onError(error);
          } finally {
            setIsLoading(false);
          }
        },
        onError: (err: any) => {
          console.error('❌ Erreur PayPal:', err);
          onError(err);
          setIsLoading(false);
        }
      }).render('#paypal-button-container');
    }
  }, [isScriptLoaded, amount, orderId, companyName, onSuccess, onError, disabled]);

  if (!isScriptLoaded) {
    return (
      <div style={{ 
        padding: '1.5rem', 
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          marginBottom: '0.5rem',
          fontSize: '1rem' 
        }}>
          ⏳
        </div>
        <p style={{ 
          margin: 0, 
          color: 'var(--text-secondary)',
          fontSize: '0.9rem' 
        }}>
          Chargement de PayPal...
        </p>
      </div>
    );
  }

  return (
    <div>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          zIndex: 10
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid #FFD700',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '0.5rem'
          }}></div>
          <p style={{ 
            margin: 0, 
            color: '#FFD700',
            fontSize: '0.9rem',
            fontWeight: '500' 
          }}>
            Traitement du paiement...
          </p>
        </div>
      )}
      
      <div 
        id="paypal-button-container"
        style={{ 
          minHeight: '60px',           // Plus de hauteur pour les boutons
          width: '100%',               // Pleine largeur
          maxWidth: '400px',           // Largeur max pour éviter l'étalement
          margin: '0 auto',            // Centré
          position: 'relative'
        }}
      >
        {/* PayPal buttons seront rendus ici */}
      </div>
    </div>
  );
};

export default PayPalButton;