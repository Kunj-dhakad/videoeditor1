import React from 'react';
import { Rnd } from 'react-rnd';


const FIXED_HEIGHT = 200;
const INITIAL_WIDTH = 100;

const MyDraggableComponent: React.FC = () => {
  return (
    <div style={{
      position: 'relative',
      height: `${FIXED_HEIGHT}px`,
      overflow: 'auto',
      border: '1px solid #ddd',
      background: '#f0f0f0'
    }}>
    
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Rnd
          default={{ x: 10, y: 0, width: INITIAL_WIDTH, height: 50 }}
          bounds="parent"
          minWidth={50} 
          style={{
            background: 'lightcoral',
            border: '1px solid #aaa',
            boxSizing: 'border-box'
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            console.log('Resize stopped', position);
          }}
          onDragStop={(e, d) => console.log('Drag stopped', d)}
        >
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Clip 1
          </div>
        </Rnd>

        <Rnd
          default={{ x: 150, y: 0, width: INITIAL_WIDTH, height: 50 }}
          bounds="parent"
          minWidth={50}  
          style={{
            background: 'lightblue',
            border: '1px solid #aaa',
            boxSizing: 'border-box'
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            console.log('Resize stopped', position);
          }}
          onDragStop={(e, d) => console.log('Drag stopped', d)}
        >
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Clip 2
          </div>
        </Rnd>

      </div>
    </div>
  );
};

export default MyDraggableComponent;
