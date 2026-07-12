'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ totalMovies: 0, totalFeed: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { count: movies } = await supabase.from('movies').select('*', { count: 'exact', head: true });
      const { count: feed } = await supabase.from('x_feed').select('*', { count: 'exact', head: true });
      setStats({ totalMovies: movies || 0, totalFeed: feed || 0 });
    }
    fetchStats();
  }, []);

  return (
    <div className="p-10 space-y-8 bg-[#050505] min-h-screen text-white">
      <h1 className="text-4xl font-black italic">COMMAND CENTER</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        {[
          { label: 'TOTAL TITLES', val: stats.totalMovies },
          { label: 'COMMUNITY POSTS', val: stats.totalFeed },
          { label: 'SYSTEM STATUS', val: 'ONLINE' }
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] p-8 border border-gray-800 rounded-lg"
          >
            <p className="text-[10px] text-gray-500 font-bold uppercase">{card.label}</p>
            <h2 className="text-4xl font-black mt-2">{card.val}</h2>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for future Charts */}
      <div className="bg-[#111] border border-gray-800 p-8 rounded-lg h-64 flex items-center justify-center text-gray-600 font-bold text-sm">
        REAL-TIME STREAMING ANALYTICS MODULE PENDING
      </div>
    </div>
  );
}