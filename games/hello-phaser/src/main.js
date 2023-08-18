import Phaser from "./lib/phaser.js";
import MainScene from "./scenes/MainScene.js";

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
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
};
const game = new Phaser.Game(config);

export default game;
