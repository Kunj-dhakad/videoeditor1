
// import { z } from "zod";
// import {
//   AbsoluteFill,
//   Sequence,
//   spring,
//   useCurrentFrame,
//   useVideoConfig,
//   Img,
//   Video,
// } from "remotion";
// import { CompositionProps } from "../../types/constants";
// import { NextLogo } from "./NextLogo";
// import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
// import React from "react";
// import { Rings } from "./Rings";
// import { TextFade } from "./TextFade";

// loadFont();

// export const Main = ({ title, image,video }: z.infer<typeof CompositionProps>) => {
//   const frame = useCurrentFrame();
//   const { fps } = useVideoConfig();

//   const transitionStart = 2 * fps;
//   const transitionDuration = 1 * fps;

//   const logoOut = spring({
//     fps,
//     frame,
//     config: {
//       damping: 200,
//     },
//     durationInFrames: transitionDuration,
//     delay: transitionStart,
//   });

//   return (
//     <AbsoluteFill className="bg-white">
//         {/* {video && (

//     <AbsoluteFill>
//       <Video src={video} />
//     </AbsoluteFill>

//         )} */}
      
//       {video && (
//     <Sequence from={20} durationInFrames={2000}>
//       <Video src={video} />
//     </Sequence>
//   )}
//       <Sequence durationInFrames={transitionStart + transitionDuration}>
//         <Rings outProgress={logoOut} />
        
//         <AbsoluteFill className="justify-center items-center">
//           <NextLogo outProgress={logoOut} />
//         </AbsoluteFill>

//         {image && (
//         <AbsoluteFill className="bottom-0 right-0 flex justify-center items-center">
//           <Img
//             src={image}
//             style={{
//               width: "50%",
//               height: "auto",
//               maxWidth: "100%",
//               maxHeight: "100%",
//               objectFit: "contain",
//             }}
//           />
//         </AbsoluteFill>
        
//       )}
      
//       </Sequence>
//       <Sequence from={transitionStart + transitionDuration / 2}>
//         <TextFade>
//           <h1
//             className="text-[70px] font-bold"
//             style={{
//               fontFamily,
//             }}
//           >
//             {title}
//           </h1>
//         </TextFade>
//       </Sequence>
   
       
//     </AbsoluteFill>
//   );
// };



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

export const Main = ({ title, image,video }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
    <Sequence from={20} durationInFrames={2000}>
      <Video src={video} />
    </Sequence>
  )}
  {image && (
        <Sequence from={1000} durationInFrames={1000} >
          <Img
            src={image}
            style={{
              width: "30%",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
       </Sequence>
        
      )}
    </AbsoluteFill>
  );
};



// import { z } from "zod";
// import {
//   AbsoluteFill,
//   Sequence,
//   spring,
//   useCurrentFrame,
//   useVideoConfig,
//   Img,
//   Video,
// } from "remotion";
// import { CompositionProps } from "../../types/constants";
// import React from "react";

// export const Main = ({ title, image, video, imageRange, videoRange }: z.infer<typeof CompositionProps>) => {
//   const frame = useCurrentFrame();
//   const { fps } = useVideoConfig();

//   const transitionStart = 2 * fps;
//   const transitionDuration = 1 * fps;

//   const logoOut = spring({
//     fps,
//     frame,
//     config: {
//       damping: 200,
//     },
//     durationInFrames: transitionDuration,
//     delay: transitionStart,
//   });

//   return (
//     <AbsoluteFill className="bg-white">
//       {video && videoRange && (
//         <Sequence from={videoRange.start} durationInFrames={videoRange.end - videoRange.start}>
//           <Video src={video} />
//         </Sequence>
//       )}
//       {image && imageRange && (
//         <Sequence from={imageRange.start} durationInFrames={imageRange.end - imageRange.start}>
//           <Img
//             src={image}
//             style={{
//               width: "30%",
//               height: "auto",
//               maxWidth: "100%",
//               maxHeight: "100%",
//               objectFit: "contain",
//             }}
//           />
//         </Sequence>
//       )}
//     </AbsoluteFill>
//   );
// };



