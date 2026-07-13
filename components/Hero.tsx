'use client';

import Link from 'next/link';

export default function Hero({ title }: { title: any }) {
  if (!title) return null;

  return (
    <div className="relative w-full h-[50vh] flex items-center p-10 bg-black">
      <div className="max-w-2xl">
        <h1 className="text-white text-5xl font-bold mb-4">{title.title}</h1>
        <p className="text-gray-300 mb-6">{title.overview}</p>
        <Link href={`/movie/${title.id}`} className="bg-red-600 text-white px-6 py-2 rounded">
          Play Now
        </Link>
      </div>
    </div>
  );
}