#!/usr/bin/env node

/**
 * Génère les informations de build (timestamp + commit hash)
 * Exécuté automatiquement avant chaque build
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

function generateBuildInfo() {
  try {
    // Timestamp de build
    const buildDate = new Date().toISOString().slice(0, 16).replace('T', ' ');
    
    // Hash du commit Git (court)
    let commitHash = 'local-dev';
    try {
      commitHash = execSync('git rev-parse --short HEAD', { 
        encoding: 'utf8',
        timeout: 5000 
      }).trim();
    } catch {
      console.warn('⚠️  Git hash non disponible, utilisation de "local-dev"');
    }

    // Branche Git
    let branch = 'main';
    try {
      branch = execSync('git branch --show-current', { 
        encoding: 'utf8',
        timeout: 5000 
      }).trim();
    } catch {
      console.warn('⚠️  Branche Git non disponible, utilisation de "main"');
    }

    const buildInfo = {
      buildDate,
      commitHash,
      branch,
      generated: new Date().toISOString()
    };

    // Générer le fichier TypeScript
    const buildInfoContent = `// Généré automatiquement - NE PAS MODIFIER
export const BUILD_INFO = ${JSON.stringify(buildInfo, null, 2)};
`;

    const outputPath = resolve('src/config/buildInfo.ts');
    writeFileSync(outputPath, buildInfoContent);
    
    console.log(`✅ Build info généré: ${buildDate} (${commitHash})`);
    return buildInfo;
    
  } catch (error) {
    console.error('❌ Erreur génération build info:', error);
    
    // Fallback en cas d'erreur
    const fallbackInfo = {
      buildDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      commitHash: 'error',
      branch: 'unknown',
      generated: new Date().toISOString()
    };
    
    const fallbackContent = `// Fallback build info
export const BUILD_INFO = ${JSON.stringify(fallbackInfo, null, 2)};
`;
    
    writeFileSync(resolve('src/config/buildInfo.ts'), fallbackContent);
    return fallbackInfo;
  }
}

// Exécuter si appelé directement
if (process.argv[1].endsWith('generate-build-info.js')) {
  generateBuildInfo();
}

export { generateBuildInfo };