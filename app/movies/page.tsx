import { getTrending } from '@/lib/tmdb';
import Link from 'next/link';

export default async function MoviesPage() {
  // Live dynamic fetch directly from production endpoint
  const movies = await getTrending();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-16">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900/60 pb-5 mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight">Live Catalog</h1>
          <p className="text-gray-500 text-[11px] md:text-xs mt-0.5">Real-time database records streaming active</p>
        </div>
      </div>

      {/* 100% Real Interactive Data Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies?.map((movie: any) => (
          <Link 
            key={movie.id} 
            href={`/movie/${movie.id}`} 
            className="group relative block rounded-xl overflow-hidden bg-[#111]/30 border border-gray-900/50 hover:border-red-600/40 transition-all duration-300"
          >
            <div className="aspect-[2/3] w-full bg-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              
              {/* TMDB Image Content */}
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-[#161616] flex items-center justify-center text-gray-700 text-xs font-bold">
                  NO POSTER
                </div>
              )}
              
              <span className="absolute top-2 right-2 z-20 bg-black/70 backdrop-blur-md text-yellow-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-yellow-500/10">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className="p-2.5">
              <h3 className="font-bold text-white text-xs md:text-sm tracking-tight truncate group-hover:text-red-500 transition-colors">
                {movie.title || movie.name}
              </h3>
              <div className="flex items-center justify-between text-gray-500 text-[10px] font-medium mt-1">
                <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                <span className="text-red-500/80 font-semibold uppercase text-[8px] tracking-wider bg-red-500/5 border border-red-500/10 px-1 rounded">
                  {movie.media_type || 'Movie'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}