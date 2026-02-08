import Link from "next/link";

export default function QuickGuides() {
  const guides = [
    {
      title: "Hướng dẫn mượn sách",
      description: "Quy trình đăng ký và mượn tác phẩm trực tuyến & offline.",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      color: "bg-blue-500",
      link: "#"
    },
    {
      title: "Nội quy Thư viện",
      description: "Các quy định chung khi tham gia sử dụng dịch vụ thư viện.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      color: "bg-emerald-500",
      link: "#"
    },
    {
      title: "Thẻ thành viên",
      description: "Đăng ký thẻ mới hoặc gia hạn thẻ thành viên trực tuyến.",
      icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
      color: "bg-amber-500",
      link: "#"
    }
  ];

  return (
    <section className="py-12 border-b border-zinc-100 dark:border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guides.map((guide, idx) => (
          <Link 
            key={idx} 
            href={guide.link}
            className="group flex items-start gap-4 p-6 bg-white dark:dark-elevated border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white ${guide.color} shadow-lg shadow-${guide.color.split('-')[1]}-200/50 dark:shadow-none transition-transform group-hover:scale-110`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={guide.icon}/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-indigo-600 transition-colors uppercase text-xs tracking-wider">{guide.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{guide.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
