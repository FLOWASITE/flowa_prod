import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

const ProfileSettings = () => {
  const { currentLanguage } = useLanguage();
  const [firstName, setFirstName] = useState('Duy');
  const [lastName, setLastName] = useState('Vo');
  const [email, setEmail] = useState('flowasite@gmail.com');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/lovable-uploads/d57b3adf-cd81-4107-87ea-4015235e8c5e.png');
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          setEmail(session.session.user.email || 'flowasite@gmail.com');
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, avatar_url, company, phone_number')
            .eq('id', session.session.user.id)
            .maybeSingle();
            
          if (profile) {
            setFirstName(profile.first_name || 'Duy');
            setLastName(profile.last_name || 'Vo');
            setAvatarUrl(profile.avatar_url || '/lovable-uploads/d57b3adf-cd81-4107-87ea-4015235e8c5e.png');
            setCompany(profile.company || '');
            setPhoneNumber(profile.phone_number || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    getUserProfile();
  }, []);

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
    <Layout>
      <div className="container max-w-5xl py-8">
        <div className="flex items-center mb-8">
          <div className="relative mr-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-2xl">
                {firstName.charAt(0)}{lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">
              {currentLanguage.code === 'vi' ? 'Cài đặt' : 'Settings'}
            </h1>
            <p className="text-gray-500 mt-1">
              {currentLanguage.code === 'vi' 
                ? 'Thay đổi cài đặt ở đây. Nhưng đừng thay đổi con người bạn. Bạn thật tuyệt vời!' 
                : 'Change your settings here. But don\'t change who you are. You are awesome!'}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-medium">{firstName} {lastName}</h2>
        </div>

        <div className="space-y-8">
          {/* Personal Info Section */}
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
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">
                    {currentLanguage.code === 'vi' ? 'Công ty' : 'Company'}
                  </Label>
                  <Input 
                    id="company"
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
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
                      onChange={(e) => setPhoneNumber(e.target.value)}
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

          {/* Settings Section */}
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
                    {/* Empty row for now, will be populated with settings */}
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
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
