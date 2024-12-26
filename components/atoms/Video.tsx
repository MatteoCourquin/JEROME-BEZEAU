import { ReactNode, useEffect, useRef } from 'react';

const Video = ({
  poster,
  className,
  children,
}: {
  poster?: string;
  className?: string;
  children: ReactNode;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.error('Playback prevented:', error);
        });
      }
    };

    video.addEventListener('loadeddata', playVideo);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      aria-label="Presentation work video"
      className={className}
      data-webkit-playsinline="true"
      poster={poster}
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
    >
      {children}
    </video>
  );
};

export default Video;

// <!-- Set up -->
//  <video>
//   <!-- Provide the Safari video -->
//    <source src="mp4" type='video/mp4; codecs="hvc1"'>

//   <!-- .. and the Chrome video -->
//    <source src="webm" type="video/webm">
// </video>
