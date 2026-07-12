'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const linkClass = (path: string) => {
    return pathname === path
      ? "text-white font-semibold bg-[#1a0505] border border-red-900/40 px-3 py-1 rounded-md text-xs tracking-wide transition-all"
      : "text-gray-400 hover:text-white font-medium px-3 py-1 text-xs tracking-wide transition-all relative group";
  };

  return (
    <>
      <nav className={`w-full flex items-center justify-between px-4 sm:px-8 py-3.5 fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 border-b border-gray-900/50 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
      }`}>
        
        {/* Left Side Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 w-7 h-7 rounded flex items-center justify-center shadow-md shadow-red-600/10">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v3h3V6H4zm5 0v3h6V6H9zm8 0v3h3V6h-3zM4 11v3h3v-3H4zm5 0v3h6v-3H9zm8 0v3h3v-3h-3zm-13 5v3h3v-3H4zm5 0v3h6v-3H9zm8 0v3h3v-3h-3z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-base tracking-wide">MovieHub</span>
          </Link>

          {/* Desktop Links (Hover triggers the SOON badge) */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkClass('/')}>Home</Link>
            <Link href="/movies" className={linkClass('/movies')}>Movies</Link>
            
            <Link href="/cinephile-shorts" className={linkClass('/cinephile-shorts')}>
              <span>Shorts</span>
              <span className="absolute -top-3 right-0 bg-red-600 text-[7px] text-white font-bold px-1 py-0.5 rounded opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none tracking-tight shadow shadow-red-600/50">SOON</span>
            </Link>
            
            <Link href="/x-feed" className={linkClass('/x-feed')}>
              <span>X Feed</span>
              <span className="absolute -top-3 right-0 bg-red-600 text-[7px] text-white font-bold px-1 py-0.5 rounded opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none tracking-tight shadow shadow-red-600/50">SOON</span>
            </Link>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3.5 text-gray-400">
          <Link href="/search" className="hover:text-white transition p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {/* Actions Block for Sign In / Sign Up */}
          <div className="hidden sm:flex items-center gap-3.5 text-xs">
            {user ? (
              <button onClick={handleLogout} className="font-medium hover:text-red-500 transition">Sign Out</button>
            ) : (
              <>
                <button onClick={() => setIsModalOpen(true)} className="font-medium hover:text-white transition">Sign In</button>
                <button onClick={() => setIsModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-md transition-all active:scale-95 shadow shadow-red-600/10">Sign Up</button>
              </>
            )}
          </div>

          {/* Profile Trigger */}
          <Link href="/profile" className="hidden sm:flex w-6.5 h-6.5 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 0118 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Mobile Hamburger - Triggers Sidebar Drawer */}
          <button onClick={() => setIsMenuOpen(true)} className="block md:hidden p-1 text-gray-300 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR OVERLAY (Matches Screenshot 2 perfectly) */}
      <div className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed top-0 right-0 bottom-0 w-[270px] bg-[#0c0c0c] border-l border-gray-900/80 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="space-y-6">
            {/* Header inside drawer */}
            <div className="flex items-center justify-between border-b border-gray-900 pb-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 w-6 h-6 rounded flex items-center justify-center shadow">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v3h3V6H4zm5 0v3h6V6H9zm8 0v3h3V6h-3z"/></svg>
                </div>
                <span className="text-white font-bold text-sm tracking-wide">MovieHub</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Movies', path: '/movies' },
                { label: 'Shorts', path: '/cinephile-shorts' },
                { label: 'X Feed', path: '/x-feed' },
                { label: 'Search', path: '/search' },
                { label: 'My Profile', path: '/profile' }
              ].map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between text-xs font-semibold px-4 py-3 rounded-xl transition-all border ${
                      isActive 
                        ? 'bg-[#180808] border-red-950 text-red-500' 
                        : 'bg-[#111]/30 border-transparent text-gray-400 hover:text-white hover:bg-[#111]/70'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions inside drawer */}
          <div className="space-y-2 border-t border-gray-900 pt-4">
            {user ? (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-center text-xs font-bold text-gray-400 hover:text-red-500 py-2.5 transition">Sign Out</button>
            ) : (
              <>
                <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="w-full text-center text-xs font-bold text-white border border-gray-800 py-2.5 rounded-xl transition bg-[#111]/40">Sign In</button>
                <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="w-full text-center text-xs font-bold text-white bg-red-600 py-2.5 rounded-xl transition active:scale-95">Sign Up Free</button>
              </>
            )}
          </div>

        </div>
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}