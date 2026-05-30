import React from "react";
import PageWrapper from "../components/PageWrapper";
import PremiumHero from "../components/PremiumHero";

export default function Landing() {
  return (
    <PageWrapper testid="landing-page">
      <PremiumHero />
      {/* Optional: brief pitch section below hero */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-xl text-white font-semibold">Enterprise-grade AI threat detection</h2>
          <p className="mt-3 text-slate-300">Start protecting your organisation with a modern security operations platform.</p>
        </div>
      </section>
    </PageWrapper>
  );
}
