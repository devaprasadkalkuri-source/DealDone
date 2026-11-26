"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FastForward,
} from "lucide-react";
import Scene01 from "./Scene01";
import Scene02 from "./Scene02";
import Scene03 from "./Scene03";
import Scene04 from "./Scene04";
import Scene05 from "./Scene05";
import Scene06 from "./Scene06";
import Scene07 from "./Scene07";
import Scene08 from "./Scene08";
import { sound } from "./SoundEngine";

export const SCENES = [
  { id: 1, label: "01 Opening", start: 0, duration: 4.0 },
  { id: 2, label: "02 Search", start: 4.0, duration: 4.0 },
  { id: 3, label: "03 Categories", start: 8.0, duration: 4.0 },
  { id: 4, label: "04 Real Deals", start: 12.0, duration: 5.0 },
  { id: 5, label: "05 Local", start: 17.0, duration: 4.0 },
  { id: 6, label: "06 Connect", start: 21.0, duration: 4.0 },
  { id: 7, label: "07 Sell", start: 25.0, duration: 5.0 },
  { id: 8, label: "08 Final", start: 30.0, duration: 6.0 },
];

export const TOTAL_DURATION = 36.0;

export default function AdContainer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastSceneIndexRef = useRef<number>(0);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active scene calculation
  const currentSceneIndex = SCENES.findIndex((s) => {
    const end = s.start + s.duration;
    return currentTime >= s.start && currentTime < end;
  });

  const activeIndex = currentSceneIndex === -1 ? SCENES.length - 1 : currentSceneIndex;
  const activeScene = SCENES[activeIndex];
  const sceneProgress = Math.max(
    0,
    Math.min(1, (currentTime - activeScene.start) / activeScene.duration)
  );

  // Sound transition trigger on scene change
  useEffect(() => {
    if (activeIndex !== lastSceneIndexRef.current) {
      sound.playTransition(240 - activeIndex * 15);
      lastSceneIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  // Master Clock Engine (requestAnimationFrame at 60 FPS)
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (now - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          if (next >= TOTAL_DURATION) {
            return 0; // loop or hold
          }
          return next;
        });
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Audio mute/unmute
  const toggleSound = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setEnabled(!nextMuted);
    if (!nextMuted) sound.playPing(720);
  }, [isMuted]);

  // Keyboard shortcuts (Space: play/pause, R: restart, M: mute, F: fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === "r" || e.key === "R") {
        setCurrentTime(0);
        setIsPlaying(true);
      } else if (e.key === "m" || e.key === "M") {
        toggleSound();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSound]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const jumpToScene = (start: number) => {
    setCurrentTime(start);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${ms}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen bg-[#070b09] flex items-center justify-center overflow-hidden select-none"
    >
      {/* 16:9 Landscape Cinematic Stage */}
      <div
        className="relative w-full aspect-video max-h-screen max-w-[calc(100vh*16/9)] shadow-[0_0_120px_rgba(0,0,0,0.8)] overflow-hidden bg-[#faf8f4]"
        style={{ aspectRatio: "16 / 9" }}
      >
        {/* Render Current Active Scene with Cinematic Crossfade */}
        <AnimatePresence mode="wait">
          {activeIndex === 0 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene01 progress={sceneProgress} active={activeIndex === 0} />
            </motion.div>
          )}

          {activeIndex === 1 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene02 progress={sceneProgress} active={activeIndex === 1} />
            </motion.div>
          )}

          {activeIndex === 2 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene03 progress={sceneProgress} active={activeIndex === 2} />
            </motion.div>
          )}

          {activeIndex === 3 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene04 progress={sceneProgress} active={activeIndex === 3} />
            </motion.div>
          )}

          {activeIndex === 4 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene05 progress={sceneProgress} active={activeIndex === 4} />
            </motion.div>
          )}

          {activeIndex === 5 && (
            <motion.div
              key="scene-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene06 progress={sceneProgress} active={activeIndex === 5} />
            </motion.div>
          )}

          {activeIndex === 6 && (
            <motion.div
              key="scene-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene07 progress={sceneProgress} active={activeIndex === 6} />
            </motion.div>
          )}

          {activeIndex === 7 && (
            <motion.div
              key="scene-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Scene08 progress={sceneProgress} active={activeIndex === 7} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Progress Bar At Top Of Screen */}
        <div className="absolute top-0 inset-x-0 h-1 bg-black/10 z-40">
          <div
            className="h-full bg-gradient-to-r from-[#d4e84a] via-[#f97316] to-[#0a3d2e] transition-all duration-75 ease-linear"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>

        {/* FLOATING HUD CONTROLS (Bottom Overlay) */}
        <motion.div
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-5 inset-x-8 z-50 flex flex-col gap-2 pointer-events-auto"
        >
          {/* Timeline Scrubber */}
          <div className="relative w-full h-2 rounded-full bg-black/40 backdrop-blur-md overflow-hidden cursor-pointer group">
            <div
              className="h-full bg-[#f97316] rounded-full transition-all duration-75"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={TOTAL_DURATION}
              step={0.05}
              value={currentTime}
              onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl text-xs">
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  setCurrentTime(0);
                  setIsPlaying(true);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 transition"
                title="Restart (R)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Time display */}
              <div className="font-mono text-xs text-gray-300 ml-2">
                <span className="text-white font-bold">{formatTime(currentTime)}</span>
                <span className="text-gray-500"> / {formatTime(TOTAL_DURATION)}</span>
              </div>
            </div>

            {/* Scene Selector Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {SCENES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => jumpToScene(s.start)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    activeIndex === idx
                      ? "bg-[#f97316] text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s.label.split(" ")[1]}
                </button>
              ))}
            </div>

            {/* Right Actions: Speed, Sound, Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaybackSpeed((s) => (s === 1 ? 0.5 : 1))}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-gray-200 transition"
                title="Toggle Speed"
              >
                {playbackSpeed}x
              </button>

              <button
                onClick={toggleSound}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 transition"
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 transition"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
