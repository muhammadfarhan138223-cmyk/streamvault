'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length > 0) {
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .ilike('title', `%${query}%`);
          
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setResults(data || []);
        }
      } else {
        setResults([]);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-8 pb-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search Movies & Shows</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Type titles, genres, actors..."
          className="w-full bg-[#141414] border border-gray-800 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg className="w-5 h-5 text-gray-500 absolute left-4 top-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="mt-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((movie) => (
              <div key={movie.id} className="bg-[#141414] p-4 rounded-lg">
                <img src={movie.poster_url} alt={movie.title} className="rounded mb-2" />
                <h3 className="font-semibold">{movie.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            {query ? `No items found for "${query}"` : 'Start typing to explore the database...'}
          </div>
        )}
      </div>
    </div>
  );
}