// By default, ReactPlayer supports many different types of url.
// If you only ever use one type, use imports such as react-player/youtube to reduce your bundle size.
// import ReactPlayer from 'react-player'
import ReactPlayer from "react-player/youtube";

// react-player/lazy to lazy load the appropriate player for the url you pass in
// import ReactPlayer from "react-player/lazy";

export default function VideoDemo() {
  return (
    <div>
      {/* Render a YouTube video player */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        volume={0.8}
        light
      />
    </div>
  );
}
