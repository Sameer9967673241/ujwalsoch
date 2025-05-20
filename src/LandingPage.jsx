import { useState, useRef, useEffect } from "react";
import video from "../src/assets/welcome-us.mp4";
import logo from "../src/assets/imhg.jpeg";
import brand1 from "./assets/brand1.png";
import brand2 from "./assets/brand2.jpg";
import brand3 from "./assets/brand3.png";
import brand4 from "./assets/brand4.png";
import brand5 from "./assets/brand5.png";
import {
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCarousel from "./VideoCarousel";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({
    card1: false,
    card2: false,
    card3: false,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const videoRef = useRef(null);
  const sectionRefs = {
    home: useRef(null),
    learn: useRef(null),
    earn: useRef(null),
    give: useRef(null),
    about: useRef(null),
    testIq: useRef(null),
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Navbar background change on scroll
      setIsScrolled(window.scrollY > 10);

      // Active section detection
      const current = Object.entries(sectionRefs).find(([key, ref]) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setActiveSection(current[0]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize autoplay when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Autoplay was prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCard = (cardId) => {
  // Close all cards first, then open the clicked one if it wasn't already open
  const wasFlipped = flippedCards[cardId];
  setFlippedCards({
    card1: false,
    card2: false,
    card3: false,
    [cardId]: !wasFlipped
  });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = parseFloat(e.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [slide1, setSlide1] = useState(0);
const [slide2, setSlide2] = useState(0);

useEffect(() => {
  const interval1 = setInterval(() => {
    setSlide1((prev) => (prev === 2 ? 0 : prev + 1));
  }, 3000);

  const interval2 = setInterval(() => {
    setSlide2((prev) => (prev === 2 ? 0 : prev + 1));
  }, 3000);

  
  return () => {
    clearInterval(interval1);
    clearInterval(interval2);
  };
}, []);


  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-black text-gray-200">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}>
        <div className="container mx-auto px-9 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <img src={logo} alt="Company Logo" className="h-20" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {[
                "home",
                "learn",
                "contact us",
                "know more",
                "about",
                "test-iq",
              ].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  className={`text-lg font-medium transition duration-300 ${
                    activeSection === item.replace("-", "")
                      ? "text-[#FFD700] border-b-2 border-[#FFD700]" // Golden when active
                      : isScrolled
                      ? "text-gray-300 hover:text-[#FFD700]" // Golden on hover
                      : "text-gray-200 hover:text-[#FFD700]"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}>
                  {item
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-[#FFD700] focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden py-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}>
                <div className="flex flex-col space-y-3">
                  {[
                    "home",
                "learn",
                "contact us",
                "know more",
                "about",
                "test-iq",
                  ].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item);
                      }}
                      className="text-gray-300 hover:text-[#FFD700] transition duration-300 py-2 border-b border-gray-800"
                      whileHover={{ x: 5, color: "#FFD700" }}>
                      {item
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Home Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className="min-h-screen flex flex-col justify-center pb-10 pt-26 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="w-full h-screen relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}>
            <div className="flex justify-center h-full">
              <VideoCarousel/>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}>
            <ChevronDown size={36} className="text-yellow-500" />
          </motion.div>

          
        </div>
        
{/* Cards Container */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    {
      id: "card1",
      title: "LEARNING",
      frontText: "Click to learn more about Learning",
      backText: (
        <>
          Learning isn't just about knowing, it's about understanding. Change your thinking, and your life will change.
          <br /><br />
          Whether you are a student in a classroom or in the classroom of life — if you're ready to learn, you're ready to rise.
        </>
      ),
      icon: "📚",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      id: "card2",
      title: "EARNING",
      frontText: "Click to learn more about Earning",
      backText: (
        <>
          Don't just chase income, create impact. When you earn with the right mindset, success follows naturally.
          <br /><br />
          Whether it's a job, a business, or a creative pursuit — what matters most is how you earn, not just how much you earn.
        </>
      ),
      icon: "💼",
      color: "bg-gradient-to-br from-yellow-300 to-yellow-700",
    },
    {
      id: "card3",
      title: "GIVING",
      frontText: "Click to learn more about Giving",
      backText: (
        <>
          What you give defines who you are. Giving doesn't reduce what you have; it multiplies its value.
          <br /><br />
          Whether you're sharing wisdom, lending a hand, or inspiring someone — your giving creates ripples of change.
        </>
      ),
      icon: "🤲",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-800",
    },
  ].map((card) => (
    <div
      key={card.id}
      className="flip-card h-72"
      onClick={() => toggleCard(card.id)}
    >
      <div 
        className={`flip-card-inner ${flippedCards[card.id] ? "flipped" : ""}`}
      >
        {/* Front Side */}
        <div className={`flip-card-front ${card.color} text-black rounded-xl shadow-xl p-6 relative overflow-hidden`}>
          {/* White decoration elements contained within boundaries */}
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
          
          <div className="flex flex-col justify-center items-center h-full z-10 relative">
            <span className="text-4xl mb-3">{card.icon}</span>
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p className="text-center text-black text-opacity-90">
              {card.frontText}
            </p>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`flip-card-back ${card.color} text-black rounded-xl shadow-xl p-6 relative overflow-hidden`}>
          {/* White decoration elements contained within boundaries */}
          <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -top-5 -left-5 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
          
          <div className="flex flex-col justify-between h-full relative z-10">
            <div className="text-center overflow-y-auto max-h-48 py-2">
              <p className="text-base">{card.backText}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-black text-yellow-400 px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform">
                Learn More
              </button>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

{/* Add this CSS to your stylesheet or in a style tag */}
<style jsx>{`
  .flip-card {
    perspective: 1000px;
    cursor: pointer;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }
  
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden; /* Safari fix */
  }
  
  .flip-card-front {
    z-index: 2;
  }
  
  .flip-card-back {
    transform: rotateY(180deg);
  }
  
  /* Custom scrollbar for text overflow */
  .flip-card-back .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
  
  .flip-card-back .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  .flip-card-back .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`}</style>
      </section>

      {/* Learn Section */}
      <section id="learn" ref={sectionRefs.learn} className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-3 text-yellow-500">
              Learning Journey
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover the path to knowledge and personal growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Skills Development",
                icon: "🧠",
                desc: "Acquire practical skills that prepare you for future challenges",
              },
              {
                title: "Knowledge Base",
                icon: "📘",
                desc: "Build a strong foundation of knowledge in various disciplines",
              },
              {
                title: "Growth Mindset",
                icon: "🌱",
                desc: "Develop a mindset that embraces challenges and continuous improvement",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-black p-8 rounded-xl shadow-lg relative overflow-hidden group border border-yellow-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.3)",
                }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section with Parallax Effect */}
      <section
        id="about"
        ref={sectionRefs.about}
        className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-900 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-800 rounded-full opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Logo/Image with parallax effect */}
           

            {/* Description */}
            <motion.div
              className="md:w-1/2 mt-6 md:mt-0"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <h2 className="text-4xl font-bold mb-6 text-yellow-500">
                About UjwalSoch
              </h2>
              <p className="text-gray-300 mb-4 text-lg">
                UjwalSoch is an initiative, dedicated to inspiring and guiding
                individuals through LEARNING, EARNING, and GIVING. It focuses on
                empowering people with knowledge, fostering financial
                independence, and promoting social responsibility.
              </p>
              <p className="text-gray-300 mb-6 text-lg">
                UjwalSoch conducts impactful programs for schools, students, and
                parents, emphasizing education, personal development, and
                community support. The platform extends its vision through
                books, workshops, and digital content, aiming to create a
                positive mindset and meaningful change in society.
              </p>

              

              <motion.button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                Learn More
                <ChevronDown size={18} className="ml-2 rotate-270" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-800 to-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
              Ready to start your journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl text-gray-300">
              Join thousands of individuals who are transforming their lives
              through learning, earning, and giving.
            </p>
            <motion.button
  onClick={() => setIsModalOpen(true)}
  className="bg-black text-yellow-400 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-yellow-500"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}>
  Get Started Today
</motion.button>

          </motion.div>
        </div>
      </section>
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-black text-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 left-2 text-gray-500 text-xl font-bold">
        &times;
      </button>

      {/* Form Content */}
      <h3 className="text-2xl font-bold text-center mb-6 text-yellow-700">
        Get Started
      </h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Contact No</label>
          <input
            type="tel"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="123-456-7890"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 transition">
          Submit
        </button>
      </form>
    </div>
  </div>
)}


      {/* Earn Section */}
      <section
  id="earn"
  ref={sectionRefs.earn}
  className="py-24 bg-black overflow-hidden"
>
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold mb-3 text-yellow-500">Our Brands</h2>
      <div className="w-24 h-1 bg-yellow-600 mx-auto mb-6"></div>
    </motion.div>

    {/* Marquee Section */}
    <div className="relative w-full overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap gap-12">
        {/* Repeat or dynamically generate logos here */}
        <img src={brand1} alt="Brand 1" className="h-16 w-auto" />
        <img src={brand2} alt="Brand 2" className="h-16 w-auto" />
        <img src={brand3} alt="Brand 3" className="h-16 w-auto" />
        <img src={brand4} alt="Brand 4" className="h-16 w-auto" />
        <img src={brand5} alt="Brand 5" className="h-16 w-auto" />
        {/* Duplicate logos for seamless looping */}
        <img src={brand1} alt="Brand 1" className="h-16 w-auto" />
        <img src={brand2} alt="Brand 2" className="h-16 w-auto" />
        <img src={brand3} alt="Brand 3" className="h-16 w-auto" />
        <img src={brand4} alt="Brand 4" className="h-16 w-auto" />
        <img src={brand5} alt="Brand 5" className="h-16 w-auto" />
      </div>
    </div>
  </div>
</section>


      {/* Give Section */}
      <section
        id="give"
        ref={sectionRefs.give}
        className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-3 text-yellow-400">
              Giving Back
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-lg text-yellow-200 max-w-2xl mx-auto">
              Create lasting impact through compassionate actions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="bg-black rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}>
              <div className="h-64 bg-yellow-100 relative overflow-hidden">
  <div
    className="w-full h-full flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${slide1 * 100}%)` }}>
    {[
      "/api/placeholder/600/400?1",
      "/api/placeholder/600/400?2",
      "/api/placeholder/600/400?3",
    ].map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide 1 - ${index}`}
        className="w-full h-full object-cover flex-shrink-0"
      />
    ))}
  </div>
  <div className="absolute inset-0 bg-yellow-700 opacity-30 hover:opacity-0 transition-opacity duration-300"></div>

  {/* Arrows */}
  <button
    onClick={() =>
      setSlide1((prev) => (prev === 0 ? 2 : prev - 1))
    }
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10">
    &#10094;
  </button>
  <button
    onClick={() =>
      setSlide1((prev) => (prev === 2 ? 0 : prev + 1))
    }
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10">
    &#10095;
  </button>
</div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                  Community Initiatives
                </h3>
                <p className="text-yellow-200 mb-6">
                  Our community programs focus on education, health, and
                  sustainability. We work with local partners to address
                  immediate needs while developing long-term solutions.
                </p>
                <motion.button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-lg transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  Join a Program
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="bg-black rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="h-64 bg-yellow-100 relative overflow-hidden">
  <div
    className="w-full h-full flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${slide2 * 100}%)` }}>
    {[
      "/api/placeholder/600/400?4",
      "/api/placeholder/600/400?5",
      "/api/placeholder/600/400?6",
    ].map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide 2 - ${index}`}
        className="w-full h-full object-cover flex-shrink-0"
      />
    ))}
  </div>
  <div className="absolute inset-0 bg-yellow-700 opacity-30 hover:opacity-0 transition-opacity duration-300"></div>

  {/* Arrows */}
  <button
    onClick={() =>
      setSlide2((prev) => (prev === 0 ? 2 : prev - 1))
    }
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10">
    &#10094;
  </button>
  <button
    onClick={() =>
      setSlide2((prev) => (prev === 2 ? 0 : prev + 1))
    }
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10">
    &#10095;
  </button>
</div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                  Mentorship & Knowledge Sharing
                </h3>
                <p className="text-yellow-200 mb-6">
                  Share your expertise and experience with those who need
                  guidance. Our mentorship programs connect experienced
                  professionals with eager learners.
                </p>
                <motion.button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-lg transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  Become a Mentor
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}>
            <div className="bg-black p-8 rounded-xl shadow-xl max-w-2xl">
              <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
                Our Impact
              </h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <motion.div
                    className="text-3xl font-bold text-yellow-500 mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}>
                    5000+
                  </motion.div>
                  <p className="text-yellow-200">Lives Impacted</p>
                </div>
                <div>
                  <motion.div
                    className="text-3xl font-bold text-yellow-500 mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}>
                    120+
                  </motion.div>
                  <p className="text-yellow-200">Projects</p>
                </div>
                <div>
                  <motion.div
                    className="text-3xl font-bold text-yellow-500 mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}>
                    30+
                  </motion.div>
                  <p className="text-yellow-200">Communities</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Test IQ Section */}
      <section
        id="test-iq"
        ref={sectionRefs.testIq}
        className="py-24 bg-black">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-3 text-yellow-400">
              Test Your IQ
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover your intellectual strengths with our comprehensive
              assessment
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            className="bg-black rounded-2xl shadow-2xl p-10 max-w-4xl mx-auto border border-yellow-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            {/* Card Header */}
            <h3 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
              Start Your IQ Journey
            </h3>
            <p className="text-gray-400 mb-10 text-center text-lg">
              Our scientifically validated assessment helps you understand your
              cognitive abilities across multiple domains.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-gray-800 p-6 rounded-lg text-center hover:shadow-md transition">
                <div className="text-yellow-400 text-4xl mb-3">🧩</div>
                <h4 className="font-semibold text-yellow-300 text-lg">
                  Logical Reasoning
                </h4>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center hover:shadow-md transition">
                <div className="text-yellow-400 text-4xl mb-3">📝</div>
                <h4 className="font-semibold text-yellow-300 text-lg">
                  Verbal Analysis
                </h4>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center hover:shadow-md transition">
                <div className="text-yellow-400 text-4xl mb-3">📊</div>
                <h4 className="font-semibold text-yellow-300 text-lg">
                  Pattern Recognition
                </h4>
              </div>
            </div>

            {/* Button */}
            <div className="text-center">
              <motion.button
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}>
                Begin Free Assessment
              </motion.button>
              <p className="mt-4 text-sm text-gray-500">
                Takes approximately 30 minutes to complete
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fixed floating action button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 10 }}>
        <motion.button
          className="bg-black text-yellow-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-500 focus:outline-none"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#FFD700",
            borderColor: "#FFD700",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Footer with Animation */}
      <footer className="bg-black text-yellow-400 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Navigate Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                UjwalSoch
              </h3>
              <ul className="space-y-3">
                {[
                  "Learning is the Best Policy",
                  "Earning the Values",
                  "Giving Provides Peace",
                  "Ground Zero",
                ].map((text, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300 flex items-center">
                      <span className="mr-2">•</span>
                      {text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                Services
              </h3>
              <ul className="space-y-3">
                {[
                  "FAQ's",
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Our Team",
                  "Contact Us",
                ].map((text, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300 flex items-center">
                      <span className="mr-2">•</span>
                      {text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Where we stand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                Where we stand
              </h3>
              <ul className="space-y-3">
                {[
                  "About UjwalSoch",
                  "World is Changing",
                  "We are Surrounded by",
                  "Upcoming Seminar",
                  "Share your Thoughts",
                ].map((text, idx) => (
                  <motion.li key={idx} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="hover:text-yellow-300 transition duration-300 flex items-center">
                      <span className="mr-2">•</span>
                      {text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Logo Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}>
              <div className="mb-6">
                <motion.img
                  src={logo}
                  alt="Company Logo"
                  className="h-20"
                  whileHover={{
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 1, repeat: Infinity },
                  }}
                />
              </div>
              <div className="text-yellow-300">
                <p className="mb-4">
                  Subscribe to our newsletter to stay updated.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-black text-yellow-400 border border-yellow-600 px-4 py-2 rounded-l-lg focus:outline-none w-full"
                  />
                  <motion.button
                    className="bg-yellow-500 text-black px-4 py-2 rounded-r-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Copyright and Social Media */}
          <div className="mt-12 pt-8 border-t border-yellow-800 flex flex-col sm:flex-row justify-between items-center">
            <motion.div
              className="text-sm text-yellow-600 mb-4 sm:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}>
              © {new Date().getFullYear()} Ujwal Soch. All rights reserved.
            </motion.div>

            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}>
              <motion.a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                whileHover={{ y: -3 }}>
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                whileHover={{ y: -3 }}>
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                whileHover={{ y: -3 }}>
                <Instagram size={24} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for 3D card effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-270 {
          transform: rotate(270deg);
        }
      `}</style>
    </div>
  );
}
