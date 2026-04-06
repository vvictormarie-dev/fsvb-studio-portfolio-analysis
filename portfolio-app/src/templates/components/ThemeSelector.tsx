import React, { useState } from 'react';

interface ThemeSelectorProps {
  onThemeChange?: (theme: string) => void;
}

const themes = [
  { id: 'empire', name: 'Empire', icon: '⚡', desc: 'Tech/SaaS' },
  { id: 'lumiere', name: 'Lumière', icon: '☀️', desc: 'Professionnel' },
  { id: 'chaleur', name: 'Chaleur', icon: '🔥', desc: 'Restaurant' },
  { id: 'zen', name: 'Zen', icon: '🧘', desc: 'Bien-être' },
  { id: 'minimaliste', name: 'Minimal', icon: '◻️', desc: 'Designer' }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState('empire');

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    // Appliquer le thème à l'élément root ET au wrapper template
    document.documentElement.setAttribute('data-theme', themeId);
    const templateWrapper = document.querySelector('.templateWrapper');
    if (templateWrapper) {
      templateWrapper.setAttribute('data-theme', themeId);
    }
    onThemeChange?.(themeId);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: 'var(--template-glass-bg)',
      backdropFilter: 'var(--template-glass-blur)',
      border: '1px solid var(--template-glass-border)',
      borderRadius: 'var(--template-radius-md)',
      padding: '1rem'
    }}>
      <h4 style={{ 
        margin: '0 0 1rem 0', 
        color: 'var(--template-text-primary)',
        fontSize: '0.9rem'
      }}>
        Thème
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem',
              border: selectedTheme === theme.id ? '2px solid var(--template-accent)' : '1px solid transparent',
              borderRadius: 'var(--template-radius-sm)',
              background: selectedTheme === theme.id ? 'var(--template-accent)' : 'transparent',
              color: selectedTheme === theme.id ? 'var(--template-bg-start)' : 'var(--template-text-primary)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{theme.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '600' }}>{theme.name}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{theme.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};