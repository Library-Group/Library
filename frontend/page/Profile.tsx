"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const {
      profile, stats, loading, isEditing, setIsEditing, editForm, setEditForm, handleUpdate
  } = useProfile(user?.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'favorites' | 'settings'>('overview');

  const onSave = async () => {
    const result = await handleUpdate();
    if (result.success) {
        alert('Cập nhật thành công!');
        setIsEditing(false);
    } else {
        alert(result.message || 'Có lỗi xảy ra');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getRank = (count: number = 0) => {
    if (count >= 50) return { name: 'Thành viên Kim Cương', color: 'from-cyan-400 to-blue-600', icon: '💎', shadow: 'shadow-cyan-200 dark:shadow-cyan-900/40' };
    if (count >= 20) return { name: 'Thành viên Vàng', color: 'from-amber-300 to-yellow-500', icon: '🥇', shadow: 'shadow-yellow-200 dark:shadow-yellow-900/40' };
    if (count >= 5) return { name: 'Thành viên Bạc', color: 'from-slate-300 to-slate-500', icon: '🥈', shadow: 'shadow-slate-200 dark:shadow-slate-900/40' };
    return { name: 'Thành viên Mới', color: 'from-orange-300 to-orange-500', icon: '🥉', shadow: 'shadow-orange-200 dark:shadow-orange-900/40' };
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-library pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h2 className="text-2xl font-black text-zinc-800 dark:text-white mb-6">Bạn cần đăng nhập để xem hồ sơ</h2>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-200 dark:shadow-none">
            Đăng nhập ngay
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-library pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-zinc-500 animate-pulse">Đang tải hồ sơ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-library pb-20">
      {/* Cover Section */}
      <div className="h-64 md:h-80 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-zinc-800/50 p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl md:text-6xl font-black shadow-2xl border-4 border-white dark:border-zinc-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                {profile?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900 shadow-sm"></div>
            </div>
            
            {/* Main Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {profile?.name}
                </h1>
                <span className="inline-flex px-3 py-1 text-[10px] font-black bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 rounded-lg uppercase tracking-widest self-center md:self-auto">
                    {profile?.role === 'admin' ? 'Quản trị viên' : profile?.role === 'librarian' ? 'Thủ thư' : 'Thành viên'}
                </span>
                
                {/* Loyalty Badge */}
                {profile?.role === 'user' && (
                  <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r text-white text-[10px] font-black uppercase tracking-widest shadow-lg ${getRank(stats?.booksRead).color} ${getRank(stats?.booksRead).shadow}`}>
                      <span>{getRank(stats?.booksRead).icon}</span>
                      {getRank(stats?.booksRead).name}
                  </div>
                )}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {profile?.email}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-tighter">
                   <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                   Tham gia: <span className="text-zinc-600 dark:text-zinc-300 ml-1">{stats?.memberSince ? formatDate(stats.memberSince) : 'N/A'}</span>
                </div>
              </div>
            </div>
            
            {/* Global Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => { setActiveTab('settings'); setIsEditing(true); }}
                className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-2xl font-black text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                Sửa hồ sơ
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 p-1.5 bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl mb-8 overflow-x-auto scrollbar-none">
            {[
                { id: 'overview', label: 'Tổng quan', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { id: 'history', label: 'Lịch sử', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                { id: 'favorites', label: 'Yêu thích', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                { id: 'settings', label: 'Cài đặt', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as 'overview' | 'history' | 'favorites' | 'settings'); setIsEditing(tab.id === 'settings'); }}
                    className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none translate-y-[-2px]' : 'text-zinc-500 hover:text-indigo-500 hover:bg-white dark:hover:bg-zinc-800'}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}/></svg>
                    {tab.label}
                </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fadeIn">
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { count: stats?.totalBorrows, label: 'Tổng mượn', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
                                { count: stats?.currentBorrows, label: 'Đang mượn', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                                { count: stats?.favoriteCount, label: 'Yêu thích', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
                                { count: stats?.booksRead, label: 'Đã hoàn thành', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' }
                            ].map((s, i) => (
                                <div key={i} className={`p-5 rounded-3xl border border-white dark:border-zinc-800 shadow-sm ${s.bg} flex flex-col items-center justify-center text-center hover:scale-[1.05] transition-transform duration-300`}>
                                    <div className={`text-3xl font-black ${s.color} mb-1`}>{s.count || 0}</div>
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        
                         {/* Loyalty Progress Section */}
                         {profile?.role === 'user' && (
                           <div className="p-6 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 relative overflow-hidden">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-black text-zinc-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                  <span>{getRank(stats?.booksRead).icon}</span>
                                  Hạng thành viên
                                </h3>
                                <span className={`text-xs font-black text-transparent bg-clip-text bg-gradient-to-r ${getRank(stats?.booksRead).color}`}>
                                  {getRank(stats?.booksRead).name}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                                Bạn đã đọc <span className="font-bold text-zinc-800 dark:text-white">{stats?.booksRead || 0}</span> cuốn sách. 
                                {(stats?.booksRead || 0) < 5 ? ' Đọc thêm ' + (5 - (stats?.booksRead || 0)) + ' cuốn để lên Bạc!' :
                                 (stats?.booksRead || 0) < 20 ? ' Đọc thêm ' + (20 - (stats?.booksRead || 0)) + ' cuốn để lên Vàng!' :
                                 (stats?.booksRead || 0) < 50 ? ' Đọc thêm ' + (50 - (stats?.booksRead || 0)) + ' cuốn để lên Kim Cương!' :
                                 ' Bạn đã đạt hạng cao nhất!'}
                              </p>
                              <div className="w-full bg-zinc-100 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${getRank(stats?.booksRead).color} transition-all duration-1000`} 
                                    style={{ '--width': `${Math.min(((stats?.booksRead || 0) / 50) * 100, 100)}%` } as React.CSSProperties}
                                  >
                                  <div className="w-[var(--width)] h-full"></div>
                                </div>
                              </div>
                           </div>
                         )}

                        {/* Bio Section */}
                        <div className="p-8 bg-zinc-50 dark:bg-zinc-950/30 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative group overflow-hidden">
                            <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                Giới thiệu
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                {profile?.bio || 'Chưa có thông tin giới thiệu. Hãy cập nhật để mọi người hiểu thêm về bạn!'}
                            </p>
                            <svg className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-500/5 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5M4.017 21L4.017 18C4.017 16.8954 4.91242 16 6.017 16H9.017C9.56928 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56928 8 9.017 8H6.017C4.91242 8 4.017 7.10457 4.017 6V5"/></svg>
                        </div>
                    </div>

                    {/* Sidebar: Reading Goal */}
                    <div className="space-y-6">
                        <div className="p-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl text-white shadow-xl shadow-indigo-200 dark:shadow-none">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-black text-lg leading-tight">Mục tiêu đọc sách năm nay</h3>
                                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                            </div>
                            
                            <div className="relative pt-1">
                                <div className="flex mb-4 items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-black inline-block">{stats?.booksRead || 0}</span>
                                        <span className="text-indigo-200 text-sm font-bold ml-1">/ {stats?.readingGoal || 12} cuốn</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-black inline-block text-indigo-100">
                                            {Math.round(((stats?.booksRead || 0) / (stats?.readingGoal || 12)) * 100)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-indigo-900/30 border border-white/10">
                                    <div 
                                        style={{ '--progress': `${Math.min(((stats?.booksRead || 0) / (stats?.readingGoal || 12)) * 100, 100)}%` } as React.CSSProperties}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full transition-all duration-1000 w-[var(--progress)]"
                                    ></div>
                                </div>
                                <p className="text-[10px] font-bold text-indigo-100/70 uppercase tracking-widest italic text-center">
                                    {(stats?.booksRead || 0) >= (stats?.readingGoal || 12) ? 'Tuyệt vời! Bạn đã đạt mục tiêu 🎉' : 'Cố gắng lên, bạn đang làm rất tốt!'}
                                </p>
                            </div>
                        </div>

                        {/* Quick Action */}
                        <Link href="/borrow-history" className="flex items-center justify-between p-6 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 hover:border-indigo-500 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <div>
                                    <h4 className="font-black text-sm text-zinc-800 dark:text-white uppercase tracking-tighter">Xem chi tiết lịch sử</h4>
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Kiểm tra trả sách</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-zinc-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                        </Link>
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-zinc-800 dark:text-white">Lịch sử mượn sách gần đây</h3>
                        <Link href="/borrow-history" className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">Tất cả lịch sử</Link>
                    </div>
                    {/* Placeholder for history list - User can see full in /borrow-history */}
                    <div className="bg-zinc-50 dark:bg-zinc-950/20 rounded-3xl p-10 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <svg className="w-16 h-16 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        <p className="text-zinc-500 font-bold">Hãy xem chi tiết lịch sử tại trang riêng biệt</p>
                        <Link href="/borrow-history" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">Đến trang lịch sử</Link>
                    </div>
                </div>
            )}

            {activeTab === 'favorites' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-zinc-800 dark:text-white">Sách yêu thích của bạn</h3>
                    </div>
                     <div className="bg-zinc-50 dark:bg-zinc-950/20 rounded-3xl p-10 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <svg className="w-16 h-16 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                        <p className="text-zinc-500 font-bold">Quản lý kho sách của bạn tại đây</p>
                        <Link href="/my-books" className="mt-4 inline-block px-6 py-2 bg-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">Đến kho sách cá nhân</Link>
                    </div>
                </div>
            )}

            {activeTab === 'settings' && isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* General Settings */}
                    <div className="space-y-6">
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-950/20 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            <h4 className="font-black text-zinc-800 dark:text-white uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">Thông tin cơ bản</h4>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Họ và tên</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        placeholder="Nhập họ tên"
                                        className="w-full px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-white font-bold transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                            placeholder="Nhập số điện thoại"
                                            className="w-full px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-white font-bold transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Mục tiêu (năm)</label>
                                        <input
                                            type="number"
                                            value={editForm.readingGoal}
                                            onChange={(e) => setEditForm({...editForm, readingGoal: parseInt(e.target.value) || 12})}
                                            placeholder="12"
                                            className="w-full px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-white font-bold transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Địa chỉ</label>
                                    <input
                                        type="text"
                                        value={editForm.address}
                                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                        placeholder="Nhập địa chỉ"
                                        className="w-full px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-white font-bold transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio & Actions */}
                    <div className="space-y-6">
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-950/20 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            <h4 className="font-black text-zinc-800 dark:text-white uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">Giới thiệu</h4>
                            <div>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                    rows={5}
                                    maxLength={500}
                                    placeholder="Nói gì đó về bản thân..."
                                    className="w-full px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:text-white font-bold transition-all resize-none"
                                />
                                <div className="flex justify-end mt-2">
                                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{editForm.bio.length}/500</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onSave}
                                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-[0.98] uppercase tracking-widest"
                            >
                                Lưu tất cả thay đổi
                            </button>
                            <button
                                onClick={() => { setIsEditing(false); setActiveTab('overview'); }}
                                className="w-full py-4 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-2xl font-black hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all uppercase tracking-widest"
                            >
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
