import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Compass,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import { COMPANY, FAQS } from "../data/site";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const TYPES = ["Free Site Survey", "Onsite Demo", "Quote Request", "General Enquiry"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: TYPES[0],
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper testid="contact-page">
      <section className="relative pt-32 lg:pt-44 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
        <div className="absolute inset-0 radial-glow -z-10" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="overline mb-4">Contact</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Talk to a security <span className="text-glow-blue">consultant</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              Free site survey, transparent quote, certified install. We answer 24x7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-8">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="glass-card rounded-3xl p-8 space-y-5" data-testid="contact-info-card">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {COMPANY.name}
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="shrink-0 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Address</div>
                    <div className="text-white text-sm mt-0.5">{COMPANY.address}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={18} className="shrink-0 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Phone</div>
                    <a
                      href={`tel:${COMPANY.phoneDial}`}
                      className="text-white text-sm mt-0.5 hover:text-cyan-300"
                      data-testid="contact-phone-link"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={18} className="shrink-0 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Hours</div>
                    <div className="text-white text-sm mt-0.5">{COMPANY.hours}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={18} className="shrink-0 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Email</div>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-white text-sm mt-0.5 hover:text-cyan-300"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                <a
                  href={`tel:${COMPANY.phoneDial}`}
                  className="btn-primary flex-1 px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
                  data-testid="contact-call-now-btn"
                >
                  <PhoneCall size={15} /> Call Now
                </a>
                <a
                  href={COMPANY.mapsDirections}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost flex-1 px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
                  data-testid="contact-direction-btn"
                >
                  <Compass size={15} /> Get Direction
                </a>
              </div>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  "Hi DCX, I want to book an onsite demo."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center px-5 py-3 rounded-full text-sm font-semibold bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                data-testid="contact-book-demo-btn"
              >
                Book Onsite Demo via WhatsApp
              </a>
            </div>

            {/* Map */}
            <div
              className="rounded-3xl overflow-hidden border border-white/10 bg-[#0a0d15]"
              data-testid="contact-map"
            >
              <iframe
                title="DCX office location"
                src={COMPANY.mapsEmbed}
                width="100%"
                height="280"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 lg:p-10"
            data-testid="contact-form-card"
          >
            <div className="overline mb-3">Quote / Survey</div>
            <h3
              className="text-2xl lg:text-3xl font-bold text-white"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Send us a request
            </h3>
            <p className="mt-2 text-slate-400 text-sm">
              We&apos;ll reply on WhatsApp / call within working hours.
            </p>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  className="mt-7 space-y-4"
                  data-testid="contact-form"
                >
                  <div>
                    <Label className="text-slate-300 text-xs uppercase tracking-wider">Full Name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                      data-testid="contact-input-name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-slate-300 text-xs uppercase tracking-wider">Phone</Label>
                      <Input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                        data-testid="contact-input-phone"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-xs uppercase tracking-wider">Email</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                        data-testid="contact-input-email"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs uppercase tracking-wider">Request Type</Label>
                    <Select
                      value={form.type}
                      onValueChange={(v) => setForm({ ...form, type: v })}
                    >
                      <SelectTrigger
                        className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                        data-testid="contact-select-type"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0D15] border-white/10 text-white">
                        {TYPES.map((t) => (
                          <SelectItem
                            key={t}
                            value={t}
                            className="text-white focus:bg-cyan-400/10 focus:text-cyan-300"
                            data-testid={`contact-type-${t.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs uppercase tracking-wider">Message</Label>
                    <Textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your space, location and concerns..."
                      className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                      data-testid="contact-input-message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full px-6 py-3.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 mt-2"
                    data-testid="contact-submit-btn"
                  >
                    <Send size={15} />
                    Submit Request
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-10 text-center py-10"
                  data-testid="contact-success"
                >
                  <CheckCircle2 size={64} className="text-cyan-300 mx-auto mb-5" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Request received!
                  </h3>
                  <p className="mt-2 text-slate-400 text-sm max-w-sm mx-auto">
                    Our consultant will reach out shortly. For urgent help, just call us
                    directly.
                  </p>
                  <a
                    href={`tel:${COMPANY.phoneDial}`}
                    className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/10 hover:border-cyan-300 hover:text-cyan-300"
                  >
                    <PhoneCall size={14} /> {COMPANY.phone}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24" data-testid="contact-faq-section">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <SectionHeader overline="FAQ" title="Common questions, fast answers" />
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`cf-${i}`}
                className="glass-card rounded-2xl px-6 border-0"
                data-testid={`contact-faq-${i}`}
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
    </PageWrapper>
  );
}
