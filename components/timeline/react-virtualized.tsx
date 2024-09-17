
import React from 'react';
import { MultiGrid } from 'react-virtualized';
import ExampleGrid from "./react-grid-layout";

const STYLE = {
  border: '1px solid #ddd',
};

const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};

const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};

const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};



const cellRenderer = ({ columnIndex, key, rowIndex, style }: any) => {
  if (rowIndex === 0) {

    return (
      <div key={key} style={style} className="timeline-cell  p-1 border-l-2 text-center flex items-center justify-center">
        {` ${columnIndex + 1}`}
      </div>
    );
  }

  
  
  console.log("columnIndex : "+columnIndex)
  console.log("key : "+key)
  console.log("rowIndex : "+rowIndex)
  console.log("style : "+style)

  return (
    
    <div className="timeline-cell p-1">
      <ExampleGrid/>
    </div>
  );

};

const getRowHeight = ({ index }: any) => {
  
  if (index === 0) {
    return 50; 
  }
 
  return 150;  
};

const Rv = () => {
  return (
    <div style={{ position: 'relative', height: 300, width: 980 }}>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <MultiGrid
          cellRenderer={cellRenderer}
          columnWidth={50}
          columnCount={100}
          fixedRowCount={1}
          fixedColumnCount={0}
          height={300 - 40}
          rowHeight={getRowHeight}
          rowCount={2}
          style={STYLE}
          styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
          styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
          styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
          width={950}
          hideTopRightGridScrollbar={false}
          hideBottomLeftGridScrollbar={true}
        />
      </div>
    </div>
  );
};

export default Rv;
