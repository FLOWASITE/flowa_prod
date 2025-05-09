import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function TwitterCallback() {
    const [params] = useSearchParams();
    const code = params.get("code");

    useEffect(() => {
        const codeVerifier = localStorage.getItem("twitter_code_verifier");

        // Kiểm tra có mã `code` và `code_verifier` hay không
        if (code && codeVerifier) {
            axios.post("http://localhost:8009/twitter/callback", {
                code,
                code_verifier: codeVerifier
            }).then((res) => {
                console.log("Đăng nhập Twitter thành công:", res.data);
                // Lưu thông tin vào localStorage hoặc cookie
                localStorage.setItem("twitterAccessToken", res.data.access_token);
                localStorage.setItem("twitterUserName", res.data.username || "");
                localStorage.setItem("twitterUserId", res.data.user_id || "");
                localStorage.setItem("twitterUserProfilePicture", res.data.profile_image_url || "");
            }).catch((err) => {
                console.error("Lỗi xác thực Twitter:", err.response?.data || err.message);
            });
        }
    }, [code]);

    return <div>Đang xử lý Twitter login...</div>;
}
