import React, { useRef } from "react";
import { motion } from "framer-motion";

const VIDEOS = [
  {
    src: "/demo-video.mp4",
    title: "Featured deployment",
    description: "A full walkthrough of our integrated security solution in a live environment.",
  },
  {
    src: "/videos/whatsapp-10-56-25.mp4",
    title: "Client walkthrough",
    description: "A real client-facing view of the setup, coverage and support experience.",
  },
  {
    src: "/videos/whatsapp-11-03-55.mp4",
    title: "Installation highlights",
    description: "A closer look at the install process and system reliability in action.",
  },
  {
    src: "/videos/whatsapp-11-05-26.mp4",
    title: "Site demonstration",
    description: "A compact demo showing the deployment flow and monitoring experience.",
  },
  {
    src: "/videos/whatsapp-11-14-23.mp4",
    title: "Service showcase",
    description: "A final showcase of the product experience, support and response quality.",
  },
];

export default function VideoSection() {
  const videoRefs = useRef([]);

  const handleVideoPlay = (activeIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeIndex) {
        video.pause();
      }
    });
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 text-center">
            <div className="overline mb-4">See It In Action</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Our Security Solution in Real-World Deployment
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {VIDEOS.map((video, index) => (
              <motion.article
                key={video.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="glass-card rounded-3xl p-3 sm:p-4 border border-cyan-300/20 shadow-2xl"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/70">
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className="w-full h-auto object-contain block"
                    controls
                    preload="metadata"
                    playsInline
                    onPlay={() => handleVideoPlay(index)}
                    onLoadedMetadata={(event) => {
                      try {
                        event.currentTarget.volume = 0.7;
                      } catch (error) {
                        console.error("Unable to set video volume", error);
                      }
                    }}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="px-2 pt-4 pb-2">
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{video.description}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 text-slate-400 text-center max-w-2xl mx-auto">
            Watch how our comprehensive security solutions integrate seamlessly into modern spaces,
            providing real-time monitoring and instant threat detection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
