'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 px-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Movies & Shows</h1>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type titles, genres, actors..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#141414] border border-gray-800 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-4 top-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Placeholder text logic handling zero result state */}
        <div className="mt-12 text-center text-gray-600">
          {query ? `No items found for "${query}"` : 'Start typing to explore the database...'}
        </div>
      </div>
    </div>
  );
}