"use client";
import React from "react";
import Link from "next/link";
import { LibraryDecorations } from "@/compoments/UIComponents";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-library pt-44 pb-20 px-4 selection:bg-indigo-100 selection:text-indigo-900">
            <LibraryDecorations />
            
            <div className="max-w-5xl mx-auto">
                {/* Immersive Header */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/5 blur-[120px] -z-10 rounded-full"></div>
                    <h1 
                        data-font="serif"
                        className="text-6xl md:text-8xl font-[1000] text-zinc-900 dark:text-white tracking-tighter italic leading-[0.9] mb-8"
                    >
                        DI SẢN <span className="text-indigo-600 not-italic">&</span> <span className="text-indigo-600">TRI THỨC</span>
                    </h1>
                    <div className="w-24 h-2 bg-indigo-600 mx-auto rounded-full mb-10"></div>
                </div>

                {/* Core Story Section */}
                <section className="bg-white dark:bg-zinc-900 rounded-[48px] p-12 md:p-20 border border-zinc-100 dark:border-zinc-800 shadow-2xl mb-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 rounded-full group-hover:bg-indigo-600/10 transition-colors"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <h2 data-font="serif" className="text-4xl font-black text-zinc-900 dark:text-white leading-tight">
                                Hành trình kết nối <br/>
                                <span className="text-indigo-600 italic">Quá khứ tới Tương lai</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-medium text-justify">
                                LiteraryHub ra đời không chỉ như một hệ thống quản lý thư viện, mà là một nỗ lực số hóa và bảo tồn những giá trị văn học kinh điển của dân tộc và thế giới. Chúng tôi tin rằng tri thức cổ xưa chính là nền tảng vững chắc nhất cho tư duy hiện đại.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-1 h-32 w-[2px] bg-indigo-100 dark:bg-zinc-800">
                                    <div className="h-12 w-full bg-indigo-600 rounded-full animate-bounce"></div>
                                </div>
                                <p className="text-zinc-400 italic text-sm pt-2">
                                    &quot;Mỗi cuốn sách là một thế giới, và mỗi độc giả là một người lữ hành trên con đường tìm kiếm sự thật.&quot;
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-end min-h-[250px]">
                                <div className="text-3xl font-black text-indigo-600 mb-2 italic">50K+</div>
                                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Tác phẩm số hóa</div>
                            </div>
                            <div className="bg-indigo-600 p-8 rounded-3xl flex flex-col justify-end min-h-[250px] shadow-xl shadow-indigo-600/30">
                                <div className="text-3xl font-black text-white mb-2 italic">100%</div>
                                <div className="text-[10px] font-black uppercase text-white/60 tracking-widest">Truy cập miễn phí</div>
                            </div>
                            <div className="col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-indigo-100/50 dark:border-zinc-800 flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-800 dark:text-zinc-100">Bảo tồn văn hóa</h4>
                                    <p className="text-xs text-zinc-400 text-justify">Ưu tiên phục hồi và số hóa các thủ bản cổ hiếm.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Sứ mệnh", text: "Trở thành cổng vào tri thức văn chương dân tộc, giúp mọi độc giả tiếp cận tinh hoa văn học một cách hiện đại.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                        { title: "Tầm nhìn", text: "Phát triển thành một hệ sinh thái văn hóa số, nơi đối thoại giữa các thế hệ được duy trì qua từng trang sách.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                        { title: "Cam kết", text: "Luôn đặt chất lượng nội dung và trải nghiệm người dùng lên hàng đầu. Sách luôn sẵn sàng, kiến thức luôn mở rộng.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-10 rounded-[40px] border border-zinc-100 dark:border-zinc-800 group hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500">
                             <div className="w-14 h-14 bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center mb-8 border border-zinc-50 dark:border-zinc-800 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
                             </div>
                             <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tighter italic">{item.title}</h3>
                             <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-justify">
                                {item.text}
                             </p>
                        </div>
                    ))}
                </div>

                {/* Closing CTA */}
                <div className="text-center bg-indigo-600 rounded-[60px] p-16 md:p-24 relative overflow-hidden shadow-2xl shadow-indigo-600/40">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Sách đang chờ đón bạn</h2>
                    <p className="text-indigo-100 text-lg mb-10 opacity-80 max-w-2xl mx-auto text-justify">Gia nhập hàng ngàn độc giả đang khám phá kho tàng di sản mỗi ngày.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/register" className="px-12 py-5 bg-white text-indigo-600 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all active:scale-95 shadow-xl">Đăng ký thành viên</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
