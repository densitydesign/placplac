import React from 'react';

interface VideoPlayerProps {
  src: string;
  height: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
}
export const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    src,
    height,
    autoplay = false,
    muted = true,
    controls = true,
  } = props;
  return (
    <video
      width={'100%'}
      height={height.toString()}
      autoPlay={autoplay}
      muted={muted}
      controls={controls}
    >
      <source src={src}></source>
      Your browser does not support the video tag.
    </video>
  );
};
