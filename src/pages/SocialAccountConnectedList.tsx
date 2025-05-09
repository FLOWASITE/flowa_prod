import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialAccountConnected from '../components/social/SocialAccountConnected';

interface SocialAccount {
    id: string;
    name: string;
    platform: string;
    isRunning: boolean;
    postCount: number;
    profileImageUrl: string;
}

const SocialAccountConnectedList = () => {
    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage cho Facebook và YouTube
        const facebookId = localStorage.getItem('facebookUserID') || 'unknown-id';
        const facebookName = localStorage.getItem('facebookUserName') || 'Facebook User';
        const facebookAccessToken = localStorage.getItem('facebookAccessToken');
        const facebookProfileImageUrl = localStorage.getItem("facebookUserProfilePicture");

        const youtubeId = localStorage.getItem('googleUserID') || 'unknown-id';
        const youtubeName = localStorage.getItem('googleUserName') || 'YouTube User';
        const youtubeAccessToken = localStorage.getItem('googleAccessToken');
        const youtubeProfileImageUrl = localStorage.getItem("googleUserProfilePicture");

        const accounts: SocialAccount[] = [];

        // Nếu có dữ liệu Facebook trong localStorage, thêm vào danh sách
        if (facebookAccessToken) {
            accounts.push({
                id: facebookAccessToken,
                name: facebookName,
                platform: 'Facebook',
                isRunning: true,
                postCount: 1, // Giả định
                profileImageUrl: facebookProfileImageUrl || 'default-fb-image-url', // Hình ảnh đại diện mặc định nếu không có
            });
        }

        // Nếu có dữ liệu YouTube trong localStorage, thêm vào danh sách
        if (youtubeAccessToken) {
            accounts.push({
                id: youtubeAccessToken,
                name: youtubeName,
                platform: 'YouTube',
                isRunning: true,
                postCount: 1, // Giả định
                profileImageUrl: youtubeProfileImageUrl || 'default-ytb-image-url', // Hình ảnh đại diện mặc định nếu không có
            });
        }

        setSocialAccounts(accounts);
    }, []);

    const handleToggleStatus = (id: string) => {
        setSocialAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === id
                    ? { ...account, isRunning: !account.isRunning } // chỉ toggle status của account có id tương ứng
                    : account // giữ nguyên các account còn lại
            )
        );
    };


    return (
        <div className="w-full mb-5">
            <div className="rounded-lg border p-6">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-medium text-gray-800">Connected social accounts</h1>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full">
                        <Settings className="h-4 w-4" />
                        <span>Social Accounts</span>
                    </Button>
                </div>
                <p className="text-gray-600 mb-6">View and manage your social accounts in one place.</p>

                <h2 className="font-medium text-gray-700 mb-4">All connected accounts</h2>

                <div className="flex gap-4 flex-wrap">
                    {socialAccounts.length > 0 ? (
                        socialAccounts.map(account => (
                            <SocialAccountConnected
                                key={account.id}
                                name={account.name}
                                platform={account.platform}
                                isRunning={account.isRunning}
                                postCount={account.postCount}
                                profileImageSrc={account.profileImageUrl}
                                onToggleStatus={() => handleToggleStatus(account.id)}
                            />
                        ))
                    ) : (
                        <p>No social accounts connected.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialAccountConnectedList;
