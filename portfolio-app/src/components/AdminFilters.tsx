import React from 'react';
import type { FilterState } from '../types/orders';
import styles from './AdminFilters.module.css';

interface AdminFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const AdminFilters: React.FC<AdminFiltersProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      status: 'all',
      paymentStatus: 'all',
      productType: 'all',
      searchText: ''
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersRow}>
        {/* Statut commande */}
        <div className={styles.filterGroup}>
          <label>Statut commande</label>
          <select 
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="waiting_client">Attente client</option>
            <option value="done">Terminé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        {/* Statut paiement */}
        <div className={styles.filterGroup}>
          <label>Statut paiement</label>
          <select 
            value={filters.paymentStatus}
            onChange={(e) => updateFilter('paymentStatus', e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="unpaid">Non payé</option>
            <option value="paid">Payé</option>
            <option value="refunded">Remboursé</option>
          </select>
        </div>

        {/* Type produit */}
        <div className={styles.filterGroup}>
          <label>Type produit</label>
          <select 
            value={filters.productType}
            onChange={(e) => updateFilter('productType', e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="site-vitrine">Site vitrine</option>
            <option value="fiches-produits">Fiches produits</option>
            <option value="pack-complet">Pack complet</option>
          </select>
        </div>

        {/* Recherche */}
        <div className={styles.filterGroup}>
          <label>Recherche</label>
          <input
            type="text"
            value={filters.searchText}
            onChange={(e) => updateFilter('searchText', e.target.value)}
            placeholder="Nom entreprise ou email..."
          />
        </div>

        {/* Bouton reset */}
        <div className={styles.filterGroup}>
          <button 
            onClick={resetFilters}
            className={styles.resetButton}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFilters;