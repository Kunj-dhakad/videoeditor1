// // components/VideoGrid.tsx

// import React from 'react';

// interface VideoGridProps {
//   onSelectVideo: (videoUrl: string) => void;
// }

// const VideoGrid: React.FC<VideoGridProps> = ({ onSelectVideo }) => {
//   // Example videos - you should replace these URLs with actual video URLs or data from your source
//   const videos = [
//     'https://cdn.pixabay.com/video/2024/07/27/223459_medium.mp4',
//     'https://cdn.pixabay.com/video/2024/07/07/219862_medium.mp4',
//     'https://cdn.pixabay.com/video/2024/03/28/205923_medium.mp4',
//     // Add more videos as needed
//   ];

//   return (
//     <div className="grid grid-cols-3 gap-4 p-4">
//       {videos.map((video, index) => (
//         <div key={index} className="cursor-pointer" onClick={() => onSelectVideo(video)}>
//           <video src={video} className="w-full h-auto border rounded" controls />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoGrid;
import React from 'react';

interface VideoGridProps {
  onSelectVideo: (videoUrl: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ onSelectVideo }) => {
  // Example videos with thumbnail URLs - replace these with actual video and thumbnail URLs
  const videos = [
    {
      url: 'https://cdn.pixabay.com/video/2024/07/27/223459_medium.mp4',
      thumbnail: 'https://img.youtube.com/vi//hqdefault.jpg', // Replace with actual thumbnail URL
    },
    {
      url: 'https://cdn.pixabay.com/video/2024/07/07/219862_medium.mp4',
      thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg', // Replace with actual thumbnail URL
    },
    {
      url: 'https://cdn.pixabay.com/video/2024/03/28/205923_medium.mp4',
      thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg', // Replace with actual thumbnail URL
    },
    // Add more videos with their thumbnails here
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {videos.map((video, index) => (
        <div key={index} className="relative cursor-pointer" onClick={() => onSelectVideo(video.url)}>
          <img
            src={video.thumbnail}
            alt={`Thumbnail for video ${index}`}
            className="w-full h-auto border rounded"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-xl font-bold">add</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
