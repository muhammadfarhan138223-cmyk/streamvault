interface MovieRowProps {
  label: string;
  titles: any[]; 
}

export default function MovieRow({ label, titles }: MovieRowProps) {
  return (
    <div className="p-4">
      <h2 className="text-white text-lg font-bold mb-4">{label}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {titles?.map((movie: any) => (
          <div key={movie.id} className="min-w-[150px]">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}