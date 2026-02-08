"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { SearchBar } from "@/compoments/UIComponents";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 20);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   return (
    <>
     {/* Announcement Banner - Part of the Header system */}
     {!isScrolled && (
       <div className="fixed top-0 w-full bg-indigo-600 text-white py-2 px-4 text-center text-[13px] font-bold uppercase tracking-[0.2em] z-[1100] shadow-lg">
         <span className="animate-pulse">📢 Thông báo:</span> Thư viện mở cửa xuyên Tết Nguyên Đán phục vụ bạn đọc • <Link href="#" className="underline hover:text-indigo-200">Xem chi tiết</Link>
       </div>
     )}
 
     <header className={`fixed w-full z-[1000] transition-all duration-500 border-b ${
       isScrolled 
         ? "top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-zinc-100 dark:border-zinc-800/50 py-0 shadow-sm" 
         : "top-[36px] bg-transparent border-transparent py-3"
     }`}>
      <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 shadow-xl ${
            isScrolled 
              ? "bg-indigo-600 shadow-indigo-100" 
              : "bg-white/10 backdrop-blur-xl border border-white/20 shadow-none hover:bg-white/20"
          }`}>
            <span className="text-white font-black text-2xl tracking-tighter">L</span>
          </div>
          <div className="flex flex-col -gap-1">
            <h1 className={`text-[24px] font-[1000] tracking-tight transition-colors leading-[1] ${
              isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
            }`}>
              LITERARY<span className="text-indigo-400">HUB</span>
            </h1>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
              isScrolled ? "text-zinc-400" : "text-white/60"
            }`}>
              Library Management
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <nav className={`hidden lg:flex items-center gap-8 text-[14px] font-bold transition-colors ${
            isScrolled ? "text-zinc-600 dark:text-zinc-300" : "text-white"
          }`}>
             <Link href="/" className="hover:text-indigo-400 transition-colors drop-shadow-sm flex items-center gap-1">
               Trang chủ
             </Link>
             <Link href="/my-books" className="hover:text-indigo-400 transition-colors drop-shadow-sm">Kho sách</Link>
             <Link href="/news" className="hover:text-indigo-400 transition-colors drop-shadow-sm">Tin tức</Link>
             <Link href="/about" className="hover:text-indigo-400 transition-colors drop-shadow-sm">Giới thiệu</Link>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0">
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all active:scale-95 ${
                  isScrolled 
                    ? "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800" 
                    : "text-white/80 hover:bg-white/10"
                }`}
                title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
                {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                )}
            </button>

            <SearchBar />
          </div>

          <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-3 p-1.5 rounded-full pr-4 transition-all border ${
                  isScrolled 
                    ? "hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-100 dark:hover:border-zinc-800" 
                    : "hover:bg-white/10 border-white/10"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={`text-[13px] font-black leading-tight ${isScrolled ? "text-zinc-900 dark:text-white" : "text-white"}`}>{user?.name}</p>
                  <p className={`text-[10px] font-bold ${isScrolled ? "text-zinc-400" : "text-white/70"}`}>Bạn đọc</p>
                </div>
                <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''} ${isScrolled ? "text-zinc-400" : "text-white/60"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
 
               {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 py-3 z-[1001] animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="px-5 py-3 border-b border-zinc-50 dark:border-zinc-800 mb-2">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Tài khoản</p>
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">{user?.email}</p>
                  </div>
                  
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    Hồ sơ của tôi
                  </Link>

                  <Link href="/my-books" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    Kho sách cá nhân
                  </Link>

                  {user?.role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      Quản trị hệ thống
                    </Link>
                  )}
                  
                  <div className="h-[1px] bg-zinc-50 dark:bg-zinc-800 my-2 mx-5" />
                  
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-100 dark:shadow-none"
                >
                  Đăng nhập
                </Link>
              </div>
           )}

           {/* Mobile Menu Button - NEW */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)} 
             title="Mở menu điều hướng"
             aria-label="Menu"
             className={`lg:hidden p-2 rounded-xl transition-all ${
               isScrolled ? "text-zinc-600 dark:text-zinc-400" : "text-white"
             }`}
           >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
             </svg>
           </button>
         </div>
       </div>

       {/* Mobile Navigation Drawer - NEW */}
       {isMenuOpen && ( // For now, reuse isMenuOpen for mobile as well or use a dedicated state
         <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 py-4 px-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
           <nav className="flex flex-col gap-4">
             <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors">Trang chủ</Link>
             <Link href="/my-books" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors">Kho sách</Link>
             <Link href="/news" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors">Tin tức</Link>
             <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors">Giới thiệu</Link>
           </nav>
         </div>
       )}
     </header>
    </>
   );
 }
