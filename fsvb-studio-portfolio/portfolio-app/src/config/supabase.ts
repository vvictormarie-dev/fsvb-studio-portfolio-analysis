import { createClient } from '@supabase/supabase-js';
import type { OrderRecord } from '../types/orders';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug en développement uniquement
if (import.meta.env.DEV) {
  console.log('SUPABASE', 
    import.meta.env.VITE_SUPABASE_URL?.slice(0, 40), 
    import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 10)
  );
}

// Vérification des valeurs de configuration
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

const isValidKey = (key: string) => {
  return key && key.length > 20 && !key.includes('your_supabase') && 
         (key.startsWith('eyJ') || key.startsWith('sb_publishable_'));
};

// Fonction pour obtenir le message d'erreur de configuration
export const getSupabaseConfigError = (): string | null => {
  if (!supabaseUrl) {
    return 'Variable VITE_SUPABASE_URL manquante dans .env.local';
  }
  if (!supabaseAnonKey) {
    return 'Variable VITE_SUPABASE_ANON_KEY manquante dans .env.local';
  }
  if (!isValidUrl(supabaseUrl)) {
    return 'VITE_SUPABASE_URL invalide - doit commencer par https://';
  }
  if (!isValidKey(supabaseAnonKey)) {
    return 'VITE_SUPABASE_ANON_KEY invalide - remplacez les valeurs placeholder';
  }
  return null;
};

// Vérification si Supabase est correctement configuré
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  isValidUrl(supabaseUrl) && 
  isValidKey(supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase non configuré. Les commandes seront uniquement affichées en JSON.');
  console.warn('Pour activer Supabase : configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local');
}

// Client Supabase (null si non configuré)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Interface pour les commandes dans la DB
/*
🗂️ STRUCTURE EXACTE DE L'OBJET INSERÉ DANS SUPABASE:

orderRecord = {
  id: UUID (auto-généré par Supabase),
  order_id: "ORDER-1736165432-A1B2C3", 
  template: "landing-solo" | "restaurant" | "coach",
  theme: "empire" | "lumiere" | "chaleur" | etc.,
  company_name: "Nom Entreprise Client",
  email: "client@email.com",
  phone: "0123456789" (nullable),
  
  form_data: {                     // 📝 FORMULAIRE COMPLET
    companyName, tagline, ctaLabel, email, phone,
    logoUrl, instagramUrl, linkedinUrl,
    primaryColor, secondaryColor, accentColor,
    backgroundColor, textColor, theme
  },
  
  config: [...sectionsConfig],      // 🔧 CONFIGURATION SECTIONS (colonne NOT NULL)
  sections_config: [...sectionsConfig], // 🔧 MÊME DONNÉES (compatibilité)
  
  contact_info: {                  // 📞 INFOS CONTACT CONSOLIDÉES  
    companyName, email, phone,
    social: { instagram?, linkedin? }
  },
  
  assets: { logoUrl? },            // 🖼️ URLs D'IMAGES
  color_mode: "auto" | "custom",   // 🎨 MODE COULEUR
  created_at: "2025-12-12T14:04:12.327Z"
}

⚠️ QUESTION CLÉ: sectionsConfig contient quoi exactement ?
- Seulement enabled/disabled par section ?  
- OU aussi les props/valeurs personnalisées ?
*/

// Re-export types for compatibility
export type { OrderRecord } from '../types/orders';

// Fonction pour insérer une commande
export async function insertOrder(orderData: OrderRecord) {
  // Vérification si Supabase est configuré
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase non configuré - simulation de sauvegarde');
    return { 
      success: false, 
      error: new Error('Supabase non configuré. Vérifiez vos variables d\'environnement.'),
      isConfigError: true
    };
  }

  try {
    // 🔍 DEBUG: Payload juste avant insertion Supabase
    console.log('📤 ORDER_PAYLOAD avant insert:', orderData);
    
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    // 🔍 DEBUG: Résultat Supabase
    console.log('📥 SUPABASE_RESULT:', { data, error });

    if (error) {
      console.error('❌ Erreur lors de l\'insertion:', error);
      throw error;
    }

    console.log('✅ Commande insérée avec succès:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erreur Supabase:', error);
    return { success: false, error };
  }
}

// Fonction pour récupérer toutes les commandes (optionnel pour debug)
export async function getOrders() {
  // Vérification si Supabase est configuré
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase non configuré - impossible de récupérer les commandes');
    return { 
      success: false, 
      error: new Error('Supabase non configuré'),
      isConfigError: true
    };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors de la récupération:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erreur Supabase getOrders:', error);
    return { success: false, error };
  }
}

// Fonction pour mettre à jour le statut et autres champs d'une commande
export async function updateOrderStatus(orderId: string, updates: Partial<OrderRecord>) {
  // Vérification si Supabase est configuré
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase non configuré - impossible de mettre à jour la commande');
    return { 
      success: false, 
      error: new Error('Supabase non configuré. Vérifiez vos variables d\'environnement.'),
      isConfigError: true
    };
  }

  try {
    // 🔍 DEBUG: Updates à appliquer
    console.log('🔄 MISE À JOUR COMMANDE:', { orderId, updates });
    
    // Ajouter automatiquement updated_at
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('order_id', orderId)
      .select();

    // 🔍 DEBUG: Résultat de la mise à jour
    console.log('📥 SUPABASE_UPDATE_RESULT:', { data, error });

    if (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      throw error;
    }

    console.log('✅ Commande mise à jour avec succès:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erreur Supabase updateOrderStatus:', error);
    return { success: false, error };
  }
}

