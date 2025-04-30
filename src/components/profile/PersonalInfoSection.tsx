
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  currentLanguage: {
    code: string;
  };
}

const PersonalInfoSection: React.FC<PersonalInfoProps> = ({
  firstName,
  lastName,
  email,
  company,
  phoneNumber,
  isEmailVerified,
  onFirstNameChange,
  onLastNameChange,
  onCompanyChange,
  onPhoneNumberChange,
  currentLanguage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName,
            company: company,
            phone_number: phoneNumber
          })
          .eq('id', session.session.user.id);
        
        if (error) throw error;
        
        toast.success(currentLanguage.code === 'vi' ? 'Cập nhật thành công!' : 'Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(currentLanguage.code === 'vi' ? 'Có lỗi xảy ra khi cập nhật' : 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-medium mb-6">
        {currentLanguage.code === 'vi' ? 'Thông tin cá nhân' : 'Personal Info'}
      </h2>
      
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              {currentLanguage.code === 'vi' ? 'Họ' : 'First Name'}
            </Label>
            <Input 
              id="firstName"
              value={firstName} 
              onChange={(e) => onFirstNameChange(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">
              {currentLanguage.code === 'vi' ? 'Địa chỉ email' : 'Email address'}
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                @
              </span>
              <Input 
                id="email"
                value={email} 
                disabled
                className="rounded-l-none"
              />
              <Button variant="outline" className="ml-2" disabled>
                {currentLanguage.code === 'vi' ? 'Hành động' : 'Action'} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            {isEmailVerified ? (
              <Alert className="bg-green-50 text-green-800 border-green-100 mt-3">
                <AlertDescription>
                  <span className="font-medium">{currentLanguage.code === 'vi' ? 'Tuyệt! ' : 'Yey! '}</span>
                  {currentLanguage.code === 'vi' 
                    ? 'Địa chỉ email của bạn đã được xác nhận!' 
                    : 'Your email address is confirmed!'}
                </AlertDescription>
              </Alert>
            ) : null}
            
            <Alert className="bg-amber-50 text-amber-800 border-amber-100 mt-3">
              <AlertDescription>
                <span className="font-medium">{currentLanguage.code === 'vi' ? 'Cảnh báo! ' : 'Warning! '}</span>
                {currentLanguage.code === 'vi' 
                  ? 'Bạn không thể thay đổi địa chỉ email hoặc mật khẩu. Để làm điều đó, vui lòng truy cập ' 
                  : 'You cannot change your email address or password. In order to do that please go to '}
                <a href="#" className="text-blue-600 hover:underline">
                  {currentLanguage.code === 'vi' ? 'tài khoản WebPros' : 'WebPros account'}
                </a>.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">
              {currentLanguage.code === 'vi' ? 'Tên' : 'Last Name'}
            </Label>
            <Input 
              id="lastName"
              value={lastName} 
              onChange={(e) => onLastNameChange(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">
              {currentLanguage.code === 'vi' ? 'Công ty' : 'Company'}
            </Label>
            <Input 
              id="company"
              value={company} 
              onChange={(e) => onCompanyChange(e.target.value)}
              placeholder="Company"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">
              {currentLanguage.code === 'vi' ? 'Số điện thoại' : 'Phone Number'}
            </Label>
            <div className="flex">
              <Button variant="outline" className="rounded-r-none w-16 justify-center">
                <span className="flex items-center">
                  🇺🇸
                  <ChevronDown className="ml-1 h-4 w-4" />
                </span>
              </Button>
              <Input 
                id="phone"
                value={phoneNumber} 
                onChange={(e) => onPhoneNumberChange(e.target.value)}
                className="rounded-l-none"
                placeholder="(201) 555-0123"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            {isLoading 
              ? (currentLanguage.code === 'vi' ? 'Đang cập nhật...' : 'Updating...') 
              : (currentLanguage.code === 'vi' ? 'Cập nhật' : 'Update')}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PersonalInfoSection;
