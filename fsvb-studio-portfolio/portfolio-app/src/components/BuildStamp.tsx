/**
 * Composant Build Stamp - Affiché en bas du configurateur
 * Permet d'identifier rapidement les problèmes de cache vs bugs réels
 */

import { BUILD_INFO } from '../config/buildInfo';
import styles from './BuildStamp.module.css';

interface BuildStampProps {
  position?: 'footer' | 'corner';
  visible?: boolean;
}

export default function BuildStamp({ 
  position = 'footer',
  visible = true 
}: BuildStampProps) {
  if (!visible) return null;

  const handleClick = () => {
    // Copie les infos build dans le clipboard pour debug
    const buildDetails = `Build: ${BUILD_INFO.buildDate} - ${BUILD_INFO.commitHash} (${BUILD_INFO.branch})`;
    navigator.clipboard.writeText(buildDetails).then(() => {
      console.log('📋 Build info copié:', buildDetails);
    }).catch(() => {
      console.log('📋 Build info:', buildDetails);
    });
  };

  return (
    <div 
      className={`${styles.buildStamp} ${styles[position]}`}
      onClick={handleClick}
      title="Cliquez pour copier les infos de build"
    >
      <span className={styles.label}>Build:</span>
      <span className={styles.date}>{BUILD_INFO.buildDate}</span>
      <span className={styles.separator}>–</span>
      <span className={styles.commit}>commit {BUILD_INFO.commitHash}</span>
      {BUILD_INFO.branch !== 'main' && (
        <>
          <span className={styles.separator}>•</span>
          <span className={styles.branch}>{BUILD_INFO.branch}</span>
        </>
      )}
    </div>
  );
}