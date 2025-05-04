
import { Topic } from '@/types';

// Mock data for Topics Types
export const mockTopicsTypes = [
  {
    id: 'product_highlight',
    name: 'Product Highlight',
  },
  {
    id: 'seasonal_promotion',
    name: 'Seasonal Promotion',
  },
  {
    id: 'user_testimonial',
    name: 'User Testimonial',
  },
  {
    id: 'brand_story',
    name: 'Brand Story',
  },
];

// Update mockTopics to include only the three status types: draft, approved, and rejected
export const mockTopics: Topic[] = [
  {
    id: '1',
    brandId: '1',
    themeTypeId: 'product_highlight',
    productTypeId: '2',
    title: 'Tính năng mới của sản phẩm X',
    description: 'Giới thiệu các tính năng mới của sản phẩm X, tập trung vào trải nghiệm người dùng và hiệu suất.',
    status: 'draft', // Chờ duyệt
    createdBy: 'user',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-15')
  },
  {
    id: '2',
    brandId: '1',
    themeTypeId: 'seasonal_promotion',
    productTypeId: '1',
    title: 'Khuyến mãi hè 2023',
    description: 'Chiến dịch khuyến mãi mùa hè với nhiều ưu đãi đặc biệt cho khách hàng.',
    status: 'approved', // Đã duyệt
    createdBy: 'ai',
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-04-14')
  },
  {
    id: '3',
    brandId: '1',
    themeTypeId: 'user_testimonial',
    title: 'Phản hồi từ khách hàng',
    description: 'Tổng hợp các đánh giá tích cực từ khách hàng về dịch vụ và sản phẩm.',
    status: 'rejected', // Từ chối
    createdBy: 'user',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-10')
  },
  {
    id: '4',
    brandId: '1',
    themeTypeId: 'brand_story',
    title: 'Lịch sử phát triển thương hiệu',
    description: 'Câu chuyện về sự phát triển của thương hiệu qua các năm.',
    status: 'draft', // Chờ duyệt
    createdBy: 'ai',
    createdAt: new Date('2023-04-08'),
    updatedAt: new Date('2023-04-09')
  },
  {
    id: '5',
    brandId: '1',
    themeTypeId: 'product_highlight',
    productTypeId: '3',
    title: 'So sánh sản phẩm Y với đối thủ',
    description: 'Phân tích chi tiết về ưu điểm của sản phẩm Y so với các đối thủ cạnh tranh.',
    status: 'approved', // Đã duyệt
    createdBy: 'user',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-07')
  }
];
