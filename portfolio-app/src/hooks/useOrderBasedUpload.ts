import { useCallback } from 'react';

/**
 * Hook pour uploader des images avec organisation par order_id et section
 * Génère automatiquement l'order_id basé sur les données du formulaire
 */
export const useOrderBasedUpload = (formData: any, existingOrderId?: string) => {
  
  const generateOrderId = useCallback(() => {
    if (existingOrderId) return existingOrderId;
    
    // Générer un order_id temporaire basé sur les données client
    const companySlug = (formData.companyName || 'client').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const timestamp = Date.now();
    return `ORDER-${timestamp}-${companySlug}`;
  }, [formData.companyName, existingOrderId]);

  const uploadWithOrderId = useCallback(async (
    uploadProjectImageFunc: any,
    file: File, 
    sectionType: string
  ) => {
    const orderId = generateOrderId();
    return await uploadProjectImageFunc(file, orderId, sectionType);
  }, [generateOrderId]);

  return {
    generateOrderId,
    uploadWithOrderId
  };
};