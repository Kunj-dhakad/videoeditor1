
import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Video,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import React from "react";
import { TextFade } from "./TextFade";

export const Main = ({ title ,title1,title2,title3,title4,image,imagess, video }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const firstImage = imagess[0];

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });

  return (
        <AbsoluteFill className="bg-white">
      {video && (
        <Sequence from={1} durationInFrames={900}>
          <Video src={video} />
        </Sequence>
      )}
       {image && ( 
        <Sequence from={firstImage.images} durationInFrames={firstImage.imagee}>
          <Img
            src={firstImage.src}
            style={{
              width: firstImage.width,
              height:firstImage.height,
              maxWidth:firstImage.maxWidth,
              maxHeight:firstImage.maxHeight,
              // objectFit:firstImage.objectFit,

            }}
          />
        </Sequence>
       )}
      <Sequence from={2} durationInFrames={60}>
        <TextFade>
          <h1 className="text-[70px] font-bold">{title}</h1>
        </TextFade>
      </Sequence>
      <Sequence from={65} durationInFrames={60}>
        <TextFade>
          <h1 className="text-[70px] font-bold">{title1}</h1>
        </TextFade>
      </Sequence>
      <Sequence from={130} durationInFrames={60}>
        <TextFade>
          <h1 className="text-[70px] font-bold">{title2}</h1>
        </TextFade>
      </Sequence>
      <Sequence from={200} durationInFrames={60}>
        <TextFade>
          <h1 className="text-[70px] font-bold">{title3}</h1>
        </TextFade>
      </Sequence>
      <Sequence from={270} durationInFrames={60}>
        <TextFade>
          <h1 className="text-[70px] font-bold">{title4
            
            }</h1>
        </TextFade>
      </Sequence>
    </AbsoluteFill>
  );
};
