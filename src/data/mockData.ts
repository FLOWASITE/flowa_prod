import { Content, Topic } from '@/types';

// Mock data for Content
export const mockContents: Content[] = [
  {
    id: '1',
    topicId: '1',
    topicTitle: 'Tính năng mới của sản phẩm X',
    platform: 'facebook',
    text: 'Khám phá tính năng đột phá của sản phẩm X, giúp bạn tối ưu hóa trải nghiệm người dùng và tăng cường hiệu suất làm việc.',
    imageUrl: 'https://source.unsplash.com/800x600/?product',
    status: 'draft',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-15'),
  },
  {
    id: '2',
    topicId: '2',
    topicTitle: 'Khuyến mãi hè 2023',
    platform: 'instagram',
    text: 'Chào hè rực rỡ với chương trình khuyến mãi đặc biệt từ nhãn hàng. Ưu đãi giảm giá lên đến 50% cho tất cả các mặt hàng.',
    imageUrl: 'https://source.unsplash.com/800x600/?sale',
    status: 'approved',
    createdAt: new Date('2023-04-12'),
    updatedAt: new Date('2023-04-14'),
  },
  {
    id: '3',
    topicId: '3',
    topicTitle: 'Phản hồi từ khách hàng',
    platform: 'twitter',
    text: 'Cảm ơn quý khách hàng đã luôn tin tưởng và ủng hộ sản phẩm của chúng tôi. Những phản hồi của bạn là động lực để chúng tôi không ngừng cải thiện.',
    imageUrl: 'https://source.unsplash.com/800x600/?customer',
    status: 'rejected',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-10'),
  },
  {
    id: '4',
    topicId: '4',
    topicTitle: 'Lịch sử phát triển thương hiệu',
    platform: 'linkedin',
    text: 'Hành trình xây dựng và phát triển thương hiệu từ những ngày đầu thành lập đến nay, với những cột mốc đáng nhớ và khó khăn đã vượt qua.',
    imageUrl: 'https://source.unsplash.com/800x600/?brand',
    status: 'generating',
    createdAt: new Date('2023-04-08'),
    updatedAt: new Date('2023-04-09'),
  },
  {
    id: '5',
    topicId: '5',
    topicTitle: 'So sánh sản phẩm Y với đối thủ',
    platform: 'youtube',
    text: 'Video so sánh chi tiết sản phẩm Y với các đối thủ cạnh tranh trên thị trường, giúp bạn có cái nhìn khách quan và đưa ra lựa chọn tốt nhất.',
    imageUrl: 'https://source.unsplash.com/800x600/?comparison',
    status: 'completed',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-07'),
  },
  {
    id: '6',
    topicId: '1',
    topicTitle: 'Mẹo sử dụng sản phẩm X hiệu quả',
    platform: 'tiktok',
    text: 'Hướng dẫn nhanh các mẹo và thủ thuật giúp bạn tận dụng tối đa các tính năng của sản phẩm X, tiết kiệm thời gian và nâng cao năng suất.',
    imageUrl: 'https://source.unsplash.com/800x600/?tips',
    status: 'draft',
    createdAt: new Date('2023-04-03'),
    updatedAt: new Date('2023-04-03'),
  },
  {
    id: '7',
    topicId: '2',
    topicTitle: 'Sự kiện ra mắt sản phẩm Z',
    platform: 'facebook',
    text: 'Thông báo về sự kiện ra mắt sản phẩm Z, với nhiều hoạt động thú vị và cơ hội nhận quà hấp dẫn.',
    imageUrl: 'https://source.unsplash.com/800x600/?event',
    status: 'approved',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-04-02'),
  },
  {
    id: '8',
    topicId: '3',
    topicTitle: 'Báo cáo thường niên 2022',
    platform: 'linkedin',
    text: 'Tổng kết các thành tựu và kết quả kinh doanh nổi bật của công ty trong năm 2022, cùng với những định hướng phát triển trong tương lai.',
    imageUrl: 'https://source.unsplash.com/800x600/?report',
    status: 'rejected',
    createdAt: new Date('2023-03-29'),
    updatedAt: new Date('2023-03-30'),
  },
  {
    id: '9',
    topicId: '4',
    topicTitle: 'Thử thách sáng tạo nội dung',
    platform: 'instagram',
    text: 'Kêu gọi cộng đồng tham gia thử thách sáng tạo nội dung với chủ đề [tên chủ đề], cơ hội thể hiện tài năng và nhận những phần thưởng giá trị.',
    imageUrl: 'https://source.unsplash.com/800x600/?challenge',
    status: 'generating',
    createdAt: new Date('2023-03-27'),
    updatedAt: new Date('2023-03-28'),
  },
  {
    id: '10',
    topicId: '5',
    topicTitle: 'Phỏng vấn chuyên gia về sản phẩm',
    platform: 'youtube',
    text: 'Buổi phỏng vấn độc quyền với chuyên gia hàng đầu về sản phẩm, giải đáp mọi thắc mắc và chia sẻ những thông tin hữu ích.',
    imageUrl: 'https://source.unsplash.com/800x600/?interview',
    status: 'completed',
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-03-26'),
  },
];

// Mock data for Topics
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

export const mockProductTypes = [
  {
    id: '1',
    name: 'Sản phẩm A',
  },
  {
    id: '2',
    name: 'Sản phẩm B',
  },
  {
    id: '3',
    name: 'Sản phẩm C',
  }
];

// Update mockTopics to include various statuses
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
    status: 'generating', // Đang tạo nội dung
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
    status: 'completed', // Hoàn thành
    createdBy: 'user',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-07')
  }
];
