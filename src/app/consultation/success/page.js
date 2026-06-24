'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [manualId, setManualId] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [waSent, setWaSent] = useState(false);

  useEffect(() => {
    // Read buyer details from sessionStorage
    const n = sessionStorage.getItem('evgyan_name') || '';
    const p = sessionStorage.getItem('evgyan_phone') || '';
    setName(n);
    setPhone(p);

    // Read payment ID from URL params
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('razorpay_payment_id') || '';
    setPaymentId(pid);
    if (!pid) setShowManual(true);
  }, []);

  const finalId = paymentId || manualId;

  const waText = encodeURIComponent(
    `🟡 NEW CONSULTATION BOOKING\n\nNaam: ${name || '(not entered)'}\nWhatsApp: ${phone || '(not entered)'}\nPayment ID: ${finalId || 'N/A'}\nAmount: ₹999\n\n---\nPlease confirm slot.`
  );

  const handleWhatsApp = () => {
    setWaSent(true);
    window.open(`https://wa.me/918700696438?text=${waText}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-10 pb-16">

      {/* Success icon */}
      <div className="w-full max-w-sm text-center mb-6">
        <div className="text-5xl mb-3">✅</div>
        <h1 className="text-xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="text-sm text-gray-500 mt-1">Consultation book ho gayi hai</p>
      </div>

      {/* Booking Details Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-5 mb-5"
        style={{ border: '2px solid #FFC400', boxShadow: '0 4px 18px rgba(255,196,0,0.15)' }}
      >
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Booking Details</p>

        <div className="space-y-3 text-sm">
          {name && (
            <div className="flex justify-between">
              <span className="text-gray-500">Naam</span>
              <span className="font-semibold text-gray-900">{name}</span>
            </div>
          )}
          {phone && (
            <div className="flex justify-between">
              <span className="text-gray-500">WhatsApp</span>
              <span className="font-semibold text-gray-900">+91 {phone}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-semibold text-gray-900">₹999</span>
          </div>
          {finalId && (
            <div className="flex justify-between items-start gap-2">
              <span className="text-gray-500 shrink-0">Payment ID</span>
              <span className="font-semibold text-gray-900 text-right break-all text-xs">{finalId}</span>
            </div>
          )}
        </div>

        {/* Manual payment ID entry if not from URL */}
        {showManual && !paymentId && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Razorpay Payment ID daalo (optional)
            </label>
            <input
              type="text"
              placeholder="pay_XXXXXXXXXXXXXXXXXX"
              value={manualId}
              onChange={e => setManualId(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-yellow-400"
            />
            <p className="text-xs text-gray-400 mt-1">Razorpay receipt ya email mein milega</p>
          </div>
        )}
      </div>

      {/* WhatsApp Button */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        <button
          onClick={handleWhatsApp}
          className="w-full font-bold py-4 rounded-xl text-base transition-opacity hover:opacity-90 active:opacity-80 text-gray-900"
          style={{ backgroundColor: '#FFC400' }}
        >
          📲 Tarun ko WhatsApp karo →
        </button>

        {waSent ? (
          <div
            className="rounded-xl p-4 text-center"
            style={{ backgroundColor: '#F0FFF4', border: '1.5px solid #86EFAC' }}
          >
            <p className="text-sm font-semibold text-green-700">✅ WhatsApp open ho gaya!</p>
            <p className="text-xs text-green-600 mt-1">
              Message bhejne ke baad Tarun 2–4 ghante mein aapko slot confirm karenge.
            </p>
          </div>
        ) : (
          <p className="text-center text-xs text-gray-400">
            Button dabane pe WhatsApp khulega — message ready hoga, bas bhej dena
          </p>
        )}

        {/* Tarun's number visible */}
        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: '#F9FAFB', border: '1.5px solid #e5e7eb' }}
        >
          <p className="text-xs text-gray-500">Tarun ka WhatsApp number</p>
          <a
            href="tel:+918700696438"
            className="text-base font-bold text-gray-900 hover:underline"
          >
            +91 87006 96438
          </a>
        </div>
      </div>

    </main>
  );
}
