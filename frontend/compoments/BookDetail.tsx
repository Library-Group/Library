import React, { useState } from "react";
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
  

  const {
    book, loading, error, borrowStatus, setBorrowStatus,
    isFavorite, favLoading, toggleFavorite, confirmBorrow,
    comments, addComment
  } = useBookDetail(id, user?.id);

  const { addBook } = useMyBooks();

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(5);
  
  // Fetch related books based on genre
  const { books: relatedBooks } = useSearch("", book?.genre || "", "title-asc");
  // Filter out current book from related
  const otherBooks = relatedBooks.filter(b => b.bookId !== id).slice(0, 4);

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

  if (loading || !id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] bg-zinc-50 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-500 mb-4"></div>
        <p className="text-zinc-500 font-medium tracking-tight">Đang tải...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-black text-zinc-800 dark:text-zinc-100 mb-4 uppercase">Lỗi dữ liệu</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">{error || "Hệ thống gặp lỗi khi truy xuất thông tin."}</p>
          <Link href="/" className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold transition-all">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const synthesizedContent = [
    `Tác phẩm ${book.title} được sáng tạo bởi tác giả ${book.author?.name || 'Vô danh'}, một trong những gương mặt tiêu biểu của nền văn học giai đoạn ${book.literaryPeriod}. ${book.author?.birthYear ? `Ông sinh năm ${book.author.birthYear} và mất năm ${book.author.deathYear || '?'}, để lại một sự nghiệp văn chương đồ sộ có sức ảnh hưởng sâu sắc đến các thế hệ sau.` : ''}`,
    book.historicalContext,
    book.contentSummary,
    book.ideologicalValue,
    book.artisticValue
  ].filter(Boolean).join('\n\n');

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-20 animate-fadeIn bg-library min-h-screen selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <LibraryDecorations />
      <div className="flex items-center justify-between border-b border-[#eaecf0] dark:border-zinc-800 pb-2">
        <Link href="/" className="text-zinc-600 hover:text-indigo-600 transition-colors font-medium text-sm inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          Quay lại danh sách chính
        </Link>
        <div className="flex items-center gap-4">
           {book.isAvailable && (
             <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] font-bold uppercase rounded-md border border-green-100 dark:border-green-800">
               <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
               Sẵn sàng
             </span>
           )}
           <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{book.bookId}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 lg:col-span-2">
           <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-2 shadow-2xl relative aspect-[3/4.2] group">
             {book.imageUrl ? (
               <Image 
                  src={book.imageUrl} 
                  alt={book.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  unoptimized
               />
             ) : (
               <div className="flex flex-col items-center justify-center h-full bg-zinc-50 dark:bg-zinc-800 text-zinc-400 font-serif italic text-sm text-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl">
                  <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  ẢNH MINH HỌA TÁC PHẨM
               </div>
             )}
           </div>
        </div>

        <div className="md:col-span-3 lg:col-span-3 space-y-10">
           <div>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-[1.15] mb-6 tracking-tight">
                {book.title}
             </h1>
             <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-widest rounded-lg border border-indigo-100/50 dark:border-indigo-800/50">
                   {book.genre}
                </span>
                <span className="text-zinc-400 text-sm font-serif italic border-l border-zinc-200 dark:border-zinc-800 pl-4">Nguồn: Thư viện Văn học Việt Nam</span>
             </div>

             <div className="flex flex-wrap gap-4 mt-8">
                <button 
                  onClick={() => router.push(`/books/${id}/read`)}
                  className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 dark:hover:shadow-none transition-all active:scale-95 group shadow-lg shadow-indigo-100"
                >
                  <div className="p-1.5 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  </div>
                  Đọc ngay trên trang
                </button>
                
                {book.pdfUrl && (
                  <a 
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 dark:hover:shadow-none transition-all active:scale-95 group shadow-lg shadow-emerald-100"
                  >
                    <div className="p-1.5 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                    </div>
                    Đọc PDF trực tuyến
                  </a>
                )}
                
                {(book.stock ?? 0) > 0 ? (
                    <button 
                      onClick={handleBorrow}
                      className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-2xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 transition-all active:scale-95 shadow-sm"
                    >
                      <div className="p-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                      </div>
                      Mượn ấn phẩm ({book.stock} sẵn có)
                    </button>
                ) : (
                    <button 
                      onClick={() => alert("Chức năng đang phát triển: Đã đăng ký nhận thông báo khi có sách!")}
                      className="flex items-center gap-3 px-8 py-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-500 rounded-2xl font-bold text-sm hover:bg-amber-100 transition-all active:scale-95 shadow-sm"
                    >
                      <div className="p-1.5 bg-amber-100 dark:bg-amber-800 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      Đặt trước (Hết hàng)
                    </button>
                )}

                <button 
                  onClick={onToggleFavorite}
                  disabled={favLoading}
                  className={`flex items-center justify-center p-4 rounded-2xl border transition-all active:scale-95 ${
                    isFavorite 
                      ? 'bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-900/20 dark:border-pink-800' 
                      : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-pink-500 hover:border-pink-200'
                  }`}
                  title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                >
                   <svg className={`w-6 h-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                </button>
             </div>
           </div>

           <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 overflow-hidden rounded-[2.5rem] shadow-sm text-sm">
              <div className="bg-zinc-50/50 dark:bg-zinc-800/30 px-6 py-5 font-bold uppercase tracking-[0.15em] text-[10px] text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                 <span>Thông tin chi tiết</span>
                 <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div className="p-8 space-y-5">
                {[
                  { label: "Tác giả", value: book.author?.name },
                  { label: "Năm sinh/mất", value: `${book.author?.birthYear || '?'} - ${book.author?.deathYear || '?'}` },
                  { label: "Phí mượn", value: borrowFee },
                  { label: "Thời kỳ", value: book.literaryPeriod },
                  { label: "Năm ra đời", value: book.yearOfCreation },
                  { label: "Ngôn ngữ", value: book.language || 'Tiếng Việt' },
                  { label: "Cấp học", value: book.curriculumLevel }
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 items-center">
                    <span className="font-bold text-zinc-400 text-[11px] uppercase tracking-widest">{item.label}</span>
                    <span className="col-span-2 text-zinc-800 dark:text-zinc-200 font-bold ml-4">{item.value || 'N/A'}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Borrow Confirm Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" onClick={() => borrowStatus !== 'success' && setShowBorrowModal(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-10 text-center space-y-6 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
            {borrowStatus === 'confirming' ? (
              <>
                <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-3xl mx-auto flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z M12 18c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">Xác nhận thanh toán mượn sách?</h3>
                  <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                    Phí mượn tác phẩm &quot;{book.title}&quot; là <span className="font-bold text-indigo-600 dark:text-indigo-400">{borrowFee}</span>. 
                    Sau khi thanh toán, tác phẩm sẽ được thêm vào <span className="underline italic">Kho sách của bạn</span>.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setShowBorrowModal(false)} className="flex-1 py-3 text-zinc-500 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all">Hủy</button>
                  <button onClick={onConfirmBorrow} className="flex-1 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">Thanh toán ngay</button>
                </div>
              </>
            ) : (
              <div className="py-4 animate-scaleUp">
                <div className="w-20 h-20 bg-green-500 text-white rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-green-100 dark:shadow-none">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-xl font-bold dark:text-white">Đã thêm vào kho sách</h3>
                <p className="text-zinc-400 text-sm mt-3">Giao dịch thành công! Bạn có thể xem lại tác phẩm này bất cứ lúc nào trong mục &quot;Kho sách của bạn&quot;.</p>
              </div>
            )}
          </div>
        </div>
      )}



      {/* Related Books Section */}
      {otherBooks.length > 0 && (
         <section className="space-y-8 pt-12 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-2xl font-black text-zinc-800 dark:text-white flex items-center gap-2">
                <span className="text-indigo-600">✦</span> Có thể bạn cũng thích
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {otherBooks.map((rb) => (
                    <Link key={rb._id} href={`/books/${rb.bookId}`} className="group block">
                        <div className="aspect-[2/3] relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-3 shadow-md group-hover:shadow-xl transition-all">
                             {rb.imageUrl ? (
                                <Image src={rb.imageUrl} alt={rb.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized/>
                             ) : (
                                <div className="flex items-center justify-center h-full text-zinc-300 text-xs">No Image</div>
                             )}
                             <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] text-white font-bold">{rb.literaryPeriod}</div>
                        </div>
                        <h3 className="font-bold text-zinc-800 dark:text-white text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">{rb.title}</h3>
                        <p className="text-xs text-zinc-500">{rb.author?.name}</p>
                    </Link>
                ))}
            </div>
         </section>
      )}

      <section className="space-y-10 pt-16 border-t border-[#a2a9b1] dark:border-zinc-800">
        <div className="flex items-center justify-between pb-4 border-b border-[#a2a9b1] dark:border-zinc-800">
          <h2 className="text-3xl font-serif text-[#000] dark:text-white flex items-center gap-3">
             <span>Thảo luận</span>
             <span className="text-sm font-normal text-[#72777d] md:translate-y-1">({comments.length} bình luận)</span>
          </h2>
          <div className="flex -space-x-2">
             {[1,2,3].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold uppercase">U{i}</div>
             ))}
          </div>
        </div>
        
        <div className="max-w-4xl space-y-10">
          <form onSubmit={handleAddComment} className="bg-[#f8f9fa] dark:bg-zinc-900 border border-[#a2a9b1] dark:border-zinc-800 p-8 rounded-2xl shadow-inner space-y-6">
            <div className="flex items-center gap-4">
               <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Đánh giá chung:</span>
               <div className="flex gap-1.5 p-2 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className={`text-2xl transition-all hover:scale-125 hover:rotate-12 ${userRating >= star ? 'text-yellow-400' : 'text-zinc-200 dark:text-zinc-800'}`}
                    >
                      ★
                    </button>
                  ))}
               </div>
            </div>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ cảm nghĩ hoặc phản biện nội dung tác phẩm..."
              className="w-full h-32 p-6 bg-white dark:bg-zinc-950 border border-[#a2a9b1] dark:border-zinc-800 text-base focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all rounded-xl resize-none"
            ></textarea>
            
            <div className="text-right">
              <button type="submit" className="bg-zinc-900 dark:bg-indigo-600 text-white px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-zinc-200 dark:shadow-none">
                Gửi bình luận
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="group border-l-4 border-indigo-100/50 dark:border-zinc-800 pl-8 py-3 transition-all hover:border-indigo-500 hover:bg-white dark:hover:bg-zinc-900/40 rounded-r-[2rem]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 bg-gradient-to-br from-indigo-50 to-white dark:from-zinc-800 dark:to-zinc-900">
                      {comment.user.charAt(0)}
                    </div>
                    <div>
                       <span className="font-bold text-[#3366cc] dark:text-indigo-400 text-sm hover:underline cursor-pointer block">{comment.user}</span>
                       <span className="text-[10px] text-[#72777d] mt-0.5 block">{comment.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 px-2 py-0.5 rounded-full border border-yellow-100/50 dark:border-yellow-900/20">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[10px]">{i < comment.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <p className="text-[#202122] dark:text-zinc-400 text-base leading-relaxed text-justify pr-6">
                  {comment.text}
                </p>
                <div className="mt-4 text-[10px] text-[#3366cc] dark:text-zinc-500 font-bold space-x-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="hover:text-indigo-600 cursor-pointer">Trả lời</span>
                   <span className="hover:text-indigo-600 cursor-pointer">Hữu ích</span>
                   <span className="hover:text-red-500 cursor-pointer">Báo cáo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
