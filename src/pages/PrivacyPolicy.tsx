import React, { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
    const [language, setLanguage] = useState('vi');

    const toggleLanguage = () => {
        setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <header className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="text-indigo-600 font-bold text-2xl">
                            Flowa
                        </div>
                        <span className="ml-2 text-gray-500">|</span>
                        <span className="ml-2 text-gray-600 font-medium">
                            {language === 'vi' ? 'Chính Sách Quyền Riêng Tư' : 'Privacy Policy'}
                        </span>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition duration-200"
                    >
                        {language === 'vi' ? 'English' : 'Tiếng Việt'}
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
                    {language === 'vi' ? <VietnameseContent /> : <EnglishContent />}
                </div>
            </main>

            <footer className="bg-gray-800 text-gray-300">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="font-bold text-xl text-white mb-2">Flowa</div>
                            <p className="text-sm">
                                {language === 'vi'
                                    ? 'Giải pháp tích hợp AI cho mạng xã hội'
                                    : 'AI Integration Solution for Social Media'}
                            </p>
                        </div>
                        <div className="text-sm">
                            <a href="https://flowa.one" className="text-gray-300 hover:text-white mr-4">
                                {language === 'vi' ? 'Trang chủ' : 'Home'}
                            </a>
                            <a href="mailto:flowasite@gmail.com" className="text-gray-300 hover:text-white">
                                {language === 'vi' ? 'Liên hệ' : 'Contact'}
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-sm">
                        © 2025 Flowa. {language === 'vi' ? 'Đã đăng ký bản quyền.' : 'All rights reserved.'}
                    </div>
                </div>
            </footer>
        </div>
    );
}

