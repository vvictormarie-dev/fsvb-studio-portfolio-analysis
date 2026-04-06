import { useState } from 'react';
import { createLiveSession } from '../services/sessionService';
import type { FormData } from '../pages/ConfiguratorPage';
import styles from './ShareSessionModal.module.css';

interface ShareSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  selectedTemplate: string;
  sessionUrl?: string;
  onSessionCreated: (sessionUrl: string) => void;
}

export default function ShareSessionModal({
  isOpen,
  onClose,
  formData,
  selectedTemplate,
  sessionUrl,
  onSessionCreated
}: ShareSessionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateSession = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await createLiveSession(formData, selectedTemplate);
      
      if (result.success && result.sessionId) {
        const newSessionUrl = `${window.location.origin}/configurator/session/${result.sessionId}?template=${selectedTemplate}`;
        onSessionCreated(newSessionUrl);
        console.log('✅ Session créée:', result.sessionId);
      } else {
        setError(result.error || 'Erreur lors de la création de la session');
      }
    } catch (err) {
      console.error('Erreur création session:', err);
      setError('Erreur de connexion lors de la création de la session');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    if (!sessionUrl) return;

    try {
      await navigator.clipboard.writeText(sessionUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erreur copie URL:', err);
      // Fallback pour navigateurs sans clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = sessionUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>👥 Session Collaborative</h2>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.content}>
          {!sessionUrl ? (
            // Étape 1: Créer la session
            <div className={styles.createStep}>
              <div className={styles.icon}>🚀</div>
              <h3>Créer une session collaborative</h3>
              <p className={styles.description}>
                Créez un lien sécurisé pour collaborer en temps réel sur votre configurateur. 
                Votre client pourra voir vos modifications instantanément.
              </p>

              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>⏰</span>
                  <span>Session valide 24h</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>👥</span>
                  <span>Maximum 2 utilisateurs</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>🔄</span>
                  <span>Synchronisation temps réel</span>
                </div>
              </div>

              {error && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}

              <button 
                className={styles.createButton}
                onClick={handleCreateSession}
                disabled={loading}
              >
                {loading ? '⏳ Création...' : '🚀 Créer la session'}
              </button>
            </div>
          ) : (
            // Étape 2: Partager le lien
            <div className={styles.shareStep}>
              <div className={styles.successIcon}>✅</div>
              <h3>Session créée avec succès !</h3>
              <p className={styles.description}>
                Partagez ce lien avec votre client pour collaborer en temps réel :
              </p>

              <div className={styles.urlContainer}>
                <input 
                  className={styles.urlInput}
                  value={sessionUrl}
                  readOnly
                />
                <button 
                  className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                  onClick={handleCopyUrl}
                >
                  {copied ? '✅ Copié' : '📋 Copier'}
                </button>
              </div>

              <div className={styles.instructions}>
                <h4>Comment procéder :</h4>
                <ol>
                  <li>Copiez le lien ci-dessus</li>
                  <li>Envoyez-le à votre client (email, SMS, chat)</li>
                  <li>Votre client clique sur le lien</li>
                  <li>Vous collaborez en temps réel ! 🎉</li>
                </ol>
              </div>

              <div className={styles.liveIndicator}>
                <span className={styles.liveDot}></span>
                <span>Session active - En attente de connexion...</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}