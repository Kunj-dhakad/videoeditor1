import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo,useEffect, useState, useRef } from "react";
import { Main } from "../remotion/MyComp/Main";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";
import { Tips } from "../components/Tips";
import { Spacing } from "../components/Spacing";
import { CustomControls } from "../components/CustomControls";

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration] = useState<number>(DURATION_IN_FRAMES / VIDEO_FPS);
  const playerRef = useRef<any>(null);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    playerRef.current.seek(time);
    setProgress(time);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(playerRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            ref={playerRef}
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{ width: "100%" }}
            controls={false} // Disable default controls
            autoPlay
            loop
          />
        </div>
        <CustomControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          progress={progress}
          duration={duration}
          onSeek={handleSeek}
        />
        <RenderControls text={text} setText={setText} inputProps={inputProps} />
        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
        <Tips />
      </div>
    </div>
  );
};

export default Home;