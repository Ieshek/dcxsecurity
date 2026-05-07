import React from "react";

// Custom DCX Security Logo - shield with stylized "DCX" wordmark
export const Logo = ({ size = 36, withText = true, className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      data-testid="dcx-logo"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DCX shield"
      >
        <defs>
          <linearGradient id="dcx-shield-grad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="dcx-stroke-grad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
        <path
          d="M24 3 L42 9 V24 C42 34 33 42 24 45 C15 42 6 34 6 24 V9 Z"
          fill="url(#dcx-shield-grad)"
          stroke="url(#dcx-stroke-grad)"
          strokeWidth="1.5"
        />
        <path
          d="M16 19 H22 C25 19 27 21 27 24 C27 27 25 29 22 29 H16 Z"
          fill="#fff"
        />
        <path
          d="M30 19 L36 29 M36 19 L30 29"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-extrabold text-white tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: 18 }}
          >
            DCX
          </span>
          <span
            className="text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Security Wizards
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
