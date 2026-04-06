import React, { useState } from 'react';
import styles from './PortfolioGrid.module.css';
import { PortfolioItem } from '../cards/PortfolioItem';
import type { PortfolioItem as PortfolioItemType } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface PortfolioGridProps {
  title: string;
  subtitle?: string;
  items: PortfolioItemType[];
  columns?: 2 | 3 | 4;
  showAll?: boolean;
  onItemClick?: (item: PortfolioItemType) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  title,
  subtitle,
  items,
  columns = 3,
  showAll = false,
  onItemClick
}) => {
  const [displayAll, setDisplayAll] = useState(showAll);
  
  const displayedItems = displayAll ? items : items.slice(0, 6);
  const hasMore = items.length > 6;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={`${styles.grid} ${styles[`columns${columns}`]}`}>
          {displayedItems.map((item) => (
            <div key={item.id} className={styles.portfolioItem}>
              <PortfolioItem 
                item={item} 
                onClick={onItemClick}
              />
            </div>
          ))}
        </div>
        
        {!showAll && hasMore && !displayAll && (
          <div className={styles.loadMore}>
            <button 
              className={styles.loadMoreButton}
              onClick={() => setDisplayAll(true)}
            >
              Voir plus
              <span className={styles.arrow}>↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};