import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialAccountConnected from '../components/social/SocialAccountConnected';
import { useSelector } from 'react-redux';
import { getSocialAccountsByUser, getSocialAccountsByUserAndBrand } from '@/service/socialAccountService';

interface SocialAccount {
    id: string;
    account_id: string;
    name: string;
    platform: string;
    status: boolean;
    postCount: number;
    picture: string;
}

const SocialAccountConnectedList = () => {
    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
    const selectedBrandId = useSelector((state) => state.selectedBrand.selectedBrand);
    const accountsFromRedux = useSelector((state) => state.socialAccount.accounts);

    useEffect(() => {
        // Khi dữ liệu từ Redux thay đổi, cập nhật lại state cục bộ
        if (accountsFromRedux) {
            setSocialAccounts(accountsFromRedux);
        }
    }, [accountsFromRedux]);

    useEffect(() => {
        const fetchSocialAccounts = async () => {
            try {
                const aa = await getSocialAccountsByUserAndBrand("11111111-1111-1111-1111-111111111111", selectedBrandId?.id);
                console.log(aa);
                setSocialAccounts(aa.map(account => ({
                    id: account.id,
                    account_id: account.account_id,
                    name: account.account_name,
                    platform: account.platform_name,
                    status: account.status === 'active',
                    postCount: 0,
                    picture: account.account_picture,
                })));
            } catch (error) {
                console.error("Lỗi khi lấy tài khoản:", error);
            }
        };

        fetchSocialAccounts();
    }, [selectedBrandId]);



    const handleToggleStatus = (id: string) => {
        setSocialAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === id
                    ? { ...account, status: !account.status } // chỉ toggle status của account có id tương ứng
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
                                status={account.status}
                                postCount={1}
                                picture={account.picture}
                                onToggleStatus={() => handleToggleStatus(account.account_id)}
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
