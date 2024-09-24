import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../Components/Loader";
import Island from "../models/Island";
import Bird from "../models/Bird";
import Sky from "../models/Sky";
import Plane from "../models/Plane";
import HomeInfo from "../Components/HomeInfo";
import sakura from '../assets/sakura.mp3';
import { soundoff, soundon } from "../assets/icons";

// Smooth fade-in/out for audio
const fadeAudio = (audioRef, fadeIn = true) => {
  let fadeInterval;
  if (fadeIn) {
    audioRef.current.volume = 0;
    fadeInterval = setInterval(() => {
      if (audioRef.current.volume < 0.4) {
        audioRef.current.volume += 0.02;
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  } else {
    fadeInterval = setInterval(() => {
      if (audioRef.current.volume > 0) {
        audioRef.current.volume -= 0.02;
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  }
};

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    if (isPlayingMusic) {
      fadeAudio(audioRef, true);
      audioRef.current.play();
    } else {
      fadeAudio(audioRef, false);
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let rotation = [0.1, 4.7, 0];
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/* Overlay with animated background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-400 to-purple-600 animate-pulse"></div>

      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* Canvas for 3D models */}
      <Canvas
        className={`w-full h-screen bg-transparent z-5 ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Updated Sound Control with Animated Button */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className={`w-12 h-12 cursor-pointer object-contain transition-transform transform ${
            isPlayingMusic ? "rotate-180 scale-125" : ""
          }`}
          onClick={() => {
            setIsPlayingMusic(!isPlayingMusic);
          }}
        />
        <span className="ml-2 text-white text-lg">
          {isPlayingMusic ? "Music On" : "Music Off"}
        </span>
      </div>
    </section>
  );
};

export default Home;
