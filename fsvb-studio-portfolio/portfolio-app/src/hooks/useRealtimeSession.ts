import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../config/supabase';
import { 
  getLiveSession, 
  updateLiveSession, 
  incrementActiveUsers, 
  decrementActiveUsers
  // cleanupInactiveUsers - Non utilisé pour le moment
} from '../services/sessionService';
import type { FormData } from '../pages/ConfiguratorPage';

export interface UseRealtimeSessionResult {
  sharedData: FormData | null;
  updateSession: (data: FormData) => void;
  isConnected: boolean;
  activeUsers: number;
  sessionExists: boolean;
  loading: boolean;
  error: string | null;
}

export function useRealtimeSession(sessionId: string | null): UseRealtimeSessionResult {
  const [sharedData, setSharedData] = useState<FormData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(1);
  const [sessionExists, setSessionExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs pour éviter les boucles infinies
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subscriptionRef = useRef<any>(null);
  const lastUpdateRef = useRef<string>('');
  const isUpdatingRef = useRef(false);

  /**
   * Fonction debouncée pour mettre à jour la session
   */
  const updateSession = useCallback((data: FormData) => {
    if (!sessionId || !sessionExists || isUpdatingRef.current) return;

    // Éviter les updates si les données n'ont pas changé
    const dataString = JSON.stringify(data);
    if (dataString === lastUpdateRef.current) return;
    
    // Debounce à 500ms
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(async () => {
      try {
        isUpdatingRef.current = true;
        console.log('🔄 Sync session (fast):', sessionId);
        
        const result = await updateLiveSession(sessionId, data);
        if (!result.success) {
          console.error('Erreur sync session:', result.error);
          setError(result.error || 'Erreur de synchronisation');
        } else {
          lastUpdateRef.current = dataString;
          setError(null);
        }
      } catch (err) {
        console.error('Erreur updateSession:', err);
        setError('Erreur de synchronisation');
      } finally {
        isUpdatingRef.current = false;
      }
    }, 150); // ⬇️ RÉDUIT: 500ms → 150ms pour sync plus réactive
  }, [sessionId, sessionExists]);

  /**
   * Initialiser la session - charger les données existantes
   */
  const initializeSession = useCallback(async () => {
    if (!sessionId || !supabase) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getLiveSession(sessionId);
      
      if (result.success && result.session) {
        setSharedData(result.session.form_data);
        setSessionExists(true);
        
        // Incrémenter le compteur d'utilisateurs avec le nouveau système sécurisé
        const actualUserCount = await incrementActiveUsers(sessionId);
        setActiveUsers(actualUserCount);
        
        console.log('✅ Session initialisée:', sessionId, '- Utilisateurs:', actualUserCount);
      } else {
        setError(result.error || 'Session introuvable');
        setSessionExists(false);
        console.error('❌ Session non trouvée:', sessionId);
      }
    } catch (err) {
      console.error('Erreur initialisation session:', err);
      setError('Erreur de connexion à la session');
      setSessionExists(false);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  /**
   * Souscrire aux changements temps réel
   */
  const subscribeToChanges = useCallback(() => {
    if (!sessionId || !supabase || !sessionExists) return;

    console.log('🔔 Souscription changements session:', sessionId);

    const subscription = supabase
      .channel(`session_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_sessions',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          console.log('📡 Changement reçu:', payload);
          
          if (payload.new && !isUpdatingRef.current) {
            const newData = payload.new.form_data as FormData;
            const newDataString = JSON.stringify(newData);
            
            // Éviter les mises à jour circulaires
            if (newDataString !== lastUpdateRef.current) {
              console.log('🔄 Application changement distant');
              setSharedData(newData);
              lastUpdateRef.current = newDataString;
            }
            
            // Mettre à jour le nombre d'utilisateurs actifs
            if (payload.new.active_users !== activeUsers) {
              setActiveUsers(payload.new.active_users);
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Statut subscription:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    subscriptionRef.current = subscription;
    
    return () => {
      console.log('🔕 Unsubscribe session:', sessionId);
      subscription.unsubscribe();
    };
  }, [sessionId, sessionExists, activeUsers]);

  /**
   * Cleanup au démontage
   */
  const cleanup = useCallback(async () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }
    
    if (sessionId && sessionExists) {
      try {
        const remainingUsers = await decrementActiveUsers(sessionId);
        console.log('👋 Utilisateur déconnecté de la session:', sessionId, '- Utilisateurs restants:', remainingUsers);
      } catch (err) {
        console.error('Erreur cleanup session:', err);
      }
    }
  }, [sessionId, sessionExists]);

  /**
   * Effect principal - initialisation
   */
  useEffect(() => {
    if (!sessionId) {
      setSharedData(null);
      setSessionExists(false);
      setIsConnected(false);
      setActiveUsers(1);
      return;
    }

    initializeSession();

    // Cleanup au démontage
    return () => {
      cleanup();
    };
  }, [sessionId, initializeSession, cleanup]);

  /**
   * Effect - subscription realtime
   */
  useEffect(() => {
    if (!sessionExists) return;

    const unsubscribe = subscribeToChanges();
    return unsubscribe;
  }, [sessionExists, subscribeToChanges]);

  /**
   * Effect - cleanup avant fermeture page
   */
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cleanup]);

  return {
    sharedData,
    updateSession,
    isConnected,
    activeUsers,
    sessionExists,
    loading,
    error
  };
}