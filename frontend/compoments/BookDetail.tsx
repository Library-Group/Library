"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { LibraryDecorations } from "@/compoments/UIComponents";
import { useAuth } from "@/context/AuthContext";
import { useBookDetail, useMyBooks, useSearch } from "@/hooks/useBooks";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params?.slug as string[];
  const id = slug?.[1];

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const {
    book, loading, error, borrowStatus, setBorrowStatus,
    isFavorite, favLoading, toggleFavorite, confirmBorrow,
    comments, addComment
  } = useBookDetail(id, user?.id);

  const { addBook } = useMyBooks();
  
  const { books: relatedBooks } = useSearch("", book?.genre || "", "title-asc");
  const borrowFee = "20,000đ";

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(newComment, userRating);
    setNewComment("");
    setUserRating(5);
  };

  const handleBorrow = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setBorrowStatus('confirming');
    setShowBorrowModal(true);
  };

  const onConfirmBorrow = async () => {
    const result = await confirmBorrow();
    if (result.success) {
        addBook();
        setTimeout(() => {
            setShowBorrowModal(false);
            setBorrowStatus('idle');
        }, 2000);
    } else {
        alert(result.message);
        setBorrowStatus('idle');
    }
  };

  const onToggleFavorite = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const result = await toggleFavorite();
    if (result.success && !isFavorite && book) {
        addBook();
    } else if (!result.success) {
        alert(result.message);
    }
  };

  // Remove complex visibility effects for unconditional rendering
  useEffect(() => {
    // Ensuring all sections are visible immediately
    const elements = document.querySelectorAll(".reveal-visible, .reveal");
    elements.forEach((el) => {
      el.classList.add("reveal-visible");
      el.classList.remove("reveal");
    });
  }, [loading, book]);

  if (loading || !id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] bg-zinc-50 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-500 mb-4"></div>
        <p className="text-zinc-500 text-sm font-medium tracking-tight">Đang tải...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-black text-zinc-800 dark:text-zinc-100 mb-3 uppercase">Lỗi dữ liệu</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">{error || "Hệ thống gặp lỗi khi truy xuất thông tin."}</p>
          <Link href="/" className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-sm transition-all">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const otherBooks = relatedBooks.filter(b => b.bookId !== id).slice(0, 4);

  const synthesizedContent = [
    `Tác phẩm ${book.title} được sáng tạo bởi tác giả ${book.author?.name || 'Vô danh'}, một trong những gương mặt tiêu biểu của nền văn học giai đoạn ${book.literaryPeriod}. ${book.author?.birthYear ? `Ông sinh năm ${book.author.birthYear} và mất năm ${book.author.deathYear || '?'}, để lại một sự nghiệp văn chương đồ sộ có sức ảnh hưởng sâu sắc đến các thế hệ sau.` : ''}`,
    book.historicalContext,
    book.contentSummary,
    book.ideologicalValue,
    book.artisticValue
  ].filter(Boolean).join('\n\n');


  return (
    <div className="max-w-6xl mx-auto pt-44 pb-12 px-6 space-y-10 animate-fadeIn bg-library min-h-screen selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      <LibraryDecorations />
      
      {/* Navigation & Status - COMPACT */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <Link href="/" title="Quay lại trang chủ" className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all font-bold text-xs inline-flex items-center group">
          <div className="p-1.5 bg-white dark:bg-zinc-900 rounded-lg mr-2 border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-all">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </div>
          Quay lại trang chủ
        </Link>
        <div className="flex items-center gap-3">
           {book.isAvailable && (
             <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] font-black uppercase rounded border border-green-100 dark:border-green-800/50">
               <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
               Lưu thông
             </span>
           )}
           <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-extrabold bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded">ID: {book.bookId}</span>
        </div>
      </div>

      {/* Hero Section: Compact & Integrated - NO REVEAL FOR TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        
        {/* Left: Book Cover - Smaller aspect */}
        <div className="lg:col-span-3 xl:col-span-3">
           <div className="relative aspect-[3/4.2] rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border-[6px] border-white dark:border-zinc-800 shadow-xl dark:shadow-black/60 group">
             {book.imageUrl ? (
               <Image 
                  src={book.imageUrl} 
                  alt={book.title} 
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105" 
                  unoptimized
               />
             ) : (
               <div className="flex items-center justify-center h-full bg-zinc-50 dark:bg-zinc-800 text-zinc-300 italic serif-font text-xs">No Image</div>
             )}
           </div>
        </div>

        {/* Right: Primary Info & Actions - Denser */}
        <div className="lg:col-span-9 xl:col-span-9 flex flex-col justify-center space-y-6">
           <div>
             <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[9px] font-black uppercase tracking-widest rounded-full shadow-md">
                   {book.genre}
                </span>
                <span className="h-0.5 w-6 bg-zinc-200 dark:bg-zinc-800"></span>
                <span className="text-zinc-400 text-[9px] font-black uppercase tracking-widest">Danh mục lưu trữ</span>
             </div>

             <h1 className="text-4xl md:text-5xl xl:text-6xl heading-sharp mb-3 leading-tight">
                {book.title}
             </h1>
             
             <p className="text-xl font-serif italic text-zinc-500 dark:text-zinc-400 mb-8">
                Tác giả: <span className="text-zinc-800 dark:text-zinc-200 font-bold decoration-indigo-500/30 underline underline-offset-4">{book.author?.name}</span>
             </p>

             {/* Action Buttons Row - Smaller padding */}
             <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => router.push(`/books/${id}/read`)}
                  className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all active:scale-95 shadow-xl shadow-indigo-100 dark:shadow-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  Nghiên cứu văn bản
                </button>
                
                {(book.stock ?? 0) > 0 ? (
                    <button 
                      onClick={handleBorrow}
                      className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-indigo-600 transition-all active:scale-95 shadow-sm"
                    >
                      Mượn ấn phẩm
                    </button>
                ) : (
                    <button disabled className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-widest opacity-50 cursor-not-allowed">Hết sách</button>
                )}

                <button 
                  onClick={onToggleFavorite}
                  disabled={favLoading}
                  title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                  aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all active:scale-90 ${isFavorite ? 'bg-pink-500 border-pink-500 text-white shadow-lg' : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:text-pink-500 hover:border-pink-500'}`}
                >
                   <svg className={`w-6 h-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </button>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content & Sidebar - More Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 pb-12">
         
         {/* Main Column: Left (8/12) */}
         <div className="lg:col-span-8 space-y-10">
            {/* Summary Block */}
            <div className="p-8 md:p-10 bg-[var(--card-bg)] rounded-[2.5rem] border border-[var(--card-border)] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-[0.02] dark:opacity-[0.05] pointer-events-none group-hover:scale-105 transition-transform duration-700">
                 <svg className="w-56 h-56" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
               </div>
               
               <h3 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                 <span className="h-0.5 w-6 bg-indigo-600"></span> Nội dung chính
               </h3>
               
               <div className="prose dark:prose-invert max-w-none">
                 <p className="text-xl font-serif italic text-zinc-800 dark:text-zinc-200 leading-[1.6] mb-10 border-l-4 border-indigo-600 pl-8 opacity-95">
                    &ldquo;{book.contentSummary}&rdquo;
                 </p>
                 
                 <div className={`space-y-10 overflow-hidden transition-all duration-700 ${isDescriptionExpanded ? 'max-h-[5000px]' : 'max-h-[350px]'}`}>
                    <section>
                       <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Bối cảnh lịch sử</h4>
                       <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium bg-[var(--background)] p-6 rounded-2xl italic">
                          {book.historicalContext}
                       </p>
                    </section>
 
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-8 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/20">
                          <h4 className="text-[9px] font-black uppercase text-indigo-600 tracking-widest mb-3">Giá trị tư tưởng</h4>
                          <p className="text-sm text-zinc-800 dark:text-zinc-200 font-bold leading-relaxed">{book.ideologicalValue}</p>
                       </div>
                       <div className="p-8 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                          <h4 className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-3">Hệ thống nghệ thuật</h4>
                          <p className="text-sm text-zinc-800 dark:text-zinc-200 font-bold leading-relaxed">{book.artisticValue}</p>
                       </div>
                    </section>
 
                    <section>
                       <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Nghiên cứu tổng quan</h4>
                       <div className="whitespace-pre-line text-base text-zinc-600 dark:text-zinc-400 font-medium space-y-4 leading-relaxed">
                          {synthesizedContent.split('\n\n').map((p, i) => (p && p.length > 10 && <p key={i}>{p}</p>))}
                       </div>
                    </section>
                 </div>
                 
                 {!isDescriptionExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-900 via-white/70 dark:via-zinc-900/70 to-transparent z-10 pointer-events-none"></div>
                 )}
               </div>
 
               <div className="mt-8 text-center lg:text-left relative z-20">
                  <button 
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    title={isDescriptionExpanded ? "Thu gọn nội dung" : "Xem toàn văn nghiên cứu"}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg group"
                  >
                    {isDescriptionExpanded ? 'Thu gọn' : 'Xem toàn văn'}
                    <svg className={`w-4 h-4 transition-transform duration-500 ${isDescriptionExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                  </button>
               </div>
            </div>
         </div>

         {/* Technical Sidebar - Compact */}
         <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 space-y-6">
               
               {/* Technical Metadata Card */}
               <div className="p-8 bg-zinc-900 text-white rounded-[2rem] shadow-xl overflow-hidden relative group border border-white/5">
                  <h4 className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-6 border-b border-zinc-800 pb-3">Thông số</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] text-zinc-400 font-bold">Mã lưu trữ</span>
                        <span className="text-[10px] font-black tracking-widest uppercase">{book.bookId}</span>
                     </div>
                     <div className="flex justify-between items-center border-t border-zinc-800/50 pt-4">
                        <span className="text-[10px] text-zinc-400 font-bold">Thời kỳ</span>
                        <span className="text-xs font-black">{book.literaryPeriod}</span>
                     </div>
                     <div className="flex justify-between items-center border-t border-zinc-800/50 pt-4">
                        <span className="text-[10px] text-zinc-400 font-bold">Năm sáng tác</span>
                        <span className="text-xs font-black">{book.yearOfCreation}</span>
                     </div>
                     <div className="flex justify-between items-center border-t border-zinc-800/50 pt-4">
                        <span className="text-[10px] text-zinc-400 font-bold">Số cuốn</span>
                        <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase ${(book.stock ?? 0) > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                           {(book.stock ?? 0) > 0 ? `${book.stock} cuốn` : 'Hết'}
                        </span>
                     </div>
                  </div>
               </div>

               {/* Author Identification Card - Dominant Portrait */}
               <div className="p-8 bg-[var(--card-bg)] rounded-[2rem] border border-[var(--card-border)] flex flex-col items-center">
                  <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl mb-6 bg-zinc-100 dark:bg-zinc-800 group">
                     <Image 
                        src={book.author?.portraitUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(book.author?.name || 'A')}&background=6366f1&color=fff&bold=true&size=512`}
                        alt={book.author?.name || 'Author'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                     />
                  </div>
                  <h4 className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1.5 self-start px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 rounded">Chân dung tác giả</h4>
                  <div className="w-full text-left mt-2 px-2">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">{book.author?.name}</h3>
                    <p className="text-[10px] text-zinc-400 font-extrabold uppercase mb-4 tracking-tighter">{book.author?.birthYear || '?'} — {book.author?.deathYear || '?'}</p>
                    <div className="h-0.5 w-12 bg-indigo-600 mb-4"></div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-[1.6] font-medium italic opacity-90">
                      Gương mặt tiêu biểu của nền văn học giai đoạn {book.literaryPeriod}.
                    </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Borrow Confirm Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" onClick={() => borrowStatus !== 'success' && setShowBorrowModal(false)}></div>
          <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl p-8 text-center space-y-5 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
            {borrowStatus === 'confirming' ? (
              <>
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z M12 18c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">Xác nhận mượn sách?</h3>
                  <p className="text-zinc-400 text-xs mt-2 leading-relaxed px-4">
                    Phí mượn tác phẩm &quot;{book.title}&quot; là <span className="font-bold text-indigo-600">{borrowFee}</span>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowBorrowModal(false)} className="flex-1 py-2.5 text-zinc-500 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all">Hủy</button>
                  <button onClick={onConfirmBorrow} className="flex-1 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-all shadow-lg">Xác nhận</button>
                </div>
              </>
            ) : (
              <div className="py-2 animate-scaleUp">
                <div className="w-16 h-16 bg-green-500 text-white rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-green-100 dark:shadow-none">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-lg font-bold dark:text-white">Giao dịch thành công</h3>
                <p className="text-zinc-400 text-xs mt-2">Xem lại trong mục &quot;Kho sách của bạn&quot;.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Books Section - Compact Grid */}
      {otherBooks.length > 0 && (
         <section className="space-y-6 pt-10 border-t border-[var(--card-border)]">
            <h2 className="text-xl font-black text-[var(--title-color)] flex items-center gap-2">
                <span className="text-indigo-600">✦</span> Có thể bạn thích
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {otherBooks.map((rb) => (
                    <Link key={rb._id} href={`/books/${rb.bookId}`} className="group block">
                        <div className="aspect-[2/2.8] relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2 shadow-sm group-hover:shadow-lg transition-all border border-transparent group-hover:border-indigo-100">
                             {rb.imageUrl ? (
                                <Image src={rb.imageUrl} alt={rb.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized/>
                             ) : (
                                <div className="flex items-center justify-center h-full text-zinc-300 text-[10px] italic p-2">No Image</div>
                             )}
                        </div>
                        <h3 className="font-bold text-zinc-800 dark:text-white text-xs line-clamp-1 group-hover:text-indigo-600 transition-colors">{rb.title}</h3>
                        <p className="text-[9px] text-zinc-500">{rb.author?.name}</p>
                    </Link>
                ))}
            </div>
         </section>
      )}

      <section className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-serif text-[var(--title-color)] mb-6">
           Thảo luận <span className="text-sm font-normal text-zinc-400">({comments.length})</span>
        </h2>
        
        <div className="max-w-4xl">
          <form onSubmit={handleAddComment} className="bg-[#f8f9fa] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2rem] space-y-5">
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Đánh giá:</span>
               <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className={`text-xl transition-all ${userRating >= star ? 'text-yellow-400' : 'text-zinc-200 dark:text-zinc-800'}`}
                    >
                      ★
                    </button>
                  ))}
               </div>
            </div>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ cảm nghĩ..."
              className="w-full h-28 p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:border-indigo-500 outline-none transition-all rounded-xl resize-none shadow-sm"
            ></textarea>
            
            <div className="text-right">
              <button type="submit" title="Gửi bình luận" className="bg-indigo-600 text-white px-10 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                GỬI
              </button>
            </div>
          </form>

          <div className="space-y-4 pb-8">
            {comments.map((comment) => (
              <div key={comment.id} className="group border-l-2 border-indigo-100 dark:border-zinc-800 pl-6 py-3 transition-all hover:border-indigo-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black text-indigo-400">
                      {comment.user.charAt(0).toUpperCase()}
                    </div>
                    <div>
                       <span className="font-bold text-zinc-900 dark:text-white text-xs block">{comment.user}</span>
                       <span className="text-[8px] text-zinc-400 block">{comment.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500 text-[9px] font-bold">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < comment.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pr-4">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
