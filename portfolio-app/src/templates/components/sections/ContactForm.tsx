import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import type { ContactFormData } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  social?: {
    platform: string;
    url: string;
    icon?: string;
  }[];
}

interface ContactFormProps {
  title: string;
  subtitle?: string;
  onSubmit: (data: ContactFormData) => void;
  submitText?: string;
  showPhone?: boolean;
  contactInfo?: ContactInfo;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subtitle,
  onSubmit,
  submitText = 'Envoyer',
  showPhone = true,
  contactInfo
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (showPhone && !formData.phone?.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                placeholder="Votre nom complet"
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="votre@email.com"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {showPhone && (
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Téléphone {showPhone ? '*' : ''}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                  placeholder="+33 6 12 34 56 78"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                placeholder="Décrivez votre projet..."
                rows={5}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi...' : submitText}
              {!isSubmitting && <span className={styles.arrow}>→</span>}
            </button>
          </form>

          {contactInfo && (
            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Informations de contact</h3>
              
              <div className={styles.contactList}>
                {contactInfo.email && (
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📧</span>
                    <a href={`mailto:${contactInfo.email}`} className={styles.contactLink}>
                      {contactInfo.email}
                    </a>
                  </div>
                )}

                {contactInfo.phone && (
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📞</span>
                    <a href={`tel:${contactInfo.phone}`} className={styles.contactLink}>
                      {contactInfo.phone}
                    </a>
                  </div>
                )}

                {contactInfo.address && (
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📍</span>
                    <span className={styles.contactText}>{contactInfo.address}</span>
                  </div>
                )}

                {contactInfo.social && contactInfo.social.length > 0 && (
                  <div className={styles.socialSection}>
                    <h4 className={styles.socialTitle}>Réseaux sociaux</h4>
                    <div className={styles.socialLinks}>
                      {contactInfo.social.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                        >
                          {social.icon && <span className={styles.socialIcon}>{social.icon}</span>}
                          {social.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};