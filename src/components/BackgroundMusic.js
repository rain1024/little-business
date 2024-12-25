import { useEffect, useRef } from "react";

export function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("./audio/background-1.mp3");
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;

    audioRef.current.addEventListener("loadedmetadata", () => {
      const duration = audioRef.current.duration;
      if (duration && isFinite(duration)) {
        audioRef.current.currentTime = Math.random() * duration;
      }
    });

    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Audio playback error:", error);
        });
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("keydown", handleInteraction);
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return null;
}
