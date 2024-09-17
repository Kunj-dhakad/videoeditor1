// components/editor/TextOverlayComponent.tsx

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/**
 * TextOverlayComponent
 * Renders a text overlay with a fade-in effect
 */
const TextOverlayComponent: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "64px",
        fontWeight: "bold",
        color: "white",
        textShadow: "0 0 5px black",
        opacity,
      }}
    >
      {text}
    </div>
  );
};

export default TextOverlayComponent;
