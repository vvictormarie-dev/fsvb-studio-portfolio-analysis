import React from 'react';
import styles from './ProcessTimeline.module.css';
import type { ProcessStep } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface ProcessTimelineProps {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  title,
  subtitle,
  steps
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.step}>
              <div className={styles.stepCircle}>
                {step.icon ? (
                  <span className={styles.stepIcon}>{step.icon}</span>
                ) : (
                  <span className={styles.stepNumber}>{index + 1}</span>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={styles.stepLine}></div>
              )}
              
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                {step.duration && (
                  <div className={styles.stepDuration}>
                    📅 {step.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};