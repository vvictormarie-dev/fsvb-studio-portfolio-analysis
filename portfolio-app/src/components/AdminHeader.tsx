import React from 'react';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  user: any;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>FSVB Studio</h1>
          <span>Administration</span>
        </div>

        <div className={styles.userInfo}>
          <span className={styles.userEmail}>
            👤 {user?.email}
          </span>
        </div>

        <button 
          onClick={onLogout}
          className={styles.logoutButton}
        >
          Se déconnecter
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;