"use client";
import React, { useState } from "react";
import { useNews } from "@/hooks/useBooks";
import { LibraryDecorations } from "@/compoments/UIComponents";
import Link from "next/link";

export default function NewsPage() {
    const { news, loading } = useNews();
    const [filter, setFilter] = useState("all");

    const categories = [
        { id: "all", label: "Tất cả" },
        { id: "event", label: "Sự kiện" },
        { id: "notice", label: "Thông báo" },
        { id: "newbook", label: "Sách mới" }
    ];

    // Mock category assignment since backend might not have it
    const filteredNews = news.filter(() => {
        if (filter === "all") return true;
        // Logic for filtering can be enhanced when backend supports it
        return true; 
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-library flex items-center justify-center pt-44">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-library pt-44 pb-20 px-4">
            <LibraryDecorations />
            
            <div className="max-w-6xl mx-auto">
                {/* News Hero Header */}
                <div className="relative mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-4">
                            <h1 data-font="serif" className="text-6xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
                                TIN TỨC & <span className="text-indigo-600 not-italic">SỰ KIỆN</span>
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-xl text-lg leading-relaxed">
                                    &quot;Mỗi cuốn sách là một thế giới, và mỗi độc giả là một người lữ hành trên con đường tìm kiếm sự thật.&quot;ức và di sản văn học tại LiteraryHub.
                            </p>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                                    filter === cat.id 
                                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                                        : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-200"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map((item, idx) => (
                        <div 
                            key={item._id} 
                            className={`group bg-white dark:bg-zinc-900 rounded-[32px] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col ${
                                idx === 0 ? "md:col-span-2 lg:flex-row gap-8 items-center" : ""
                            }`}
                        >
                            <div className={`shrink-0 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 relative ${
                                idx === 0 ? "w-full lg:w-1/2 aspect-video" : "w-full aspect-video mb-6"
                            }`}>
                                {/* Placeholder for News Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4V8H18"/></svg>
                                </div>
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-[0.2em] border border-white/20">
                                    Hot Update
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full uppercase tracking-widest">
                                        Tin tức
                                    </span>
                                    <span className="text-[10px] font-bold text-zinc-400">
                                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <h3 className={`font-black text-zinc-900 dark:text-white leading-tight mb-4 group-hover:text-indigo-600 transition-colors ${
                                    idx === 0 ? "text-3xl" : "text-xl"
                                }`}>
                                    {item.title}
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-6 line-clamp-3">
                                    {item.summary || item.content}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                            A
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.author || "Admin"}</span>
                                    </div>
                                    <Link href="/news" className="text-[10px] font-black uppercase text-indigo-600 tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                        Xem thêm <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-32 bg-white/50 dark:bg-zinc-900/50 rounded-[40px] border border-zinc-100 dark:border-zinc-800 border-dashed">
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm italic">Chưa có tin tức nào để hiển thị</p>
                    </div>
                )}
            </div>
        </div>
    );
}
