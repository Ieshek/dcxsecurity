import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import { CLIENTS, COMPANY } from "../data/site";

export default function Clients() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % CLIENTS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const c = CLIENTS[idx];

  return (
    <PageWrapper testid="clients-page">
      <section className="relative pt-32 lg:pt-44 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
        <div className="absolute inset-0 radial-glow -z-10" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="overline mb-4">Clients</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Trusted by <span className="text-glow-blue">1500+</span> homes &amp; businesses across Agra.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              From villas in Sikandra to shops in Sanjay Place — our customers stay with
              us because the systems work and the support shows up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured slider */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 radial-glow opacity-40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center"
                data-testid="client-slide"
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover ring-2 ring-cyan-300/40 mx-auto"
                />
                <div>
                  <div className="flex items-center gap-1 text-cyan-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.round(c.rating) ? "currentColor" : "transparent"} />
                    ))}
                    <span className="ml-2 text-sm font-semibold">{c.rating}</span>
                  </div>
                  <p
                    className="mt-4 text-white text-xl lg:text-2xl leading-relaxed italic"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    &ldquo;{c.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <div>
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {c.location}
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-300/30 text-xs text-cyan-300">
                      {c.service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex items-center justify-between relative">
              <div className="flex gap-2">
                {CLIENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    data-testid={`client-dot-${i}`}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx ? "w-10 bg-cyan-300" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIdx((i) => (i - 1 + CLIENTS.length) % CLIENTS.length)}
                  data-testid="client-prev"
                  aria-label="Previous"
                  className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white hover:border-cyan-300 hover:text-cyan-300"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % CLIENTS.length)}
                  data-testid="client-next"
                  aria-label="Next"
                  className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white hover:border-cyan-300 hover:text-cyan-300"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of clients */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader overline="Recent Installs" title="Some of our happy clients" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLIENTS.map((cl, i) => (
              <motion.div
                key={cl.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
                data-testid={`client-card-${i}`}
              >
                <img
                  src={cl.avatar}
                  alt={cl.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-cyan-300/30"
                />
                <h4 className="mt-4 text-white font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {cl.name}
                </h4>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin size={11} /> {cl.location}
                </div>
                <div className="flex items-center gap-1 text-cyan-300 mt-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      size={13}
                      fill={k < Math.round(cl.rating) ? "currentColor" : "transparent"}
                    />
                  ))}
                  <span className="ml-1 text-xs font-semibold">{cl.rating}</span>
                </div>
                <div className="mt-4 text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 inline-block">
                  {cl.service}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24" data-testid="clients-map-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="Our Footprint"
            title="Client locations across Agra"
            subtitle="A live snapshot of where our protection is deployed."
          />
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_60px_rgba(0,229,255,0.08)] bg-[#0a0d15]">
            <iframe
              title="DCX clients map"
              src={COMPANY.mapsEmbed}
              width="100%"
              height="450"
              style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
