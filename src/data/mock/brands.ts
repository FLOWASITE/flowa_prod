
import { Brand } from '@/types';

// Add mockBrands data
export const mockBrands = [
  {
    id: '1',
    name: 'Brand A',
    description: 'A sample brand for demo purposes',
    colors: {
      primary: '#4f46e5',
      secondary: '#10b981',
    },
    tone: 'Professional',
    themes: ['Modern', 'Tech'],
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-03-15'),
  },
  {
    id: '2',
    name: 'Brand B',
    description: 'Another sample brand for testing',
    logo: 'https://source.unsplash.com/100x100/?logo',
    website: 'https://example.com',
    colors: {
      primary: '#ef4444',
      secondary: '#3b82f6',
    },
    tone: 'Friendly',
    themes: ['Vibrant', 'Retail'],
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-04-01'),
  }
];
