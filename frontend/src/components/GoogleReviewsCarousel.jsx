import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import reviewsData from "../data/reviews.json";
import SectionHeader from "./SectionHeader";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ReviewSkeleton = () => (
  <div className="glass-card rounded-2xl p-6 lg:p-8 bg-[#0a0d15] border border-white/10 animate-pulse">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 via-yellow-400 to-red-400 rounded-full" />
      <div className="h-4 bg-white/10 rounded w-24" />
    </div>
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-5 h-5 bg-white/10 rounded" />
      ))}
    </div>
    <div className="space-y-3 mb-8">
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-5/6" />
      <div className="h-4 bg-white/10 rounded w-4/6" />
    </div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-32" />
        <div className="h-3 bg-white/10 rounded w-40" />
      </div>
    </div>
  </div>
);

// ─── Google "G" SVG ───────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div className="glass-card rounded-2xl p-6 lg:p-8 bg-[#0a0d15] border border-white/10 h-full flex flex-col hover:border-cyan-300/50 transition-colors">
    {/* Google badge */}
    <div className="flex items-center gap-2 mb-6">
      <GoogleIcon />
      <span className="text-xs text-slate-400 font-medium tracking-wide">Google Review</span>
    </div>

    {/* Stars */}
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.round(review.rating) ? "#FBBC05" : "transparent"}
            stroke={i < Math.round(review.rating) ? "#FBBC05" : "#475569"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-cyan-300 ml-1">{review.rating}</span>
    </div>

    {/* Text */}
    <p className="text-sm lg:text-base text-slate-200 leading-relaxed mb-6 italic flex-grow line-clamp-5">
      &ldquo;{review.review}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
      {review.profile_image ? (
        <img
          src={review.profile_image}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-300/30 flex-shrink-0"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold"
        style={{ display: review.profile_image ? "none" : "flex" }}
      >
        {review.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-white text-sm truncate">{review.name}</div>
        <div className="text-xs text-slate-400">Verified Google Review</div>
      </div>
    </div>
  </div>
);

// ─── Carousel (pure framer-motion, no swiper) ─────────────────────────────────
const REVIEWS_PER_PAGE = 3;
const AUTO_MS = 5000;

function useBreakpoint() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const calc = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return cols;
}

function ReviewsCarouselInner({ reviews }) {
  const cols = useBreakpoint();
  const perPage = cols; // 1 / 2 / 3 matching breakpoint
  const totalPages = Math.ceil(reviews.length / perPage);

  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef(null);

  const go = useCallback((target) => {
    const t = ((target % totalPages) + totalPages) % totalPages;
    setDir(t >= page ? 1 : -1);
    setPage(t);
  }, [page, totalPages]);

  const next = useCallback(() => {
    setDir(1);
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setDir(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const resetTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(next, AUTO_MS);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timer.current);
  }, [resetTimer]);

  // Reset page when cols change to avoid out-of-bounds
  useEffect(() => { setPage(0); }, [cols]);

  const pageReviews = reviews.slice(page * perPage, page * perPage + perPage);

  const variants = {
    enter: (d) => ({ x: d > 0 ? "55%" : "-55%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? "-55%" : "55%", opacity: 0, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } }),
  };

  return (
    <div>
      {/* Slide */}
      <div style={{ overflow: "hidden", minHeight: 280 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${perPage}, 1fr)`,
              gap: "1.5rem",
            }}
          >
            {pageReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 lg:mt-8">
        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Review pages">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1}`}
              onClick={() => { go(i); resetTimer(); }}
              style={{
                width: i === page ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === page ? "#06b6d4" : "rgba(255,255,255,0.18)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { prev(); resetTimer(); }}
            aria-label="Previous reviews"
            className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white hover:border-cyan-300 hover:text-cyan-300 transition-colors bg-transparent flex-shrink-0"
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "#64748b", minWidth: 44, textAlign: "center" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => { next(); resetTimer(); }}
            aria-label="Next reviews"
            className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white hover:border-cyan-300 hover:text-cyan-300 transition-colors bg-transparent flex-shrink-0"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function GoogleReviewsCarousel() {
  // Load directly from local JSON — no backend required
  const reviews = reviewsData.reviews || [];
  const loading = false;
  const error = reviews.length === 0;
  const cached = false;

  // SEO schema
  const reviewSchema =
    reviews.length > 0
      ? {
          "@context": "https://schema.org/",
          "@type": "LocalBusiness",
          name: "DCX Security Wizards",
          url: "https://www.dcxsecuritywizards.com",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
            reviewCount: reviews.length,
          },
          review: reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: r.rating },
            author: { "@type": "Person", name: r.name },
            reviewBody: r.review,
          })),
        }
      : null;

  return (
    <section className="pb-24">
      {reviewSchema && (
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      )}

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader
          overline="Trusted Reviews"
          title="Trusted by Our Customers"
          subtitle="See what our customers say about our security solutions and installation services."
        />

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden border border-red-400/50 bg-red-950/20 p-8 lg:p-12"
          >
            <div className="flex items-center gap-4">
              <AlertCircle className="text-red-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-white font-semibold mb-1">Unable to Load Reviews</h3>
                <p className="text-slate-300 text-sm">
                  We're having trouble fetching Google reviews at the moment. Please try again later.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skeleton */}
        {loading && (
          <>
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)}
            </div>
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => <ReviewSkeleton key={i} />)}
            </div>
            <div className="md:hidden">
              <ReviewSkeleton />
            </div>
          </>
        )}

        {/* Carousel */}
        {!loading && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_60px_rgba(0,229,255,0.08)] bg-[#0a0d15]"
          >
            <div className="p-6 lg:p-8">
              <ReviewsCarouselInner reviews={reviews} />
            </div>

            {cached && (
              <div className="px-6 lg:px-8 pb-4 text-xs text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Cached reviews</span>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA */}
        {!loading && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-slate-400 mb-4 text-sm">View all reviews on Google Maps</p>
            <a
              href="https://www.google.com/maps/place/DCX+Security+Wizards/@27.201825,78.041412,17z/data=!3m1!4b1!4m6!3m5!1s0x3974a3037f735101:0x4e80ca478cfa987a!8m2!3d27.201825!4d78.041412!16s%2Fg%2F11scbppcf3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-shadow"
            >
              Visit Our Google Business Profile
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
