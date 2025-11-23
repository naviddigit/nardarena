/**
 * Profile Page
 * صفحه پروفایل کاربر
 * 
 * SOLID Principles - Clean Code
 */

import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCamera } from 'react-icons/fi';
import { Card } from '@shared/components/molecules/Card';
import { Button } from '@shared/components/atoms/Button';
import { Input } from '@shared/components/atoms/Input';
import { PageLayout } from '@shared/components/templates/PageLayout';
import { ContentSection } from '@shared/components/templates/ContentSection';
import { useAuth } from '@features/auth/hooks/useAuth';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const [avatar, setAvatar] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving profile:', formData, avatar);
  };

  const stats = [
    { label: 'Games Played', value: '0', color: 'purple' },
    { label: 'Wins', value: '0', color: 'success' },
    { label: 'Losses', value: '0', color: 'danger' },
    { label: 'Win Rate', value: '0%', color: 'warning' },
  ];

  return (
    <PageLayout title="My Profile" maxWidth="4xl">
      <ContentSection className="space-y-6 pt-4 pb-24">
        {/* Avatar Section */}
        <Card>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user?.username?.[0]?.toUpperCase() || 'U'
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors">
                <FiCamera className="text-white text-lg" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card>
          <div className="space-y-6">
            <h3 className="text-xl font-bold">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  leftIcon={<FiUser />}
                />
                <Input
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  leftIcon={<FiUser />}
                />
              </div>
              <Input
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                leftIcon={<FiUser />}
                disabled
              />
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                leftIcon={<FiMail />}
              />
              <Input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                leftIcon={<FiPhone />}
              />
            </div>
          </div>
        </Card>

        {/* Account Statistics */}
        <Card>
          <div className="space-y-6">
            <h3 className="text-xl font-bold">
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-500">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button
          variant="gradient"
          onClick={handleSave}
          fullWidth
        >
          Save Changes
        </Button>
      </ContentSection>
    </PageLayout>
  );
};

export default ProfilePage;
