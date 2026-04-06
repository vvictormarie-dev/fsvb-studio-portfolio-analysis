import React, { useState, useMemo } from 'react';
import type { OrderRecord } from '../types/orders';
import styles from './AdminOrdersTable.module.css';

interface AdminOrdersTableProps {
  orders: OrderRecord[];
  onOrderSelect: (orderId: string) => void;
}

const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({ orders, onOrderSelect }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;

  // Trier les commandes par date
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [orders, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + ordersPerPage);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'En attente', class: styles.badgeYellow },
      in_progress: { label: 'En cours', class: styles.badgeBlue },
      waiting_client: { label: 'Attente client', class: styles.badgeOrange },
      done: { label: 'Terminé', class: styles.badgeGreen },
      cancelled: { label: 'Annulé', class: styles.badgeRed }
    };
    const badge = badges[status as keyof typeof badges] || { label: status, class: styles.badgeGray };
    return <span className={`${styles.badge} ${badge.class}`}>{badge.label}</span>;
  };

  const getPaymentBadge = (status: string) => {
    const badges = {
      unpaid: { label: 'Non payé', class: styles.badgeRedLight },
      paid: { label: 'Payé', class: styles.badgeGreenLight },
      refunded: { label: 'Remboursé', class: styles.badgeGray }
    };
    const badge = badges[status as keyof typeof badges] || { label: status, class: styles.badgeGray };
    return <span className={`${styles.badge} ${badge.class}`}>{badge.label}</span>;
  };

  const getProductTypeLabel = (type: string) => {
    const labels = {
      'site-vitrine': 'Site vitrine',
      'fiches-produits': 'Fiches produits',
      'pack-complet': 'Pack complet'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Statut</th>
              <th>Paiement</th>
              <th>Montant</th>
              <th 
                className={styles.sortableHeader}
                onClick={toggleSortOrder}
              >
                Date {sortOrder === 'desc' ? '↓' : '↑'}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr 
                key={order.id}
                className={styles.row}
              >
                <td className={styles.idCell}>
                  #{String(startIndex + index + 1).padStart(3, '0')}
                </td>
                <td className={styles.clientCell}>
                  <div>
                    <div className={styles.companyName}>{order.company_name}</div>
                    <div className={styles.email}>{order.email}</div>
                  </div>
                </td>
                <td>{getProductTypeLabel(order.product_type)}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{getPaymentBadge(order.payment_status)}</td>
                <td className={styles.amountCell}>
                  {order.total_amount ? `${order.total_amount}€` : '-'}
                </td>
                <td>{formatDate(order.created_at || '')}</td>
                <td>
                  <button 
                    className={styles.viewButton}
                    onClick={() => onOrderSelect(order.order_id)}
                  >
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Précédent
          </button>
          
          <span className={styles.paginationInfo}>
            Page {currentPage} sur {totalPages} ({orders.length} commandes)
          </span>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Suivant
          </button>
        </div>
      )}

      {orders.length === 0 && (
        <div className={styles.emptyState}>
          <p>Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersTable;