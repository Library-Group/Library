"use client";
import { Carousel, LibraryDecorations } from "@/compoments/UIComponents";
import BookList from "@/compoments/BookList";
import { useNews } from "@/hooks/useBooks";

import WelcomeModal from "@/compoments/WelcomeModal";

export default function Home() {
  const { news } = useNews(3);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white dark:bg-zinc-900 bg-library pb-12 pt-16">
      <WelcomeModal />
      <LibraryDecorations />
      <main className="w-full max-w-[1200px] px-4 sm:px-6 mt-8">
        <Carousel />
        <div className="mb-10">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 border-l-4 border-indigo-600 pl-4 h-6 flex items-center">
                Danh Sách Tác Phẩm
            </h2>
            <BookList />
        </div>
      </main>
      
      {/* News Section */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-950/50 py-16 mt-12 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 text-center uppercase tracking-tight">
                Tin Tức & Sự Kiện
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.length > 0 ? (
                  news.map((item) => (
                    <div key={item._id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1 transition-transform h-full flex flex-col">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md w-fit mb-4">Tin tức</span>
                        <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-100">{item.title}</h3>
                        <p className="text-sm text-zinc-500 line-clamp-3 mb-4 flex-1">
                            {item.summary || item.content}
                        </p>
                        <div className="mt-auto text-xs text-zinc-400 pt-4 border-t border-zinc-50 dark:border-zinc-800">
                            {new Date(item.createdAt).toLocaleDateString('vi-VN')} • Bởi {item.author || "Admin"}
                        </div>
                    </div>
                  ))
                ) : (
                   <p className="text-center w-full col-span-3 text-zinc-500">Chưa có tin tức nào.</p>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
