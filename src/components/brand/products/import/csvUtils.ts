
import { Product } from "../translations";

/**
 * Parses CSV text content to product data
 */
export const parseCsvToProducts = async (file: File): Promise<Product[]> => {
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
  const products = rows.slice(1)
    .filter(row => row.length >= 5 && row[0])
    .map(row => {
      const features = row[3] ? row[3].replace(/^"|"$/g, '').split(';').filter(Boolean) : [];
      
      return {
        name: row[0].trim().replace(/^"|"$/g, ''),
        pricing: row[1].trim().replace(/^"|"$/g, ''),
        description: row[2].trim().replace(/^"|"$/g, ''),
        features: features,
        benefits: row[4].trim().replace(/^"|"$/g, '')
      };
    });

  return products;
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
