import React, { useState } from 'react';
import styles from './DocumentationLayout.module.css';

interface Section {
  id: string;
  title: string;
  icon?: string;
}

interface DocumentationLayoutProps {
  children: React.ReactNode;
  sections: Section[];
  title: string;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({
  children,
  sections,
  title,
  activeSection,
  onSectionChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onSectionChange(sectionId);
    }
    setSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Navigation latérale frosted glass */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{title}</h2>
          <button 
            className={styles.closeSidebar}
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.icon && <span className={styles.navIcon}>{section.icon}</span>}
              {section.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Zone principale scrollable */}
      <main className={styles.mainContent}>
        <button 
          className={styles.toggleSidebar}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        
        <div className={styles.content}>
          {children}
        </div>
      </main>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};