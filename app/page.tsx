// // pages/index.tsx

"use client";
import { Player, PlayerRef } from "@remotion/player";

import type { NextPage } from "next";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Main } from "../remotion/MyComp/Main";
import { CompositionProps, defaultMyCompProps, DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";
import ImageGrid from "../components/ImageModal";
import VideoGrid from "../components/VideoModal";
import { FaPlay, FaPause, } from 'react-icons/fa';
import { useCurrentPlayerFrame } from "../components/timeline/use-current-player-frame";
import {getClipsArray} from "../components/timeline/react-grid-layout";
// import MyDraggableComponent from "../components/timeline/rnd";
import Rv  from "../components/timeline/react-virtualized";


// import TimelineMarker from "../components/editor/TimelineMarker";
// import ReactVideoEditor from "../components/editor/editor";

const Home: NextPage = () => {


  const [text, setText] = useState<string>(defaultMyCompProps.title);
  const [durationInFrames, setDuration] = useState<number>(defaultMyCompProps.durationInFrames);

  const [image, setImage] = useState<string>(defaultMyCompProps.image);
  const [video, setVideo] = useState<string>(defaultMyCompProps.video);

  const [view, setView] = useState<'menu' | 'imageGrid' | 'videoGrid'>('menu');
  const [playpause, setplaypause] = useState<true | false>(false);


  const playerRef = useRef<PlayerRef>(null);

  const clipss = getClipsArray();

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => ({
    title: text,
    title1: "to my",
    title2: " video",
    title3: "editor in",
    title4: " remotion",
    imagess: [
      {
        src: image,
        width: '30%',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '30%',
        objectFit: 'contain',
        images: 1,
        imagee: 400,
      },
    ],
    clipss,
    image: image,
    durationInFrames: durationInFrames,
    videoWidth: 1920,
    videoHeight: 1080,
    video: video,

  }), [text, image, video, durationInFrames,clipss]);

      console.log("home page"+ clipss);

  const handleSelectImage = (imageUrl: string) => {
    setImage(imageUrl);
    setView('menu'); // Reset view to menu after selecting an image
  };

  const handleSelectVideo = (videoUrl: string) => {
    setVideo(videoUrl);
    setView('menu'); // Reset view to menu after selecting a video
  };

  // timeline start
  const playpausetoggle = () => {
    if (playerRef.current) {
      //  console.log(playerRef.current.getScale())
      if (playerRef.current.isPlaying()) {
        playerRef.current.pause()
        setplaypause(false)
      } else {
        playerRef.current.play();
        setplaypause(true)
      }
    }

  }

  // player time 
  const totalSeconds = useCurrentPlayerFrame(playerRef);

  const convertSecondsToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const playerHours = String(hours).padStart(2, '0');
    const playerMinutes = String(minutes).padStart(2, '0');
    const playerSeconds = String(seconds).padStart(2, '0');

    return { playerHours, playerMinutes, playerSeconds };
  };

  const { playerHours, playerMinutes, playerSeconds } = convertSecondsToTime(Math.floor(totalSeconds / 30));

  // seekbar


  const seekbardivmove = totalSeconds;
  // const handleTimeUpdate = (time:number) => {
  //   if (playerRef.current) {
  //     playerRef.current.seekTo(time); 
  //   }
  // };
  // handleTimeUpdate(totalSeconds)


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
          <input className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none"
            type="number" onChange={(e) => setDuration(Number(e.target.value))} />
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
              style={{
                width: "80%",
                height: "350px"
              }}
              controls
              autoPlay={false}
              loop

            />
            {/* <ReactVideoEditor/> */}
          </div>

          {/* timeline start */}
          <div className=" p-3 bg-emerald-200">
            <div className="p-2 my-2 h-10 rounded-lg 	text-center  text-sky-600  flex items-center justify-center">
              {/* PLAY BUTTON  */}
              <div >
                <button onClick={playpausetoggle} className="h-8 w-8 mx-4 flex items-center justify-center rounded-full bg-white">
                  {
                    playpause ?
                      <FaPause />
                      :
                      <FaPlay />
                  }
                </button>
              </div>

              <div>{playerHours}:{playerMinutes}:{playerSeconds} | 00:00:00  </div>
            </div>
            {/* timing bar */}

            {/* <div className="flex justify-between py-2 font-mono">
              <span className="">00</span>
              <span className="">01</span>
              <span className="">03</span>
              <span className="">6</span>
              <span className="">9</span>
              <span className="">12</span>
              <span className="">15</span>
              <span className="">18</span>
              <span className="">21</span>
              <span className="">24</span>
              <span className="">27</span>
              <span className="">30</span>
              <span className="">33</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>
              <span className="">36</span>



            </div> */}

            {/* <div className="absolute h-32 bg-red-400 w-px"
              style={{ marginLeft: `${seekbardivmove}px`, }}>
            </div> */}

        {/* <div className="p-2  h-10 rounded-lg 	text-center  text-fuchsia-100  bg-slate-500 flex items-center justify-center">clip1</div>

                <div className="p-2 my-2 h-10 rounded-lg 	text-center  text-fuchsia-100  bg-orange-300 flex items-center justify-center">clip2</div>

            <div className="p-2 my-2 h-10 rounded-lg 	text-center  text-fuchsia-100  bg-red-300 flex items-center justify-center">clip3</div> */}

            {/* <ExampleGrid /> */}
          {/* <MyDraggableComponent/> */}
           <Rv/>
          </div>
          {/* timeline end */}

        </div>
      </div>
    </div>
  );
};

export default Home;
