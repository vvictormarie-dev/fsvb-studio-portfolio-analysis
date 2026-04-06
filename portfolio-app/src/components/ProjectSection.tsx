import React from 'react';
import styles from './ProjectSection.module.css';
import sectionStyles from '../styles/sectionStyles.module.css';

const projectsData = [
  {
    title: 'Rename IA',
    description: "Application d'intelligence artificielle pour la gestion de noms de marque.",
    image: '/assets/project1.jpg',
    link: '#',
  },
  {
    title: 'ACD Invest',
    description: "Plateforme d'investissement moderne et sécurisée.",
    image: '/assets/project2.jpg',
    link: '#',
  },
  {
    title: 'Portfolio Créatif',
    description: "Site vitrine pour créatifs et entrepreneurs.",
    image: '/assets/project3.jpg',
    link: '#',
  },
];

const ProjectSection: React.FC = () => {
  return (
    <section className={sectionStyles.sectionGold + ' ' + sectionStyles.paperGrain + ' ' + styles.projectSection}>
      <div className="wrapper">
        <h2 className={styles.title}>Projets réalisés</h2>
        <div className={styles.grid}>
          {projectsData.map((project, idx) => (
            <div className={styles.projectCard} key={idx}>
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <a href={project.link} className={styles.ctaButton}>Voir le projet</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
