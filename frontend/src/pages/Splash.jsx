import React, { useMemo } from "react";
import { motion } from "framer-motion";

const DCX_LOGO_URL =
  "https://customer-assets.emergentagent.com/job_dcx-security-preview/artifacts/0x1lf6je_WhatsApp%20Image%202026-05-06%20at%2022.27.48%20%281%29.jpeg";

// Pre-computed particle positions (stable across renders)
const PARTICLES = Array.from({ length: 36 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 6,
  opacity: 0.3 + Math.random() * 0.5,
}));

const NETWORK_LINES = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  x1: Math.random() * 100,
  y1: Math.random() * 100,
  x2: Math.random() * 100,
  y2: Math.random() * 100,
  delay: Math.random() * 2,
}));

const Splash = () => {
  const radarRings = useMemo(() => [0, 0.6, 1.2], []);

  return (
    <div
      data-testid="splash-screen"
      className="fixed inset-0 z-[100] overflow-hidden bg-[#050505] select-none splash-root"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #0A1422 0%, #050505 70%, #000000 100%)",
      }}
    >
      {/* Cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,194,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Network lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="netLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00C2FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {NETWORK_LINES.map((l) => (
          <motion.line
            key={l.id}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="url(#netLine)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0.2] }}
            transition={{
              duration: 3,
              delay: l.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: "#00C2FF",
              boxShadow: "0 0 8px #00C2FF",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, p.opacity, 0],
              y: [-20, -80],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,194,255,0.8) 50%, transparent 100%)",
          boxShadow: "0 0 24px #00C2FF",
        }}
        initial={{ top: "-2%" }}
        animate={{ top: "102%" }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Central glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,194,255,0.25) 0%, rgba(0,194,255,0.08) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* HUD corner accents */}
      {[
        { top: 24, left: 24, rotate: 0 },
        { top: 24, right: 24, rotate: 90 },
        { bottom: 24, right: 24, rotate: 180 },
        { bottom: 24, left: 24, rotate: 270 },
      ].map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          className="absolute w-14 h-14 pointer-events-none"
          style={{
            ...c,
            transform: `rotate(${c.rotate}deg)`,
          }}
        >
          <div className="absolute top-0 left-0 w-6 h-[2px] bg-cyan-400 shadow-[0_0_10px_#00C2FF]" />
          <div className="absolute top-0 left-0 w-[2px] h-6 bg-cyan-400 shadow-[0_0_10px_#00C2FF]" />
        </motion.div>
      ))}

      {/* HUD top status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-md"
        data-testid="splash-status-pill"
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00C2FF]"
        />
        <span
          className="text-[10px] tracking-[0.32em] font-bold text-cyan-300 uppercase"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          SECURE CHANNEL · INITIALIZING
        </span>
      </motion.div>

      {/* CENTER STACK */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* Radar rings around logo */}
          <div className="relative">
            {radarRings.map((delay, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 pointer-events-none"
                style={{ width: 240, height: 240 }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.8], opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 2.4,
                  delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Glow halo */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: 320,
                height: 320,
                background:
                  "radial-gradient(circle, rgba(0,194,255,0.45) 0%, rgba(0,194,255,0.1) 40%, transparent 70%)",
                filter: "blur(8px)",
              }}
              animate={{ opacity: [0.55, 0.95, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo */}
            <motion.div
              data-testid="splash-logo"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                y: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 grid place-items-center"
            >
              <img
                src={DCX_LOGO_URL}
                alt="DCX Security Wizards"
                className="w-full h-full object-contain"
                style={{
                  filter:
                    "invert(1) brightness(1.05) drop-shadow(0 0 24px rgba(0,194,255,0.85)) drop-shadow(0 0 48px rgba(0,194,255,0.55))",
                }}
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Company name */}
          <h1
            data-testid="splash-name"
            className="mt-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white"
            style={{
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.18em",
              textShadow:
                "0 0 12px rgba(0,194,255,0.55), 0 0 32px rgba(0,194,255,0.35), 0 0 60px rgba(0,194,255,0.25)",
            }}
          >
            SECURITY WIZARDS
          </h1>

          {/* Underline */}
          <div
            className="mt-4 h-px w-32 sm:w-44 origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00C2FF, transparent)",
              boxShadow: "0 0 12px #00C2FF",
            }}
          />

          {/* Tagline */}
          <p
            data-testid="splash-tagline"
            className="mt-5 text-sm sm:text-base lg:text-lg text-cyan-100/80 font-medium tracking-[0.22em] uppercase"
            style={{
              fontFamily: "Manrope, sans-serif",
              textShadow: "0 0 10px rgba(0,194,255,0.4)",
            }}
          >
            Here Security Never Sleeps
          </p>

          {/* Loading bar */}
          <div
            className="mt-10 w-64 sm:w-80"
            data-testid="splash-loader"
          >
            <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden border border-cyan-400/15">
              <div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,194,255,0.3), #00C2FF, #66E5FF)",
                  boxShadow: "0 0 14px #00C2FF",
                  width: "0%",
                  animation: "splash-loadbar 3.6s ease-in-out forwards",
                }}
              />
            </div>
            <div
              className="mt-3 flex items-center justify-between text-[10px] tracking-[0.3em] font-bold text-cyan-300/70 uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              <span>Authenticating</span>
              <span style={{ animation: "splash-blink 1.2s ease-in-out infinite" }}>
                Establishing secure link…
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] font-bold text-cyan-400/40 uppercase pointer-events-none"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        DCX · Threat Intelligence Platform · v1.0
      </motion.div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
};

export default Splash;
