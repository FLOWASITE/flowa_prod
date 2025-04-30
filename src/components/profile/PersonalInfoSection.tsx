
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronDown } from 'lucide-react';

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
  return (
    <section>
      <h2 className="text-xl font-medium mb-6">
        {currentLanguage.code === 'vi' ? 'Thông tin cá nhân' : 'Personal Info'}
      </h2>
      
      <div className="space-y-6">
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
            <Label htmlFor="email">
              {currentLanguage.code === 'vi' ? 'Địa chỉ email' : 'Email address'}
            </Label>
            <Input 
              id="email"
              value={email} 
              disabled
              className="bg-gray-50"
            />
            
            {isEmailVerified ? (
              <Alert className="bg-green-50 text-green-800 border-green-100 mt-3">
                <AlertDescription>
                  {currentLanguage.code === 'vi' 
                    ? 'Địa chỉ email của bạn đã được xác nhận!' 
                    : 'Your email address is confirmed!'}
                </AlertDescription>
              </Alert>
            ) : null}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">
              {currentLanguage.code === 'vi' ? 'Công ty' : 'Company'}
            </Label>
            <Input 
              id="company"
              value={company} 
              onChange={(e) => onCompanyChange(e.target.value)}
              placeholder={currentLanguage.code === 'vi' ? 'Công ty' : 'Company'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">
              {currentLanguage.code === 'vi' ? 'Số điện thoại' : 'Phone Number'}
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                🇺🇸
              </span>
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
        
        <Alert className="bg-amber-50 text-amber-800 border-amber-100">
          <AlertDescription>
            {currentLanguage.code === 'vi' 
              ? 'Bạn không thể thay đổi địa chỉ email hoặc mật khẩu. Để làm điều đó, vui lòng truy cập tài khoản WebPros.' 
              : 'You cannot change your email address or password. In order to do that please go to WebPros account.'}
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
