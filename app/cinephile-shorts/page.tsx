export default function CinephileShortsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-parchment flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
      <div className="max-w-xl w-full space-y-4 md:space-y-6">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider mx-auto">
          <span className="w-1 h-1 rounded-full bg-red-500 animate-ping"></span>
          Coming Soon
        </div>

        {/* Text sizes optimized purely based on device width inputs */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
          Cinephile Shorts
        </h1>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm mx-auto">
          We are building a short-form vertical video experience curated specifically for hardcore cinema lovers. Stay tuned!
        </p>

        <div className="pt-2">
          <a 
            href="/" 
            className="inline-block bg-transparent border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 text-xs md:text-sm font-semibold px-5 py-2.5 rounded-lg transition active:scale-95 w-44 md:w-auto"
          >
            Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}