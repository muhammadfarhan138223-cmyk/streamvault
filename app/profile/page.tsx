'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AuthModal from '@/components/AuthModal';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 px-8 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-[#141414] border border-gray-900 rounded-2xl p-8 text-center shadow-2xl">
        {user ? (
          /* LOGGED IN VIEW */
          <>
            <div className="w-20 h-20 bg-gradient-to-tr from-red-600 to-red-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold uppercase tracking-wider">
              {user.email?.[0]}
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {user.user_metadata?.full_name || 'Cinephile Member'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            <div className="bg-black/40 border border-gray-900 p-3 rounded-lg text-xs text-left mb-6 text-gray-400">
              <span className="text-gray-500 font-semibold uppercase block mb-1">Account Role</span>
              Standard Subscriber Access Active
            </div>
          </>
        ) : (
          /* ANONYMOUS VIEW */
          <>
            <div className="w-20 h-20 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              ✕
            </div>
            <h2 className="text-xl font-bold mb-2">Access Restrict</h2>
            <p className="text-gray-400 text-sm mb-6">You need to authenticate to view account preferences and personalization features.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition"
            >
              Sign In / Register
            </button>
          </>
        )}
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        // Refresh component state on authentication callback
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
      }} />
    </div>
  );
}