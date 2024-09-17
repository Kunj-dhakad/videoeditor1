import React, { useState,useRef,useEffect} from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Clip} from "../../types/types";


export let getClipsArray = () => [] as Clip[];

const ExampleGrid: React.FC = () => {
  const [clips, setClips] = useState<Clip[]>([]);

  const clipsRef = useRef(clips); 

  useEffect(() => {
    clipsRef.current = clips;
  }, [clips]);

  // Clips array ko export karenge
  getClipsArray = () => clips;
  const addClip = (id:string,start:number,duration:number) => {
    
    const newClip: Clip = {
      id:id ,
      start: start,
      duration: duration,
      row: 0,
    };

    setClips([...clips, newClip]);
  };

  // console.log(clips);
  // const colsw =200;
  const cols=100;
  const rowHeight = 40; 
  const totalWidth = 5000;  

  const [layoutConfig, setLayout] = useState<Layout[]>([
    { i: 'item1', x: 0, y: 0, w: 6, h: 1 },
    { i: 'item2', x: 0, y: 0, w: 3, h: 1 },
    { i: 'item3', x: 0, y: 0, w: 3, h: 1 },
    { i: 'item4', x: 0, y: 0, w: 3, h: 1 }
  ]);

  const onResizeStop: GridLayout.ItemCallback = (layout, oldLayout, item) => {
    setLayout(layout);
    // console.log(item.i);
    // console.log(item.w);
    // console.log(item.x);
    addClip(item.i,item.w,item.x)
  };

  const onDragStop: GridLayout.ItemCallback = (layout, oldLayout, item) => {
    setLayout(layout);
    // console.log(item.i);
    // console.log(item.w);
    // console.log(item.x);
    addClip(item.i,item.w,item.x)
  };

  return (
    <GridLayout
      className="example-layout"
      layout={layoutConfig}
      cols={cols}
      rowHeight={rowHeight}
      width={totalWidth}
      isResizable={true}
      isDraggable={true}
      resizeHandles={['e', 'w']}
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
    >
      <div key="item1" className="bg-slate-500 rounded-2xl text-center text-fuchsia-100">Clip 1</div>
     <div key="item2" className="bg-red-600 rounded-2xl text-center text-fuchsia-100">Clip 2</div>
        <div key="item3" className="bg-orange-400 rounded-2xl text-center text-fuchsia-100">Clip 3</div>
      {/*<div key="item4" className="bg-yellow-500 rounded-2xl text-center text-fuchsia-100">Clip 4</div> */}
    </GridLayout>
  );
};

export default ExampleGrid;

