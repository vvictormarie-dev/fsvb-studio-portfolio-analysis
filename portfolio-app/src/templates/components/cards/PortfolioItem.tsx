import React from 'react';
import styles from './PortfolioItem.module.css';
import type { PortfolioItem as PortfolioItemType } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface PortfolioItemProps {
  item: PortfolioItemType;
  onClick?: (item: PortfolioItemType) => void;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    } else if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  return (
    <div className={styles.portfolioItem} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.title} className={styles.image} />
        <div className={styles.categoryBadge}>{item.category}</div>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            {item.link && (
              <div className={styles.viewProject}>
                Voir le projet →
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};