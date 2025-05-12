interface Window {
    FB: {
        init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
        login: (callback: (response: { authResponse?: { accessToken: string } }) => void, options: { scope: string }) => void;
        api: (path: string, callback: (response: any) => void) => void;
        AppEvents: {
            logPageView: () => void;
        };
    };
    google: {
        accounts: {
            id: {
                initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
                prompt: (callback: (notification: { isNotDisplayed: () => boolean; getNotDisplayedReason: () => string }) => void) => void;
            };
        };
    };
}

interface JwtPayload {
    name?: string;
    email?: string;
    picture?: string;
    [key: string]: any;
} 