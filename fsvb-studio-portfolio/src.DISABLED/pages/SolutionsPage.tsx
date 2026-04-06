import React, { useState, useEffect } from 'react';
import { DocumentationLayout } from '../components/DocumentationLayout';
import { Button } from '../components/Button';
import sectionBg from '../styles/sectionStyles.module.css';
import styles from './SolutionsPage.module.css';

const SolutionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', title: 'Accueil', icon: '🚀' },
    { id: 'templates', title: 'Templates', icon: '🎨' },
    { id: 'features', title: 'Fonctionnalités', icon: '⚡' },
    { id: 'process', title: 'Process', icon: '📋' },
    { id: 'surmesure', title: 'Sur-mesure', icon: '💎' },
    { id: 'faq', title: 'FAQ', icon: '❓' },
    { id: 'cta-final', title: 'Commencer', icon: '💬' }
  ];

  // Observer pour détecter la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTemplates = () => {
    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${sectionBg.sectionA} ${styles.pageWrapper}`}>
      <DocumentationLayout
        title="Nos Solutions"
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >

      {/* HERO */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Créez votre site professionnel en 30 minutes
          </h1>
          <p className={styles.heroSubtitle}>
            Templates premium optimisés par IA - Livraison sous 48h - Satisfait ou remboursé
          </p>
          <div className={styles.heroActions}>
            <Button variant="primary" size="large" href="/configurator">
              Commencer maintenant
            </Button>
            <Button variant="ghost" size="large" onClick={scrollToTemplates}>
              Voir les templates
            </Button>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Nos Templates Professionnels</h2>
          <p className={styles.sectionSubtitle}>
            Choisissez le template adapté à votre activité
          </p>
        </div>
        
        <div className={styles.templatesGrid}>
          {/* LANDING SOLO */}
          <div className={`glassCard glassCardBordered ${styles.templateCard}`}>
            <div className={styles.templateImageContainer}>
              <img 
                src="/images/template-landing.png" 
                alt="Template Landing Solo Preview"
                className={styles.templateImage}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Landing+Solo+Preview';
                }}
              />
              <div className={styles.templateBadge}>Bestseller</div>
            </div>
            <div className={styles.templateContent}>
              <h3 className={styles.templateTitle}>🎨 Landing Solo</h3>
              <div className={styles.templatePrice}>350€</div>
              <p className={styles.templateDescription}>
                Site une page élégant - Parfait pour présenter une offre unique et convertir rapidement
              </p>
              <ul className={styles.templateFeatures}>
                <li>Design épuré et moderne</li>
                <li>Hero accrocheur + CTA</li>
                <li>Section services/features</li>
                <li>Témoignages clients</li>
                <li>Formulaire contact</li>
                <li>Optimisé conversion</li>
              </ul>
              <div className={styles.templateActions}>
                <Button 
                  variant="ghost" 
                  onClick={() => window.open('/templates/landing-solo', '_blank')}
                >
                  👁️ Voir la démo
                </Button>
                <Button variant="primary" href="/configurator?template=landing-solo">
                  Commander
                </Button>
              </div>
            </div>
          </div>

          {/* RESTAURANT */}
          <div className={`glassCard glassCardBordered ${styles.templateCard}`}>
            <div className={styles.templateImageContainer}>
              <img 
                src="/images/template-restaurant.png" 
                alt="Template Restaurant Preview"
                className={styles.templateImage}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Restaurant+Preview';
                }}
              />
              <div className={`${styles.templateBadge} ${styles.templateBadgePopular}`}>Populaire</div>
            </div>
            <div className={styles.templateContent}>
              <h3 className={styles.templateTitle}>🍽️ Restaurant</h3>
              <div className={styles.templatePrice}>400€</div>
              <p className={styles.templateDescription}>
                Site complet pour restaurants - Menu en ligne, galerie photos et système de réservation
              </p>
              <ul className={styles.templateFeatures}>
                <li>Menu interactif avec prix</li>
                <li>Galerie photos plats</li>
                <li>Horaires & localisation</li>
                <li>Réservation en ligne</li>
                <li>Section événements</li>
                <li>Responsive mobile</li>
              </ul>
              <div className={styles.templateActions}>
                <Button 
                  variant="ghost" 
                  onClick={() => window.open('/templates/restaurant', '_blank')}
                >
                  👁️ Voir la démo
                </Button>
                <Button variant="primary" href="/configurator?template=restaurant">
                  Commander
                </Button>
              </div>
            </div>
          </div>

          {/* COACH */}
          <div className={`glassCard glassCardBordered ${styles.templateCard}`}>
            <div className={styles.templateImageContainer}>
              <img 
                src="/images/template-coach.png" 
                alt="Template Coach Preview"
                className={styles.templateImage}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Coach+Preview';
                }}
              />
              <div className={`${styles.templateBadge} ${styles.templateBadgePremium}`}>Premium</div>
            </div>
            <div className={styles.templateContent}>
              <h3 className={styles.templateTitle}>💪 Coach</h3>
              <div className={styles.templatePrice}>500€</div>
              <p className={styles.templateDescription}>
                Site premium pour coachs - Présentation expertise, témoignages et prise de rendez-vous
              </p>
              <ul className={styles.templateFeatures}>
                <li>Approche & méthodologie</li>
                <li>Domaines d'expertise</li>
                <li>Certifications & formations</li>
                <li>Témoignages clients</li>
                <li>Prise de rendez-vous (Cal.com)</li>
                <li>Design inspirant</li>
              </ul>
              <div className={styles.templateActions}>
                <Button 
                  variant="ghost" 
                  onClick={() => window.open('/templates/coach', '_blank')}
                >
                  👁️ Voir la démo
                </Button>
                <Button variant="primary" href="/configurator?template=coach">
                  Commander
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS INCLUSES */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Toutes nos solutions incluent</h2>
        </div>
        
        <div className={styles.featuresGrid}>
          <div className={`glassCard ${styles.featureCard}`}>
            <span className={styles.featureIcon}>📱</span>
            <h3 className={styles.featureTitle}>100% Responsive</h3>
            <p className={styles.featureText}>Parfait sur mobile, tablette et desktop</p>
          </div>
          <div className={`glassCard ${styles.featureCard}`}>
            <span className={styles.featureIcon}>🚀</span>
            <h3 className={styles.featureTitle}>Optimisé SEO</h3>
            <p className={styles.featureText}>Référencement Google intégré</p>
          </div>
          <div className={`glassCard ${styles.featureCard}`}>
            <span className={styles.featureIcon}>⚡</span>
            <h3 className={styles.featureTitle}>Performance Ultra-Rapide</h3>
            <p className={styles.featureText}>Temps de chargement &lt; 2 secondes</p>
          </div>
          <div className={`glassCard ${styles.featureCard}`}>
            <span className={styles.featureIcon}>🎨</span>
            <h3 className={styles.featureTitle}>Design Professionnel</h3>
            <p className={styles.featureText}>Interface moderne et élégante</p>
          </div>
          <div className={`glassCard ${styles.featureCard}`}>
            <span className={styles.featureIcon}>🔒</span>
            <h3 className={styles.featureTitle}>Sécurisé HTTPS</h3>
            <p className={styles.featureText}>Certificat SSL inclus</p>
          </div>
          <div className={`glassCard ${styles.featureCard}`}>
            <span className={styles.featureIcon}>📊</span>
            <h3 className={styles.featureTitle}>Analytics Intégré</h3>
            <p className={styles.featureText}>Suivi des visiteurs et performances</p>
          </div>
        </div>
      </section>

      {/* PROCESS DE LIVRAISON */}
      <section id="process" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Notre process en 3 étapes</h2>
        </div>
        
        <div className={styles.processContainer}>
          <div className={styles.processStep}>
            <div className={styles.processNumber}>1</div>
            <h3 className={styles.processTitle}>Configuration - 30 min</h3>
            <p className={styles.processDescription}>
              Configurateur guidé pour personnaliser votre site selon vos besoins
            </p>
          </div>
          <div className={styles.processArrow}>→</div>
          <div className={styles.processStep}>
            <div className={styles.processNumber}>2</div>
            <h3 className={styles.processTitle}>Validation - 24h</h3>
            <p className={styles.processDescription}>
              Génération automatique + aperçu complet pour validation
            </p>
          </div>
          <div className={styles.processArrow}>→</div>
          <div className={styles.processStep}>
            <div className={styles.processNumber}>3</div>
            <h3 className={styles.processTitle}>Livraison - 48h</h3>
            <p className={styles.processDescription}>
              Mise en ligne + tous les accès et documentations fournis
            </p>
          </div>
        </div>
      </section>

      {/* SUR-MESURE */}
      <section id="surmesure" className={styles.section}>
        <div className={`glassCard glassCardBordered ${styles.customCard}`}>
          <div className={styles.customContent}>
            <h2 className={styles.customTitle}>Besoin d'un site sur-mesure ?</h2>
            <p className={styles.customDescription}>
              Création de sites entièrement personnalisés selon vos spécifications
            </p>
            <div className={styles.customFeatures}>
              <div className={styles.customFeature}>✨ Design 100% unique</div>
              <div className={styles.customFeature}>⚙️ Fonctionnalités avancées</div>
              <div className={styles.customFeature}>🔗 Intégrations spécifiques</div>
              <div className={styles.customFeature}>📚 Formation incluse</div>
            </div>
            <Button variant="primary" size="large" href="/contact">
              Demander un devis personnalisé
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Questions fréquentes</h2>
        </div>
        
        <div className={styles.faqGrid}>
          <div className={`glassCard glassCardBordered ${styles.faqItem}`}>
            <h4 className={styles.faqQuestion}>Combien de temps pour avoir mon site ?</h4>
            <p className={styles.faqAnswer}>48h maximum après validation de votre configuration</p>
          </div>
          <div className={`glassCard glassCardBordered ${styles.faqItem}`}>
            <h4 className={styles.faqQuestion}>Puis-je modifier mon site après ?</h4>
            <p className={styles.faqAnswer}>Oui, accès complet + documentation fournie</p>
          </div>
          <div className={`glassCard glassCardBordered ${styles.faqItem}`}>
            <h4 className={styles.faqQuestion}>Le prix inclut l'hébergement ?</h4>
            <p className={styles.faqAnswer}>Oui, 1ère année d'hébergement incluse</p>
          </div>
          <div className={`glassCard glassCardBordered ${styles.faqItem}`}>
            <h4 className={styles.faqQuestion}>Puis-je essayer avant de payer ?</h4>
            <p className={styles.faqAnswer}>Oui, le configurateur est entièrement gratuit</p>
          </div>
          <div className={`glassCard glassCardBordered ${styles.faqItem}`}>
            <h4 className={styles.faqQuestion}>Proposez-vous une garantie ?</h4>
            <p className={styles.faqAnswer}>Oui, satisfait ou remboursé sous 15 jours</p>
          </div>
          <div className={`glassCard glassCardBordered ${styles.faqItem}`}>
            <h4 className={styles.faqQuestion}>Mon site sera-t-il bien référencé ?</h4>
            <p className={styles.faqAnswer}>Oui, tous nos sites sont optimisés SEO</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" className={styles.section}>
        <div className={`glassCard glassCardBordered ${styles.ctaCard}`}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Prêt à créer votre site professionnel ?</h2>
            <p className={styles.ctaSubtitle}>
              Rejoignez des dizaines d'entrepreneurs qui nous font confiance
            </p>
            <Button variant="primary" size="large" href="/configurator" className={styles.ctaButton}>
              Commencer gratuitement
            </Button>
            <p className={styles.ctaGuarantee}>
              ✅ Sans engagement • 💳 Paiement sécurisé • 🔒 Satisfait ou remboursé
            </p>
          </div>
        </div>
      </section>
      
      </DocumentationLayout>
    </div>
  );
};

export default SolutionsPage;