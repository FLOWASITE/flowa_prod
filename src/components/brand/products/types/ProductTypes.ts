
export interface Product {
  id?: string;
  brandId?: string;
  name: string;           // Product name
  pricing: string;        // Legacy pricing field (for backward compatibility)
  priceAmount?: number;   // Price amount as number
  priceUnit?: string;     // Unit of measurement (kg, cái, mét, etc.)
  priceCurrency?: string; // Currency (VND, USD, IDR, SGD)
  description: string;    // Description
  features: string[];     // We'll keep this but de-emphasize in UI
  benefits?: string;      // We'll keep this but de-emphasize in UI
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
