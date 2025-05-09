import { jwtDecode } from 'jwt-decode';

export const handleFacebookLogin = () => {
    if (!window.FB) {
        console.error("Facebook SDK chưa sẵn sàng.");
        return;
    }

    window.FB.login(
        function (response) {
            if (response.authResponse) {
                window.FB.api("/me?fields=name,email,picture", function (userData) {
                    alert(`Xin chào ${userData.name}, email của bạn là ${userData.email}`);
                    console.log("Đăng nhập thành công:", userData);

                    // Lưu accessToken và thông tin người dùng vào localStorage
                    const accessToken = response.authResponse.accessToken;
                    console.log("Access Token:", accessToken);

                    // Lưu thông tin vào localStorage
                    localStorage.setItem("facebookAccessToken", accessToken);
                    localStorage.setItem("facebookUserName", userData.name);
                    localStorage.setItem("facebookUserEmail", userData.email);

                    // Lưu avatar vào localStorage
                    localStorage.setItem("facebookUserProfilePicture", userData.picture.data.url);
                });
            } else {
                console.log("Người dùng đã hủy đăng nhập hoặc không cấp quyền.");
            }
        },
        { scope: "public_profile,email" }
    );
};

export const handleInstagramLogin = () => {
    const clientId = "1889092618505204";
    const redirectUri = "https://localhost:8080/dashboard"; // Đảm bảo URL này đã được cấu hình trong Instagram App
    const responseType = "code";
    const scope = [
        "instagram_business_basic",
        "instagram_business_manage_messages",
        "instagram_business_manage_comments",
        "instagram_business_content_publish",
        "instagram_business_manage_insights",
    ].join(",");

    const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    // Chuyển hướng trình duyệt đến trang xác thực của Instagram
    window.location.href = authUrl;
};

export const facebookLogin = () => {
    const clientId = '708527221627170';
    const redirectUri = 'http://localhost:3000/facebook/callback';
    const scope = 'public_profile,email';

    window.location.href =
        `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
};

export const handleGoogleLogin = () => {
    /* global google */
    if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
            client_id: "663238634600-kot6od7eevdv9mqlb8i7vt08nm8dr4dj.apps.googleusercontent.com",
            callback: (response) => {
                if (response.credential) {
                    try {
                        // Giải mã token JWT
                        const decoded = jwtDecode(response.credential);
                        console.log("Thông tin người dùng:", decoded);

                        // Lưu thông tin vào localStorage
                        localStorage.setItem("googleAccessToken", response.credential); // Lưu access token
                        localStorage.setItem("googleUserName", decoded.name); // Lưu tên người dùng
                        localStorage.setItem("googleUserEmail", decoded.email); // Lưu email
                        localStorage.setItem("googleUserProfilePicture", decoded.picture); // Lưu avatar

                    } catch (err) {
                        console.error("Lỗi giải mã token:", err);
                    }
                }
            },
        });

        // Gọi popup đăng nhập
        window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                console.log("Không thể hiển thị Google login:", notification.getNotDisplayedReason());
            }
        });
    } else {
        console.error("Google SDK chưa sẵn sàng.");
    }
};