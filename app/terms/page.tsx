export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-8 pb-16 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="text-gray-400 text-sm">Last updated: July 2026</p>
      <div className="border-t border-gray-900 my-4" />
      <p className="text-gray-400 leading-relaxed text-sm">
        Welcome to MovieHub. By accessing or using our streaming services, platform, and movie logs, you agree to be bound by these Terms of Service. Please read them carefully.
      </p>
      <h2 className="text-lg font-bold mt-6 text-red-500">1. Account Security</h2>
      <p className="text-gray-400 leading-relaxed text-sm">
        You are responsible for maintaining the authentication flow security of your user session linked with our Supabase architecture nodes.
      </p>
    </div>
  );
}