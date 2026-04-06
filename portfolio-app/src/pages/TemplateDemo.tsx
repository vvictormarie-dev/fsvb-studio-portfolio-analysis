import React from 'react';
import { useParams } from 'react-router-dom';
import { LandingSolo } from '../templates/landing-solo/LandingSolo';
import { Restaurant } from '../templates/restaurant/Restaurant';
import { Coach } from '../templates/coach/Coach';

const TemplateDemo: React.FC = () => {
  const { templateName } = useParams<{ templateName: string }>();

  const getTemplateComponent = () => {
    switch (templateName) {
      case 'landing-solo':
        return <LandingSolo />;
      case 'restaurant':
        return <Restaurant />;
      case 'coach':
        return <Coach />;
      default:
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: '#1a1a1a',
            color: 'white',
            fontSize: '1.5rem'
          }}>
            Template "{templateName}" non trouvé
          </div>
        );
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh',
      overflow: 'auto'
    }}>
      {getTemplateComponent()}
    </div>
  );
};

export default TemplateDemo;