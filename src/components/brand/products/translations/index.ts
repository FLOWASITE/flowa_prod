
// Re-export types
export * from '../types/ProductTypes';

// Export individual translation categories
export * from './CoreTranslations';
export * from './PricingTranslations';
export * from './ActionTranslations';
export * from './ProductManagementTranslations';
export * from './FormTranslations';
export * from './ImportTranslations';

// Re-export the main productTranslations object
export * from './ProductTranslations';

// Create alias for backwards compatibility with existing components
import { productTranslations } from './ProductTranslations';
export { productTranslations };
