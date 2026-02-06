import Link from 'next/link';

export default function Carousel() {
  return (
    <div className="w-full h-80 md:h-[32rem] relative rounded-2xl overflow-hidden mb-12 shadow-2xl group">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 bg-library-hero"></div>
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px] group-hover:bg-zinc-950/40 transition-all duration-700"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
        <div className="mb-6 animate-slideUp">
          <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] uppercase font-bold tracking-[0.3em]">Kho tàng di sản</span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl animate-slideUp [animation-delay:0.1s] italic">
          Tinh Hoa <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-100 not-italic">VĂN HỌC VIỆT</span>
        </h2>
        <p className="text-lg md:text-2xl text-zinc-100 max-w-3xl mb-12 font-medium leading-relaxed animate-fadeIn [animation-delay:0.4s] drop-shadow-md">
          Bước chân vào không gian lưu giữ tâm hồn và bản sắc dân tộc qua hàng thế kỷ hào hùng.
        </p>
        <Link href="#explore" className="px-12 py-5 bg-white text-zinc-900 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all animate-fadeIn [animation-delay:0.7s]">
          Bắt đầu khám phá
        </Link>
      </div>
    </div>
  );
}
