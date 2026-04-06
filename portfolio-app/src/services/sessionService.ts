import { supabase } from '../config/supabase';
import type { FormData } from '../pages/ConfiguratorPage';

export interface LiveSession {
  id: string;
  session_id: string;
  form_data: FormData;
  template_type: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  active_users: number;
}

/**
 * Génère un ID de session unique (8 caractères alphanumériques)
 */
export function generateSessionId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Crée une nouvelle session collaborative
 */
export async function createLiveSession(
  formData: FormData, 
  templateType: string = 'landing-solo'
): Promise<{ success: boolean; sessionId?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase non configuré' };
  }

  try {
    const sessionId = generateSessionId();
    
    const { error } = await supabase
      .from('live_sessions')
      .insert([{
        session_id: sessionId,
        form_data: formData,
        template_type: templateType,
        active_users: 1
      }])
      .select()
      .single();

    if (error) {
      console.error('Erreur création session:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Session créée:', sessionId);
    return { success: true, sessionId };
  } catch (error) {
    console.error('Erreur createLiveSession:', error);
    return { success: false, error: 'Erreur de création session' };
  }
}

/**
 * Récupère les données d'une session
 */
export async function getLiveSession(sessionId: string): Promise<{ 
  success: boolean; 
  session?: LiveSession; 
  error?: string 
}> {
  if (!supabase) {
    return { success: false, error: 'Supabase non configuré' };
  }

  try {
    const { data, error } = await supabase
      .from('live_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .gt('expires_at', new Date().toISOString()) // Vérifier expiration
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return { success: false, error: 'Session introuvable ou expirée' };
      }
      console.error('Erreur récupération session:', error);
      return { success: false, error: error.message };
    }

    return { success: true, session: data };
  } catch (error) {
    console.error('Erreur getLiveSession:', error);
    return { success: false, error: 'Erreur de récupération session' };
  }
}

/**
 * Met à jour les données d'une session
 */
export async function updateLiveSession(
  sessionId: string, 
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase non configuré' };
  }

  try {
    const { error } = await supabase
      .from('live_sessions')
      .update({
        form_data: formData,
        updated_at: new Date().toISOString()
      })
      .eq('session_id', sessionId);

    if (error) {
      console.error('Erreur mise à jour session:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur updateLiveSession:', error);
    return { success: false, error: 'Erreur de mise à jour session' };
  }
}

/**
 * Génère un fingerprint unique pour l'utilisateur
 */
function getUserFingerprint(): string {
  const fingerprint = `${navigator.userAgent}_${window.screen.width}x${window.screen.height}_${navigator.language}`;
  return btoa(fingerprint).slice(0, 32); // Convertir en base64 et tronquer
}

/**
 * Incrémente le nombre d'utilisateurs actifs avec déduplication
 */
export async function incrementActiveUsers(sessionId: string): Promise<number> {
  if (!supabase) return 1;

  try {
    const userFingerprint = getUserFingerprint();
    const { data, error } = await supabase.rpc('increment_active_users_safe', { 
      p_session_id: sessionId,
      p_user_fingerprint: userFingerprint
    });

    if (error) {
      console.error('Erreur increment users safe:', error);
      return 1;
    }

    const userCount = data || 1;
    console.log('👥 Utilisateurs connectés:', userCount);
    return userCount;
  } catch (error) {
    console.error('Erreur incrementActiveUsers:', error);
    return 1;
  }
}

/**
 * Décrémente le nombre d'utilisateurs actifs avec cleanup
 */
export async function decrementActiveUsers(sessionId: string): Promise<number> {
  if (!supabase) return 0;

  try {
    const userFingerprint = getUserFingerprint();
    const { data, error } = await supabase.rpc('decrement_active_users_safe', { 
      p_session_id: sessionId,
      p_user_fingerprint: userFingerprint
    });

    if (error) {
      console.error('Erreur decrement users safe:', error);
      return 0;
    }

    const userCount = data || 0;
    console.log('👋 Utilisateurs restants:', userCount);
    return userCount;
  } catch (error) {
    console.error('Erreur decrementActiveUsers:', error);
    return 0;
  }
}

/**
 * Nettoie les sessions expirées
 */
export async function cleanupExpiredSessions(): Promise<void> {
  if (!supabase) return;

  try {
    const { error } = await supabase
      .from('live_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString());

    if (error) {
      console.error('Erreur cleanup sessions:', error);
    } else {
      console.log('✅ Sessions expirées nettoyées');
    }
  } catch (error) {
    console.error('Erreur cleanupExpiredSessions:', error);
  }
}

/**
 * Nettoie les utilisateurs inactifs de toutes les sessions
 */
export async function cleanupInactiveUsers(): Promise<number> {
  if (!supabase) return 0;

  try {
    const { data, error } = await supabase.rpc('cleanup_inactive_users');
    
    if (error) {
      console.error('Erreur cleanup users:', error);
      return 0;
    }

    if (data > 0) {
      console.log('🧹 Nettoyage utilisateurs inactifs:', data, 'supprimés');
    }
    
    return data || 0;
  } catch (error) {
    console.error('Erreur cleanupInactiveUsers:', error);
    return 0;
  }
}

/**
 * Vérifie si une session existe et n'est pas expirée
 */
export async function checkSessionExists(sessionId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { data, error } = await supabase
      .from('live_sessions')
      .select('session_id')
      .eq('session_id', sessionId)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    return !error && !!data;
  } catch {
    return false;
  }
}