
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';
import SettingsSection from '@/components/profile/SettingsSection';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  const { currentLanguage } = useLanguage();
  const [firstName, setFirstName] = useState('Duy');
  const [lastName, setLastName] = useState('Vo');
  const [email, setEmail] = useState('flowasite@gmail.com');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/lovable-uploads/d57b3adf-cd81-4107-87ea-4015235e8c5e.png');
  const [isEmailVerified, setIsEmailVerified] = useState(true);

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

  // Auto-save changes when user info is updated
  useEffect(() => {
    const saveChanges = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) return;

        const { error } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName,
            company,
            phone_number: phoneNumber
          })
          .eq('id', session.session.user.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    // Use debounce to avoid too many updates
    const timer = setTimeout(() => {
      saveChanges();
    }, 2000);

    return () => clearTimeout(timer);
  }, [firstName, lastName, company, phoneNumber]);

  // Handler for field changes with auto-save toast notification
  const handleFieldChange = (field: string, value: string) => {
    switch(field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'company':
        setCompany(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
    }
    
    toast.success(
      currentLanguage.code === 'vi' 
        ? 'Thay đổi sẽ được tự động lưu' 
        : 'Changes will be automatically saved'
    );
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-8">
        <ProfileHeader 
          firstName={firstName}
          lastName={lastName}
          avatarUrl={avatarUrl}
          currentLanguage={currentLanguage}
        />

        <div className="space-y-8">
          <div className="flex justify-end mb-2">
            <Link to="/social-connections">
              <Button variant="secondary" className="gap-2">
                <Share2 className="h-4 w-4" />
                {currentLanguage.code === 'vi' ? 'Quản lý mạng xã hội' : 'Manage Social Media'}
              </Button>
            </Link>
          </div>

          <PersonalInfoSection
            firstName={firstName}
            lastName={lastName}
            email={email}
            company={company}
            phoneNumber={phoneNumber}
            isEmailVerified={isEmailVerified}
            onFirstNameChange={(value) => handleFieldChange('firstName', value)}
            onLastNameChange={(value) => handleFieldChange('lastName', value)}
            onCompanyChange={(value) => handleFieldChange('company', value)}
            onPhoneNumberChange={(value) => handleFieldChange('phoneNumber', value)}
            currentLanguage={currentLanguage}
          />

          <SettingsSection currentLanguage={currentLanguage} />
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
