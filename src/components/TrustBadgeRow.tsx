'use client';

import type { ReactNode } from 'react';

interface TrustBadge {
  label: string;
  icon: ReactNode;
}

interface TrustBadgeRowProps {
  badges?: TrustBadge[];
  className?: string;
}

const defaultBadges: TrustBadge[] = [
  {
    label: 'Your data stays private',
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
      </>
    ),
  },
  {
    label: 'Results in 90 seconds',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" />
      </>
    ),
  },
  {
    label: 'No credit card required',
    icon: (
      <>
        <path d="M3 7.5h18v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
        <path d="M3 10.5h18" />
      </>
    ),
  },
];

function TrustIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center text-brand-primary-light">
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

export default function TrustBadgeRow({ badges = defaultBadges, className = '' }: TrustBadgeRowProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 text-xs text-brand-muted-light md:text-sm ${className}`.trim()}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="inline-flex items-center gap-2 rounded-full border border-brand-border/70 bg-brand-card/70 px-3 py-2 shadow-[0_0_18px_rgba(168,58,196,0.08)] backdrop-blur-sm"
        >
          <TrustIcon>{badge.icon}</TrustIcon>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
