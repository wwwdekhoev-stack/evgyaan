'use client';

import { useState } from 'react';

export default function PayPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!name.trim()) { setError('Apna naam likhein'); return; }
    if (!phone.trim() || phone.trim().length < 10) { setError('Sahi WhatsApp number likhein'); return; }
    setError('');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('evgyan_name', name.trim());
      sessionStorage.setItem('evgyan_phone', phone.trim());
    }
    window.location.href = 'https://razorpay.me/@evgyan3341';
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-10 pb-16">

      {/* Header */}
      <div className="w-full max-w-sm text-center mb-8">
        <div className="text-3xl mb-2">📞</div>
        <h1 className="text-xl font-bold text-gray-900">Book EV Consultation</h1>
        <p className="text-sm text-gray-500 mt-1">Tarun se seedha baat karein — ₹999</p>
      </div>

      {/* What you get */}
      <div
        className="w-full max-w-sm rounded-2xl p-4 mb-6"
        style={{ backgroundColor: '#FFFBEA', border: '1.5px solid #FFC400' }}
      >
        <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Is call mein milega:</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Aapke use ke hisaab se EV recommendation</li>
          <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Charging advice</li>
          <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Ownership cost discussion</li>
          <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> 7-din WhatsApp support</li>
          <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> 15–20 minute personal call</li>
        </ul>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Aapka Naam</label>
          <input
            type="text"
            placeholder="Jaise: Rahul Sharma"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
          <input
            type="tel"
            placeholder="Jaise: 9876543210"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-yellow-400 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">Isi number pe Tarun contact karenge</p>
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}

        <button
          onClick={handlePay}
          className="w-full text-gray-900 font-bold py-4 rounded-xl text-base mt-1 transition-opacity hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: '#FFC400' }}
        >
          Pay ₹999 &amp; Book Now →
        </button>

        {/* Refund note */}
        <p className="text-center text-xs text-gray-400">
          🔒 100% refund — agar koi slot available na ho 24 ghante mein
        </p>
      </div>

    </main>
  );
}
