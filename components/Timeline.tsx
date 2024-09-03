// components/Timeline.tsx

import React from "react";
import { motion } from "framer-motion";

interface Clip {
  name: string;
  start: number;
  end: number;
}

interface TimelineProps {
  clips: Clip[];
  currentFrame: number;
  totalDurationInFrames: number;
  onSeek: (frame: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  clips,
  currentFrame,
  totalDurationInFrames,
  onSeek,
}) => {
  return (
    <div className="h-60 bg-gray-300 flex items-center justify-center">
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "30px",
        }}
      >
        {/* Clips Display */}
        {clips.map((clip, index) => (
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            style={{
              width: `${((clip.end - clip.start) / totalDurationInFrames) * 100}%`,
              height: "100%",
              backgroundColor: "lightblue",
              marginLeft: "10px",
              position: "relative",
            }}
          >
            {clip.name}
          </motion.div>
        ))}
        {/* Scrubber */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
          style={{
            position: "absolute",
            top: 0,
            left: `${(currentFrame / totalDurationInFrames) * 100}%`,
            width: "2px",
            height: "100%",
            backgroundColor: "red",
          }}
          onDrag={(event, info) => {
            const newFrame = Math.round(
              (info.point.x / 300) * totalDurationInFrames
            );
            onSeek(newFrame);
          }}
        />
      </div>
    </div>
  );
};

export default Timeline;
