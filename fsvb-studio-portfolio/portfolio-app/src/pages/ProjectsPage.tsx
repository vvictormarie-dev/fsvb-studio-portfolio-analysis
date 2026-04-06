import React from 'react';
import sectionStyles from '../styles/sectionStyles.module.css';
import styles from './Projects.module.css';
import ProjectSection from '../components/ProjectSection';
import ContactSection from '../components/ContactSection';

const testimonials = [
  {
    name: 'Julie D.',
    text: "Super expérience, site moderne et efficace ! Je recommande Suzanne pour son écoute et sa créativité.",
  },
  {
    name: 'Marc L.',
    text: "Un accompagnement pro et humain, résultat au top pour mon projet d'entreprise.",
  },
];

const Projects: React.FC = () => {
  return (
    <>
      {/* 1. Titre de section */}
      <section className={sectionStyles.sectionDark + ' ' + styles.sectionTitle}>
        <h1 className={`${styles.title} pageTitle`}>Projets réalisés</h1>
      </section>

      {/* 2. Grille de projets */}
      <section className={sectionStyles.sectionGold + ' ' + sectionStyles.paperGrain + ' ' + styles.gallerySection}>
        <ProjectSection />
      </section>

      {/* 3. Témoignages */}
      <section className={sectionStyles.sectionGold + ' ' + sectionStyles.paperGrain + ' ' + styles.testimonialsSection}>
        <h2 className={styles.testimonialsTitle}>Ils m'ont fait confiance</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, idx) => (
            <div className={styles.testimonialCard} key={idx}>
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
              <span className={styles.testimonialName}>— {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Section CTA */}
      <section className={sectionStyles.sectionDark + ' ' + styles.ctaSection}>
        <ContactSection />
      </section>
    </>
  );
};

export default Projects;
