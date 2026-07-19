'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/services', label: 'SERVICES' },
  { href: '/case-studies', label: 'CASE STUDIES' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
];

const SunIcon = ({ className = '' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className = '' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function Navigation() {
  const [active, setActive] = useState('/');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-lg py-md">
      <div className="glass-panel">
        <div className="flex items-center justify-between px-md py-sm">
          {/* Logo */}
          <Link href="/" className="font-display text-label signal-text tracking-wider">
            MANTEIS.SYSTEMS
          </Link>

          {/* Nav Links */}
          <div className="flex gap-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label transition-colors duration-200 ${
                  active === item.href
                    ? 'signal-text'
                    : 'text-muted hover:text-secondary'
                }`}
                onClick={() => setActive(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme toggle + CTA */}
          <div className="flex items-center gap-md">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-none border border-current text-white/60 hover:text-signal-blue hover:border-signal-blue transition-colors duration-200"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="btn-primary">BEGIN CONSULTATION</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
