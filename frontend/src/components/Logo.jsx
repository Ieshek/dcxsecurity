import React from "react";

export const Logo = ({ className = "" }) => {
  return (
    <div className={`flex flex-col justify-center ${className}`} data-testid="dcx-logo">
      <div className="flex flex-wrap items-end gap-2">
        <span
          className="text-white font-extrabold tracking-[0.14em]"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.9rem" }}
        >
          DCX
        </span>
        <span
          className="text-slate-200 font-semibold uppercase tracking-[0.18em]"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.05rem" }}
        >
          Security Wizards
        </span>
      </div>
      <span
        className="mt-1 text-cyan-300 uppercase tracking-[0.35em] font-semibold"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
      >
        Advanced Security Systems
      </span>
    </div>
  );
};

export default Logo;
