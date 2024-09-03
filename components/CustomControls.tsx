import React from 'react';

interface CustomControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const CustomControls: React.FC<CustomControlsProps> = ({
  isPlaying,
  onPlayPause,
  progress,
  duration,
  onSeek,
}) => {
  return (
    <div>
      <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min={0}
        max={duration}
        value={progress || 0} // Ensure value is always defined
        onChange={(e) => onSeek(Number(e.target.value))}
      />
      <span>{progress.toFixed(2)} / {duration.toFixed(2)}</span>
    </div>
  );
};
