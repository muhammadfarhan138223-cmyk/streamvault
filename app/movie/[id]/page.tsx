'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  genre: string;
  year: string;
  rating: number;
  thumbnail_url: string;
  country: string;
  language: string;
}

export default function ExploreMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State (Inhe aap next phase mein custom SQL queries ke sath target kar sakte hain)
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedYear, setSelectedYear] = useState('All Years');

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        // Direct Supabase database fetch node active
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setMovies(data);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 px-8 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-400">
            <Link href="/" className="hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Explore Movies</h1>
          </div>
          <p className="text-gray-500 text-sm pl-8">Discover your next cinematic obsession.</p>
        </div>

        {/* Screenshot Premium Filter Section Bar */}
        <div className="bg-[#111] border border-gray-900/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2 mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              Filters
            </span>

            {/* Custom Select Dropdowns matched to UI theme */}
            <select value={selectedGenre} onChange={(e)=>setSelectedGenre(e.target.value)} className="bg-[#161616] border border-gray-800 rounded-xl px-4 py-2 text-xs text-gray-300 focus:outline-none focus:border-red-600 cursor-pointer">
              <option>All Genres</option>
              <option>Action</option>
              <option>Sci-Fi</option>
              <option>Horror</option>
              <option>Thriller</option>
            </select>

            <select value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)} className="bg-[#161616] border border-gray-800 rounded-xl px-4 py-2 text-xs text-gray-300 focus:outline-none focus:border-red-600 cursor-pointer">
              <option>All Years</option>
              <option>2026</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div className="text-xs font-medium text-red-500">
            {movies.length} results
          </div>
        </div>

        {/* Loading / Empty States handling */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-sm tracking-widest animate-pulse">
            LOADING BACKEND ENTRIES...
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-sm">
            No movies uploaded yet. Use the admin panel to populate rows!
          </div>
        ) : (
          /* High-Fidelity Responsive Grid Cards */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {movies.map((movie) => (
              <Link 
                href={`/movie/${movie.id}`} 
                key={movie.id} 
                className="group relative bg-[#141414] border border-gray-900 rounded-2xl overflow-hidden shadow-lg hover:border-red-600/50 transition-all duration-300 flex flex-col aspect-[2/3]"
              >
                {/* Image Wrap */}
                <div className="relative w-full h-full bg-gray-950 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={movie.thumbnail_url || 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1'} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Badges exactly like your image */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wide">
                    {movie.year}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded text-yellow-500 flex items-center gap-1">
                    ★ {movie.rating}
                  </div>

                  {/* Elegant bottom gradient shroud */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>

                {/* Info Text Meta container */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-0.5 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <h3 className="font-bold text-sm text-white truncate group-hover:text-red-500 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                    {movie.genre}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}