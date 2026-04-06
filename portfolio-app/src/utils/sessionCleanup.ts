/**
 * Utilitaires pour nettoyer les sessions expirées
 * Exécution automatique et manuelle du nettoyage
 */

import { 
  cleanupExpiredSessions as cleanupService,
  checkSessionExists 
} from '../services/sessionService';

interface CleanupResult {
  deletedCount: number;
  error?: string;
}

/**
 * Nettoie toutes les sessions expirées
 * @returns Résultat du nettoyage avec nombre de sessions supprimées
 */
export async function cleanupExpiredSessions(): Promise<CleanupResult> {
  try {
    await cleanupService();
    console.log(`✅ Sessions expirées supprimées`);
    return { deletedCount: 0 }; // La fonction originale ne retourne pas le count
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('Erreur inattendue lors du nettoyage:', err);
    return { deletedCount: 0, error: errorMessage };
  }
}

/**
 * Programme un nettoyage automatique des sessions expirées
 * Exécution toutes les heures
 */
export function scheduleAutomaticCleanup(): void {
  // Nettoyage immédiat au démarrage
  cleanupExpiredSessions();
  
  // Puis toutes les heures
  const interval = setInterval(() => {
    cleanupExpiredSessions();
  }, 60 * 60 * 1000); // 1 heure
  
  // Nettoyage à la fermeture de la page
  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
  });
  
  console.log('🔄 Nettoyage automatique des sessions programmé (toutes les heures)');
}

/**
 * Vérifie si une session spécifique est expirée
 * @param sessionId ID de la session à vérifier
 * @returns true si la session est expirée ou inexistante
 */
export async function isSessionExpired(sessionId: string): Promise<boolean> {
  try {
    const exists = await checkSessionExists(sessionId);
    return !exists; // Si elle n'existe pas, elle est considérée comme expirée
  } catch {
    return true; // Considérer comme expirée en cas d'erreur
  }
}