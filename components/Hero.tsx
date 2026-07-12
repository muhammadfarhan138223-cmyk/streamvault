'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Sample configuration matching your screenshot layout blueprint
const SLIDE_DATA = [
  {
    id: 1301421,
    title: "Hollow Sun",
    genre: "HORROR",
    rating: "8.2",
    meta: "2024 • 1h 45m • Australia • 18+",
    desc: "When the sun suddenly goes dark for 24 hours, the residents of a small town realize they are not alone in the shadows.",
    bg: "/hero-poster.jpg" 
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const current = SLIDE_DATA[index];

  return (
    <div className="relative w-full h-[75vh] md:h-[88vh] flex items-center px-4 sm:px-8 lg:px-16 pt-16 overflow-hidden bg-black">
      {/* Background Matte Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-black/60 z-10" />
      
      {/* Structural Data View */}
      <div className="max-w-2xl space-y-3 md:space-y-4 z-20 mt-10">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider">
          <span className="text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase">{current.genre}</span>
          <span className="text-yellow-500 flex items-center gap-1">★ {current.rating}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none">
          {current.title}
        </h1>
        
        <p className="text-gray-400 text-[11px] md:text-xs font-medium">{current.meta}</p>
        
        <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
          {current.desc}
        </p>

        {/* Action Elements matching screen capture details */}
        <div className="flex items-center gap-2.5 pt-2">
          <Link href={`/movie/${current.id}`} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition shadow-md">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play Now
          </Link>
          <button className="bg-[#222]/60 hover:bg-[#333]/80 border border-gray-800 text-white font-bold text-xs px-5 py-2.5 rounded-full transition">
            + My List
          </button>
        </div>
      </div>

      {/* Dots controller tracker */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 z-30">
        {SLIDE_DATA.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all ${i === index ? 'w-5 bg-red-600' : 'w-1.5 bg-gray-600'}`} />
        ))}
      </div>
    </div>
  );
}