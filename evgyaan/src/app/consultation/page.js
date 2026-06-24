export const metadata = {
  title: 'EV Buying Consultation | EVGyan',
  description: 'Confused about which EV to buy? Talk directly with Tarun or get free guidance. Choose the option that works best for you.',
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-white font-sans">

      {/* HERO IMAGE */}
      <div className="w-full relative">
        <img
          src="/tarun-consultation.jpg"
          alt="Tarun from EVGyan"
          className="w-full object-cover object-top"
          style={{ maxHeight: '420px' }}
        />
      </div>

      {/* HERO TEXT */}
      <div className="px-5 pt-6 pb-2 text-center">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Confused About Which EV To Buy?
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Choose the option that works best for you.
        </p>
      </div>

      {/* CARDS */}
      <div className="px-4 pb-10 pt-4 flex flex-col gap-4 max-w-md mx-auto">

        {/* CARD 1 — Featured */}
        <div
          className="rounded-2xl p-5 bg-white"
          style={{
            border: '2px solid #FFC400',
            boxShadow: '0 4px 18px rgba(255,196,0,0.18)',
          }}
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full text-gray-900"
              style={{ backgroundColor: '#FFC400' }}
            >
              ⭐ Recommended
            </span>
          </div>

          <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐⭐</div>

          <h2 className="text-lg font-bold text-gray-900 mb-0.5">
            Talk Directly With Tarun
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            15–20 Minute Personal Call
          </p>

          <div className="text-2xl font-extrabold text-gray-900 mb-4">
            ₹999
          </div>

          <ul className="space-y-2 mb-5 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              EV recommendation based on your usage
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              Charging advice
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              Ownership cost discussion
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              7-day WhatsApp support
            </li>
          </ul>

          <a
            href="https://razorpay.me/@evgyan3341"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-gray-900 font-bold py-3 rounded-xl text-base transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#FFC400' }}
          >
            Book Consultation →
          </a>
        </div>

        {/* CARD 2 — Free WhatsApp */}
        <div
          className="rounded-2xl p-5 bg-white"
          style={{ border: '1.5px solid #e5e7eb', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
        >
          <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐½</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Free WhatsApp Chat
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Ask your EV questions and get basic guidance on WhatsApp.
          </p>

          <a
            href="https://wa.me/918700696438"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-bold py-3 rounded-xl text-base border-2 text-gray-900 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#e5e7eb' }}
          >
            💬 Chat On WhatsApp
          </a>
        </div>

        {/* CARD 3 — Free Guide */}
        <div
          className="rounded-2xl p-5 bg-white"
          style={{ border: '1.5px solid #e5e7eb', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
        >
          <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Free EV Buying Guide
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Simple EV buying guide for new buyers.
          </p>

          <a
            href="https://ev-gyan.kit.com/cd38925e99"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-bold py-3 rounded-xl text-base border-2 text-gray-900 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#e5e7eb' }}
          >
            📥 Download Guide
          </a>
        </div>

        {/* BOTTOM NOTE */}
        <p className="text-center text-xs text-gray-400 mt-1">
          Only 4 consultation slots available daily.
        </p>

      </div>
    </main>
  );
}
