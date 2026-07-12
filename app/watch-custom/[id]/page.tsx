import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function CustomWatchPage({ params }: { params: { id: string } }) {
  // Database se dynamic custom movie row fetch karna
  const { data: movie, error } = await supabase
    .from("custom_movies")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !movie) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-28 bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-6 pb-20">
        
        {/* Title Heading */}
        <h1 className="text-4xl font-black mb-6 tracking-tight">{movie.title}</h1>

        {/* Real Native HTML5 Ultra Video Player */}
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl mb-8">
          <video 
            src={movie.video_url} 
            controls 
            poster={movie.poster_url || undefined}
            className="w-full h-full object-contain"
            controlsList="nodownload" // Optional: standard protection
          />
        </div>

        {/* Content Meta Text */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold uppercase text-red-500 tracking-wider mb-2">About this video</h3>
          <p className="text-neutral-300 leading-relaxed text-sm">
            {movie.overview || "No description provided for this custom content."}
          </p>
        </div>

      </div>
    </main>
  );
}