import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addSocialAccount } from "@/redux/features/social_account/socialAccountSlice";
import { createSocialAccount } from "@/service/socialAccountService";
import { useSelector } from "react-redux";

export default function TwitterCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const code = params.get("code");
    const dispatch = useDispatch();
    const selectedBrand = useSelector((state) => state.selectedBrand.selectedBrand);

    useEffect(() => {
        const codeVerifier = localStorage.getItem("twitter_code_verifier");

        if (code && codeVerifier) {
            axios.post("http://localhost:8009/twitter/callback", {
                code,
                code_verifier: codeVerifier
            })
                .then((res) => {
                    const { access_token, username, user_id, profile_image_url } = res.data;

                    Cookies.set("twitterAccessToken", access_token);

                    dispatch(addSocialAccount({
                        id: user_id,
                        username: username || "",
                        picture: profile_image_url || "",
                        platform: "twitter",
                        type: "profile",
                        status: "active"
                    }));

                    createSocialAccount({
                        platform_name: "Twitter",
                        brand_id: selectedBrand?.id,
                        account_name: username || "",
                        account_id: user_id || "",
                        access_token: access_token,
                        account_picture: profile_image_url || "",
                        account_type: "personal",
                        status: "active",
                        user_id: "11111111-1111-1111-1111-111111111111",
                    })

                    // ✅ Xóa code_verifier sau khi dùng
                    localStorage.removeItem("twitter_code_verifier");

                    // 👉 Có thể điều hướng người dùng sau khi đăng nhập thành công
                    navigate("/dashboard"); // hoặc bất kỳ trang nào bạn muốn
                })
                .catch((err) => {
                    console.error("Lỗi xác thực Twitter:", err.response?.data || err.message);
                });
        }
    }, [code, navigate]);

    return <div>Đang xử lý Twitter login...</div>;
}
