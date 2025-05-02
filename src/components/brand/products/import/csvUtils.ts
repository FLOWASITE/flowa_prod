
import { Product } from "../translations";

export interface ValidationError {
  row: number;
  field: keyof Product;
  message: string;
}

/**
 * Parses CSV text content to product data with validation
 */
export const parseCsvToProducts = async (file: File): Promise<{
  products: Product[];
  validationErrors: ValidationError[];
}> => {
  const text = await file.text();
  const rows = text.split('\n').map(row => {
    const result = [];
    let inQuote = false;
    let current = '';
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  });
  
  // Skip header row
  const validationErrors: ValidationError[] = [];
  const products: Product[] = [];

  // Process data rows
  rows.slice(1)
    .filter(row => row.length >= 5 && row.some(cell => cell.trim()))
    .forEach((row, index) => {
      const rowNumber = index + 2; // +1 for zero-index, +1 for header row
      const name = row[0].trim().replace(/^"|"$/g, '');
      const pricing = row[1].trim().replace(/^"|"$/g, '');
      const description = row[2].trim().replace(/^"|"$/g, '');
      const featuresText = row[3] ? row[3].replace(/^"|"$/g, '') : '';
      const features = featuresText ? featuresText.split(';').filter(Boolean) : [];
      const benefits = row[4].trim().replace(/^"|"$/g, '');

      // Validate required fields
      if (!name) {
        validationErrors.push({
          row: rowNumber,
          field: 'name',
          message: 'Product name is required'
        });
      }

      if (!pricing) {
        validationErrors.push({
          row: rowNumber,
          field: 'pricing',
          message: 'Price is required'
        });
      }

      if (!description) {
        validationErrors.push({
          row: rowNumber,
          field: 'description',
          message: 'Description is required'
        });
      }

      if (features.length === 0) {
        validationErrors.push({
          row: rowNumber,
          field: 'features',
          message: 'At least one feature is required'
        });
      }

      // Add the product to the list regardless of validation
      // This allows showing the preview with highlighting for invalid fields
      products.push({
        name,
        pricing,
        description,
        features,
        benefits
      });
    });

  return { products, validationErrors };
};

/**
 * Generates a CSV template file for product imports
 */
export const generateTemplateFile = (productNameText: string, priceText: string, descriptionText: string, featuresText: string, benefitsText: string): void => {
  const csvContent = `${productNameText},${priceText},${descriptionText},${featuresText},${benefitsText}\n"Product A","$99","This is product A","Feature 1;Feature 2;Feature 3","Improves productivity"\n"Product B","$199","This is product B","Feature 1;Feature 2","Saves time"`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'products_template.csv';
  link.click();
  URL.revokeObjectURL(link.href);
};
