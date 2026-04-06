import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, children }) => {
  // Gérer la fermeture avec ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease-out',
        padding: '20px'
      }}
      onClick={onClose} // Click outside pour fermer
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '1400px',
          maxHeight: '900px',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()} // Empêcher fermeture au clic dans le modal
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            zIndex: 10000,
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid var(--gold-primary)',
            borderRadius: '50%',
            color: 'var(--gold-primary)',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--gold-primary)';
            e.currentTarget.style.color = 'var(--bg-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
            e.currentTarget.style.color = 'var(--gold-primary)';
          }}
        >
          ×
        </button>

        {/* Contenu du template */}
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: '#000'
          }}
        >
          {children}
        </div>
      </div>

      {/* Styles CSS en JS pour les animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );

  // Utiliser createPortal pour rendre en dehors du DOM parent
  return createPortal(modalContent, document.body);
};