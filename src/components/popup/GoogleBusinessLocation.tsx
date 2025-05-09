import { useState } from 'react';
import { X, Check, Plus } from 'lucide-react';

const GoogleBusinessLocation = () => {
    const [isSelected, setIsSelected] = useState(true);

    // useEffect(() => {
    //     if (isOpen) {
    //       // Save the current overflow value
    //       const originalStyle = window.getComputedStyle(document.body).overflow;
    //       // Prevent scrolling on the body
    //       document.body.style.overflow = 'hidden';

    //       // Restore original overflow on cleanup
    //       return () => {
    //         document.body.style.overflow = originalStyle;
    //       };
    //     }
    //   }, [isOpen]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 1000 }}>
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 rounded-full p-2 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM13 15H8V13H13V15ZM16 11H8V9H16V11Z" fill="white" />
                            </svg>
                        </div>
                        <h3 className="text-base font-medium text-gray-800">Select the type of Google location you want to add</h3>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={22} />
                    </button>
                </div>

                {/* Unselect All */}
                <div className="px-5 py-3 flex justify-end">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Unselect all
                    </button>
                </div>

                {/* Location Item */}
                <div className="px-5 pb-4">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center">
                                    <div className="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center">
                                        <div className="bg-yellow-500 rounded-full w-3 h-3"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-blue-600 font-medium text-sm">Flowa - Auto AI Content for Socials (29 Võ Thị Sáu)</p>
                                <div className="flex items-center text-gray-500 text-xs mt-1">
                                    <svg className="mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4" />
                                        <circle cx="12" cy="9" r="2.5" fill="white" />
                                    </svg>
                                    Google Location
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Already Added</span>
                            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                                <Check size={14} color="white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Link */}
                <div className="px-5 py-3 text-sm text-gray-600 border-t border-gray-100">
                    Check out <span className="text-blue-600 cursor-pointer hover:underline">this article</span> to make sure you connect your account correctly.
                </div>

                {/* Connect Button */}
                <div className="px-5 py-4 flex justify-center">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-full flex items-center transition-colors">
                        <Plus size={18} className="mr-1.5" strokeWidth={2.5} />
                        Connect account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleBusinessLocation;