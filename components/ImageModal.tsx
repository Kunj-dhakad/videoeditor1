// components/ImageGrid.tsx

import React from 'react';

interface ImageGridProps {
  onSelectImage: (imageUrl: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ onSelectImage }) => {
  // Example images - you should replace these URLs with actual image URLs or data from your source
  const images = [
    'https://kunj.aivideocreatorfx.in/app/assets/default/videoeditor/files/templates/11.png',
    'https://kunj.aivideocreatorfx.in/app/assets/default/videoeditor/files/templates/9.png',
    'https://kunj.aivideocreatorfx.in/app/assets/default/videoeditor/files/templates/17.png',
    // Add more images as needed
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="cursor-pointer" onClick={() => onSelectImage(image)}>
          <img src={image} alt={`Image ${index}`} className="w-full h-auto border rounded" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
