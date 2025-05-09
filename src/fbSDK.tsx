// facebookSDK.js
export const loadFacebookSDK = () => {
    return new Promise((resolve, reject) => {
        if (window.FB) {
            return resolve(window.FB);
        }

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '1371052354162968',  // Đặt appId của bạn vào đây
                cookie: true,
                xfbml: true,
                version: '22.0', // ví dụ v19.0 hoặc v14.0
            });

            window.FB.AppEvents.logPageView();
            resolve(window.FB); // Trả về đối tượng FB khi SDK đã tải xong
        };

        const js = document.createElement('script');
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        js.id = "facebook-jssdk";
        js.onload = () => resolve(window.FB);
        js.onerror = (err) => reject(err);

        document.getElementsByTagName('head')[0].appendChild(js);
    });
};
