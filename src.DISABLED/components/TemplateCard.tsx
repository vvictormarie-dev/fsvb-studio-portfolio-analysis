import React from 'react';
import styles from './TemplateCard.module.css';

export interface TemplateCardProps {
  imageSrc: string;
  title: string;
  price: string;
  link: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ imageSrc, title, price, link }) => {
  return (
    <div className={styles.card}>
      <img src={imageSrc} alt={title} className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>{price}</p>
          <a href={link} className={styles.button}>En savoir plus</a>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
