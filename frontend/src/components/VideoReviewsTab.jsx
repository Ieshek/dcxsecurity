import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const ensureMp4 = (name) => {
  if (!name) return name;
  return name.endsWith(".mp4") ? `/videos/${name}` : `/videos/${name}.mp4`;
};

const VideoReviewsTab = () => {
  const videoRefs = useRef([]);

  const videos = [
    {
      id: 1,
      title: "Review of DCX Security Installation",
      description: "Security system in action",
      src: ensureMp4("review1.mp4"),
    },
    {
      id: 2,
      title: "Review of DCX Security Installation",
      description: "Installation and testing",
      src: ensureMp4("review2.mp4"),
    },
  ];

  const handleVolumeMount = (videoRef) => {
    if (videoRef && videoRef.current) {
      try {
        videoRef.current.volume = 0.7; // Set to 70%
      } catch (e) {
        // ignore if browser blocks programmatic volume
      }
    }
  };

  const [aspectMap, setAspectMap] = useState({});

  const handleVideoPlay = (activeIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeIndex) {
        video.pause();
      }
    });
  };

  const onLoadedMeta = (e, id, index) => {
    const ref = { current: videoRefs.current[index] };
    handleVolumeMount(ref);
    const v = ref.current || e.target;
    if (v && v.videoWidth && v.videoHeight) {
      const pct = (v.videoHeight / v.videoWidth) * 100;
      setAspectMap((p) => ({ ...p, [id]: pct }));
    }
  };

  return (
    <section className="py-24 lg:py-32" data-testid="video-reviews-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="overline mb-4">Video Reviews</div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Watch Real Installation Videos from Our Completed Security Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">
            See our security systems in real-world action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden p-4">
                <div
                  className="relative bg-black rounded-lg overflow-hidden"
                  style={{ paddingTop: aspectMap[video.id] ? `${aspectMap[video.id]}%` : "56.25%" }}
                >
                  <div className="absolute inset-0">
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      controls
                      preload="metadata"
                      playsInline
                      className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                      src={video.src}
                      controlsList="nodownload"
                      onPlay={() => handleVideoPlay(index)}
                      onLoadedMetadata={(e) => onLoadedMeta(e, video.id, index)}
                    />
                    <div className="absolute inset-0 border border-cyan-300/20 rounded-lg pointer-events-none group-hover:border-cyan-300/40 transition-colors" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {video.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{video.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoReviewsTab;
