'use client';

import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="space-y-4 px-4 sm:px-8 lg:px-16 my-8">
      <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <Link 
            href={`/movie/${movie.id}`} 
            key={movie.id}
            className="group relative bg-[#111] rounded-xl overflow-hidden border border-gray-900 aspect-[2/3] transition-all duration-300 hover:scale-105 hover:border-red-600/50"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10 flex items-end p-3">
              <p className="text-white font-medium text-xs truncate w-full">{movie.title}</p>
            </div>
            {movie.poster_path && (
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}