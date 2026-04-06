// Index des templates disponibles
export { LandingSolo } from './landing-solo/LandingSolo';
export { Restaurant } from './restaurant/Restaurant';
export { Coach } from './coach/Coach';

import { landingSoloConfig } from './landing-solo/config';
import { restaurantConfig } from './restaurant/config';
import { coachConfig } from './coach/config';

export { landingSoloConfig, restaurantConfig, coachConfig };

// Types pour TypeScript
export interface TemplateConfig {
  name: string;
  price: string;
  deliveryTime: string;
  features: string[];
  description: string;
  demoUrl: string;
  screenshot: string;
}

// Liste complète des templates
export const allTemplates = [
  landingSoloConfig,
  restaurantConfig,
  coachConfig
] as const;