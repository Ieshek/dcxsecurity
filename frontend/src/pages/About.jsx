import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Eye, Award, Users, Wrench, CheckCircle2 } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import AnimatedCounter from "../components/AnimatedCounter";
import { COMPANY, STATS } from "../data/site";

const VALUES = [
  { icon: Shield, title: "Trust First", desc: "Every install is treated like our own home — no shortcuts, no compromises." },
  { icon: Award, title: "Quality Hardware", desc: "We only deploy field-tested components from leading global brands." },
  { icon: Users, title: "Expert Consultants", desc: "Trained engineers map your risks before any product is recommended." },
  { icon: Wrench, title: "Long-Term Support", desc: "AMC plans, firmware updates and rapid emergency response — for life." },
];

export default function About() {
  return (
    <PageWrapper testid="about-page">
      {/* Hero */}
      <section className="relative pt-32 lg:pt-44 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 -z-10" />
        <div className="absolute inset-0 radial-glow -z-10" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="overline mb-4">About Us</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Building India&apos;s most <span className="text-glow-blue">trusted</span> security network.
            </h1>
            <p className="mt-6 max-w-3xl text-slate-400 text-lg leading-relaxed">
              {COMPANY.name} provides advanced security products and professional security
              consultancy for homes, offices, shops, villas and industrial spaces — all
              backed by 24x7 support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10"
            data-testid="mission-card"
          >
            <Target className="text-cyan-300" size={28} />
            <div className="overline mt-5">Our Mission</div>
            <p className="mt-4 text-2xl text-white leading-snug" style={{ fontFamily: "Outfit, sans-serif" }}>
              To make every home and business secure with intelligent, reliable
              and affordable security systems.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-10"
            data-testid="vision-card"
          >
            <Eye className="text-cyan-300" size={28} />
            <div className="overline mt-5">Our Vision</div>
            <p className="mt-4 text-2xl text-white leading-snug" style={{ fontFamily: "Outfit, sans-serif" }}>
              To become India&apos;s most trusted security technology provider through
              innovation, quality and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5 bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl lg:text-6xl font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="What We Stand For"
            title="Four principles that drive every project"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass-card rounded-2xl p-7"
                data-testid={`value-card-${i}`}
              >
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-blue-900 to-blue-700 border border-cyan-300/30 text-cyan-300">
                  <v.icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we provide */}
      <section className="py-16 lg:py-24 bg-[#070A12] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="Capabilities"
            title="A complete security stack — from idea to incident response"
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Security consultation",
              "Onsite live product demos",
              "Complete site surveys",
              "Custom security planning",
              "Installation support",
              "24x7 security support",
              "Annual maintenance contracts",
              "Emergency rapid response",
            ].map((c) => (
              <li
                key={c}
                className="glass-card rounded-xl px-5 py-4 flex items-center gap-3"
                data-testid={`capability-${c.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CheckCircle2 size={18} className="text-cyan-300 shrink-0" />
                <span className="text-white">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageWrapper>
  );
}
