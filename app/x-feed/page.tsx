'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Tweet {
  id: string;
  author_name: string;
  author_username: string;
  content: string;
  created_at: string;
  likes: number;
}

export default function XFeedPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTweet, setNewTweet] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Temporary details - Later sync with real Auth metadata
  const authorName = "MovieHub User";
  const authorUsername = "moviehub_fan";

  useEffect(() => {
    // Initial Fetch
    const fetchTweets = async () => {
      const { data, error } = await supabase
        .from('x_feed')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTweets(data);
      }
      setLoading(false);
    };

    fetchTweets();

    // Listen to Realtime Changes
    const channel = supabase
      .channel('live_tweets')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'x_feed' }, (payload) => {
        setTweets((current) => [payload.new as Tweet, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handlePostTweet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweet.trim() || submitting) return;

    setSubmitting(true);
    const { error } = await supabase
      .from('x_feed')
      .insert([
        {
          author_name: authorName,
          author_username: authorUsername,
          content: newTweet.trim(),
          likes: 0
        }
      ]);

    if (!error) {
      setNewTweet('');
    } else {
      console.error("Error inserting tweet:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-4 sm:px-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-900/80 pb-4 mb-6">
        <h1 className="text-lg font-extrabold tracking-tight">MovieHub X Feed</h1>
        <p className="text-gray-500 text-[11px] mt-0.5">Live curated community reviews and studio updates</p>
      </div>

      {/* Tweet Input Box */}
      <form onSubmit={handlePostTweet} className="bg-[#111]/40 border border-gray-900/80 rounded-xl p-4 mb-6 space-y-3">
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="Share your cinematic thoughts or movie reviews..."
          maxLength={280}
          className="w-full bg-transparent text-xs text-gray-200 placeholder-gray-600 focus:outline-none resize-none h-20 font-body"
        />
        <div className="flex justify-between items-center pt-2 border-t border-gray-900/40">
          <span className="text-[10px] text-gray-600">{280 - newTweet.length} characters left</span>
          <button
            type="submit"
            disabled={!newTweet.trim() || submitting}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-[11px] font-bold px-4 py-1.5 rounded-full transition active:scale-95 shadow-md shadow-red-600/10"
          >
            {submitting ? 'Posting...' : 'Post to Feed'}
          </button>
        </div>
      </form>

      {/* Feed List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-2">
          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-500 text-[10px] font-medium">Syncing feed data...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {tweets.map((tweet) => (
            <div 
              key={tweet.id} 
              className="bg-[#111]/20 border border-gray-900/60 rounded-xl p-3.5 space-y-2.5 transition-all hover:border-gray-800/80"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                  {tweet.author_name ? tweet.author_name[0] : 'M'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-tight">{tweet.author_name}</span>
                  <span className="text-[10px] text-gray-500 font-medium">@{tweet.author_username}</span>
                </div>
              </div>

              <p className="text-gray-300 text-xs leading-relaxed tracking-wide whitespace-pre-wrap font-body">
                {tweet.content}
              </p>

              <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold border-t border-gray-900/40 pt-2">
                <span className="text-gray-600 font-normal">
                  {new Date(tweet.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}