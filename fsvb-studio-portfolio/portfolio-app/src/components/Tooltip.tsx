import React, { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.tooltip}>
      {children || (
        <div 
          className={styles.tooltipIcon}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          onClick={() => setIsVisible(!isVisible)}
        >
          ?
        </div>
      )}
      <div className={`${styles.tooltipContent} ${isVisible ? styles.visible : ''}`}>
        {content}
      </div>
    </div>
  );
};

export default Tooltip;