import React from 'react';

interface MicroLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const MicroLogo: React.FC<MicroLogoProps> = ({ size = 40, className = '', showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        <defs>
          <linearGradient id="logoPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4A154B" />
            <stop offset="60%" stop-color="#6B21A8" />
            <stop offset="100%" stop-color="#9333EA" />
          </linearGradient>
          <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EC4899" />
            <stop offset="100%" stop-color="#DB2777" />
          </linearGradient>
          <radialGradient id="dishGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stop-color="#F3E8FF" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#E9D5FF" stop-opacity="0.3" />
          </radialGradient>
        </defs>

        {/* Outer Petri Plate Dish Rim */}
        <circle cx="50" cy="50" r="44" stroke="url(#logoPrimary)" strokeWidth="5" fill="url(#dishGlow)" />
        <circle cx="50" cy="50" r="39" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Microorganism / Bacterial Rod Cell in center */}
        <rect
          x="32"
          y="42"
          width="36"
          height="16"
          rx="8"
          fill="url(#logoAccent)"
          transform="rotate(-25 50 50)"
          className="opacity-95"
        />

        {/* Cell flagella / polar filaments */}
        <path
          d="M 28 35 C 20 30, 22 20, 16 18"
          stroke="#EC4899"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 32 30 C 26 22, 30 14, 25 8"
          stroke="#EC4899"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Microscope Optical Objective Lens overlay */}
        <path
          d="M 50 18 L 68 36 L 58 46 L 40 28 Z"
          fill="url(#logoPrimary)"
          opacity="0.9"
        />
        <circle cx="68" cy="36" r="4.5" fill="#EC4899" />
        <line x1="45" y1="23" x2="63" y2="41" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* Petri Colonies (Dots) */}
        <circle cx="68" cy="62" r="5" fill="url(#logoAccent)" />
        <circle cx="34" cy="66" r="4" fill="#6B21A8" />
        <circle cx="52" cy="74" r="3.5" fill="url(#logoAccent)" />
        <circle cx="60" cy="48" r="2.5" fill="#FFFFFF" />
        <circle cx="38" cy="38" r="2" fill="#FFFFFF" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
            MICRO <span className="text-pink-600">ANALYSIS</span>
          </span>
          <span className="text-[10px] tracking-wider text-purple-900/70 font-semibold uppercase mt-0.5">
            Analyze. Learn. Discover.
          </span>
        </div>
      )}
    </div>
  );
};
