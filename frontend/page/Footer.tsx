import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">LiteraryHub</h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed italic font-serif">
            Lưu giữ và lan tỏa tinh hoa văn học Việt <br/> qua các thời kỳ lịch sử.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Liên hệ</h3>
          <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 mt-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>1 Đại Cồ Việt, Bách Khoa, <br/>Hai Bà Trưng, Hà Nội</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>+84 123 456 789</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Giờ mở cửa</h3>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex justify-between">
              <span>Thứ 2 - Thứ 6:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">08:00 - 21:00</span>
            </li>
            <li className="flex justify-between">
              <span>Thứ 7 - CN:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">09:00 - 18:00</span>
            </li>
            <li className="pt-2 text-[10px] text-zinc-400 uppercase italic">* Nghỉ các ngày lễ tết</li>
          </ul>
        </div>

        <div>
           <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Liên kết nhanh</h3>
           <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
             <li><Link href="#" className="hover:text-indigo-600 transition-colors">Nội quy thư viện</Link></li>
             <li><Link href="#" className="hover:text-indigo-600 transition-colors">Hướng dẫn mượn sách</Link></li>
             <li><Link href="#" className="hover:text-indigo-600 transition-colors">Chính sách bảo mật</Link></li>
             <li><Link href="#" className="hover:text-indigo-600 transition-colors">Góp ý dịch vụ</Link></li>
           </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          &copy; {new Date().getFullYear()} LiteraryHub - Thư viện Văn học Việt Nam. All rights reserved.
        </p>
        <div className="flex gap-6">
           <Link href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
           </Link>
           <Link href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.012 3.855.06 1.061.048 1.791.222 2.427.471.67.27 1.242.627 1.836 1.25.594.623.951 1.196 1.22 1.866.253.663.435 1.393.483 2.454.049 1.066.061 1.42.061 3.854s-.012 2.788-.06 3.855c-.048 1.061-.222 1.791-.471 2.427-.27.67-.627 1.242-1.25 1.836-.623.594-1.196.951-1.866 1.22-.663.253-1.393.435-2.454.483-1.066.049-1.42.061-3.854.061s-2.788-.012-3.855-.06c-1.061-.048-1.791-.222-2.427-.471-.67-.27-1.242-.627-1.836-1.25-.594-.623-.951-1.196-1.22-1.866-.253-.663-.435-1.393-.483-2.454C2.012 14.815 2 14.461 2 12s.012-2.788.06-3.855c.048-1.061.222-1.791.471-2.427.27-.67.627-1.242 1.25-1.836.623-.594 1.196-.951 1.866-1.22.663-.253 1.393-.435 2.454-.483 1.066-.049 1.42-.061 3.854-.061m0 1.802c-2.39 0-2.674.01-3.626.054a5.358 5.358 0 00-1.776.34 3.09 3.09 0 00-1.135.739 3.09 3.09 0 00-.739 1.135 5.358 5.358 0 00-.34 1.776c-.044.952-.054 1.236-.054 3.626s.01 2.674.054 3.626c.044.952.126 1.378.34 1.776.223.414.5.76.818 1.079.318.318.664.595 1.079.818.398.214.823.326 1.776.34.952.043 1.236.054 3.626.054s2.674-.01 3.626-.054a5.358 5.358 0 001.776-.34 3.091 3.091 0 001.135-.739 3.091 3.091 0 00.739-1.135 5.358 5.358 0 00.34-1.776c.044-.952.054-1.236.054-3.626s-.01-2.674-.054-3.626a5.358 5.358 0 00-.34-1.776 3.091 3.091 0 00-.739-1.135 3.091 3.091 0 00-1.135-.739 5.358 5.358 0 00-1.776-.34c-.952-.044-1.236-.054-3.626-.054m0 3.041c2.496 0 4.522 2.027 4.522 4.523s-2.026 4.523-4.522 4.523a4.523 4.523 0 110-9.046m0 7.24a2.716 2.716 0 100-5.432 2.716 2.716 0 000 5.432m5.23-7.795a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0"/></svg>
           </Link>
        </div>
      </div>
    </footer>
  );
}