// Fonction pour supprimer une commande
export async function deleteOrder(orderId: string) {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase non configuré - impossible de supprimer la commande');
    return { success: false, error: new Error('Supabase non configuré'), isConfigError: true };
  }

  try {
    console.log('🗑️ SUPPRESSION COMMANDE:', orderId);
    
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('order_id', orderId);

    if (error) {
      console.error('❌ Erreur lors de la suppression:', error);
      throw error;
    }

    console.log('✅ Commande supprimée avec succès');
    return { success: true };
  } catch (error) {
    console.error('Erreur Supabase deleteOrder:', error);
    return { success: false, error };
  }
}

// Fonction pour récupérer une commande par order_id
export async function getOrderByOrderId(orderId: string) {
  console.log('═══════════════════════════════════════════');
  console.log('🔍 ÉTAPE 6 : RÉCUPÉRATION COMMANDE SUPABASE');
  console.log('═══════════════════════════════════════════');
  console.log('🆔 Order ID recherché:', orderId);
  
  // Vérification si Supabase est configuré
  if (!isSupabaseConfigured || !supabase) {
    console.error('❌ Supabase non configuré - impossible de récupérer la commande');
    console.error('🔧 Vérifier variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env');
    console.log('═══════════════════════════════════════════');
    return { 
      success: false, 
      error: new Error('Supabase non configuré'),
      isConfigError: true
    };
  }

  console.log('✅ Supabase configuré');
  console.log('🌐 URL Supabase:', supabaseUrl?.substring(0, 40) + '...');
  console.log('🔑 Key présente:', supabaseAnonKey ? 'Oui' : 'Non');
  console.log('📡 Requête vers: /orders?order_id=eq.' + orderId);

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.log('');
      console.error('═══════════════════════════════════════════');
      console.error('❌ ERREUR SUPABASE 406/400');
      console.error('═══════════════════════════════════════════');
      console.error('🔴 Code erreur:', error.code);
      console.error('🔴 Message:', error.message);
      console.error('🔴 Détails:', error.details);
      console.error('🔴 Hint:', error.hint);
      console.error('');
      console.error('🔍 CAUSES POSSIBLES ERREUR 406:');
      console.error('   1. Header Accept manquant ou incorrect');
      console.error('   2. Header Content-Type non application/json');
      console.error('   3. Colonne order_id inexistante dans table orders');
      console.error('   4. RLS (Row Level Security) bloque la requête');
      console.error('   5. Clé API invalide ou expirée');
      console.error('');
      console.error('🔧 VÉRIFICATIONS À FAIRE:');
      console.error('   1. Aller sur Supabase Dashboard');
      console.error('   2. Table Editor > orders > vérifier colonnes');
      console.error('   3. Authentication > Policies > vérifier RLS');
      console.error('   4. Settings > API > copier nouvelle clé anon');
      console.error('═══════════════════════════════════════════');
      throw error;
    }

    console.log('✅ Commande trouvée:', data?.order_id);
    console.log('📦 Données:', {
      company_name: data?.company_name,
      email: data?.email,
      status: data?.status,
      template: data?.template
    });
    console.log('═══════════════════════════════════════════');

    return { success: true, data };
  } catch (error) {
    console.error('🔴 Exception catchée:', error);
    console.log('═══════════════════════════════════════════');
    return { success: false, error };
  }
}

// ===== GESTION DES UPLOADS D'IMAGES =====

export const uploadProjectImage = async (file: File, orderId?: string, sectionType?: string) => {
  try {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase non configuré');
    }

    // Générer un order ID si pas fourni
    const id = orderId || `temp_${Date.now()}`;
    const section = sectionType || 'general';
    
    // Extension du fichier
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt || '')) {
      throw new Error('Format d\'image non supporté. Utilisez JPG, PNG, GIF ou WebP.');
    }

    // Structure: order_id/section_type/image_timestamp.ext
    const fileName = `${id}/${section}/image_${Date.now()}.${fileExt}`;

    // Upload vers le bucket 'project-images'
    const { error } = await supabase!.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Erreur upload Supabase:', error);
      throw error;
    }

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase!.storage
      .from('project-images')
      .getPublicUrl(fileName);

    return {
      success: true,
      url: publicUrl,
      path: fileName,
      orderId: id,
      section: section
    };

  } catch (error: any) {
    console.error('Erreur uploadProjectImage:', error);
    return {
      success: false,
      error: error.message || 'Erreur lors de l\'upload de l\'image'
    };
  }
};

export const deleteProjectImage = async (imagePath: string) => {
  try {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase non configuré');
    }

    const { error } = await supabase!.storage
      .from('project-images')
      .remove([imagePath]);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Erreur lors de la suppression' 
    };
  }
};

export const listProjectImages = async (projectId: string) => {
  try {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase non configuré');
    }

    const { data, error } = await supabase!.storage
      .from('project-images')
      .list(projectId);

    if (error) throw error;

    // Retourner les URLs complètes
    const images = data?.map(file => {
      const { data: { publicUrl } } = supabase!.storage
        .from('project-images')
        .getPublicUrl(`${projectId}/${file.name}`);
      
      return {
        name: file.name,
        url: publicUrl,
        path: `${projectId}/${file.name}`
      };
    }) || [];

    return { success: true, images };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Erreur lors de la récupération des images' 
    };
  }
};