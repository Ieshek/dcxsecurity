import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import reviewsData from "../data/reviews.json";

// ─── Google colour palette ────────────────────────────────────────────────────
const G_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

// Google "G" logo SVG
const GoogleLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

// Star rating renderer — uses Google yellow
const StarRating = ({ rating, size = 18 }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.round(rating) ? "#FBBC05" : "transparent"}
        stroke={i < Math.round(rating) ? "#FBBC05" : "#4a5568"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

// Avatar fallback with Google-coloured initials
const Avatar = ({ src, name, size = 52 }) => {
  const [failed, setFailed] = useState(false);
  const letter = (name || "U")[0].toUpperCase();
  const color = G_COLORS[letter.charCodeAt(0) % G_COLORS.length];

  if (!src || failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: size * 0.4,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
        }}
        aria-label={`Avatar of ${name}`}
      >
        {letter}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        border: "2px solid rgba(255,255,255,0.12)",
      }}
    />
  );
};

// ─── Individual Review Card ───────────────────────────────────────────────────
const ReviewCard = ({ review, index }) => (
  <motion.div
    key={review.id}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.45, delay: index * 0.07 }}
    className="review-card"
  >
    {/* Top row: Google badge + rating */}
    <div className="rc-header">
      <div className="rc-google-badge">
        <GoogleLogo size={18} />
        <span className="rc-badge-text">Google Review</span>
      </div>
      <StarRating rating={review.rating} size={15} />
    </div>

    {/* Review body */}
    <p className="rc-body">
      <span className="rc-quote">"</span>
      {review.review}
      <span className="rc-quote">"</span>
    </p>

    {/* Footer: avatar + name */}
    <div className="rc-footer">
      <Avatar src={review.profile_image} name={review.name} size={44} />
      <div className="rc-user">
        <span className="rc-name">{review.name}</span>
        <span className="rc-verified">Verified Google Reviewer</span>
      </div>
    </div>
  </motion.div>
);

