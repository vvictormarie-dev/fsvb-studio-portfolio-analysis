import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  background?: 'transparent' | 'dark' | 'gradient';
  narrow?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  background = 'transparent',
  narrow = false,
  id,
  className = '',
  style
}) => {
  const classNames = [
    styles.section,
    styles[background],
    narrow && styles.narrow,
    className
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={classNames} style={style}>
      <div className={styles.container}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};