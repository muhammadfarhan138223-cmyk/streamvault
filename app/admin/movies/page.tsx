'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdvancedMovieManager() {
  const [movies, setMovies] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { 
    loadMovies(); 
  }, []);

  async function loadMovies() {
    const { data, error } = await supabase.from('movies').select('*');
    if (error) console.error("Error loading:", error);
    else setMovies(data || []);
  }

  return (
    <div className="p-8 bg-[#050505] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-900 pb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">STUDIO MANAGER</h1>
          <p className="text-gray-500 text-sm font-bold mt-1">{movies.length} TITLES IN DATABASE</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-red-600 hover:bg-red-700 px-8 py-3 font-black text-sm tracking-widest transition-all hover:scale-105"
        >
          ADD NEW TITLE
        </button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((m) => (
          <motion.div 
            key={m.id} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-gray-800 p-4 hover:border-red-600 transition group"
          >
            <div className="h-40 bg-gray-900 mb-4 flex items-center justify-center text-[10px] text-gray-600 font-bold">
              {m.thumbnail_url ? <img src={m.thumbnail_url} className="h-full w-full object-cover" /> : "NO POSTER"}
            </div>
            <h3 className="font-black text-sm truncate">{m.title}</h3>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{m.genre || 'Uncategorized'}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 50 }} animate={{ y: 0 }}
              className="bg-[#0a0a0a] border border-red-900 w-full max-w-lg p-8 shadow-2xl"
            >
              <h2 className="text-xl font-black mb-6 border-b border-gray-900 pb-4">ADD NEW PRODUCTION</h2>
              <div className="space-y-4">
                <input placeholder="Movie Title" className="w-full bg-black p-3 border border-gray-800 text-sm" />
                <input placeholder="Director Name" className="w-full bg-black p-3 border border-gray-800 text-sm" />
                <textarea placeholder="Cast (comma separated)" className="w-full bg-black p-3 border border-gray-800 text-sm h-20" />
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setIsOpen(false)} className="flex-1 py-3 border border-gray-800 font-bold text-xs">CANCEL</button>
                <button className="flex-1 py-3 bg-red-600 font-bold text-xs">PUBLISH</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}