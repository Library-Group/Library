"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "@/hooks/useBooks";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const { 
      books, loading, genre, setGenre, sortBy, setSortBy 
  } = useSearch(query);

  const genres = ["Thơ", "Truyện", "Tiểu thuyết", "Kịch", "Tùy bút"];

  return (
    <div className="min-h-screen bg-library pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Kết quả tìm kiếm {query && <span className="text-indigo-600">&ldquo;{query}&rdquo;</span>}
          </h1>
          <p className="text-zinc-500">Tìm thấy {books.length} kết quả</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700 sticky top-24">
              <h3 className="font-bold text-zinc-800 dark:text-white mb-4">Bộ lọc</h3>
              
              {/* Genre Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2 block">Thể loại</label>
                <select 
                  value={genre} 
                  onChange={(e) => setGenre(e.target.value)}
                  title="Chọn thể loại"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="">Tất cả</option>
                  {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort */}
              <div>
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2 block">Sắp xếp</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  title="Sắp xếp kết quả"
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="title-asc">Tên A-Z</option>
                  <option value="title-desc">Tên Z-A</option>
                  <option value="year-asc">Năm (cũ nhất)</option>
                  <option value="year-desc">Năm (mới nhất)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-zinc-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-zinc-500 text-lg">Không tìm thấy kết quả nào</p>
                <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline">
                  ← Quay lại trang chủ
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book) => (
                  <Link 
                    key={book._id} 
                    href={`/books/${book.bookId}`}
                    className="flex gap-4 p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-lg hover:border-indigo-200 transition-all group"
                  >
                    <div className="w-24 h-32 relative flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                      {book.imageUrl ? (
                        <Image src={book.imageUrl} alt={book.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-zinc-800 dark:text-white group-hover:text-indigo-600 transition-colors truncate">
                        {book.title}
                      </h3>
                      <p className="text-sm text-zinc-500 mb-2">{book.author?.name}</p>
                      <span className="inline-block px-2 py-1 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                        {book.genre}
                      </span>
                      <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                        {book.contentSummary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
