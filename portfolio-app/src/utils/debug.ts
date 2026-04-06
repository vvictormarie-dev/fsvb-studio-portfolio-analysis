// Configuration debug centralisée pour FSVB Studio
// Permet de contrôler finement les logs en développement/production

export const DEBUG_CONFIG = {
  // Système de synchronisation collaborative
  sync: import.meta.env.DEV && false, // Désactivé même en dev (trop verbeux)
  
  // Navigation et scroll dans le preview
  scrolling: import.meta.env.DEV && false, // Désactivé même en dev (spam console)
  
  // Navigation entre sections
  navigation: import.meta.env.DEV,
  
  // Capture modal et formulaires
  forms: import.meta.env.DEV && false,
  
  // Performance et optimisations
  performance: import.meta.env.DEV && false,
  
  // Erreurs critiques (toujours activées)
  errors: true,
  
  // Informations importantes (toujours activées)
  info: true
};

/**
 * Logger conditionnel pour le debugging
 */
export const debugLog = {
  sync: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.sync) {
      console.log(`🔄 SYNC: ${message}`, ...args);
    }
  },
  
  scroll: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.scrolling) {
      console.log(`📜 SCROLL: ${message}`, ...args);
    }
  },
  
  navigation: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.navigation) {
      console.log(`🧭 NAV: ${message}`, ...args);
    }
  },
  
  forms: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.forms) {
      console.log(`📝 FORMS: ${message}`, ...args);
    }
  },
  
  performance: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.performance) {
      console.log(`⚡ PERF: ${message}`, ...args);
    }
  },
  
  error: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.errors) {
      console.error(`❌ ERROR: ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    if (DEBUG_CONFIG.info) {
      console.log(`ℹ️ INFO: ${message}`, ...args);
    }
  },

  // Helper pour debug conditionnel personnalisé
  when: (condition: boolean, message: string, ...args: any[]) => {
    if (condition) {
      console.log(message, ...args);
    }
  }
};

// Types pour TypeScript
export type DebugLogger = typeof debugLog;