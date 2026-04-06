// Types communs templates
export interface TemplateTheme {
  id: 'empire' | 'lumiere' | 'chaleur' | 'zen' | 'minimaliste';
  name: string;
  description: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  rating: number;
  text: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

// Additional types for components
export interface HeroContent {
  title: string;
  subtitle?: string;
  description: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
    href?: string;
  };
  backgroundImage?: string;
}

export interface TrustItem {
  name: string;
  logo: string;
  alt?: string;
}

export interface Service {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  description: string;
  price?: string;
  features?: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  technologies?: string[];
}

export interface Stat {
  value: string | number;
  label: string;
  description?: string;
  icon?: string | React.ReactNode;
  prefix?: string;
  suffix?: string;
  change?: string;
}

// UI Component Types
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  theme?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Special Component Types
export interface ComparisonBoxProps {
  leftOption: {
    title: string;
    subtitle: string;
    features: string[];
    isRecommended?: boolean;
  };
  rightOption: {
    title: string;
    subtitle: string;
    features: string[];
    isRecommended?: boolean;
  };
  ctaText?: string;
  onCTAClick?: () => void;
  className?: string;
}

export interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon?: string;
  isActive?: boolean;
  isCompleted?: boolean;
  duration?: string;
  className?: string;
}

export interface UrgencyBadgeProps {
  text: string;
  type?: 'warning' | 'danger' | 'info';
  pulsing?: boolean;
  className?: string;
}

export interface GuaranteeBoxProps {
  title: string;
  description: string;
  guaranteeText: string;
  icon?: string;
  className?: string;
}

export interface TemplateButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  onClick?: () => void;
  className?: string;
}