import React from 'react';
import styles from './TemplateSection.module.css';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface TemplateSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'default' | 'alternate';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TemplateSection: React.FC<TemplateSectionProps> = ({
  children,
  id,
  className = '',
  background = 'default',
  padding = 'lg'
}) => {
  const classNames = [
    styles.section,
    styles[background],
    styles[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={classNames}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
};