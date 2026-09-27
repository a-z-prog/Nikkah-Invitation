import React from 'react';

// Modern 8-Pointed Islamic Star (Rub el Hizb ۞)
export const IslamicStarMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#C5A059]' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* First square */}
    <rect x="9" y="9" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
    {/* Second square rotated 45 deg */}
    <rect x="9" y="9" width="30" height="30" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" transform="rotate(45 24 24)" />
    {/* Center circle */}
    <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="24" cy="24" r="2" fill="currentColor" />
  </svg>
);

// Minimalist Islamic Mihrab Arch Silhouette
export const MihrabArchSilhouette: React.FC<{ className?: string }> = ({ className = 'w-24 h-32 text-[#C5A059]' }) => (
  <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 135 V60 C10 32 30 15 50 5 C70 15 90 32 90 60 V135"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 135 V62 C20 40 34 26 50 17 C66 26 80 40 80 62 V135"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="3 3"
    />
    <circle cx="50" cy="38" r="3" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

// Backward compatibility alias & Islamic geometric rosette
export const AlponaMotif: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-[#C5A059]' }) => (
  <IslamicStarMotif className={className} />
);

export const KalkaOrnament: React.FC<{ className?: string; flip?: boolean }> = ({
  className = 'w-12 h-16 text-[#C5A059]',
  flip = false
}) => (
  <svg
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
  >
    {/* Minimalist modern palmette / leaf motif */}
    <path
      d="M30 75 C30 55 45 42 45 28 C45 15 35 5 30 5 C25 5 15 15 15 28 C15 42 30 55 30 75 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M30 15 V65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
    <circle cx="30" cy="24" r="2.5" fill="currentColor" />
  </svg>
);

// Modern Minimalist Divider with Islamic Star
export const FloralDivider: React.FC<{ className?: string; text?: string }> = ({
  className = '',
  text
}) => (
  <div className={`flex items-center justify-center space-x-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
    <IslamicStarMotif className="w-4 h-4 text-[#C5A059]" />
    {text ? (
      <span className="font-serif-bengali text-xs sm:text-sm font-semibold tracking-wider text-[#13382C] px-2">
        {text}
      </span>
    ) : (
      <span className="text-[#C5A059] text-xs">۞</span>
    )}
    <IslamicStarMotif className="w-4 h-4 text-[#C5A059]" />
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
  </div>
);

// Modern Minimalist Islamic Arch Frame
export const RoyalArchFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`relative p-4 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] border border-[#C5A059]/30 bg-white/95 shadow-xl shadow-[#13382C]/5 backdrop-blur-md ${className}`}>
    {/* Minimalist corner accents */}
    <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-t border-l border-[#C5A059]/60 rounded-tl-sm pointer-events-none" />
    <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-t border-r border-[#C5A059]/60 rounded-tr-sm pointer-events-none" />
    <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-b border-l border-[#C5A059]/60 rounded-bl-sm pointer-events-none" />
    <div className="absolute bottom-2.5 sm:bottom-4 right-2.5 sm:right-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-b border-r border-[#C5A059]/60 rounded-br-sm pointer-events-none" />

    {/* Center top subtle star */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full border border-[#C5A059]/40 shadow-xs">
      <IslamicStarMotif className="w-3.5 h-3.5 text-[#C5A059]" />
    </div>

    {children}
  </div>
);
