import axiosInstance from "@/utils/axiosInstance";

export interface SocialAccount {
    id: string;
    platform_id: string;
    platform_name: string;
    brand_id: string;
    account_name: string;
    account_id: string;
    access_token: string;
    refresh_token: string | null;
    token_expires_at: string | null;
    account_type: string;
    status: string;
    user_id: string;
    account_picture: string;
    created_at?: string;
    updated_at?: string;
}

export interface SocialAccountCreate {
    platform_name: string;
    brand_id: string;
    account_name: string;
    account_id: string;
    access_token: string;
    refresh_token?: string;
    token_expires_at?: string;
    account_type: string;
    account_picture: string;
    status: string;
    user_id: string;
    account_picture?: string;
}

export interface SocialAccountUpdate {
    platform_id?: string;
    brand_id?: string;
    account_name?: string;
    access_token?: string;
    refresh_token?: string;
    token_expires_at?: string;
    account_type?: string;
    account_picture?: string;
    status?: string;
    account_picture?: string;
}


// Tạo tài khoản mạng xã hội
export const createSocialAccount = async (
    data: SocialAccountCreate
): Promise<SocialAccount> => {
    const res = await axiosInstance.post("social-accounts/", data);
    return res.data;
};

// Lấy thông tin tài khoản theo account_id
export const getSocialAccount = async (
    accountId: string
): Promise<SocialAccount> => {
    const res = await axiosInstance.get(`social-accounts/${accountId}`);
    return res.data;
};

// Cập nhật tài khoản mạng xã hội
export const updateSocialAccount = async (
    accountId: string,
    data: SocialAccountUpdate
): Promise<SocialAccount> => {
    const res = await axiosInstance.put(`social-accounts/${accountId}`, data);
    return res.data;
};

// Xoá tài khoản mạng xã hội
export const deleteSocialAccount = async (
    accountId: string
): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`social-accounts/${accountId}`);
    return res.data;
};

// Lấy danh sách tài khoản theo user_id
export const getSocialAccountsByUser = async (
    userId: string
): Promise<SocialAccount[]> => {
    const res = await axiosInstance.get(`social-accounts/user/${userId}`);
    return res.data;
};

// Lấy danh sách tài khoản theo user_id và brand_id
export const getSocialAccountsByUserAndBrand = async (
    userId: string,
    brandId: string
): Promise<SocialAccount[]> => {
    const res = await axiosInstance.get(`social-accounts/user/${userId}/brand/${brandId}`);
    return res.data;
};