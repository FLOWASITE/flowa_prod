import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addSocialAccount } from "@/redux/features/social_account/socialAccountSlice";
import { createSocialAccount } from '@/service/socialAccountService';
// Load biến môi trường từ `.env` (React sẽ tự inject từ process.env)
const INSTAGRAM_CLIENT_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
const INSTAGRAM_REDIRECT_URI = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_BUSINESS_REDIRECT_URI = import.meta.env.VITE_GOOGLE_BUSINESS_REDIRECT_URI;

const TWITTER_CLIENT_ID = import.meta.env.VITE_TWITTER_CLIENT_ID;
const TWITTER_REDIRECT_URI = import.meta.env.VITE_TWITTER_REDIRECT_URI;


// =================== FACEBOOK LOGIN ===================
export const handleFacebookLogin = (dispatch) => {
    if (!window.FB) {
        console.error("Facebook SDK chưa sẵn sàng.");
        return;
    }


    window.FB.login(
        (response) => {
            if (response.authResponse) {
                window.FB.api("/me?fields=name,email,picture", (userData) => {
                    const accessToken = response.authResponse.accessToken;
                    // localStorage.setItem("facebookAccessToken", accessToken);
                    // localStorage.setItem("facebookUserName", userData.name);
                    // localStorage.setItem("facebookUserEmail", userData.email);
                    // localStorage.setItem("facebookUserProfilePicture", userData.picture.data.url);



                    Cookies.set("facebookAccessToken", accessToken);
                    dispatch(addSocialAccount({
                        id: userData.id,
                        name: userData.name || "",
                        picture: userData.picture.data.url || "",
                        platform: "facebook",
                        type: "personal",
                        status: "active",
                    }));
                    createSocialAccount({
                        platform_name: "Facebook",
                        brand_id: "55555555-5555-5555-5555-555555555555",
                        account_name: userData.name || "",
                        account_id: userData.id || "",
                        access_token: accessToken,
                        account_picture: userData.picture.data.url || "",
                        account_type: "personal",
                        status: "active",
                        user_id: "11111111-1111-1111-1111-111111111111",
                    })
                });
            } else {
                console.log("Người dùng đã hủy đăng nhập hoặc không cấp quyền.");
            }
        },
        { scope: "public_profile,email" }
    );
};

// =================== INSTAGRAM LOGIN ===================
export const handleInstagramLogin = () => {
    const scope = [
        "instagram_business_basic",
        "instagram_business_manage_messages",
        "instagram_business_manage_comments",
        "instagram_business_content_publish",
        "instagram_business_manage_insights",
    ].join(",");

    const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        INSTAGRAM_REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
};

// =================== GOOGLE BUSINESS LOGIN ===================
export const handleGoogleBusinessLogin = () => {
    const scope = 'https://www.googleapis.com/auth/business.manage';
    const oauth2Url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_BUSINESS_REDIRECT_URI}&response_type=token&scope=${scope}&include_granted_scopes=true&prompt=consent`;

    window.location.href = oauth2Url;
};

// =================== GOOGLE LOGIN ===================
export const handleYoutubeLogin = (dispatch) => {
    if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
            client_id: "663238634600-kot6od7eevdv9mqlb8i7vt08nm8dr4dj.apps.googleusercontent.com",
            callback: (response) => {
                if (response.credential) {
                    try {
                        const decoded = jwtDecode(response.credential);
                        Cookies.set("youtubeAccessToken", response.credential);
                        console.log(decoded);
                        dispatch(addSocialAccount({
                            id: decoded.sub,
                            name: decoded.name || "",
                            picture: decoded.picture || "",
                            platform: "YouTube",
                            type: "personal",
                            status: "active",
                        }));
                        createSocialAccount({
                            platform_name: "Youtube",
                            brand_id: "55555555-5555-5555-5555-555555555555",
                            account_name: decoded.name || "",
                            account_id: decoded.sub || "",
                            access_token: response.credential,
                            account_picture: decoded.picture || "",
                            account_type: "personal",
                            status: "active",
                            user_id: "11111111-1111-1111-1111-111111111111",
                        })
                    } catch (err) {
                        console.error("Lỗi giải mã token:", err);
                    }
                }
            },
            promptMomentNotification: (notification) => {
                if (notification.isNotDisplayed()) {
                    console.log("Không thể hiển thị Google login:", notification.getNotDisplayedReason());
                }
            },
        });

        window.google.accounts.id.prompt();
    } else {
        console.error("Google SDK chưa sẵn sàng.");
    }
};

// =================== TWITTER LOGIN ===================
export const handleTwitterLogin = async () => {
    try {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        localStorage.setItem("twitter_code_verifier", codeVerifier);

        const scope = [
            "tweet.write",
            "tweet.read",
            "users.read",
            "offline.access"
        ].join("%20");

        const oauthUrl = `https://twitter.com/i/oauth2/authorize` +
            `?response_type=code` +
            `&client_id=${TWITTER_CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(TWITTER_REDIRECT_URI)}` +
            `&scope=${scope}` +
            `&state=random_state_string` +
            `&code_challenge=${codeChallenge}` +
            `&code_challenge_method=S256`;

        window.location.href = oauthUrl;
    } catch (error) {
        console.error('Lỗi khi đăng nhập Twitter:', error);
    }
};

// =================== Helper Functions ===================
function generateCodeVerifier() {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
