
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';
import SettingsSection from '@/components/profile/SettingsSection';

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
          <PersonalInfoSection
            firstName={firstName}
            lastName={lastName}
            email={email}
            company={company}
            phoneNumber={phoneNumber}
            isEmailVerified={isEmailVerified}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onCompanyChange={setCompany}
            onPhoneNumberChange={setPhoneNumber}
            currentLanguage={currentLanguage}
          />

          <SettingsSection currentLanguage={currentLanguage} />
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