function VietnameseContent() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">CHÍNH SÁCH QUYỀN RIÊNG TƯ</h1>
            <p className="text-gray-600 mb-6 text-right"><strong>Cập nhật lần cuối: Ngày 09 tháng 05 năm 2025</strong></p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">1. Giới thiệu</h2>
            <p>Chào mừng bạn đến với Flowa ("chúng tôi", "của chúng tôi", hoặc "Flowa"). Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và thông tin cá nhân mà bạn chia sẻ khi sử dụng trang web flowa.one và các dịch vụ liên quan ("Dịch vụ").</p>
            <p>Chính sách quyền riêng tư này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng Dịch vụ của chúng tôi. Bằng cách sử dụng Dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">2. Thông tin chúng tôi thu thập</h2>
            <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">2.1. Thông tin bạn cung cấp cho chúng tôi</h3>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Thông tin tài khoản</strong>: Khi bạn đăng ký và tạo tài khoản, chúng tôi có thể thu thập thông tin như tên, địa chỉ email, mật khẩu (được mã hóa), và thông tin liên hệ khác.</li>
                <li className="mb-2"><strong>Thông tin hồ sơ</strong>: Thông tin bạn thêm vào hồ sơ người dùng của mình.</li>
                <li className="mb-2"><strong>Nội dung người dùng</strong>: Bất kỳ nội dung nào bạn tạo, tải lên hoặc chia sẻ thông qua Dịch vụ của chúng tôi.</li>
                <li className="mb-2"><strong>Thông tin tài khoản mạng xã hội</strong>: Khi bạn kết nối tài khoản Flowa với các nền tảng mạng xã hội (như Facebook, Instagram, X, Thread, TikTok, YouTube, v.v.), chúng tôi có thể thu thập thông tin từ các nền tảng đó theo quyền truy cập bạn đã cấp.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">2.2. Thông tin chúng tôi thu thập tự động</h3>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Dữ liệu sử dụng</strong>: Thông tin về cách bạn sử dụng Dịch vụ của chúng tôi, bao gồm tương tác của bạn, thời gian bạn dành cho các tính năng, và các hoạt động khác.</li>
                <li className="mb-2"><strong>Thông tin thiết bị</strong>: Thông tin về thiết bị bạn sử dụng để truy cập Dịch vụ của chúng tôi, bao gồm mẫu phần cứng, hệ điều hành, trình duyệt web, và các định danh thiết bị duy nhất.</li>
                <li className="mb-2"><strong>Thông tin vị trí</strong>: Chúng tôi có thể thu thập thông tin về vị trí của bạn với sự đồng ý của bạn.</li>
                <li className="mb-2"><strong>Cookie và công nghệ tương tự</strong>: Chúng tôi sử dụng cookie và công nghệ tương tự để thu thập thông tin về cách bạn sử dụng Dịch vụ của chúng tôi.</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
            <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Cung cấp, duy trì và cải thiện Dịch vụ của chúng tôi</li>
                <li className="mb-2">Xử lý và hoàn thành giao dịch</li>
                <li className="mb-2">Gửi thông báo và cập nhật liên quan đến Dịch vụ</li>
                <li className="mb-2">Cung cấp hỗ trợ khách hàng</li>
                <li className="mb-2">Phân tích cách người dùng sử dụng Dịch vụ của chúng tôi</li>
                <li className="mb-2">Phát hiện, ngăn chặn và giải quyết các vấn đề kỹ thuật, gian lận hoặc bảo mật</li>
                <li className="mb-2">Cá nhân hóa trải nghiệm của bạn, bao gồm cung cấp nội dung và đề xuất phù hợp</li>
                <li className="mb-2">Tích hợp và đăng bài lên các nền tảng mạng xã hội theo yêu cầu của bạn</li>
                <li className="mb-2">Đào tạo và cải thiện các mô hình AI được sử dụng trong Dịch vụ của chúng tôi</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">4. Chia sẻ thông tin</h2>
            <p>Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Với nền tảng mạng xã hội</strong>: Khi bạn sử dụng Flowa để đăng nội dung lên các nền tảng mạng xã hội, chúng tôi sẽ chia sẻ nội dung và thông tin cần thiết với các nền tảng đó theo quyền truy cập bạn đã cấp.</li>
                <li className="mb-2"><strong>Với nhà cung cấp dịch vụ</strong>: Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ bên thứ ba giúp chúng tôi cung cấp Dịch vụ.</li>
                <li className="mb-2"><strong>Vì lý do pháp lý</strong>: Chúng tôi có thể chia sẻ thông tin nếu chúng tôi tin rằng việc tiết lộ là cần thiết để tuân thủ luật pháp, quy định, quy trình pháp lý hoặc yêu cầu của chính phủ.</li>
                <li className="mb-2"><strong>Với sự đồng ý của bạn</strong>: Chúng tôi có thể chia sẻ thông tin với bên thứ ba khi bạn đồng ý.</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">5. Bảo mật dữ liệu</h2>
            <p>Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy. Tuy nhiên, không có phương thức truyền qua internet hoặc lưu trữ điện tử nào là an toàn 100%. Do đó, chúng tôi không thể đảm bảo an ninh tuyệt đối.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">6. Quyền của bạn</h2>
            <p>Tùy thuộc vào luật pháp hiện hành, bạn có thể có các quyền sau đối với thông tin cá nhân của mình:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Quyền truy cập thông tin cá nhân của bạn</li>
                <li className="mb-2">Quyền chỉnh sửa hoặc cập nhật thông tin cá nhân của bạn</li>
                <li className="mb-2">Quyền xóa thông tin cá nhân của bạn</li>
                <li className="mb-2">Quyền hạn chế hoặc phản đối việc xử lý thông tin cá nhân của bạn</li>
                <li className="mb-2">Quyền chuyển giao dữ liệu</li>
                <li className="mb-2">Quyền rút lại sự đồng ý</li>
            </ul>
            <p>Để thực hiện bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi theo thông tin liên hệ được cung cấp bên dưới.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">7. Lưu trữ dữ liệu</h2>
            <p>Chúng tôi sẽ lưu giữ thông tin cá nhân của bạn miễn là cần thiết để cung cấp Dịch vụ hoặc theo yêu cầu của pháp luật. Khi không còn cần thiết để lưu giữ thông tin cá nhân của bạn, chúng tôi sẽ xóa hoặc ẩn danh hóa nó.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">8. Trẻ em</h2>
            <p>Dịch vụ của chúng tôi không dành cho người dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn là phụ huynh hoặc người giám hộ và biết rằng con bạn đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ với chúng tôi để chúng tôi có thể thực hiện các bước cần thiết.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">9. Thay đổi đối với Chính sách này</h2>
            <p>Chúng tôi có thể cập nhật Chính sách quyền riêng tư này từ thời gian này đến thời gian khác. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang web của chúng tôi và cập nhật ngày "Cập nhật lần cuối" ở đầu chính sách này. Bạn nên xem lại chính sách này định kỳ để cập nhật thông tin.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">10. Liên hệ với chúng tôi</h2>
            <p>Nếu bạn có bất kỳ câu hỏi nào về Chính sách quyền riêng tư này, vui lòng liên hệ với chúng tôi tại:</p>
            <p><strong>Email:</strong> <a href="mailto:flowasite@gmail.com" className="text-indigo-600 hover:underline">flowasite@gmail.com</a><br />
                <strong>Website:</strong> <a href="https://flowa.one" className="text-indigo-600 hover:underline">https://flowa.one</a></p>

            <hr className="my-8 border-gray-200" />

            <p className="text-center text-gray-600 mt-8">© 2025 Flowa. Đã đăng ký bản quyền.</p>
        </div>
    );
}

