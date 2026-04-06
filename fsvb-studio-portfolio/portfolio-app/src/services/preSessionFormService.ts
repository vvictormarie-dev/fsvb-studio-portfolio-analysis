import { supabase } from '../config/supabase';
import type { PreSessionFormData, FormStatus } from '../types/preSession';

export class PreSessionFormService {
  // Créer un nouveau formulaire
  static async createForm(data: Omit<PreSessionFormData, 'id' | 'createdAt'>): Promise<PreSessionFormData> {
    if (!supabase) {
      throw new Error('Supabase client non initialisé');
    }
    
    const { data: result, error } = await supabase
      .from('pre_session_forms')
      .insert({
        session_id: data.sessionId,
        template_type: data.templateType,
        client_email: data.clientEmail,
        responses: data.responses,
        files_urls: data.filesUrls || {},
        status: data.status
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur création formulaire:', error);
      throw new Error(`Erreur lors de la création du formulaire: ${error.message}`);
    }

    return {
      id: result.id,
      sessionId: result.session_id,
      templateType: result.template_type,
      clientEmail: result.client_email,
      responses: result.responses,
      filesUrls: result.files_urls,
      status: result.status,
      createdAt: result.created_at,
      reviewedAt: result.reviewed_at
    };
  }

  // Récupérer un formulaire par session ID
  static async getFormBySessionId(sessionId: string): Promise<PreSessionFormData | null> {
    if (!supabase) {
      throw new Error('Supabase client non initialisé');
    }
    
    const { data, error } = await supabase
      .from('pre_session_forms')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Pas trouvé
      console.error('Erreur récupération formulaire:', error);
      throw new Error(`Erreur lors de la récupération: ${error.message}`);
    }

    return {
      id: data.id,
      sessionId: data.session_id,
      templateType: data.template_type,
      clientEmail: data.client_email,
      responses: data.responses,
      filesUrls: data.files_urls,
      status: data.status,
      createdAt: data.created_at,
      reviewedAt: data.reviewed_at
    };
  }

  // Récupérer tous les formulaires (pour admin dashboard)
  static async getAllForms(): Promise<PreSessionFormData[]> {
    if (!supabase) {
      throw new Error('Supabase client non initialisé');
    }
    
    const { data, error } = await supabase
      .from('pre_session_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur récupération formulaires:', error);
      throw new Error(`Erreur lors de la récupération: ${error.message}`);
    }

    return data.map(item => ({
      id: item.id,
      sessionId: item.session_id,
      templateType: item.template_type,
      clientEmail: item.client_email,
      responses: item.responses,
      filesUrls: item.files_urls,
      status: item.status,
      createdAt: item.created_at,
      reviewedAt: item.reviewed_at
    }));
  }

  // Mettre à jour le statut d'un formulaire
  static async updateFormStatus(id: string, status: FormStatus): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase client non initialisé');
    }
    
    const updates: any = { status };
    
    if (status === 'reviewed') {
      updates.reviewed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('pre_session_forms')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Erreur mise à jour statut:', error);
      throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
    }
  }

  // Supprimer un formulaire
  static async deleteForm(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase client non initialisé');
    }
    
    const { error } = await supabase
      .from('pre_session_forms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur suppression formulaire:', error);
      throw new Error(`Erreur lors de la suppression: ${error.message}`);
    }
  }
}