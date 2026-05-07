import React from "react";
import { motion } from "framer-motion";

export const SectionHeader = ({ overline, title, subtitle, align = "center" }) => {
  const alignCls = align === "left" ? "text-left" : "text-center mx-auto";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl ${alignCls} mb-14`}
    >
      {overline && <div className="overline mb-4">{overline}</div>}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-slate-400 text-base lg:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
