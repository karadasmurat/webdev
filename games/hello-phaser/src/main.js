import CurveDemo from "./scenes/CurveDemo.js";
import BackendDemo from "./scenes/BackendDemo.js";
import HelloWorld from "./scenes/HelloWorld.js";

/*
The type property can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. 
This is the rendering context that you want to use for your game. 
The recommended value is Phaser.AUTO which automatically tries to use WebGL, 
but if the browser or device doesn't support it it'll fall back to Canvas. 

The width and height properties set the size of the canvas element that Phaser will create. 
*/
const config = {
  // The title of the game. Shown in the browser console.
  title: "MK Games",
  type: Phaser.AUTO,
  // The background color of the game canvas. The default is black.
  // backgroundColor: "0xADC4CE",
  // The Scale Manager configuration.
  scale: {
    // FIT: scale while maintaining the aspect ratio
    // Phaser will scale everything on the canvas proportionally
    // mode: Phaser.Scale.FIT,
    // autocenter: Phaser.Scale.CENTER_BOTH,
    parent: "gamediv",
    width: 400,
    height: 600,
  },
  // In order for DOM Elements to display
  // We must also have a parent container, specified by the parent property
  dom: {
    createContainer: true,
  },
  scene: [BackendDemo], // [HelloWorld, BackendDemo, CurveDemo, TextDemo, InputEventsDemo, GameOverDemo, GroupCollisionDemo, DataDemo, ProgressDemo, SceneUpdateDemo,InputDemo, AnimationDemo, ColliderDemo, SoundDemo, ButtonDemo, TimerDemo, SplashSceneDemo, DraggableDemo,Tmp, BodyDemo,PhysicsDemo, SpriteDemo, ComponentsDemo, GraphicsDemo, ImageDemo, AtlasDemo,TweenDemo, GroupDemo, LoadingDemo, AnimationDemo, CustomGameObject, EventsDemo, TransformDemo, MainScene, Parallax, Player, ScrollingWorldFollow, TilespriteBackground],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }, // false, // { y: 200 },
      debug: true,
    },
  },
};
const game = new Phaser.Game(config);

export default game;
