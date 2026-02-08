"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useBorrow } from "@/hooks/useBooks";

export default function BorrowHistory() {
  const { user } = useAuth();
  const { 
    borrows, loading, filter, setFilter, handleReturn 
  } = useBorrow(user?.id);

  const onReturn = async (borrowId: string) => {
    const result = await handleReturn(borrowId);
    if (result.success) {
        alert(result.message + (result.lateFee ? `\nPhí trễ hạn: ${result.lateFee.toLocaleString()} VND` : ''));
    } else {
        alert(result.message);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'borrowing':
        return <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Đang mượn</span>;
      case 'returned':
        return <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Đã trả</span>;
      case 'overdue':
        return <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Quá hạn</span>;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-library pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">Vui lòng đăng nhập</h2>
          <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-library pt-44 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Lịch sử mượn sách</h1>
            <p className="text-zinc-500 mt-1">Quản lý các sách bạn đã và đang mượn</p>
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            title="Lọc theo trạng thái"
            className="px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white"
          >
            <option value="all">Tất cả</option>
            <option value="borrowing">Đang mượn</option>
            <option value="returned">Đã trả</option>
            <option value="overdue">Quá hạn</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : borrows.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700">
            <svg className="w-16 h-16 mx-auto text-zinc-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <p className="text-zinc-500 text-lg mb-4">Chưa có lịch sử mượn sách</p>
            <Link href="/" className="text-indigo-600 hover:underline">
              ← Khám phá sách ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {borrows.map((borrow) => (
              <div key={borrow._id} className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link href={`/books/${borrow.bookId}`} className="text-lg font-bold text-zinc-800 dark:text-white hover:text-indigo-600 transition-colors">
                      {borrow.bookTitle}
                    </Link>
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Mượn: {formatDate(borrow.borrowDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Hạn trả: {formatDate(borrow.dueDate)}</span>
                      </div>
                      {borrow.returnDate && (
                        <div className="flex items-center gap-2 text-green-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <span>Đã trả: {formatDate(borrow.returnDate)}</span>
                        </div>
                      )}
                    </div>
                    
                    {borrow.fee > 0 && (
                      <p className="text-sm text-zinc-400 mt-2">Phí mượn: {borrow.fee.toLocaleString()} VND</p>
                    )}
                    {borrow.lateFee > 0 && (
                      <p className="text-sm text-red-500 mt-1">Phí trễ hạn: {borrow.lateFee.toLocaleString()} VND</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    {getStatusBadge(borrow.status)}
                    
                    {borrow.status === 'borrowing' && (
                      <button
                        onClick={() => onReturn(borrow._id)}
                        className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                      >
                        Trả sách
                      </button>
                    )}
                    
                    {borrow.status === 'overdue' && (
                      <button
                        onClick={() => onReturn(borrow._id)}
                        className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                      >
                        Trả sách (trễ hạn)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
