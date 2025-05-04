
import { ChatMessage, ChatConversation } from '@/types';

// Add mock chat conversations
export const mockChatConversations: ChatConversation[] = [
  {
    id: '1',
    platform: 'messenger',
    customerId: 'cust-001',
    customerName: 'Nguyễn Văn A',
    status: 'active',
    createdAt: new Date('2023-05-04T09:30:00'),
    updatedAt: new Date('2023-05-04T09:31:00'),
    messages: [
      {
        id: '1',
        role: 'user',
        sender: 'customer',
        content: 'Xin chào, tôi cần hỗ trợ về sản phẩm X',
        timestamp: new Date('2023-05-04T09:30:00')
      },
      {
        id: '2',
        role: 'assistant',
        sender: 'bot',
        content: 'Chào bạn! Tôi có thể giúp gì cho bạn về sản phẩm X?',
        timestamp: new Date('2023-05-04T09:31:00')
      }
    ]
  },
  {
    id: '2',
    platform: 'zalo',
    customerId: 'cust-002',
    customerName: 'Trần Thị B',
    status: 'active',
    createdAt: new Date('2023-05-04T10:15:00'),
    updatedAt: new Date('2023-05-04T10:16:00'),
    messages: [
      {
        id: '3',
        role: 'user',
        sender: 'customer',
        content: 'Làm sao để đặt hàng trực tuyến?',
        timestamp: new Date('2023-05-04T10:15:00')
      },
      {
        id: '4',
        role: 'assistant',
        sender: 'bot',
        content: 'Để đặt hàng trực tuyến, bạn có thể truy cập vào website của chúng tôi tại example.com và làm theo các bước sau...',
        timestamp: new Date('2023-05-04T10:16:00')
      }
    ]
  },
  {
    id: '3',
    platform: 'linkedin',
    customerId: 'cust-003',
    customerName: 'Phạm Văn C',
    status: 'resolved',
    createdAt: new Date('2023-05-03T14:20:00'),
    updatedAt: new Date('2023-05-03T14:22:00'),
    messages: [
      {
        id: '5',
        role: 'user',
        sender: 'customer',
        content: 'Tôi muốn tìm hiểu thêm về dịch vụ tư vấn của công ty',
        timestamp: new Date('2023-05-03T14:20:00')
      },
      {
        id: '6',
        role: 'assistant',
        sender: 'bot',
        content: 'Xin chào! Dịch vụ tư vấn của chúng tôi bao gồm nhiều lĩnh vực khác nhau...',
        timestamp: new Date('2023-05-03T14:22:00')
      }
    ]
  }
];

// Add mock chat messages for ChatWindow component
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    sender: 'customer',
    content: 'Xin chào, tôi cần hỗ trợ về sản phẩm X',
    timestamp: new Date('2023-05-04T09:30:00')
  },
  {
    id: '2',
    role: 'assistant',
    sender: 'bot',
    content: 'Chào bạn! Tôi có thể giúp gì cho bạn về sản phẩm X?',
    timestamp: new Date('2023-05-04T09:31:00')
  },
  {
    id: '3',
    role: 'user',
    sender: 'customer',
    content: 'Tôi không thể kích hoạt tính năng Y',
    timestamp: new Date('2023-05-04T09:33:00')
  },
  {
    id: '4',
    role: 'assistant',
    sender: 'bot',
    content: 'Tôi hiểu rồi. Để kích hoạt tính năng Y, trước tiên bạn cần phải cập nhật phiên bản mới nhất. Sau đó, vào Cài đặt > Tính năng > Kích hoạt Y.',
    timestamp: new Date('2023-05-04T09:34:00')
  },
  {
    id: '5',
    role: 'user',
    sender: 'customer',
    content: 'Tôi đã thử nhưng vẫn không được',
    timestamp: new Date('2023-05-04T09:36:00')
  },
  {
    id: '6',
    role: 'assistant',
    sender: 'bot',
    content: 'Trong trường hợp đó, có thể bạn cần khởi động lại thiết bị. Nếu vẫn không được, vui lòng cho tôi biết thông báo lỗi bạn nhận được.',
    timestamp: new Date('2023-05-04T09:37:00')
  },
  {
    id: '7',
    role: 'user',
    sender: 'customer',
    content: 'Để tôi thử và phản hồi lại sau.',
    timestamp: new Date('2023-05-04T09:38:00')
  },
  {
    id: '8',
    role: 'assistant',
    sender: 'bot',
    content: 'Vâng, không vấn đề gì. Tôi sẽ ở đây để hỗ trợ bạn khi cần thiết.',
    timestamp: new Date('2023-05-04T09:39:00')
  }
];
