'use client';
import { useEffect } from 'react';

export default function FormEmbed() {
  useEffect(() => {
    // Remove any existing CK script to avoid duplicates
    const existing = document.querySelector('script[data-uid="cd38925e99"]');
    if (existing) existing.remove();

    const container = document.getElementById('ck-form-container');
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://ev-gyan.kit.com/cd38925e99/index.js';
    script.async = true;
    script.setAttribute('data-uid', 'cd38925e99');
    container.appendChild(script);
  }, []);

  return (
    <div id="ck-form-container" style={{ width: '100%', marginBottom: '8px' }} />
  );
}
