import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

export const ProductCard = ({ product, onEnquire }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0d15]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d15] via-transparent to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
          {product.category}
        </span>
        {product.mrp && product.offerPrice && product.mrp > product.offerPrice && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500/80 border border-red-400/30 backdrop-blur-md">
            SAVE ₹{(product.mrp - product.offerPrice).toLocaleString()}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {product.name}
          </h3>
          <div className="mt-3 flex items-baseline gap-3">
            {product.mrp && product.offerPrice ? (
              <>
                <span className="text-2xl font-black text-cyan-300">
                  ₹{product.offerPrice.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-500 line-through">
                  ₹{product.mrp.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-2xl font-black text-cyan-300">
                {product.price || `₹${product.offerPrice?.toLocaleString()}`}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            {product.description}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-2 mt-1">
          {product.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-1.5 text-xs text-slate-300"
            >
              <Check size={12} className="text-cyan-300" />
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={() => onEnquire(product)}
          data-testid={`product-enquire-btn-${product.id}`}
          className="mt-auto inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-white/10 hover:border-cyan-300/60 hover:bg-cyan-400/5 hover:text-cyan-300 text-white transition-all"
        >
          <span>Enquire Now</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
