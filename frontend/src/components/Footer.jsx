import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Clock, Mail } from "lucide-react";
import { COMPANY, NAV_LINKS, PRODUCTS, SERVICES } from "../data/site";

const SocialIcon = ({ Icon, href, label, testid }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    data-testid={testid}
    className="w-9 h-9 rounded-full border border-white/10 grid place-items-center text-slate-300 hover:border-cyan-300/50 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all"
  >
    <Icon size={16} />
  </a>
);

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative mt-32 border-t border-white/5 bg-[#05070C]"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs">
            {COMPANY.name}. Premium security products and consultancy for homes,
            offices, shops, villas and industrial spaces across Agra and beyond.
          </p>
          <div className="mt-6 flex gap-2.5">
            <SocialIcon Icon={Facebook} href="https://www.facebook.com/DCSWIZARDS?rdid=8WKpjArpI8JS0VPe&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F18CqbKX6kx%252F%253Fref%253D1#" label="Facebook" testid="social-facebook" />
            <SocialIcon Icon={Instagram} href="https://www.instagram.com/dcxsecuritywizards" label="Instagram" testid="social-instagram" />
            <SocialIcon Icon={Twitter} href="#" label="Twitter" testid="social-twitter" />
            <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" testid="social-linkedin" />
            <SocialIcon Icon={Youtube} href="#" label="YouTube" testid="social-youtube" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  data-testid={`footer-link-${n.label.toLowerCase()}`}
                  className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Top Products</h4>
          <ul className="space-y-2.5">
            {PRODUCTS.slice(0, 6).map((p) => (
              <li key={p.id}>
                <Link
                  to="/products"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  data-testid={`footer-product-${p.id}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="text-white font-semibold mt-6 mb-3 text-sm tracking-wide uppercase">Services</h4>
          <ul className="space-y-2 grid grid-cols-2 gap-x-2">
            {SERVICES.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link
                  to="/services"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  data-testid={`footer-service-${s.id}`}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-400">
              <MapPin size={16} className="shrink-0 text-cyan-300 mt-0.5" />
              <span data-testid="footer-address">{COMPANY.address}</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-400">
              <Phone size={16} className="shrink-0 text-cyan-300" />
              <a
                href={`tel:${COMPANY.phoneDial}`}
                data-testid="footer-phone"
                className="hover:text-cyan-300"
              >
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex gap-3 text-sm text-slate-400">
              <Clock size={16} className="shrink-0 text-cyan-300" />
              <span>{COMPANY.hours}</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-400">
              <Mail size={16} className="shrink-0 text-cyan-300" />
              <a
                href={`mailto:${COMPANY.email}`}
                className="hover:text-cyan-300"
                data-testid="footer-email"
              >
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-slate-500">
          <span data-testid="footer-copyright">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </span>
          <span>
            Built with precision · Security systems · Agra, Uttar Pradesh
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
