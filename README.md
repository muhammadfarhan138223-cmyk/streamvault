# StreamVault

A full-stack Netflix-style movie browsing app built with Next.js. Frontend and
backend live in one project: React Server Components fetch movie data
server-side, and an API route (`/api/movies`) powers client-side search.

## Stack
- **Next.js 14** (App Router) — frontend + backend in one framework
- **TypeScript**
- **Tailwind CSS** — styling
- **TMDB API** — free movie database (trending, popular, top rated, search, detail)

## 1. Get a free API key
1. Create an account at https://www.themoviedb.org/signup
2. Go to Settings → API → request an API key (choose "Developer", it's free)
3. Copy the **API Read Access Token** (the long one, not the short v3 key)

## 2. Setup
```bash
# unzip the project, then:
cd streamvault
npm install
cp .env.example .env.local
# paste your TMDB token into .env.local as TMDB_API_KEY
npm run dev
```

Open http://localhost:3000

## Project structure
```
streamvault/
├── app/
│   ├── page.tsx              # Home page (hero + movie rows)
│   ├── layout.tsx            # Root layout, fonts, navbar
│   ├── globals.css           # Tailwind + theme
│   ├── movie/[id]/page.tsx   # Movie detail page
│   └── api/movies/route.ts   # Backend API route (search)
├── components/
│   ├── Navbar.tsx             # Search bar (calls /api/movies)
│   ├── Hero.tsx               # Featured banner
│   └── MovieRow.tsx           # Horizontal scrolling poster row
├── lib/
│   └── tmdb.ts                # Backend data layer — talks to TMDB, owns the API key
└── .env.local                 # Your TMDB key (never commit this)
```

## How the "full stack" parts fit together
- **`lib/tmdb.ts`** is server-only code. It holds your API key and never ships
  to the browser. Server Components (like `app/page.tsx`) call it directly.
- **`app/api/movies/route.ts`** is a real backend endpoint. The search box in
  `Navbar.tsx` (a client component) calls this endpoint over `fetch`, since
  client code can't safely hold API keys.
- This pattern — server components for initial data, API routes for
  client-triggered actions — is the standard Next.js full-stack shape.

## Where to go next
- **Auth**: add [NextAuth.js](https://authjs.dev) for user accounts, watchlists, profiles.
- **Database**: add [Prisma](https://prisma.io) + PostgreSQL/SQLite to store
  user watchlists, ratings, continue-watching progress.
- **Video playback**: TMDB doesn't host video; wire trailers (already linked
  to YouTube) or your own video files with a player like `video.js`.
- **Deploy**: push to GitHub, import into [Vercel](https://vercel.com), add
  `TMDB_API_KEY` as an environment variable in project settings.

## Notes
- TMDB's free tier is rate-limited but generous enough for development.
- Images are served from `image.tmdb.org`, already whitelisted in `next.config.js`.