function EnglishContent() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">PRIVACY POLICY</h1>
            <p className="text-gray-600 mb-6 text-right"><strong>Last Updated: May 09, 2025</strong></p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">1. Introduction</h2>
            <p>Welcome to Flowa ("we", "our", or "Flowa"). We are committed to protecting your privacy and the personal information you share when using our flowa.one website and related services ("Services").</p>
            <p>This Privacy Policy describes how we collect, use, store, and protect your information when you use our Services. By using our Services, you agree to the collection and use of information in accordance with this policy.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">2.1. Information You Provide to Us</h3>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Account Information</strong>: When you register and create an account, we may collect information such as name, email address, password (encrypted), and other contact information.</li>
                <li className="mb-2"><strong>Profile Information</strong>: Information you add to your user profile.</li>
                <li className="mb-2"><strong>User Content</strong>: Any content you create, upload, or share through our Services.</li>
                <li className="mb-2"><strong>Social Media Account Information</strong>: When you connect your Flowa account with social media platforms (such as Facebook, Instagram, X, Thread, TikTok, YouTube, etc.), we may collect information from those platforms according to the access you've granted.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">2.2. Information We Collect Automatically</h3>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Usage Data</strong>: Information about how you use our Services, including your interactions, time spent on features, and other activities.</li>
                <li className="mb-2"><strong>Device Information</strong>: Information about the device you use to access our Services, including hardware model, operating system, web browser, and unique device identifiers.</li>
                <li className="mb-2"><strong>Location Information</strong>: We may collect information about your location with your consent.</li>
                <li className="mb-2"><strong>Cookies and Similar Technologies</strong>: We use cookies and similar technologies to collect information about how you use our Services.</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">3. How We Use Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Provide, maintain, and improve our Services</li>
                <li className="mb-2">Process and complete transactions</li>
                <li className="mb-2">Send notifications and updates related to the Services</li>
                <li className="mb-2">Provide customer support</li>
                <li className="mb-2">Analyze how users use our Services</li>
                <li className="mb-2">Detect, prevent, and address technical, fraud, or security issues</li>
                <li className="mb-2">Personalize your experience, including providing relevant content and recommendations</li>
                <li className="mb-2">Integrate and post to social media platforms as requested by you</li>
                <li className="mb-2">Train and improve AI models used in our Services</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">4. Sharing Information</h2>
            <p>We may share your information in the following instances:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>With Social Media Platforms</strong>: When you use Flowa to post content to social media platforms, we will share necessary content and information with those platforms according to the access you've granted.</li>
                <li className="mb-2"><strong>With Service Providers</strong>: We may share information with third-party service providers that help us provide our Services.</li>
                <li className="mb-2"><strong>For Legal Reasons</strong>: We may share information if we believe disclosure is necessary to comply with laws, regulations, legal processes, or governmental requests.</li>
                <li className="mb-2"><strong>With Your Consent</strong>: We may share information with third parties when you consent to it.</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">5. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">6. Your Rights</h2>
            <p>Depending on applicable law, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">The right to access your personal information</li>
                <li className="mb-2">The right to rectify or update your personal information</li>
                <li className="mb-2">The right to delete your personal information</li>
                <li className="mb-2">The right to restrict or object to the processing of your personal information</li>
                <li className="mb-2">The right to data portability</li>
                <li className="mb-2">The right to withdraw consent</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the contact information provided below.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">7. Data Retention</h2>
            <p>We will retain your personal information for as long as necessary to provide the Services or as required by law. When it is no longer necessary to retain your personal information, we will delete or anonymize it.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">8. Children</h2>
            <p>Our Services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and know that your child has provided us with personal information, please contact us so that we can take necessary steps.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website and updating the "Last Updated" date at the top of this policy. You should review this policy periodically for updates.</p>

            <h2 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p><strong>Email:</strong> <a href="mailto:flowasite@gmail.com" className="text-indigo-600 hover:underline">flowasite@gmail.com</a><br />
                <strong>Website:</strong> <a href="https://flowa.one" className="text-indigo-600 hover:underline">https://flowa.one</a></p>

            <hr className="my-8 border-gray-200" />

            <p className="text-center text-gray-600 mt-8">© 2025 Flowa. All rights reserved.</p>
        </div>
    );
}