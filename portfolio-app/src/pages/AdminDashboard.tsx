import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../config/supabase';
import type { OrderRecord, FilterState } from '../types/orders';
import AdminHeader from '../components/AdminHeader.tsx';
import AdminStats from '../components/AdminStats.tsx';
import AdminFilters from '../components/AdminFilters.tsx';
import AdminOrdersTable from '../components/AdminOrdersTable.tsx';
import AdminOrderDetail from '../components/AdminOrderDetail.tsx';
import AdminFormsSection from '../components/AdminFormsSection.tsx';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'forms'>(
    location.pathname === '/admin/forms' ? 'forms' : 'orders'
  );
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    paymentStatus: 'all',
    productType: 'all',
    searchText: ''
  });

  // Vérifier l'authentification et charger les données
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      if (!supabase) {
        console.error('Supabase non configuré');
        navigate('/admin/login');
        return;
      }

      try {
        // Vérifier la session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/admin/login');
          return;
        }

        setUser(session.user);

        // Charger les commandes
        await loadOrders();
        
      } catch (error) {
        console.error('Erreur auth/data:', error);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [navigate]);

  // Auto-refresh toutes les 30 secondes pour garder les données à jour
  useEffect(() => {
    if (!user || !supabase) return;
    
    const interval = setInterval(() => {
      console.log('🔄 Auto-refresh dashboard...');
      loadOrders();
      setLastUpdate(new Date());
    }, 30000); // Refresh toutes les 30 secondes

    return () => clearInterval(interval);
  }, [user]);

  const loadOrders = async () => {
    if (!supabase) {
      console.warn('Supabase non configuré - impossible de charger les commandes');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur chargement commandes:', error);
        // Afficher un message d'erreur plus informatif à l'utilisateur
        return;
      }

      setOrders(data || []);
      setFilteredOrders(data || []);
      console.log('📊 Commandes chargées:', data?.length);
    } catch (error) {
      console.error('Erreur loadOrders:', error);
    }
  };

  // Fonction de refresh manuel
  const handleRefresh = async () => {
    console.log('🔄 Refresh manuel des données...');
    await loadOrders();
    setLastUpdate(new Date());
  };

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...orders];

    // Filtrer par statut commande
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Filtrer par statut paiement
    if (filters.paymentStatus !== 'all') {
      filtered = filtered.filter(order => order.payment_status === filters.paymentStatus);
    }

    // Filtrer par type produit
    if (filters.productType !== 'all') {
      filtered = filtered.filter(order => order.product_type === filters.productType);
    }

    // Filtrer par texte de recherche
    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(order => 
        order.company_name.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.order_id.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, filters]);

  const handleLogout = async () => {
    if (!supabase) return;
    
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // Fermer le détail et recharger les données
  const handleCloseOrderDetail = async () => {
    setSelectedOrderId(null);
    // Recharger les commandes pour mettre à jour l'affichage
    await loadOrders();
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <AdminHeader 
        user={user} 
        onLogout={handleLogout}
      />

      <div className={styles.container}>
        {/* Header avec refresh et onglets */}
        <div className={styles.dashboardHeader}>
          <div className={styles.title}>
            <h1>Dashboard Admin</h1>
            <span className={styles.lastUpdate}>
              Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
            </span>
          </div>
          <button 
            className={styles.refreshButton}
            onClick={handleRefresh}
            title="Actualiser les données"
          >
            🔄 Actualiser
          </button>
        </div>

        {/* Système d'onglets */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'orders' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Commandes ({orders.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'forms' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('forms')}
          >
            📋 Formulaires Pré-Session
          </button>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'orders' && (
          <>
            <AdminStats orders={orders} />
            
            <AdminFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
            
            <AdminOrdersTable 
              orders={filteredOrders}
              onOrderSelect={setSelectedOrderId}
            />
          </>
        )}

        {activeTab === 'forms' && (
          <AdminFormsSection className={styles.formsSection} />
        )}
      </div>

      {selectedOrderId && (
        <AdminOrderDetail
          orderId={selectedOrderId}
          isOpen={!!selectedOrderId}
          onClose={handleCloseOrderDetail}
        />
      )}
    </div>
  );
};

export default AdminDashboard;