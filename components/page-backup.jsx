// // pages/index.tsx

"use client";
import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Main } from "../remotion/MyComp/Main";
import { CompositionProps, defaultMyCompProps, DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";
import Timeline from "../components/Timeline";
import ImageGrid from "../components/ImageModal";
import VideoGrid from "../components/VideoModal";

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);
  const [image, setImage] = useState<string>(defaultMyCompProps.image);
  const [video, setVideo] = useState<string>(defaultMyCompProps.video);
  
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [view, setView] = useState<'menu' | 'imageGrid' | 'videoGrid'>('menu');

  const playerRef = useRef<HTMLVideoElement | null>(null);

  const clips = [
    { name: "Clip 1", start: 0, end: 50 },
    { name: "Clip 2", start: 51, end: 100 },
    { name: "Clip 3", start: 101, end: 150 },
  ];

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => ({
    title: text,
    image: image,
    video: video,
  }), [text, image, video]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        setCurrentFrame(prevFrame => prevFrame + 1);
      }
    }, 1000 / VIDEO_FPS);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => setIsPlaying(prev => !prev);

  const handleSeek = (frame: number) => {
    setCurrentFrame(frame);
    if (playerRef.current) {
      playerRef.current.currentTime = frame / VIDEO_FPS;
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setImage(imageUrl);
    setView('menu'); // Reset view to menu after selecting an image
  };

  const handleSelectVideo = (videoUrl: string) => {
    setVideo(videoUrl);
    setView('menu'); // Reset view to menu after selecting a video
  };

  const totalDurationInSeconds = DURATION_IN_FRAMES / VIDEO_FPS;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Conditional rendering for menu, image grid, and video grid */}
        <div className={`w-full md:w-1/4 bg-gray-100 p-4 ${view === 'menu' ? '' : 'hidden'}`}>
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <button
            className="w-full mb-2 bg-blue-500 text-white p-2 rounded"
            onClick={() => setView('imageGrid')}
          >
            Add Image
          </button>
          <button
            className="w-full mb-2 bg-green-500 text-white p-2 rounded"
            onClick={() => setView('videoGrid')}
          >
            Add Video
          </button>
          <button className="w-full mb-2 bg-red-500 text-white p-2 rounded">
            Add Text
          </button>
          <RenderControls
            text={text}
            setText={setText}
            image={image}
            setImage={setImage}
            video={video}
            setVideo={setVideo}
            inputProps={inputProps}
          />
        </div>

        {view === 'imageGrid' && (
          <div className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col h-screen">
            <button
              className="bg-red-500 text-white p-2 rounded mb-4"
              onClick={() => setView('menu')}
            >
              Close
            </button>
            <ImageGrid onSelectImage={handleSelectImage} />
          </div>
        )}

        {view === 'videoGrid' && (
          <div className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col h-screen">
            <button
              className="bg-red-500 text-white p-2 rounded mb-4"
              onClick={() => setView('menu')}
            >
              Close
            </button>
            <VideoGrid onSelectVideo={handleSelectVideo} />
          </div>
        )}

        <div className="flex-grow w-full md:w-3/4 bg-white p-4">
          {/* Video Player */}
          <div className="flex-grow bg-gray-200 flex items-center justify-center mb-4">
            <Player
              ref={playerRef}
              component={Main}
              inputProps={inputProps}
              durationInFrames={DURATION_IN_FRAMES}
              fps={VIDEO_FPS}
              compositionHeight={VIDEO_HEIGHT}
              compositionWidth={VIDEO_WIDTH}
              style={{ width: "100%" }}
              controls
              autoPlay={false}
              loop
            />
          </div>
          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handlePlayPause}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
          {/* Time Ruler */}
          <div className="h-10 bg-white flex items-center">
            {Array.from({ length: Math.ceil(totalDurationInSeconds / 2) }, (_, index) => (
              <div
                key={index}
                style={{
                  width: `${(2 / totalDurationInSeconds) * 100}%`,
                  textAlign: "center",
                  fontSize: "12px",
                  borderLeft: index === 0 ? "none" : "1px solid gray",
                }}
              >
                {index * 2}s
              </div>
            ))}
          </div>
          {/* Timeline Component */}
          <Timeline
            clips={clips}
            currentFrame={currentFrame}
            totalDurationInFrames={DURATION_IN_FRAMES}
            onSeek={handleSeek}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
