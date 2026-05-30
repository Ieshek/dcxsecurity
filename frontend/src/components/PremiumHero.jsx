import React from "react";

export default function PremiumHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#060815] to-[#000000] -z-20" />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]" />
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#00121a" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#001b26" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-28 lg:py-36">
        {/* Animated radar & particles */}
        <div className="absolute inset-0 flex items-center justify-center -z-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-[30px] mix-blend-screen" style={{ boxShadow: '0 0 120px 40px rgba(0,217,255,0.08)' }} />

            {/* Radar pulses */}
            <div className="relative w-[360px] h-[360px] mx-auto lg:w-[520px] lg:h-[520px]">
              <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-ping-slow" />
              <div className="absolute inset-10 rounded-full border border-cyan-500/8 opacity-40 animate-pulse-slower" />
              <div className="absolute inset-20 rounded-full border border-cyan-500/6 opacity-30 animate-ping-slower" />
            </div>

            {/* Light streaks */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/4 top-1/3 w-[2px] h-40 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent transform -rotate-12 animate-slow-float opacity-30" />
              <div className="absolute right-1/4 bottom-1/3 w-[2px] h-52 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent transform rotate-12 animate-slow-float opacity-30" />
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center">
          <div className="mx-auto w-[220px] h-[120px] lg:w-[320px] lg:h-[180px] flex items-center justify-center mb-6 transform-gpu motion-safe:animate-float">
            <img src="/dcx-logo-transparent.jpeg" alt="DCX Security Wizards" className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,217,255,0.06)]" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight" style={{ textShadow: '0 8px 40px rgba(0,217,255,0.08)' }}>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a8ffff] to-[#00b3ff] drop-shadow-[0_8px_40px_rgba(0,217,255,0.12)]">SECURITY WIZARDS</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            AI-Powered Threat Intelligence &amp; Enterprise Security Platform
          </p>

          {/* HUD overlays */}
          <div className="mt-10 flex justify-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-cyan-300/10 text-xs text-cyan-200 backdrop-blur-sm">
              Real-time Threat Detection
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-cyan-300/10 text-xs text-cyan-200 backdrop-blur-sm">
              24x7 SOC Monitoring
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-cyan-300/10 text-xs text-cyan-200 backdrop-blur-sm">
              Seamless Integration
            </div>
          </div>
        </div>

        {/* Corner brackets */}
        <div className="pointer-events-none">
          <div className="absolute left-6 top-6 border-t border-l border-cyan-400/20 w-8 h-8" />
          <div className="absolute right-6 top-6 border-t border-r border-cyan-400/20 w-8 h-8" style={{ transform: 'rotateY(180deg)' }} />
          <div className="absolute left-6 bottom-6 border-b border-l border-cyan-400/20 w-8 h-8" style={{ transform: 'rotateX(180deg)' }} />
          <div className="absolute right-6 bottom-6 border-b border-r border-cyan-400/20 w-8 h-8" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>

      {/* Decorative CSS */}
      <style>{`
        .animate-ping-slow { animation: ping 2.8s cubic-bezier(.4,0,.2,1) infinite; }
        .animate-ping-slower { animation: ping 4.2s cubic-bezier(.4,0,.2,1) infinite; }
        .animate-pulse-slower { animation: pulse 3.6s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slow-float { animation: float 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
