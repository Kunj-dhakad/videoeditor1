// components/editor/ReactVideoEditor.tsx

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { Sequence, Video } from "remotion";
import { LetterText, Plus } from "lucide-react";

import { Clip, TextOverlay } from "../../types/types";
import TimelineMarker from "./TimelineMarker";
import TextOverlayComponent from "./TextOverlayComponent";

/**
 * ReactVideoEditor Component
 * Main component for the video editor interface
 */
const ReactVideoEditor: React.FC = () => {
  // State management
  const [clips, setClips] = useState<Clip[]>([]);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [totalDuration, setTotalDuration] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const playerRef = useRef<PlayerRef>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Add new clip
  const addClip = () => {
    const lastItem = [...clips, ...textOverlays].reduce(
      (latest, item) =>
        item.start + item.duration > latest.start + latest.duration
          ? item
          : latest,
      { start: 0, duration: 0 }
    );

    const newClip: Clip = {
      id: `clip-${clips.length + 1}`,
      start: lastItem.start + lastItem.duration,
      duration: 300,
      src: "https://hgwavsootdmvmjdvfiwc.supabase.co/storage/v1/object/public/clips/reactvideoeditor-quality.mp4?t=2024-09-03T02%3A09%3A02.395Z",
      row: 0,
    };

    setClips([...clips, newClip]);
    updateTotalDuration([...clips, newClip], textOverlays);
  };

  // Add new text overlay
  const addTextOverlay = () => {
    const lastItem = [...clips, ...textOverlays].reduce(
      (latest, item) =>
        item.start + item.duration > latest.start + latest.duration
          ? item
          : latest,
      { start: 0, duration: 0 }
    );

    const newOverlay: TextOverlay = {
      id: `text-${textOverlays.length + 1}`,
      start: lastItem.start + lastItem.duration,
      duration: 100,
      text: `Text ${textOverlays.length + 1}`,
      row: 0,
    };

    setTextOverlays([...textOverlays, newOverlay]);
    updateTotalDuration(clips, [...textOverlays, newOverlay]);
  };

  // Update total duration
  const updateTotalDuration = (
    updatedClips: Clip[],
    updatedTextOverlays: TextOverlay[]
  ) => {
    const lastClipEnd = updatedClips.reduce(
      (max, clip) => Math.max(max, clip.start + clip.duration),
      0
    );
    const lastTextOverlayEnd = updatedTextOverlays.reduce(
      (max, overlay) => Math.max(max, overlay.start + overlay.duration),
      0
    );

    const newTotalDuration = Math.max(lastClipEnd, lastTextOverlayEnd);
    setTotalDuration(newTotalDuration);
  };

  // Composition component for Remotion Player
  const Composition = useCallback(
    () => (
      <>
        {[...clips, ...textOverlays]
          .sort((a, b) => a.start - b.start)
          .map((item) => (
            <Sequence
              key={item.id}
              from={item.start}
              durationInFrames={item.duration}
            >
              {"src" in item ? (
                <Video src={item.src} />
              ) : (
                <TextOverlayComponent text={item.text} />
              )}
            </Sequence>
          ))}
      </>
    ),
    [clips, textOverlays]
  );

  // TimelineItem component
  const TimelineItem: React.FC<{
    item: Clip | TextOverlay;
    type: "clip" | "text";
    index: number;
  }> = ({ item, type, index }) => {
    const bgColor =
      type === "clip"
        ? "bg-indigo-500 to-indigo-400"
        : type === "text"
        ? "bg-purple-500 to-purple-400"
        : "bg-green-500 to-green-400";

    return (
      <div
        className={`absolute h-10 ${bgColor} rounded-md`}
        style={{
          left: `${(item.start / totalDuration) * 100}%`,
          width: `calc(${(item.duration / totalDuration) * 100}% - 4px)`,
          top: `${item.row * 44}px`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
          {type.charAt(0).toUpperCase() + type.slice(1)} {index + 1}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-md cursor-ew-resize mt-1 mb-1 ml-1" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 rounded-md cursor-ew-resize mt-1 mb-1 mr-1" />
      </div>
    );
  };

  // Effect for updating current frame
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const frame = playerRef.current.getCurrentFrame();
        if (frame !== null) {
          setCurrentFrame(frame);
        }
      }
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, []);

  // Effect for checking mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile view message if on a mobile device
  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Mobile View Not Supported</h2>
          <p className="text-md">This video editor is only available on desktop or laptop devices.</p>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="flex-col text-white">
      {/* Player section */}
      <div className="flex overflow-hidden">
        <div className="border border-gray-700 flex-grow p-6">
          <div className="relative h-64 w-full">
            <Player
              ref={playerRef}
              component={Composition}
              durationInFrames={totalDuration}
              compositionHeight={1080}
              compositionWidth={1920}
              fps={30}
              controls
            />
            <TimelineMarker currentFrame={currentFrame} totalDuration={totalDuration} />
          </div>
          <button
            onClick={addClip}
            className="absolute top-0 right-0 p-2 bg-blue-500 rounded-md text-white"
          >
            Add Clip
          </button>
          <button
            onClick={addTextOverlay}
            className="absolute top-0 right-16 p-2 bg-green-500 rounded-md text-white"
          >
            Add Text Overlay
          </button>
        </div>
      </div>

      {/* Timeline section */}
      <div className="relative">
        <div className="h-12 border-t border-gray-700 absolute top-0 w-full bg-gray-900" />
        <div
          className="relative h-12 bg-gray-800"
          ref={timelineRef}
        >
          {[...clips, ...textOverlays]
            .sort((a, b) => a.start - b.start)
            .map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                type={"src" in item ? "clip" : "text"}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReactVideoEditor;
