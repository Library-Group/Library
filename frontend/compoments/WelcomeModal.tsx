"use client";
import { useEffect, useState } from 'react';

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has seen the modal in this session
        const hasSeen = sessionStorage.getItem('hasSeenWelcomeLibraryLimit');
        if (!hasSeen) {
            requestAnimationFrame(() => {
                setIsOpen(true);
                // Slight delay for animation effect
                setTimeout(() => setIsVisible(true), 50);
            });
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsOpen(false);
            sessionStorage.setItem('hasSeenWelcomeLibraryLimit', 'true');
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div 
                className={`bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-zinc-200 dark:border-zinc-800 transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'}`}
            >
                <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <svg className="w-16 h-16 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                        
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-black text-zinc-800 dark:text-white mb-4">Chào mừng đến với Thư Viện</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Để đảm bảo nguồn tài liệu phong phú cho tất cả mọi người, chúng tôi áp dụng chính sách:
                    </p>
                            
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800 mb-8">
                        <span className="block text-indigo-800 dark:text-indigo-300 font-bold text-lg mb-1">Giới hạn mượn</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">20 lượt / ngày / mỗi đầu sách</span>
                    </div>

                    <button 
                        onClick={handleClose}
                        className="w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all transform hover:-translate-y-0.5 shadow-lg"
                    >
                         Đã hiểu, bắt đầu đọc sách
                    </button>
                </div>
            </div>
        </div>
    );
}
