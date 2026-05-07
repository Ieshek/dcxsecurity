import React from "react";
import { motion } from "framer-motion";
import {
  MonitorPlay,
  ShieldCheck,
  Map as MapIcon,
  Wrench,
  Settings,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import { SERVICES } from "../data/site";

const ICON_MAP = { MonitorPlay, ShieldCheck, Map: MapIcon, Wrench, Settings, PhoneCall };

export default function Services() {
  return (
    <PageWrapper testid="services-page">
      <section className="relative pt-32 lg:pt-44 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
        <div className="absolute inset-0 radial-glow -z-10" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="overline mb-4">Services</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              We don&apos;t just sell products — we deliver{" "}
              <span className="text-glow-blue">outcomes</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              Every project is owned by one DCX team — from the first survey to lifetime
              support. Pick the service you need or combine them all.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || ShieldCheck;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-8 group"
                data-testid={`service-${s.id}`}
              >
                <div className="w-14 h-14 rounded-2xl grid place-items-center bg-gradient-to-br from-blue-900 to-blue-700 border border-cyan-300/30 text-cyan-300 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] transition-shadow">
                  <Icon size={26} />
                </div>
                <h3
                  className="mt-6 text-2xl font-bold text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-400 leading-relaxed">{s.description}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-semibold text-sm"
                  data-testid={`service-cta-${s.id}`}
                >
                  Request {s.title}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#070A12] border-y border-white/5" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="How We Work"
            title="A clean four-step engagement"
          />
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Discover", desc: "Free consult call to understand your space and concerns." },
              { step: "02", title: "Survey", desc: "Onsite walkthrough mapping vulnerabilities and routes." },
              { step: "03", title: "Install", desc: "Clean, certified installation with full handover and demo." },
              { step: "04", title: "Support", desc: "Lifetime AMC, firmware updates and 24x7 emergency line." },
            ].map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 relative"
                data-testid={`process-step-${p.step}`}
              >
                <div
                  className="text-5xl font-extrabold text-cyan-300/70"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {p.step}
                </div>
                <h4
                  className="mt-3 text-lg font-bold text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {p.title}
                </h4>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
