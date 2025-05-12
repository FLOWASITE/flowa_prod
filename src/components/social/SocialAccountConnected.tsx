import React from 'react';
import { Eye, Facebook, Twitter, X, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface SocialAccountCardProps {
    name: string;
    platform: string;
    status: boolean;
    postCount: number;
    onToggleStatus: () => void;
    picture?: string;
}

const SocialAccountConnected = ({
    name,
    platform,
    status,
    postCount,
    onToggleStatus,
    picture
}: SocialAccountCardProps) => {
    const getPlatformIcon = () => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <Facebook className="h-6 w-6 text-[#1877F2]" />;
            case 'youtube':
                return <Youtube className="h-6 w-6 text-[#FF0000]" />;
            case 'twitter':
                return <X className="h-6 w-6 text-[#000000]" />;
            default:
                return null;
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-white" style={{ maxWidth: '700px', minWidth: '350px' }}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12">
                        <div className="h-12 w-12 rounded-full border overflow-hidden bg-gray-200">
                            {picture ? (
                                <img
                                    src={picture}
                                    alt={`${name}'s profile`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    User
                                </div>
                            )}
                        </div>
                        <div className="absolute top-7 left-7 bg-white p-0.5 rounded-full border">
                            {getPlatformIcon()}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500">{platform} Profile</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={cn(
                        "text-sm font-medium",
                        status ? "text-social-running" : "text-gray-500"
                    )}>
                        {status ? "Running" : "Paused"}
                    </span>
                    <Switch
                        checked={status}
                        onCheckedChange={onToggleStatus}
                        className={cn(
                            status && "bg-social-running"
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{postCount} post{postCount !== 1 ? 's' : ''}</span>
            </div>
        </div>
    );
};

export default SocialAccountConnected;
