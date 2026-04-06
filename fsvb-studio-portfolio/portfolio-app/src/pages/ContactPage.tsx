import React, { useState } from 'react';
import { Button } from '../components/Button';
import styles from './ContactPage.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';

// 💬 CRISP Integration - Déclaration du type global (cohérente avec crispService.ts)
declare global {
  interface Window {
    $crisp: any; // 🔥 FIX: Utiliser 'any' comme dans crispService.ts
    CRISP_WEBSITE_ID: string;
  }
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 💬 CRISP - Fonction d'envoi vers Crisp
  const sendToCrisp = (data: typeof formData) => {
    try {
      // Vérifier que Crisp est chargé
      if (window.$crisp) {
        // Envoyer le message vers Crisp
        window.$crisp.push(["do", "message:send", [
          "text", 
          `📧 NOUVEAU MESSAGE CONTACT SITE FSVB:\n\n` +
          `👤 Nom: ${data.name}\n` +
          `📧 Email: ${data.email}\n\n` +
          `💬 Message:\n${data.message}`
        ]]);

        // Optionnel: Mettre à jour les données utilisateur
        window.$crisp.push(["set", "user:email", data.email]);
        window.$crisp.push(["set", "user:nickname", data.name]);
        
        console.log('✅ Message envoyé vers Crisp:', data);
        return true;
      } else {
        console.warn('⚠️ Crisp non disponible, fallback console');
        console.log('📧 Contact Form Data:', data);
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur envoi Crisp:', error);
      return false;
    }
  };

  // 📝 Gestion soumission formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    // Envoyer vers Crisp
    const success = sendToCrisp(formData);
    
    // Simulation délai envoi
    setTimeout(() => {
      setIsSubmitting(false);
      if (success !== false) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Message de confirmation
        alert('✅ Message envoyé ! Nous vous répondrons très rapidement via Crisp.');
      } else {
        alert('❌ Erreur lors de l\'envoi. Essayez via le chat en bas à droite.');
      }
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <section className={sectionStyles.sectionDark + ' ' + sectionStyles.paperGrain + ' ' + styles.section}>
      <div className={styles.contentWrapper}>
        <h1 className={`${styles.title} pageTitle`}>Contactez-nous</h1>
        <p className={styles.text}>
          Vous avez un projet en tête ? Parlons-en ! Pour commander votre site, 
          utilisez notre configurateur ou contactez-nous directement.
        </p>
        
        <div className={styles.ctaButtons}>
          <Button variant="primary" size="large" href="/configurator">
            Configurer mon site
          </Button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            className={styles.input} 
            type="text" 
            name="name"
            placeholder="Votre nom" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
          <input 
            className={styles.input} 
            type="email" 
            name="email"
            placeholder="Votre email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <textarea 
            className={styles.textarea} 
            name="message"
            placeholder="Votre message ou détails de votre projet" 
            value={formData.message}
            onChange={handleInputChange}
            required 
          />
          <button 
            className="button primary large" 
            type="submit"
            disabled={isSubmitting}
            style={{
              background: 'var(--gold-primary)',
              color: 'var(--bg-gradient-start)',
              padding: 'var(--spacing-4) var(--spacing-8)',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-semibold)',
              cursor: 'pointer',
              transition: 'var(--transition-normal)'
            }}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>

        {isSubmitted && (
          <div className={styles.successMessage}>
            ✅ Message envoyé ! Nous vous répondrons via Crisp très rapidement.
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactPage;
