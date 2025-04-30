
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

interface SettingsSectionProps {
  currentLanguage: {
    code: string;
  };
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ currentLanguage }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">
          {currentLanguage.code === 'vi' ? 'Cài đặt' : 'Settings'}
        </h2>
        <Button className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white">
          <HelpCircle className="mr-2 h-5 w-5" />
          {currentLanguage.code === 'vi' ? 'Hỏi ngay!' : 'Ask away!'}
        </Button>
      </div>
      
      <p className="text-gray-500 mb-6">
        {currentLanguage.code === 'vi' 
          ? 'Bạn có thể thay đổi cài đặt tài khoản từ đây.' 
          : 'You can change your account\'s settings from here.'}
      </p>
      
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {currentLanguage.code === 'vi' ? 'Hành động' : 'Action'}
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  {currentLanguage.code === 'vi' ? 'Kích hoạt?' : 'Active?'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={2}>
                  {currentLanguage.code === 'vi' 
                    ? 'Không có cài đặt nào khả dụng.' 
                    : 'No settings available.'}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
};

export default SettingsSection;
