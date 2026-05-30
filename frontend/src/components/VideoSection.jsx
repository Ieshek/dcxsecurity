import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting && !isPlaying) {
            // Set volume to 70% (0.7) and play
            videoRef.current.volume = 0.7;
            videoRef.current.play();
            setIsPlaying(true);
          } else if (!entry.isIntersecting && isPlaying) {
            // Pause when out of view
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of video is visible
        rootMargin: "0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="overline mb-4">See It In Action</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Our Security Solution in Real-World Deployment
            </h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-cyan-300/20 shadow-2xl">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10 pointer-events-none" />
            
            {/* Video container */}
            <div className="w-full bg-black/50 backdrop-blur-sm">
              <video
                ref={videoRef}
                className="w-full h-auto block"
                controls
                muted
                loop
                playsInline
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Volume indicator */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-cyan-300 font-semibold z-20">
              {/* Volume: 70% */}
            </div>
          </div>

          <p className="mt-6 text-slate-400 text-center max-w-2xl mx-auto">
            Watch how our comprehensive security solutions integrate seamlessly into modern spaces,
            providing real-time monitoring and instant threat detection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
