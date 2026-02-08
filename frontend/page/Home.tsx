"use client";
import React, { useEffect } from "react";
import { Carousel, LibraryDecorations } from "@/compoments/UIComponents";
import BookList from "@/compoments/BookList";
import { useNews, useBooks } from "@/hooks/useBooks";
import WelcomeModal from "@/compoments/WelcomeModal";
import QuickGuides from "@/compoments/QuickGuides";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  _id: string;
  title: string;
  summary?: string;
  content: string;
  createdAt: string;
  author?: string;
}

export default function Home() {
  const { books } = useBooks();
  const { news } = useNews(3);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white dark:bg-zinc-900 bg-library">

      <WelcomeModal />
      <LibraryDecorations />
      
      {/* Immersive Full-Bleed Hero */}
      <section className="relative w-full overflow-hidden">
        <Carousel />
        {/* Bottom Fade Gradient to Page Content - Harmonized Transition */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      </section>

      {/* SEARCH BRIDGE - The Merged Layout Component */}
      <div className="w-full max-w-[1440px] mx-auto px-6 relative z-40 -mt-24">
        <div className="max-w-[1000px] mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl p-8 rounded-[40px] shadow-[0_32px_100px_-20px_rgba(0,0,0,0.3)] border border-white dark:border-zinc-800 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full relative group">
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text"
              placeholder="Tìm kiếm danh tác, tác giả hoặc thời kỳ văn học..."
              className="w-full py-5 pl-16 pr-8 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-indigo-600/10 transition-all placeholder:text-zinc-400 dark:text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value;
                  if (val.trim()) window.location.href = `/search?q=${encodeURIComponent(val)}`;
                }
              }}
            />
          </div>
          <button 
            onClick={() => {
              const input = document.querySelector('input[placeholder*="Tìm kiếm"]') as HTMLInputElement;
              if (input && input.value.trim()) window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
            }}
            className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all active:scale-95 shadow-2xl shadow-indigo-600/30"
          >
            Tìm kiếm ngay
          </button>
        </div>
      </div>

      <main className="w-full max-w-[1200px] px-4 sm:px-6 relative z-30 mt-16 mb-20">
        
        {/* Quick Service Guides */}
        <div className="reveal">
          <QuickGuides />
        </div>

        {/* New Arrivals Section */}
        <div className="my-16 reveal delay-100">
            <div className="flex items-center justify-between mb-8">
                <h2 
                    data-font="serif"
                    className="text-2xl font-black text-[var(--title-color)] uppercase tracking-tight flex items-center gap-3"
                >
                    <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                    Tác phẩm mới nhất
                </h2>
                <Link href="/search" className="text-sm font-bold text-indigo-600 hover:underline">Xem tất cả</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {books.slice(0, 4).map((book) => (
                    <Link key={book._id} href={`/books/${book.bookId}`} className="group relative bg-[var(--card-bg)] dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-[var(--card-border)] hover:shadow-xl transition-all">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative bg-zinc-50 dark:bg-zinc-800">
                             {book.imageUrl && <Image src={book.imageUrl} alt={book.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />}
                             <div className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-md shadow-lg">New</div>
                        </div>
                        <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-100 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{book.title}</h3>
                        <p className="text-[10px] text-zinc-400 font-medium">{book.author?.name || "Vô danh"}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* Library Info / Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 reveal delay-200">
             {[
               { label: "Tác phẩm", value: books.length + "+", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
               { label: "Bạn đọc", value: "5,200+", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
               { label: "Lượt mượn", value: "12,800+", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
               { label: "Sự kiện", value: "15+", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }
             ].map((stat, i) => (
               <div key={i} className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-indigo-800/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}/></svg>
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{stat.label}</div>
               </div>
             ))}
        </div>

        <div className="mb-20 reveal delay-400">
            <h2 
                data-font="serif"
                className="text-2xl font-black text-[var(--title-color)] mb-8 flex items-center gap-4 uppercase tracking-tighter"
            >
                <span className="w-3 h-8 bg-indigo-600 rounded-sm"></span>
                Khám phá kho sách di sản
            </h2>
            <BookList />
        </div>
      </main>
      
      {/* News Section */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-950/50 py-16 mt-12 border-t border-zinc-100 dark:border-zinc-800 reveal delay-500">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="relative mb-16 text-center">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent -z-10"></div>
                <h2 
                    data-font="serif"
                    className="inline-block bg-zinc-50 dark:bg-zinc-950 px-10 text-4xl md:text-5xl font-[1000] text-zinc-900 dark:text-white tracking-tighter uppercase relative"
                >
                    Tin tức & <span className="text-indigo-600 italic">Sự kiện</span>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-indigo-600 rounded-full"></div>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.length > 0 ? (
                  news.map((item: NewsItem) => (
                    <Link href="/news" key={item._id} className="block group">
                      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1 transition-transform h-full flex flex-col group-hover:border-indigo-500">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md w-fit mb-4">Tin tức</span>
                          <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 flex-1">
                              {item.summary || item.content}
                          </p>
                          <div className="mt-auto text-xs text-zinc-400 pt-4 border-t border-zinc-50 dark:border-zinc-800">
                              {new Date(item.createdAt).toLocaleDateString('vi-VN')} • Bởi {item.author || "Admin"}
                          </div>
                      </div>
                    </Link>
                  ))
                ) : (
                   <p className="text-center w-full col-span-3 text-zinc-500">Chưa có tin tức nào.</p>
                )}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-indigo-600 py-12 reveal">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
                <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Trở thành thành viên ngay</h2>
                <p className="text-indigo-100 text-sm opacity-80">Gia nhập cộng đồng yêu văn học để nhận được những đặc quyền mượn sách sớm nhất.</p>
            </div>
            <div className="flex gap-4">
                <Link href="/register" className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-100 transition-all shadow-xl">Đăng ký thẻ</Link>
                <Link href="#" className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs border border-white/20 hover:bg-indigo-400 transition-all">Tìm hiểu thêm</Link>
            </div>
        </div>
      </section>
    </div>
  );
}
