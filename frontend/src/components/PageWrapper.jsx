import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const PageWrapper = ({ children, testid }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.main
      data-testid={testid || "page-main"}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
};

export default PageWrapper;
