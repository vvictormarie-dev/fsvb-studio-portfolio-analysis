import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TemplateButton.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface TemplateButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  href?: string;
}

export const TemplateButton: React.FC<TemplateButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  onClick,
  href
}) => {
  const className = `${styles.button} ${styles[variant]} ${styles[size]} ${
    fullWidth ? styles.fullWidth : ''
  } ${loading ? styles.loading : ''} ${disabled ? styles.disabled : ''}`;

  const content = (
    <>
      {loading && <span className={styles.spinner}></span>}
      {!loading && icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span className={styles.text}>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};