import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { COMPANY } from "../data/site";

const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 1.64 6.06L0 24l6.16-1.61A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 21.82a9.81 9.81 0 0 1-5-1.36l-.36-.21-3.66.96.98-3.57-.23-.37A9.84 9.84 0 1 1 21.84 12 9.85 9.85 0 0 1 12 21.82Zm5.39-7.36c-.29-.15-1.74-.86-2-.96s-.46-.15-.66.15-.76.96-.94 1.16-.34.22-.63.07a8.04 8.04 0 0 1-2.36-1.46 8.86 8.86 0 0 1-1.64-2.04c-.17-.29 0-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.49s.05-.36-.02-.51c-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.51h-.57a1.1 1.1 0 0 0-.79.37 3.32 3.32 0 0 0-1.04 2.47 5.79 5.79 0 0 0 1.21 3.07 13.26 13.26 0 0 0 5.07 4.49c.71.31 1.27.49 1.7.62a4.1 4.1 0 0 0 1.88.12 3.07 3.07 0 0 0 2.02-1.42 2.5 2.5 0 0 0 .17-1.42c-.07-.13-.27-.21-.56-.36Z" />
  </svg>
);

export const FloatingButtons = () => {
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hello DCX Security Wizards, I would like a free site survey."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
      <motion.a
        href={`tel:${COMPANY.phoneDial}`}
        data-testid="float-call-btn"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 grid place-items-center rounded-full text-white pulse-ring"
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #2563eb)",
          boxShadow: "0 12px 32px rgba(0,229,255,0.35)",
        }}
        aria-label="Call DCX"
      >
        <Phone size={22} />
      </motion.a>
      <motion.a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        data-testid="float-whatsapp-btn"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 grid place-items-center rounded-full text-white"
        style={{
          background: "#25D366",
          boxShadow: "0 12px 32px rgba(37,211,102,0.45)",
        }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
