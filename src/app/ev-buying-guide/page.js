'use client';

import { useState } from 'react';
import Image from 'next/image';

function BoltIcon({ size = 22 }) {
  return (
    <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 20 26" fill="none" aria-hidden="true">
      <path d="M12 1L1 15H8.5L6.5 25L19 11H11.5L12 1Z" fill="#16a34a" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#16a34a] flex items-center justify-center mt-[2px]">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
        <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function EVBuyingDecisionGuide() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch('/api/ev-guide-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrMsg('Network error. Please try again.');
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-5 py-12 font-in antialiased">
      <div className="w-full max-w-[520px]">
        <div className="flex items-center gap-3 mb-11">
          <Image src="/logo.png" alt="EVGyan Logo" width={36} height={36} className="object-contain" priority />
          <span className="text-[19px] font-bold text-[#111] tracking-tight font-in">EVGyan</span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
          <BoltIcon size={9} />
          Free EV Buying Decision Guide
        </div>
        <h1 className="text-[28px] xs:text-[32px] font-extrabold leading-[1.15] tracking-tight text-[#111] mb-8 font-in">
          DON&apos;T BUY AN EV<br />BEFORE READING THIS
        </h1>
        <ul className="flex flex-col gap-4 mb-9">
          {['Real Range vs Claimed Range', 'Clear answer: should you buy EV or not — based on your situation'].map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-[15px] font-medium text-[#222] leading-snug font-in">{point}</span>
            </li>
          ))}
        </ul>
        <div className="bg-[#f8faf9] border border-[#e4ede4] rounded-xl p-6 xs:p-7 mb-4">
          {status === 'success' ? (
            <div className="text-center py-5">
              <p className="text-[#16a34a] font-semibold text-[16px] mb-1 font-in">Guide is on its way — check your inbox!</p>
              <p className="text-[#777] text-[13px] font-in">Didn&apos;t get it? Check your spam folder.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label className="block text-[13px] font-semibold text-[#444] mb-3 font-in">Enter your email to get the guide</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full border border-[#d1d5db] rounded-lg px-3.5 py-3 text-[15px] text-[#111] bg-white outline-none focus:border-[#16a34a] focus:ring-0 transition-colors mb-3 placeholder:text-[#bbb] font-in" />
              {errMsg && <p className="text-red-500 text-[13px] mb-3 font-in">{errMsg}</p>}
              <button type="submit" disabled={status === 'loading'} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-[15px] py-3.5 px-5 rounded-lg transition-colors disabled:opacity-70 cursor-pointer font-in">
                {status === 'loading' ? 'Sending...' : 'Send Me the Free EV Buying Decision Guide'}
              </button>
            </form>
          )}
          <p className="text-[11.5px] text-[#aaa] text-center mt-3 font-in">No spam. Unsubscribe anytime.</p>
        </div>
        <div className="flex items-center justify-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-5 py-3.5">
          <BoltIcon size={13} />
          <span className="text-[13px] font-medium text-[#166534] font-in">Trusted by 320K+ EV viewers on YouTube</span>
        </div>
        <footer className="mt-10 text-center text-[12px] text-[#bbb] font-in">
          <p>2026 EVGyan</p>
        </footer>
      </div>
    </main>
  );
}
