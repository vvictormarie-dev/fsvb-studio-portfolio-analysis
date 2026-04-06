import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import type { FAQItem } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  subtitle,
  faqs
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={`${styles.icon} ${openIndex === index ? styles.open : ''}`}>
                  +
                </span>
              </button>
              
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}>
                <div className={styles.answerContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};