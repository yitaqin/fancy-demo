import { useRef } from 'react'


export default function ScreenTwo({
  init,
  fullscreen,
  onFullscreen = function() {},
  className,
}: {
  init: boolean;
  fullscreen?: boolean;
  onFullscreen?: (fullscreen: boolean) => void;
  className?: string;
}) {

  const video = useRef(null)

  function exitFullscreen() {
    if (!video.current) return
    (video.current as HTMLVideoElement).pause()
    onFullscreen(false)
  }

  function playVideo() {
    if (!video.current) return
    (video.current as HTMLVideoElement).play()
    onFullscreen(true)
  }

  return (
    <div
      className={`screen-two ${className||''} ${init ? 'screen-two--init' : ''} ${fullscreen ? 'screen-two--fullscreen' : ''}`}
    >
      <div className="screen-two__bg"></div>
      <div className="screen-two__main w-[280px] md:w-[580px] lg:w-[680px]">
        <button type="button" className="screen-two__main__btn-close" onClick={exitFullscreen}>Close</button>
        <div className="screen-two__main__preview">

        <div className="screen-two__main__btn-play" onClick ={playVideo}>▶</div>
        <div className="screen-two__main__title md:!w-auto">Introducing Feed</div>
        </div>
        <video
          ref={video}
          className="screen-two__main__video"
          autoPlay
          controls
        >
          <source
            src="/intro.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
      <div className="screen-scroll-tip">SCROLL DOWN</div>
    </div>
  );
}