// ─── Aggregate stats bar ──────────────────────────────────────────────────────
const AggregateBar = ({ reviews }) => {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    star: n,
    count: reviews.filter((r) => Math.round(r.rating) === n).length,
  }));

  return (
    <div className="agg-bar">
      {/* Left: score */}
      <div className="agg-score">
        <span className="agg-number">{avg}</span>
        <StarRating rating={parseFloat(avg)} size={22} />
        <span className="agg-count">{reviews.length} reviews</span>
      </div>

      {/* Divider */}
      <div className="agg-divider" />

      {/* Right: distribution */}
      <div className="agg-dist">
        {dist.map(({ star, count }) => {
          const pct = reviews.length ? (count / reviews.length) * 100 : 0;
          return (
            <div key={star} className="agg-row">
              <span className="agg-star-label">{star}</span>
              <Star size={11} fill="#FBBC05" stroke="#FBBC05" />
              <div className="agg-track">
                <div className="agg-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="agg-row-count">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Right: CTA */}
      <a
        href="https://www.google.com/maps/place/DCX+Security+Wizards"
        target="_blank"
        rel="noopener noreferrer"
        className="agg-cta"
        aria-label="Write a review on Google"
      >
        <GoogleLogo size={16} />
        <span>Write a Review</span>
        <ExternalLink size={13} />
      </a>
    </div>
  );
};

// ─── Slide indicators ─────────────────────────────────────────────────────────
const Indicators = ({ total, current, onGoto }) => (
  <div className="indicators" role="tablist" aria-label="Review page navigation">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        role="tab"
        aria-selected={i === current}
        aria-label={`Go to page ${i + 1}`}
        className={`indicator-dot${i === current ? " active" : ""}`}
        onClick={() => onGoto(i)}
      />
    ))}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const REVIEWS_PER_PAGE = 3;
const AUTO_INTERVAL = 5000; // ms

export default function GoogleReviewsPage() {
  const reviews = reviewsData.reviews || [];
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const timerRef = useRef(null);

  const goTo = useCallback(
    (targetPage) => {
      const normalized = ((targetPage % totalPages) + totalPages) % totalPages;
      setDirection(normalized >= page ? 1 : -1);
      setPage(normalized);
    },
    [page, totalPages]
  );

  const next = useCallback(() => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-advance
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const pageReviews = reviews.slice(
    page * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );

  // Slide animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
      transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
    }),
  };

  return (
    <PageWrapper testid="google-reviews-page">
      {/* ── Hero ── */}
      <section className="gr-hero">
        <div className="gr-hero-bg" aria-hidden="true">
          <div className="gr-hero-glow gr-hero-glow-1" />
          <div className="gr-hero-glow gr-hero-glow-2" />
          <div className="gr-hero-grid" />
        </div>
        <div className="gr-hero-inner">
          <div className="gr-hero-badge">
            <GoogleLogo size={20} />
            <span>Google Reviews</span>
          </div>
          <h1 className="gr-hero-title">
            What Our Customers&nbsp;
            <span className="gr-hero-gradient">Are Saying</span>
          </h1>
          <p className="gr-hero-sub">
            Real feedback from verified Google reviewers who've experienced
            DCX Security Wizards' products and services firsthand.
          </p>
        </div>
      </section>

      {/* ── Aggregate stats ── */}
      <section className="gr-section">
        <div className="gr-container">
          <AggregateBar reviews={reviews} />
        </div>
      </section>

      {/* ── Carousel ── */}
      <section className="gr-section gr-carousel-section">
        <div className="gr-container">
          {/* Slide area */}
          <div className="carousel-shell" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="carousel-grid"
              >
                {pageReviews.map((r, i) => (
                  <ReviewCard key={r.id} review={r} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="carousel-controls">
            <Indicators
              total={totalPages}
              current={page}
              onGoto={(i) => { goTo(i); resetTimer(); }}
            />

            <div className="carousel-arrows">
              <button
                className="carousel-arrow"
                onClick={() => { prev(); resetTimer(); }}
                aria-label="Previous reviews"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="carousel-page-label">
                {page + 1} / {totalPages}
              </span>
              <button
                className="carousel-arrow"
                onClick={() => { next(); resetTimer(); }}
                aria-label="Next reviews"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google CTA banner ── */}
      <section className="gr-section">
        <div className="gr-container">
          <div className="gr-cta-banner">
            <div className="gr-cta-glow" aria-hidden="true" />
            <div className="gr-cta-inner">
              <div className="gr-cta-logo">
                <GoogleLogo size={36} />
              </div>
              <div className="gr-cta-text">
                <h2 className="gr-cta-title">Find us on Google Maps</h2>
                <p className="gr-cta-sub">
                  Explore our Google Business Profile, get directions, or leave
                  your own review.
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/DCX+Security+Wizards/@27.201825,78.041412,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="gr-cta-btn"
                aria-label="View DCX Security Wizards on Google Maps"
              >
                View on Google Maps
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Layout ─────────────────────────────────────────────────────── */
        .gr-section { padding: 2rem 0; }
        .gr-container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }
        @media (min-width: 1024px) { .gr-container { padding: 0 2rem; } }

        /* ── Hero ───────────────────────────────────────────────────────── */
        .gr-hero {
          position: relative;
          padding: 7rem 1.25rem 4rem;
          text-align: center;
          overflow: hidden;
        }
        @media (min-width: 1024px) { .gr-hero { padding: 9rem 2rem 5rem; } }
        .gr-hero-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .gr-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(66,133,244,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66,133,244,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        }
        .gr-hero-glow {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.25;
        }
        .gr-hero-glow-1 {
          width: 520px; height: 320px;
          top: -60px; left: 50%; transform: translateX(-70%);
          background: radial-gradient(circle, #4285F4 0%, transparent 70%);
        }
        .gr-hero-glow-2 {
          width: 340px; height: 220px;
          top: 20px; right: 10%;
          background: radial-gradient(circle, #34A853 0%, transparent 70%);
        }
        .gr-hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .gr-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 999px;
          background: rgba(66,133,244,0.12); border: 1px solid rgba(66,133,244,0.3);
          font-size: 0.78rem; font-weight: 600; color: #a8c4f8;
          letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .gr-hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 800; line-height: 1.1;
          color: #ffffff; letter-spacing: -0.02em; margin: 0 0 1.25rem;
        }
        .gr-hero-gradient {
          background: linear-gradient(135deg, #4285F4 0%, #34A853 35%, #FBBC05 65%, #EA4335 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .gr-hero-sub {
          font-size: 1.05rem; color: #94a3b8; line-height: 1.7; margin: 0;
        }

        /* ── Aggregate Bar ───────────────────────────────────────────────── */
        .agg-bar {
          display: flex; flex-direction: column; gap: 1.5rem;
          align-items: center;
          background: rgba(10,13,21,0.7);
          border: 1px solid rgba(66,133,244,0.2);
          border-radius: 20px;
          padding: 2rem 2rem;
          backdrop-filter: blur(20px);
        }
        @media (min-width: 768px) {
          .agg-bar {
            flex-direction: row; align-items: center; gap: 0;
          }
        }
        .agg-score {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 0 2rem; min-width: 120px;
        }
        .agg-number {
          font-family: 'Outfit', sans-serif;
          font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1;
        }
        .agg-count { font-size: 0.78rem; color: #64748b; letter-spacing: 0.04em; }
        .agg-divider {
          width: 1px; height: 80px;
          background: rgba(255,255,255,0.08);
          display: none;
        }
        @media (min-width: 768px) { .agg-divider { display: block; } }
        .agg-dist {
          flex: 1; display: flex; flex-direction: column; gap: 6px;
          padding: 0 2rem; min-width: 200px;
        }
        .agg-row {
          display: flex; align-items: center; gap: 8px; font-size: 0.8rem;
        }
        .agg-star-label { color: #94a3b8; width: 8px; text-align: right; }
        .agg-track {
          flex: 1; height: 6px; border-radius: 3px;
          background: rgba(255,255,255,0.07);
          overflow: hidden;
        }
        .agg-fill {
          height: 100%; border-radius: 3px;
          background: linear-gradient(90deg, #FBBC05, #F59E0B);
          transition: width 0.6s ease;
        }
        .agg-row-count { color: #64748b; width: 16px; text-align: right; }
        .agg-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 24px; border-radius: 999px;
          background: #4285F4; color: #fff;
          font-size: 0.85rem; font-weight: 600;
          text-decoration: none;
          transition: all 0.25s;
          white-space: nowrap;
          margin: 0 1rem;
        }
        .agg-cta:hover {
          background: #3367D6;
          box-shadow: 0 6px 24px rgba(66,133,244,0.4);
          transform: translateY(-1px);
        }

        /* ── Carousel ───────────────────────────────────────────────────── */
        .gr-carousel-section { padding-bottom: 4rem; }
        .carousel-shell {
          position: relative; overflow: hidden;
          min-height: 300px;
        }
        .carousel-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) { .carousel-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .carousel-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── Review Card ─────────────────────────────────────────────────── */
        .review-card {
          background: rgba(10,13,21,0.65);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 1.6rem;
          display: flex; flex-direction: column; gap: 1rem;
          backdrop-filter: blur(16px);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          height: 100%;
        }
        .review-card:hover {
          border-color: rgba(66,133,244,0.4);
          box-shadow: 0 8px 32px rgba(66,133,244,0.12);
          transform: translateY(-3px);
        }
        .rc-header {
          display: flex; align-items: center; justify-content: space-between;
        }
        .rc-google-badge {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.72rem; font-weight: 600;
          color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase;
        }
        .rc-badge-text { color: #94a3b8; }
        .rc-body {
          flex: 1;
          font-size: 0.92rem; color: #cbd5e1; line-height: 1.75;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rc-quote {
          font-size: 1.4em; color: #4285F4;
          line-height: 0; vertical-align: -0.25em;
          margin: 0 2px;
        }
        .rc-footer {
          display: flex; align-items: center; gap: 12px;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: auto;
        }
        .rc-user { min-width: 0; }
        .rc-name {
          display: block;
          font-size: 0.9rem; font-weight: 700; color: #e2e8f0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .rc-verified {
          display: block;
          font-size: 0.72rem; color: #64748b; margin-top: 2px;
        }

        /* ── Controls ───────────────────────────────────────────────────── */
        .carousel-controls {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 1.75rem; padding: 0 0.25rem;
          flex-wrap: wrap; gap: 1rem;
        }
        .indicators {
          display: flex; align-items: center; gap: 8px;
        }
        .indicator-dot {
          width: 8px; height: 8px; border-radius: 4px;
          background: rgba(255,255,255,0.18);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.3s ease;
        }
        .indicator-dot.active {
          width: 28px; background: #4285F4;
        }
        .carousel-arrows {
          display: flex; align-items: center; gap: 10px;
        }
        .carousel-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(10,13,21,0.6);
          color: #fff; cursor: pointer;
          display: grid; place-items: center;
          transition: all 0.25s;
          backdrop-filter: blur(8px);
        }
        .carousel-arrow:hover {
          border-color: #4285F4; color: #4285F4;
          box-shadow: 0 0 16px rgba(66,133,244,0.3);
        }
        .carousel-page-label {
          font-size: 0.82rem; color: #64748b;
          font-family: 'JetBrains Mono', monospace;
          min-width: 44px; text-align: center;
        }

        /* ── CTA Banner ──────────────────────────────────────────────────── */
        .gr-cta-banner {
          position: relative; overflow: hidden;
          background: rgba(10,13,21,0.7);
          border: 1px solid rgba(66,133,244,0.25);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          margin-bottom: 4rem;
          backdrop-filter: blur(20px);
        }
        .gr-cta-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 10% 50%, rgba(66,133,244,0.12), transparent),
            radial-gradient(ellipse 50% 50% at 90% 50%, rgba(52,168,83,0.08), transparent);
        }
        .gr-cta-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .gr-cta-inner {
            flex-direction: row; align-items: center;
          }
        }
        .gr-cta-logo {
          background: rgba(66,133,244,0.1);
          border: 1px solid rgba(66,133,244,0.25);
          border-radius: 14px; padding: 14px;
          display: grid; place-items: center;
          flex-shrink: 0;
        }
        .gr-cta-text { flex: 1; min-width: 0; }
        .gr-cta-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem; font-weight: 700;
          color: #fff; margin: 0 0 0.4rem;
        }
        .gr-cta-sub { font-size: 0.9rem; color: #94a3b8; margin: 0; }
        .gr-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          background: linear-gradient(135deg, #4285F4 0%, #1a56db 100%);
          color: #fff; font-weight: 600; font-size: 0.9rem;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(66,133,244,0.3);
        }
        .gr-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(66,133,244,0.5);
        }
      `}</style>
    </PageWrapper>
  );
}
