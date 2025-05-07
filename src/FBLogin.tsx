import React, { useEffect } from "react";

export const handleFacebookLogin = () => {
    if (!window.FB) {
        console.error("Facebook SDK chưa sẵn sàng.");
        return;
    }

    window.FB.login(
        function (response) {
            if (response.authResponse) {
                window.FB.api("/me", { fields: "name,email" }, function (userData) {
                    alert(`Xin chào ${userData}, email của bạn là ${userData.email}`);
                    console.log("Đăng nhập thành công:", userData);
                });
            } else {
                console.log("Người dùng đã hủy đăng nhập hoặc không cấp quyền.");
            }
        },
        { scope: "public_profile" }
    );
};

