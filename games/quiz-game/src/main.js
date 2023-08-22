/*
The type property can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. 
This is the rendering context that you want to use for your game. 
The recommended value is Phaser.AUTO which automatically tries to use WebGL, 
but if the browser or device doesn't support it it'll fall back to Canvas. 

The width and height properties set the size of the canvas element that Phaser will create. 
*/

import MainMenuScene from "./scenes/MainMenuScene.js";
import QuizScene from "./scenes/QuizScene.js";
import ResultsScene from "./scenes/ResultsScene.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "gamediv",
    width: 800,
    height: 600,
  },
  scene: [MainMenuScene, QuizScene, ResultsScene],
};
const game = new Phaser.Game(config);

export default game;
