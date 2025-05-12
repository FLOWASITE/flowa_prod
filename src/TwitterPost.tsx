import { useState } from 'react';
import axios from 'axios';

const TwitterPost = () => {
    const [tweetContent, setTweetContent] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    // Lấy Twitter access token từ localStorage
    const accessToken = localStorage.getItem('twitterAccessToken');

    const handlePostTweet = async () => {
        if (!accessToken) {
            setStatus("Bạn cần đăng nhập Twitter trước.");
            return;
        }

        if (!tweetContent.trim()) {
            setStatus("Nội dung bài viết không thể để trống.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8009/twitter/tweet",
                {
                    tweet: tweetContent,
                    access_token: accessToken
                }
            );

            setStatus("Tweet đã được đăng thành công!");
            console.log("Tweet response:", response.data);
        } catch (error: any) {
            setStatus("Có lỗi khi đăng bài lên Twitter.");
            console.error("Error posting tweet:", error?.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Đăng bài lên Twitter X</h2>
            <textarea
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
                rows={4}
                placeholder="Viết tweet của bạn..."
                className="border p-2 w-full mb-2"
            />
            <button onClick={handlePostTweet} className="bg-blue-500 text-white p-2 rounded">
                Đăng Tweet
            </button>

            {status && <p>{status}</p>}
        </div>
    );
};

export default TwitterPost;
