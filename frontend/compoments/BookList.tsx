"use client";

import { useBooks, useFilteredBooks } from "../hooks/useBooks";
import Link from "next/link";
import Image from "next/image";

export default function BookList() {
  const { books, loading, error } = useBooks();
  const {
    searchTerm, setSearchTerm,
    selectedGenre, setSelectedGenre,
    selectedPeriod, setSelectedPeriod,
    currentPage, setCurrentPage,
    genres, periods,
    filteredBooks, currentBooks,
    totalPages, handlePageChange, resetFilters
  } = useFilteredBooks(books, 6);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-zinc-500">Đang tải danh sách tác phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
        <div className="max-w-md text-center px-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <h3 className="text-red-800 dark:text-red-400 font-bold mb-2">Không thể tải dữ liệu</h3>
          <p className="text-red-600/70 text-sm mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar: Filters and Search */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl space-y-8 sticky top-24">
            <div>
              <h3 className="text-xs font-semibold text-zinc-500 mb-4 px-1">Tìm kiếm nội dung</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Nhập tên hoặc tác giả..." 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm text-zinc-700 dark:text-zinc-200"
                />
                <svg className="w-5 h-5 absolute left-3 top-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 mb-3 px-1">Chọn thể loại</h3>
                <select 
                  value={selectedGenre}
                  onChange={(e) => {
                    setSelectedGenre(e.target.value);
                    setCurrentPage(1);
                  }}
                  title="Chọn thể loại"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {genres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-zinc-500 mb-3 px-1">Thời kỳ văn học</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => {
                    setSelectedPeriod(e.target.value);
                    setCurrentPage(1);
                  }}
                  title="Chọn thời kỳ"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {periods.map(p => <option key={p || 'Unknown'} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800 flex flex-col gap-4">
               <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 italic">
                  <span>Tìm thấy {filteredBooks.length} kết quả</span>
               </div>
               { (searchTerm || selectedGenre !== "Tất cả" || selectedPeriod !== "Tất cả") && (
                 <button 
                    onClick={resetFilters}
                    className="text-indigo-600 hover:text-indigo-700 transition-colors text-xs font-medium text-left px-1"
                 >
                   Thiết lập lại bộ lọc
                 </button>
               )}
            </div>
          </div>
        </aside>

        {/* Main Content: Results Grid */}
        <main className="lg:col-span-9 space-y-12">
          {currentBooks.length === 0 ? (
            <div className="text-center text-zinc-500 py-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-200 dark:border-zinc-700">
              <p className="text-lg">Không tìm thấy tác phẩm nào phù hợp.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 text-indigo-600 hover:underline text-sm"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentBooks.map((book) => (
                  <Link
                    key={book._id}
                    href={`/books/${book.bookId}`}
                    className="group relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800 flex flex-col"
                  >
                    <div className="h-56 w-full relative overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                       {book.imageUrl ? (
                          <Image 
                              src={book.imageUrl} 
                              alt={book.title} 
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                          />
                       ) : (
                          <div className="flex items-center justify-center h-full text-zinc-300 italic text-xs">Chưa có ảnh bìa</div>
                       )}
                        <div className="absolute inset-x-3 bottom-3 flex gap-2">
                           <span className="px-2.5 py-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-lg text-[9px] text-zinc-500 font-medium">
                              {book.literaryPeriod}
                           </span>
                           {(book.stock ?? 0) > 0 ? (
                               <span className="hidden"></span>
                           ) : (
                               <span className="px-2.5 py-1 bg-red-500/90 backdrop-blur-sm rounded-lg text-[9px] text-white font-bold shadow-sm">
                                  Hết lượt hôm nay
                               </span>
                           )}
                        </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="text-[10px] text-indigo-500 font-medium mb-2">{book.genre}</div>
                      
                      <h2 className="text-lg font-bold mb-4 text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug min-h-[3rem]">
                        {book.title}
                      </h2>
      
                      <div className="mt-auto pt-4 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-400 mb-0.5">Tác giả</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300 text-xs truncate max-w-[140px]">{book.author?.name || 'Vô danh'}</span>
                        </div>
                        <div 
                          className="h-9 w-9 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all flex items-center justify-center border border-zinc-100 dark:border-zinc-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Square Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-8">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title="Trang trước"
                    aria-label="Trang trước"
                    className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-lg border font-medium text-sm transition-all ${
                        currentPage === i + 1 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" 
                          : "border-zinc-200 dark:border-zinc-700 hover:border-indigo-400 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    title="Trang sau"
                    aria-label="Trang sau"
                    className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
