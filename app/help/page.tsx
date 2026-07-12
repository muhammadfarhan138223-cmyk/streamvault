export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-8 pb-16 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Help Center & FAQ</h1>
      <div className="border-t border-gray-900 my-4" />
      <div className="space-y-4">
        <div className="bg-[#111] border border-gray-900 p-5 rounded-2xl">
          <h3 className="font-bold text-sm text-white mb-2">How do I access the Explore Movies grid?</h3>
          <p className="text-gray-400 text-xs leading-relaxed">Simply click on the &apos;Movies&apos; route link on the navigation header panel to stream straight from our Supabase servers node.</p>
        </div>
        <div className="bg-[#111] border border-gray-900 p-5 rounded-2xl">
          <h3 className="font-bold text-sm text-white mb-2">When are Cinephile Shorts launching?</h3>
          <p className="text-gray-400 text-xs leading-relaxed">Shorts pipelines automation systems are under pipeline building and will reflect dynamically very soon.</p>
        </div>
      </div>
    </div>
  );
}