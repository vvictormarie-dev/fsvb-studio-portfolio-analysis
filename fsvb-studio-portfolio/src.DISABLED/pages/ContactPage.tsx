import React from 'react';
import { Button } from '../components/Button';
import styles from './ContactPage.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';

const ContactPage: React.FC = () => {
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

        <form className={styles.form}>
          <input 
            className={styles.input} 
            type="text" 
            placeholder="Votre nom" 
            required 
          />
          <input 
            className={styles.input} 
            type="email" 
            placeholder="Votre email" 
            required 
          />
          <textarea 
            className={styles.textarea} 
            placeholder="Votre message ou détails de votre projet" 
            required 
          />
          <Button variant="primary" size="large">
            Envoyer le message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
