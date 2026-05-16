'use client';

import { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '17%',
        right: 0,
        zIndex: 100,
        width: 40,
        height: 48,
        borderRadius: '8px 0 0 8px',
        background: 'rgba(124, 58, 237, 0.30)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRight: 'none',
        boxShadow: '0 0 16px rgba(124,58,237,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, background 0.2s ease',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Arrow up SVG */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
