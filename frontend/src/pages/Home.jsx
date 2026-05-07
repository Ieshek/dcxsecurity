import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Radar,
  Flame,
  Camera,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import AnimatedCounter from "../components/AnimatedCounter";
import ProductCard from "../components/ProductCard";
import EnquiryDialog from "../components/EnquiryDialog";
import { PRODUCTS, SERVICES, STATS, CLIENTS, FAQS, COMPANY } from "../data/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const HeroBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0 radial-glow" />
      <div className="noise-overlay" />
      {/* Floating tech orbs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blue-700/15 blur-3xl"
      />
      {/* Scan line */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent scan-line" />
    </motion.div>
  );
};

const PillarIcon = ({ Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-300/40 transition-colors"
  >
    <Icon size={22} className="text-cyan-300" />
    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{label}</span>
  </motion.div>
);

export default function Home() {
  const [enq, setEnq] = useState({ open: false, product: null });
  const featured = PRODUCTS.slice(0, 6);

  return (
    <PageWrapper testid="home-page">
      {/* HERO */}
      <section className="relative pt-32 lg:pt-44 pb-20 lg:pb-32 overflow-hidden">
        <HeroBackground />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overline inline-flex items-center gap-2 mb-6"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
            DCX Security Wizards · Agra
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight max-w-5xl"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Advanced Security Solutions for{" "}
            <span className="text-glow-blue">Homes, Offices &amp; Businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base lg:text-lg text-slate-400 leading-relaxed"
            data-testid="hero-subheadline"
          >
            Protect what matters most with intelligent alarm systems, fire sensors,
             and perimeter security — engineered, installed and supported
            by experts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
              data-testid="hero-survey-btn"
            >
              Get Free Site Survey
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
              data-testid="hero-demo-btn"
            >
              Book Onsite Demo
            </Link>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            <PillarIcon Icon={Shield} label="Smart Alarms" delay={0.3} />
            <PillarIcon Icon={Radar} label="Perimeter" delay={0.4} />
            <PillarIcon Icon={Flame} label="Fire Safety" delay={0.5} />
            <PillarIcon Icon={Camera} label="Surveillance" delay={0.6} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-white/5 bg-[#070A12]" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 lg:py-32" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="overline mb-4">About {COMPANY.short}</div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Engineered protection for every corner of your space.
            </h2>
            <p className="mt-6 text-slate-400 leading-relaxed">
              {COMPANY.name} provides advanced security products and professional security
              consultancy for homes, offices, shops, villas and industrial spaces. From
              consultation to 24x7 support — we own every step.
            </p>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Security consultation",
                "Onsite live product demos",
                "Complete site surveys",
                "Custom security planning",
                "Installation support",
                "24x7 security support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-300 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-semibold text-sm"
                data-testid="about-readmore-btn"
              >
                Read more about us <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="glass-card rounded-2xl p-6 col-span-2">
              <div className="overline">Mission</div>
              <p className="mt-3 text-white leading-relaxed">
                To make every home and business secure with intelligent, reliable
                and affordable security systems.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 col-span-2">
              <div className="overline">Vision</div>
              <p className="mt-3 text-white leading-relaxed">
                To become India&apos;s most trusted security technology provider through
                innovation, quality and customer satisfaction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 lg:py-32 bg-[#070A12] border-y border-white/5" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="Our Products"
            title="Engineered for every threat surface"
            subtitle="From single-room homes to multi-floor commercial spaces — pick the components that fit your perimeter."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEnquire={(prod) => setEnq({ open: true, product: prod })}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="btn-ghost inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
              data-testid="view-all-products-btn"
            >
              View All Products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 lg:py-32" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="Our Services"
            title="End-to-end security, owned by one team"
            subtitle="Consultation, installation, maintenance, emergency response — all under one roof."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-7 group cursor-default"
                data-testid={`service-card-${s.id}`}
              >
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-blue-900 to-blue-700 border border-cyan-300/30 text-cyan-300 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] transition-shadow">
                  <Shield size={20} />
                </div>
                <h3
                  className="mt-5 text-xl font-bold text-white"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-[#070A12] border-y border-white/5" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="Trusted Voices"
            title="Real people. Real protection."
            subtitle="Hear from clients across Agra who chose DCX for peace of mind."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLIENTS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass-card rounded-2xl p-7"
                data-testid={`testimonial-${i}`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-300/30"
                  />
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.location}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-cyan-300">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-semibold">{c.rating}</span>
                  </div>
                </div>
                <p className="mt-5 text-slate-300 italic leading-relaxed">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-300">
                  Service: {c.service}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32" data-testid="faq-section">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <SectionHeader
            overline="FAQ"
            title="Everything you might want to know"
          />
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card rounded-2xl px-6 border-0"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-white text-left font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" data-testid="home-cta-section">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="glass-card rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute inset-0 radial-glow opacity-50" />
            <div className="relative">
              <div className="overline mb-4">Ready to secure your space?</div>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Free site survey, transparent quote, certified installation.
              </h3>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
                  data-testid="cta-survey-btn"
                >
                  Get Free Site Survey
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`tel:${COMPANY.phoneDial}`}
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
                  data-testid="cta-call-btn"
                >
                  Call {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryDialog
        open={enq.open}
        onOpenChange={(o) => setEnq({ ...enq, open: o })}
        product={enq.product}
      />
    </PageWrapper>
  );
}
