import Phaser from "./lib/phaser.js";
import KickScene from "./scenes/KickScene.js";
import MainScene from "./scenes/MainScene.js";
import SpaceScene from "./scenes/SpaceScene.js";
import HelloWorld from "./scenes/HelloWorld.js";

/*
The type property can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. 
This is the rendering context that you want to use for your game. 
The recommended value is Phaser.AUTO which automatically tries to use WebGL, 
but if the browser or device doesn't support it it'll fall back to Canvas. 

The width and height properties set the size of the canvas element that Phaser will create. 
*/
const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [HelloWorld, KickScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false, //{ y: 200 }
      debug: true,
      // fps: 60, // Physics update rate (frames per second)
      // fpsTarget: 60, // Frame rate target (frames per second)
    },
  },
};
const game = new Phaser.Game(config);

export default game;
