import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import ProductCard from "../components/ProductCard";
import EnquiryDialog from "../components/EnquiryDialog";
import { PRODUCTS } from "../data/site";

const CATEGORIES = ["All", "Sensor", "Control", "Fire Safety", "Perimeter", "Emergency", "Sirens"];

export default function Products() {
  const [active, setActive] = useState("All");
  const [enq, setEnq] = useState({ open: false, product: null });

  const filtered = useMemo(
    () => (active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <PageWrapper testid="products-page">
      <section className="relative pt-32 lg:pt-44 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
        <div className="absolute inset-0 radial-glow -z-10" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="overline mb-4">Products</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Pick exactly the <span className="text-glow-blue">protection</span> you need.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
              20+ premium security products engineered for homes, offices and commercial
              spaces. All include consultation, installation and lifetime support.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  active === c
                    ? "bg-blue-800 text-white border-cyan-300/50 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                    : "bg-transparent text-slate-300 border-white/10 hover:border-cyan-300/40 hover:text-cyan-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEnquire={(prod) => setEnq({ open: true, product: prod })}
              />
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 py-12">No products in this category.</p>
          )}
        </div>
      </section>

      <EnquiryDialog open={enq.open} onOpenChange={(o) => setEnq({ ...enq, open: o })} product={enq.product} />
    </PageWrapper>
  );
}
