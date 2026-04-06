import React from 'react';
import type { OrderRecord } from '../types/orders';
import styles from './AdminStats.module.css';

interface AdminStatsProps {
  orders: OrderRecord[];
}

const AdminStats: React.FC<AdminStatsProps> = ({ orders }) => {
  // Calculer les statistiques
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    done: orders.filter(o => o.status === 'done').length,
    ca: orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + (o.total_amount || 0), 0)
  };

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.icon}>📊</div>
        <div className={styles.number}>{stats.total}</div>
        <div className={styles.label}>Total commandes</div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.icon}>⏳</div>
        <div className={styles.number}>{stats.pending}</div>
        <div className={styles.label}>En attente</div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.icon}>🚀</div>
        <div className={styles.number}>{stats.inProgress}</div>
        <div className={styles.label}>En cours</div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.icon}>✅</div>
        <div className={styles.number}>{stats.done}</div>
        <div className={styles.label}>Terminées</div>
      </div>

      <div className={`${styles.statCard} ${styles.caCard}`}>
        <div className={styles.icon}>💰</div>
        <div className={styles.number}>{stats.ca.toLocaleString('fr-FR')}€</div>
        <div className={styles.label}>CA Total</div>
      </div>
    </div>
  );
};

export default AdminStats;