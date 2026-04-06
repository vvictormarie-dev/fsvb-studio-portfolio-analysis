import React from 'react';
import styles from './TemplateSection.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';
import TemplateCard from './TemplateCard';

const templatesData = [
  {
    name: 'Landing Épure',
    price: 'à partir de 80 €',
    image: '/assets/template1.png',
  },
  {
    name: 'Portfolio Créatif',
    price: 'à partir de 120 €',
    image: '/assets/template1.png',
  },
  {
    name: 'Boutique Minimal',
    price: 'à partir de 150 €',
    image: '/assets/template1.png',
  },
];

const TemplateSection: React.FC = () => {
  return (
    <section className={sectionStyles.sectionGold + ' ' + sectionStyles.paperGrain + ' ' + styles.section}>
      <div className="wrapper">
        <h2 className={styles.title}>Templates prêts à l’emploi</h2>
        <div className={styles.grid}>
          {templatesData.map((tpl, idx) => (
            <TemplateCard
              key={idx}
              imageSrc={tpl.image}
              title={tpl.name}
              price={tpl.price}
              link="#"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateSection;
