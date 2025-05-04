
import { Content } from '@/types';

// Mock data for Content
export const mockContents: Content[] = [
  {
    id: '1',
    topicId: '2',
    topicTitle: 'Khuyến mãi hè 2023',
    platform: 'facebook',
    text: 'Chiến dịch khuyến mãi mùa hè đã trở lại với nhiều ưu đãi đặc biệt dành cho khách hàng! Ghé thăm cửa hàng ngay hôm nay để nhận được những món quà hấp dẫn.',
    imageUrl: 'https://example.com/images/summer_promo.jpg',
    status: 'draft',
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-04-12')
  },
  {
    id: '2',
    topicId: '2',
    topicTitle: 'Khuyến mãi hè 2023',
    platform: 'instagram',
    text: '☀️ Mùa hè rực rỡ, ưu đãi bất ngờ! Giảm giá lên đến 50% cho tất cả các sản phẩm mới. #SummerSale #Promo2023',
    imageUrl: 'https://example.com/images/summer_promo_ig.jpg',
    status: 'draft',
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-04-12')
  },
  {
    id: '3',
    topicId: '2',
    topicTitle: 'Khuyến mãi hè 2023',
    platform: 'linkedin',
    text: 'Chúng tôi vui mừng thông báo về chương trình khuyến mãi mùa hè 2023. Đây là cơ hội tuyệt vời để đối tác và khách hàng tiếp cận các sản phẩm chất lượng cao với giá ưu đãi.',
    status: 'draft',
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-04-12')
  },
  {
    id: '4',
    topicId: '5',
    topicTitle: 'So sánh sản phẩm Y với đối thủ',
    platform: 'facebook',
    text: 'Sản phẩm Y của chúng tôi vượt trội hơn hẳn so với các đối thủ cạnh tranh về hiệu suất, độ bền và giá thành. Xem ngay bảng so sánh chi tiết!',
    imageUrl: 'https://example.com/images/product_compare.jpg',
    status: 'approved',
    approvedAt: new Date('2023-04-06'),
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-06')
  },
  {
    id: '5',
    topicId: '5',
    topicTitle: 'So sánh sản phẩm Y với đối thủ',
    platform: 'instagram',
    text: 'Sản phẩm Y: Hiệu suất cao hơn 30%, Tuổi thọ dài hơn 2 lần, Giá thành hợp lý hơn đối thủ. Swipe để xem bảng so sánh chi tiết! #ProductY #BestChoice',
    imageUrl: 'https://example.com/images/product_compare_ig.jpg',
    status: 'published',
    approvedAt: new Date('2023-04-06'),
    publishedAt: new Date('2023-04-07'),
    engagementLikes: 245,
    engagementComments: 32,
    engagementShares: 18,
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-07')
  }
];
