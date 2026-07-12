'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Apna exact supabase client path check kar lein

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Redirect state listener aur auto-close mechanism
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        onClose(); // Modal ko khud hi close kar do
        window.location.hash = ''; // URL se access_token saaf kar do
      }
    });

    return () => subscription.unsubscribe();
  }, [onClose]);

  if (!isOpen) return null;

  // Google Login Function
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`, // Automatic http://localhost:3001 pick karega
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Email Sign In / Sign Up Function
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) setError(error.message);
      else alert('Check your email for the confirmation link!');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-[#141414] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-4xl text-gray-400 hover:text-white z-10 text-xl bg-black/40 w-8 h-8 rounded-full flex items-center justify-center">
          ✕
        </button>

        {isLogin ? (
          <>
            {/* LEFT SIDE: LOGIN FORM */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-[#181818]">
              <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
              <p className="text-gray-400 text-sm mb-6">Hey Cinephile! Great to see you back.</p>

              {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded">{error}</p>}

              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.67z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center my-4 text-gray-500">
                <hr className="flex-grow border-gray-800" />
                <span className="px-3 text-xs uppercase tracking-wider">Or Use Email</span>
                <hr className="flex-grow border-gray-800" />
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input 
                  type="email" placeholder="Email Address" required value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="w-full bg-[#222] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <input 
                  type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}
                  className="w-full bg-[#222] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all">
                  {loading ? 'Processing...' : 'SIGN IN'}
                </button>
              </form>
            </div>

            {/* RIGHT SIDE: TOGGLE PANEL */}
            <div className="w-full md:w-1/2 bg-red-600 p-8 flex flex-col justify-center items-center text-center text-white">
              <h2 className="text-4xl font-extrabold mb-4">Hey Cinephile!</h2>
              <p className="max-w-xs mb-8 text-red-100">Welcome to MovieHub. Start tracking your favorites and explore premium content.</p>
              <button onClick={() => setIsLogin(false)} className="border-2 border-white text-white font-bold py-2 px-8 rounded-full hover:bg-white hover:text-red-600 transition-all">
                SIGN UP
              </button>
            </div>
          </>
        ) : (
          <>
            {/* LEFT SIDE: TOGGLE PANEL */}
            <div className="w-full md:w-1/2 bg-red-600 p-8 flex flex-col justify-center items-center text-center text-white order-2 md:order-1">
              <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
              <p className="max-w-xs mb-8 text-red-100">To keep connected with us please login with your personal info.</p>
              <button onClick={() => setIsLogin(true)} className="border-2 border-white text-white font-bold py-2 px-8 rounded-full hover:bg-white hover:text-red-600 transition-all">
                SIGN IN
              </button>
            </div>

            {/* RIGHT SIDE: REGISTER FORM */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-[#181818] order-1 md:order-2">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm mb-6">Join the ultimate community for movie lovers.</p>

              {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded">{error}</p>}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input 
                  type="text" placeholder="Full Name" required value={fullName} onChange={(e)=>setFullName(e.target.value)}
                  className="w-full bg-[#222] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <input 
                  type="email" placeholder="Email Address" required value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="w-full bg-[#222] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <input 
                  type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}
                  className="w-full bg-[#222] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all">
                  {loading ? 'Creating...' : 'REGISTER'}
                </button>
              </form>
            </div>
          </>
        )}

      </div>
    </div>
  );
}