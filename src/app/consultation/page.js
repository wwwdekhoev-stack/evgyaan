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

        {/* CARD 1 — Free WhatsApp */}
        <div
          className="rounded-2xl p-5 bg-white"
          style={{ border: '1.5px solid #e5e7eb', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
        >
          <div className="text-yellow-400 text-sm mb-1">⭐⭐⭐⭐½</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Free WhatsApp Chat
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Basic EV guidance from EVGyan team on WhatsApp.
          </p>

          <a
            href="https://wa.me/918178043697"
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
            href="https://drive.google.com/uc?export=download&id=1fxL2GgKUusBKIL6mkRdmccKEqTcrLL3g"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-bold py-3 rounded-xl text-base border-2 text-gray-900 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#e5e7eb' }}
          >
            📥 Download Guide (PDF)
          </a>
        </div>

        {/* REFUND POLICY */}
        <div
          className="rounded-xl p-4 text-center"
          style={{ backgroundColor: '#F9FAFB', border: '1.5px solid #e5e7eb' }}
        >
          <p className="text-sm font-semibold text-gray-700">🔒 Refund Policy</p>
          <p className="text-xs text-gray-500 mt-1">
            100% refund if you are not satisfied — bina kisi sawaal ke.
          </p>
        </div>

        {/* BOTTOM NOTE */}
        <p className="text-center text-xs text-gray-400 mt-1">
          Only 4 consultation slots available daily.
        </p>

      </div>
    </main>
  );
}
