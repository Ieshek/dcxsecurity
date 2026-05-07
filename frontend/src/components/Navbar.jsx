import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, COMPANY } from "../data/site";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05070C]/85 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="shrink-0" data-testid="navbar-logo-link">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-cyan-300"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phoneDial}`}
            data-testid="navbar-call-btn"
            className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
          >
            <PhoneCall size={15} />
            <span>{COMPANY.phone}</span>
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          data-testid="navbar-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#05070C]/95 backdrop-blur-2xl border-t border-white/5"
            data-testid="navbar-mobile-panel"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? "bg-white/5 text-cyan-300"
                        : "text-slate-200 hover:bg-white/5"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={`tel:${COMPANY.phoneDial}`}
                className="btn-primary mt-3 px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
                data-testid="mobile-navbar-call-btn"
              >
                <PhoneCall size={15} />
                Call {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
