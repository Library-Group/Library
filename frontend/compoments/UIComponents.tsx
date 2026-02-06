"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

// --- Carousel Component ---

export function Carousel() {
  return (
    <div className="w-full h-80 md:h-[32rem] relative rounded-2xl overflow-hidden mb-12 shadow-2xl group">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 bg-library-hero"></div>
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px] group-hover:bg-zinc-950/40 transition-all duration-700"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
        <div className="mb-6 animate-slideUp">
           <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] uppercase font-bold tracking-[0.3em]">Kho tàng di sản</span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl animate-slideUp [animation-delay:0.1s] italic">
          Tinh Hoa <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-100 not-italic">VĂN HỌC VIỆT</span>
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

// --- LibraryDecorations Component ---

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export function LibraryDecorations() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${7 + Math.random() * 10}s`,
    }));
    
    const timer = setTimeout(() => {
       setParticles(newParticles);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => {
        const style = {
            '--x': p.left,
            '--y': p.top,
            '--delay': p.delay,
            '--duration': p.duration,
        } as React.CSSProperties;
        
        return (
            <div
            key={p.id}
            className="absolute w-1 h-1 bg-white/40 dark:bg-white/20 rounded-full animate-dust left-[var(--x)] top-[var(--y)]"
            style={style}
            />
        );
      })}
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </div>
  );
}

// --- SearchBar Component ---

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'w-48' : 'w-10'}`}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          title="Tìm kiếm"
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
        
        {isExpanded && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm sách, tác giả..."
            className="flex-1 px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-zinc-100"
            autoFocus
          />
        )}
      </div>
    </form>
  );
}
