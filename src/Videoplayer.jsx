import { useState } from "react";
import { motion } from "framer-motion";
import video from "../src/assets/welcome-us.mp4";

const VideoPlayerCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // The video source you provided
  const video = {
    src: {video},
    poster: "/api/placeholder/1280/720", // You can change this to an actual poster image if needed
  };

  const nextVideo = () => {
    // Since you only have one video, this will just reset to the same video
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % 1);
  };

  return (
    <motion.div
      className="w-full mb-16 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}>
      <div className="flex justify-center">
        <div className="w-full md:w-3/4 relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-auto"
            poster={video.poster}
            autoPlay
            playsInline
            muted
            loop>
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Next Button */}
          <motion.div
            className="absolute bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}>
            <motion.button
              onClick={nextVideo}
              className="bg-black text-yellow-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, backgroundColor: "#FFD700" }}
              whileTap={{ scale: 0.9 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12l7-7 7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayerCarousel;
