import React from 'react';
import styles from './TestimonialCard.module.css';
import type { Testimonial } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className={styles.card}>
      <div className={styles.quoteIcon}>"</div>
      
      <p className={styles.text}>{testimonial.text}</p>
      
      <div className={styles.rating}>
        {renderStars(testimonial.rating)}
      </div>
      
      <div className={styles.footer}>
        {testimonial.image && (
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className={styles.avatar}
          />
        )}
        <div className={styles.author}>
          <div className={styles.name}>{testimonial.name}</div>
          <div className={styles.role}>
            {testimonial.role}
            {testimonial.company && ` • ${testimonial.company}`}
          </div>
        </div>
      </div>
    </div>
  );
};