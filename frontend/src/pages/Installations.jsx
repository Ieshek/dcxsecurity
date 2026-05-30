import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import { INSTALLATIONS } from "../data/site";

export default function Installations() {
  const [selected, setSelected] = useState(null);

  return (
    <PageWrapper testid="installations-page">
      <section className="relative pt-32 lg:pt-44 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
        <div className="absolute inset-0 radial-glow -z-10" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="overline mb-4">Installations</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Real installs. Real <span className="text-glow-blue">protection</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              A snapshot of homes, shops and offices DCX has secured across India. Click
              any image to view in full.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader overline="Gallery" title="From living rooms to industrial sheds" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4">
            {INSTALLATIONS.map((g, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(g)}
                data-testid={`install-thumb-${i}`}
                className={`relative overflow-hidden rounded-2xl border border-white/10 group ${
                  i % 5 === 0 ? "row-span-2" : ""
                } ${i % 7 === 0 ? "col-span-2" : ""}`}
              >
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070C] via-[#05070C]/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <div className="text-sm font-bold text-white">{g.title}</div>
                  <div className="text-xs text-cyan-300 flex items-center gap-1 mt-1">
                    <MapPin size={11} /> {g.location}
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] bg-[#05070C]/90 backdrop-blur-md grid place-items-center p-5"
            data-testid="install-lightbox"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 grid place-items-center text-white hover:bg-cyan-400/20 hover:border-cyan-300"
                data-testid="install-lightbox-close"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full rounded-2xl border border-white/10"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {selected.title}
                </h3>
                <div className="text-sm text-cyan-300 flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {selected.location}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
