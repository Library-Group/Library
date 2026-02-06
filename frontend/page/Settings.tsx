"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();
  const {
      formData, isLoading, message, handleChange, changePassword
  } = useSettings(user?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword();
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
    <div className="min-h-screen bg-library pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-lg border border-zinc-100 dark:border-zinc-700">
          <div className="flex items-center gap-4 mb-8">
             <Link href="/profile" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors">
                <svg className="w-6 h-6 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
             </Link>
             <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Cài đặt tài khoản</h1>
          </div>

          <div className="space-y-8">
            {/* Password Change Section */}
            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Đổi mật khẩu
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Mật khẩu hiện tại"
                    className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Mật khẩu mới</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Mật khẩu mới"
                    className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
                    required
                  />
                </div>

                {message.text && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-red-50 text-red-600 dark:bg-red-900/20'}`}>
                    {message.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                </button>
              </form>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-700 pt-8">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Giao diện (Đang phát triển)
                </h2>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-700 text-zinc-500 text-sm">
                    Tính năng chuyển đổi giao diện Sáng/Tối đang được cập nhật.
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
