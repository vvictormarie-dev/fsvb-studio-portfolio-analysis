// Types for FSVB Studio orders
export interface OrderRecord {
  id?: string;
  order_id: string;
  template: string;
  theme: string;
  company_name: string;
  email: string;
  phone?: string;
  form_data: any; // JSON complet du formulaire
  config: any; // JSON de configuration (colonne existante NOT NULL)
  sections_config: any; // JSON de la configuration des sections
  contact_info: any; // JSON des infos contact consolidées
  assets: any; // JSON des assets (logoUrl, etc.)
  color_mode?: string;
  
  // NOUVEAUX CHAMPS FSVB STUDIO
  product_type: 'site-vitrine' | 'fiches-produits' | 'pack-complet';
  status: 'pending' | 'in_progress' | 'waiting_client' | 'done' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'refunded';
  total_amount?: number;
  stripe_payment_id?: string;
  business_sector?: string;
  current_website?: string;
  project_description?: string;
  
  created_at?: string;
  updated_at?: string;
}

export type OrderStatus = OrderRecord['status'];
export type PaymentStatus = OrderRecord['payment_status'];
export type ProductType = OrderRecord['product_type'];

// Admin dashboard types
export interface FilterState {
  status: string;
  paymentStatus: string;
  productType: string;
  searchText: string;
}