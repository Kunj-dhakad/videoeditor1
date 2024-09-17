// components/editor/TimelineMarker.tsx

import React, { useMemo } from "react";

/**
 * TimelineMarker Component
 * Renders a marker on the timeline to indicate the current frame position
 */
const TimelineMarker: React.FC<{
  currentFrame: number;
  totalDuration: number;
}> = React.memo(({ currentFrame, totalDuration }) => {
  const markerPosition = useMemo(() => {
    return `${(currentFrame / totalDuration) * 100}%`;
  }, [currentFrame, totalDuration]);

  return (
    <div
      className="absolute top-0 w-[1.4px] bg-red-500 pointer-events-none z-50"
      style={{
        left: markerPosition,
        transform: "translateX(-50%)",
        height: "100px",
        top: "0px",
      }}
    >
      <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-red-500 absolute top-[0px] left-1/2 transform -translate-x-1/2" />
    </div>
  );
});

TimelineMarker.displayName = "TimelineMarker";

export default TimelineMarker;
