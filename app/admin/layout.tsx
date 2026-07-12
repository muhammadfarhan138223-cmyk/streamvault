export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <aside className="w-64 border-r border-gray-900 p-8 space-y-10">
        <h2 className="text-xl font-black text-red-600 tracking-tighter">MOVIEHUB ADMIN</h2>
        <nav className="space-y-3">
          {[
            { name: 'Dashboard', path: '/admin' },
            { name: 'Movies', path: '/admin/movies' },
            { name: 'Feed', path: '/admin/feed' }
          ].map((link) => (
            <a key={link.name} href={link.path} className="block p-3 bg-[#111] rounded-lg text-xs font-bold hover:bg-red-600 transition">
              {link.name.toUpperCase()}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-12">{children}</main>
    </div>
  );
}