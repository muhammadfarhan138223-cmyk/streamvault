const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '9ca10e8281da8090e604bef8a1b119ed'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const GENRES = {
  Action: 28,
  Comedy: 35,
  Horror: 27,
  Drama: 18,
  SciFi: 878
};

// 1. Trending Movies
export async function getTrending() {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('TMDB trending response error');
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Fetch Error (Trending):", error);
    return [];
  }
}

// 2. Popular Movies
export async function getPopular() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('TMDB popular response error');
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Fetch Error (Popular):", error);
    return [];
  }
}

// 3. Top Rated Movies
export async function getTopRated() {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('TMDB top rated response error');
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Fetch Error (Top Rated):", error);
    return [];
  }
}

// 4. Upcoming Movies
export async function getUpcoming() {
  try {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('TMDB upcoming response error');
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Fetch Error (Upcoming):", error);
    return [];
  }
}

// 5. Movies By Genre ID
export async function getByGenre(genreId: number) {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('TMDB genre response error');
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Fetch Error (Genre):", error);
    return [];
  }
}

// 6. Dynamic Movie Details
export async function getMovieDetails(movieId: string) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
    if (!res.ok) throw new Error('TMDB details response error');
    return await res.json();
  } catch (error) {
    console.error("TMDB Fetch Error (Details):", error);
    return null;
  }
}