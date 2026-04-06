// Main Components Export
export * from './hero';
export * from './cards';  
export * from './ui';
export * from './sections';
export * from './special';

// Resolve naming conflicts
export { PortfolioItem as PortfolioCard } from './cards';

// Export specific types to avoid conflicts
export type { 
  TemplateTheme,
  ServicePackage,
  Testimonial,
  FAQItem,
  Feature,
  ProcessStep,
  ContactFormData,
  StatItem,
  HeroContent,
  TrustItem,
  Service,
  PortfolioProject,
  Stat,
  NavItem,
  SectionProps,
  FooterLink,
  FooterSection
} from './types';