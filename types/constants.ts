import { z } from "zod";
export const COMP_NAME = "MyComp";
export const ImageDetailsSchema = z.object({
  src: z.string().url(), 
  width: z.string(), 
  height: z.string(), 
  maxWidth: z.string(), 
  maxHeight: z.string(), 
  objectFit: z.string(), 
  images:z.number(),
  imagee:z.number(),
});
export const CompositionProps = z.object({
  title: z.string(),
  title1: z.string(),
  title2: z.string(),
  title3: z.string(),
  imagess: z.array(ImageDetailsSchema),
  title4: z.string(),
  image: z.string(),
  video: z.string(),
  durationInFrames: z.number(),
  videoWidth: z.number(),         
  videoHeight: z.number(),  
  
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "welcome ",
  title1: " to my ",
  title2: "video ",
  title3: " editor",
  title4: "in remotion",
  imagess: [
    {
      src: "https://picsum.photos/200/300",
      width: '30%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      images:1,
      imagee:60,
    },
  ],
  image: "https://picsum.photos/200/300",  
  video:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  durationInFrames: 300,         
  videoWidth: 1280,             
  videoHeight: 720, 
};



export const DURATION_IN_FRAMES =1920;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;






// import { z } from "zod";
// export const COMP_NAME = "MyComp";

// export const CompositionProps = z.object({
//   title: z.string(),
//   image: z.string(),
//   video: z.string(),
//   durationInFrames: z.number(),
//   fps: z.number().min(1),
//   width: z.number().min(1),
//   height: z.number().min(1),
//   imageRange: z.object({
//     start: z.number().min(0),
//     end: z.number().min(0),
//   }).optional(),
//   videoRange: z.object({
//     start: z.number().min(0),
//     end: z.number().min(0),
//   }).optional(),
// });

// export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
//   title: "Welcome my videoeditor",
//   image: "https://picsum.photos/200/300",
//   video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//   durationInFrames: 200,
//   fps: 30,
//   width: 1280,
//   height: 720,
//   imageRange: { start: 1000, end: 2000 },
//   videoRange: { start: 20, end: 2000 },

// };

// export const DURATION_IN_FRAMES =2000;
// export const VIDEO_WIDTH = 1280;
// export const VIDEO_HEIGHT = 720;
// export const VIDEO_FPS = 30;
