
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PricingTable() {
  const { currentLanguage } = useLanguage();
  
  const isVietnamese = currentLanguage.code === 'vi';
  
  return (
    <div className="w-full max-w-7xl mx-auto my-8 overflow-x-auto">
      <div className="min-w-[800px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-200 bg-gray-50 p-4 text-left font-medium text-gray-600">{isVietnamese ? 'Tính năng' : 'Features'}</th>
              <th className="border border-gray-200 bg-gray-50 p-4 text-center font-medium text-gray-800">Basic</th>
              <th className="border border-gray-200 bg-gray-50 p-4 text-center font-medium text-gray-800">Professional</th>
              <th className="border border-gray-200 bg-gray-50 p-4 text-center font-medium text-gray-800">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'GIÁ THÁNG' : 'MONTHLY PRICE'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '$19/tháng/người dùng' : '$19/month/user'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '$49/tháng/người dùng' : '$49/month/user'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '$99/tháng/người dùng' : '$99/month/user'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">
                {isVietnamese ? 'GIÁ NĂM (tiết kiệm 20%)' : 'ANNUAL PRICE (20% savings)'}
              </td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '$182/năm/người dùng' : '$182/year/user'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '$470/năm/người dùng' : '$470/year/user'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '$950/năm/người dùng' : '$950/year/user'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Phù hợp cho' : 'Suitable for'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Cá nhân, Freelancer, Startup' : 'Individual, Freelancer, Startup'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'SMB, Agency nhỏ' : 'SMB, Small Agency'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Agency lớn, Doanh nghiệp' : 'Large Agency, Enterprise'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium" colSpan={4}>
                <Badge variant="secondary" className="mb-1">
                  {isVietnamese ? 'Tự động tạo nội dung' : 'Automated Content Creation'}
                </Badge>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Số lượng Brand' : 'Number of Brands'}</td>
              <td className="border border-gray-200 p-4 text-center">1</td>
              <td className="border border-gray-200 p-4 text-center">3</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Không giới hạn' : 'Unlimited'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Tạo chủ đề/tháng' : 'Topics/month'}</td>
              <td className="border border-gray-200 p-4 text-center">20</td>
              <td className="border border-gray-200 p-4 text-center">100</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Không giới hạn' : 'Unlimited'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Tạo nội dung/tháng' : 'Content pieces/month'}</td>
              <td className="border border-gray-200 p-4 text-center">100</td>
              <td className="border border-gray-200 p-4 text-center">500</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Không giới hạn' : 'Unlimited'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Nền tảng mạng xã hội' : 'Social platforms'}</td>
              <td className="border border-gray-200 p-4 text-center">3</td>
              <td className="border border-gray-200 p-4 text-center">7</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Không giới hạn' : 'Unlimited'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Tạo hình ảnh' : 'Image generation'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Cơ bản (50/tháng)' : 'Basic (50/month)'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Nâng cao (300/tháng)' : 'Advanced (300/month)'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Premium (1000/tháng)' : 'Premium (1000/month)'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Giọng điệu Brand' : 'Brand Voice'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Cơ bản' : 'Basic'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Nâng cao' : 'Advanced'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Tùy chỉnh cao' : 'Custom'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">AI Model</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Tiêu chuẩn' : 'Standard'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Cao cấp' : 'Advanced'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Tùy chỉnh' : 'Custom'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium" colSpan={4}>
                <Badge variant="secondary" className="mb-1">
                  Chatbot AI
                </Badge>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Kênh chat' : 'Chat channels'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '1 (Web hoặc FB)' : '1 (Web or FB)'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? '3 (Web, FB, Zalo)' : '3 (Web, FB, Zalo)'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Không giới hạn' : 'Unlimited'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Tin nhắn/tháng' : 'Messages/month'}</td>
              <td className="border border-gray-200 p-4 text-center">1.000</td>
              <td className="border border-gray-200 p-4 text-center">5.000</td>
              <td className="border border-gray-200 p-4 text-center">20.000</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">Knowledge base</td>
              <td className="border border-gray-200 p-4 text-center">10MB</td>
              <td className="border border-gray-200 p-4 text-center">50MB</td>
              <td className="border border-gray-200 p-4 text-center">200MB</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Phân tích hội thoại' : 'Conversation Analysis'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Cơ bản' : 'Basic'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Nâng cao' : 'Advanced'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Toàn diện' : 'Comprehensive'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Handover người thật' : 'Human handover'}</td>
              <td className="border border-gray-200 p-4 text-center">
                <X className="mx-auto text-red-500" />
              </td>
              <td className="border border-gray-200 p-4 text-center">
                <Check className="mx-auto text-green-500" />
              </td>
              <td className="border border-gray-200 p-4 text-center">
                {isVietnamese ? (
                  <div className="flex items-center justify-center">
                    <Check className="text-green-500" />
                    <span className="ml-1">+ ưu tiên</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Check className="text-green-500" />
                    <span className="ml-1">+ priority</span>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">Intent Recognition</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Cơ bản' : 'Basic'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Nâng cao' : 'Advanced'}</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Tùy chỉnh' : 'Custom'}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium" colSpan={4}>
                <Badge variant="secondary" className="mb-1">
                  CRM {isVietnamese ? 'Tích hợp' : 'Integration'}
                </Badge>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">Contacts</td>
              <td className="border border-gray-200 p-4 text-center">1.000</td>
              <td className="border border-gray-200 p-4 text-center">10.000</td>
              <td className="border border-gray-200 p-4 text-center">100.000</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-medium">{isVietnamese ? 'Người dùng CRM' : 'CRM Users'}</td>
              <td className="border border-gray-200 p-4 text-center">1</td>
              <td className="border border-gray-200 p-4 text-center">5</td>
              <td className="border border-gray-200 p-4 text-center">{isVietnamese ? 'Theo nhu cầu' : 'Custom'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
