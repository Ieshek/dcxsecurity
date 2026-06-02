import React from "react";

export const Logo = ({ className = "" }) => {
  return (
    <div className={`flex flex-col justify-center ${className}`} data-testid="dcx-logo">
      <div className="flex items-center gap-3">
   <div className="relative flex items-center shrink-0">
  <img
    src="/dcx-logo.png"
    alt="DCX Logo"
    className="h-10 md:h-12 lg:h-14 w-auto object-contain"
  />
</div>
        <span
          className="text-slate-200 font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.05rem" }}
        >
          Security Wizards
        </span>
      </div>
      <span
        className="mt-1 text-cyan-300 uppercase font-semibold ml-0.5 whitespace-nowrap"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.70rem", letterSpacing: "6px" }}
      >
        Advanced Security Systems
      </span>
    </div>
  );
};

export default Logo;
