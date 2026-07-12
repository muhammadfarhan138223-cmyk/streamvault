'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#060606] border-t border-gray-900 text-gray-400 text-sm mt-auto">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column: Brand & Info */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:col-span-5 space-y-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-red-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v3h3V6H4zm5 0v3h6V6H9zm8 0v3h3V6h-3zM4 11v3h3v-3H4zm5 0v3h6v-3H9zm8 0v3h3v-3h-3zm-13 5v3h3v-3H4zm5 0v3h6v-3H9zm8 0v3h3v-3h-3z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">MovieHub</span>
          </Link>
          <p className="text-gray-500 max-w-sm leading-relaxed text-[13px] px-4 md:px-0">
            The streaming platform for people who take cinema seriously. Curated, cinematic, and unapologetically premium. Discover your next obsession today.
          </p>
          
          {/* Social Icons Container */}
          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <a href="#" className="w-9 h-9 rounded-full bg-[#111] border border-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.42 0-4 1.35-4 4v2z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#111] border border-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#111] border border-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" h="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#111] border border-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        {/* Right Columns: Links */}
        <div className="md:col-span-7 grid grid-cols-2 gap-8 text-center md:text-left md:pl-20">
          {/* Browse Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Browse</h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link href="/movies" className="hover:text-white transition block py-1 md:py-0">Movies</Link></li>
              <li><Link href="/cinephile-shorts" className="hover:text-white transition block py-1 md:py-0">Cinephile Shorts</Link></li>
              <li><Link href="/x-feed" className="hover:text-white transition block py-1 md:py-0">X Feed</Link></li>
              <li><Link href="/search" className="hover:text-white transition block py-1 md:py-0">Search</Link></li>
              <li><Link href="/profile" className="hover:text-white transition block py-1 md:py-0">My Profile</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link href="/terms" className="hover:text-white transition block py-1 md:py-0">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition block py-1 md:py-0">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition block py-1 md:py-0">Cookie Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition block py-1 md:py-0">Contact Us</Link></li>
              <li><Link href="/help" className="hover:text-white transition block py-1 md:py-0">Help Center</Link></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Sub-Footer Section */}
      <div className="w-full border-t border-gray-900/60 bg-[#040404] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center md:text-left">
          <div className="order-2 md:order-1">
            &copy; 2026 MovieHub. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 order-1 md:order-2">
            <Link href="/terms" className="hover:text-gray-400 transition py-1">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition py-1">Privacy</Link>
            <Link href="/cookie-policy" className="hover:text-gray-400 transition py-1">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}