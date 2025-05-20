import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import vid1 from "./assets/welcome-us.mp4";
import vid2 from "./assets/vid1.mp4";
import vid3 from "./assets/vid2.mp4";
export default function VideoCarousel() {
  // Sample video sources - replace with your actual videos
  const videos = [
    vid1,
    vid2,
    vid3
  ];
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Handle video navigation
  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  // Reset video state when changing videos
  useEffect(() => {
  if (videoRef.current) {
    setCurrentTime(0);
    // Force video element to load the new source
    videoRef.current.load();
    // Set autoplay and start playing
    videoRef.current.autoplay = true;
    const playPromise = videoRef.current.play();
    
    // Handle potential play() promise rejection (browsers may block autoplay)
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.log('Autoplay prevented by browser:', error);
          setIsPlaying(false);
        });
    }
  }
}, [currentVideoIndex]);

  // Video playback controls
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
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
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
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex justify-center h-full">
      <div className="w-full h-full max-w-screen-xl relative rounded-2xl overflow-hidden shadow-2xl">
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}>
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Left/Right Navigation Controls */}
        <button 
          onClick={goToPrevVideo}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
          aria-label="Previous video">
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={goToNextVideo}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
          aria-label="Next video">
          <ChevronRight size={24} />
        </button>

        {/* Video Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-3 py-1 rounded-full">
          <div className="flex space-x-2">
            {videos.map((_, index) => (
              <span 
                key={index} 
                className={`h-2 w-2 rounded-full ${index === currentVideoIndex ? 'bg-white' : 'bg-gray-500'}`}
              />
            ))}
          </div>
        </div>

        {/* Custom Video Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 p-3 w-full max-w-lg flex flex-col">
          {/* Progress Bar */}
          <div className="flex items-center mb-2">
            <span className="text-white text-xs mr-2">
              {formatTime(currentTime)}
            </span>
            <div className="flex-grow relative h-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="absolute top-0 left-0 w-full h-2 rounded-lg appearance-none bg-black cursor-pointer z-10"
                style={{
                  background: `linear-gradient(to right, #EFB230 0%, #EFB230 ${
                    (currentTime / duration) * 100
                  }%, #4b5563 ${
                    (currentTime / duration) * 100
                  }%, #4b5563 100%)`,
                }}
              />
            </div>
            <span className="text-white text-xs ml-2">
              {formatTime(duration)}
            </span>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-yellow-300 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-yellow-300 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            
            <div className="text-white text-xs">
              Video {currentVideoIndex + 1} of {videos.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}