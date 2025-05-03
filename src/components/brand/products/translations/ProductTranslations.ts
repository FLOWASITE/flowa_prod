
import { coreTranslations } from './CoreTranslations';
import { pricingTranslations } from './PricingTranslations';
import { actionTranslations } from './ActionTranslations';
import { productManagementTranslations } from './ProductManagementTranslations';
import { formTranslations } from './FormTranslations';
import { importTranslations } from './ImportTranslations';

// Merge all translation categories into a single object
export const productTranslations = {
  ...coreTranslations,
  ...pricingTranslations,
  ...actionTranslations,
  ...productManagementTranslations,
  ...formTranslations,
  ...importTranslations,
};
