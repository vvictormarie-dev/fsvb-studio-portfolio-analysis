import React from 'react';

interface EditButtonProps {
  sectionId: string;
  onEdit: (sectionId: string) => void;
  className?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ 
  sectionId, 
  onEdit, 
  className = '' 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(sectionId);
  };

  return (
    <button
      className={`edit-button ${className}`}
      onClick={handleClick}
      title={`Modifier la section ${sectionId}`}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease',
        opacity: 0.8,
        color: '#000'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.8';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      🖍️
    </button>
  );
};