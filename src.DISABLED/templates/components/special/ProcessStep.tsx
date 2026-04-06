import React from 'react';
import styles from './ProcessStep.module.css';
import type { ProcessStep as ProcessStepType } from '../types';
import '../../styles/themes.css';
import '../../styles/template-base.css';
import '../../styles/template-components.css';

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast?: boolean;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  index,
  isLast = false
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.stepIndicator}>
        <div className={styles.circle}>
          {step.icon ? (
            <span className={styles.icon}>{step.icon}</span>
          ) : (
            <span className={styles.number}>{index + 1}</span>
          )}
        </div>
        {!isLast && <div className={styles.line}></div>}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.description}>{step.description}</p>
        {step.duration && (
          <div className={styles.duration}>
            📅 {step.duration}
          </div>
        )}
      </div>
    </div>
  );
};