export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-8 pb-16 max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-gray-500 text-sm">Have an issue or technical query? Ping our operational center.</p>
      </div>
      <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-xs text-gray-400 block mb-1.5 font-medium uppercase tracking-wider">Email Address</label>
          <input type="email" placeholder="farhan@example.com" className="w-full bg-[#111] border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition" />
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1.5 font-medium uppercase tracking-wider">Message</label>
          <textarea rows={5} placeholder="Describe your technical or streaming bug..." className="w-full bg-[#111] border border-gray-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition" />
        </div>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-3 rounded-xl transition shadow-lg shadow-red-600/10">
          Send Message
        </button>
      </form>
    </div>
  );
}