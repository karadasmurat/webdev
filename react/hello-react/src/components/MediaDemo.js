import React from "react";
import ReactPlayer from "react-player";

export default function MediaDemo() {
  const video1 = "https://www.youtube.com/watch?v=4XpnKHJAok8";
  const bird1 = new Audio(
    "https://upload.wikimedia.org/wikipedia/commons/9/9b/Hydroprogne_caspia_-_Caspian_Tern_XC432679.mp3"
  );

  const bird2 = new Audio(
    "https://upload.wikimedia.org/wikipedia/commons/b/b5/Hydroprogne_caspia_-_Caspian_Tern_XC432881.mp3"
  );

  function toggle(audio) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  return (
    <div>
      <h2>react-player</h2>
      <ReactPlayer url={video1} playing={false} volume={0.5} controls />
      <h2>JavaScript Audio()</h2>
      <button onClick={() => toggle(bird1)}>Caspian Tern 1</button>
      <button onClick={() => toggle(bird2)}>Caspian Tern 2</button>
    </div>
  );
}
