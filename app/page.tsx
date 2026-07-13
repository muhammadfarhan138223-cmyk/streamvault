import { getTrending, getPopular, getTopRated, getUpcoming, getByGenre, GENRES } from '@/lib/tmdb';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';


export default async function HomePage() {
  const [trending, popular, topRated, upcoming, action, comedy] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getUpcoming(),
    getByGenre(GENRES.Action),
    getByGenre(GENRES.Comedy),
  ]);

  const featured = trending[0];

  return (
    <main>

      {featured && <Hero title={featured} />}
      
      <div className="relative -mt-16 pb-20">
        <MovieRow label="Trending This Week" titles={trending} />
        <MovieRow label="Popular" titles={popular} />
        <MovieRow label="Top Rated" titles={topRated} />
        <MovieRow label="Coming Soon" titles={upcoming} />
        <MovieRow label="Action" titles={action} />
        <MovieRow label="Comedy" titles={comedy} />
      </div>
    </main>
  );
}