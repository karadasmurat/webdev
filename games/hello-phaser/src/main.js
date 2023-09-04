import KickScene from "./scenes/KickScene.js";
import MainScene from "./scenes/MainScene.js";
import SpaceScene from "./scenes/SpaceScene.js";
import HelloWorld from "./scenes/HelloWorld.js";
import Parallax from "./scenes/Parallax.js";
import Player from "./scenes/Player.js";
import ScrollingWorldFollow from "./scenes/ScrollingWorld.js";
import TilespriteBackground from "./scenes/TilespriteBackground.js";
import TransformDemo from "./scenes/TransformDemo.js";
import LoadingDemo from "./scenes/LoadingDemo.js";
import CustomGameObject from "./scenes/CustomGameObject.js";
import EventsDemo from "./scenes/EventsDemo.js";
import AnimationDemo from "./scenes/AnimationDemo.js";

import TweenDemo from "./scenes/TweenDemo.js";
import AtlasDemo from "./scenes/AtlasDemo.js";
import GraphicsDemo from "./scenes/GraphicsDemo.js";
import ImageDemo from "./scenes/ImageDemo.js";
import ComponentsDemo from "./scenes/ComponentsDemo.js";
import SpriteDemo from "./scenes/SpriteDemo.js";
import PhysicsDemo from "./scenes/PhysicsDemo.js";
import GroupDemo from "./scenes/GroupDemo.js";
import BodyDemo from "./scenes/BodyDemo.js";
/*
The type property can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. 
This is the rendering context that you want to use for your game. 
The recommended value is Phaser.AUTO which automatically tries to use WebGL, 
but if the browser or device doesn't support it it'll fall back to Canvas. 

The width and height properties set the size of the canvas element that Phaser will create. 
*/
const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "gamediv",
    width: 400,
    height: 600,
  },
  scene: BodyDemo, // [HelloWorld, BodyDemo,PhysicsDemo, SpriteDemo, ComponentsDemo, GraphicsDemo, ImageDemo, AtlasDemo,TweenDemo, GroupDemo, LoadingDemo, AnimationDemo, CustomGameObject, EventsDemo, TransformDemo, MainScene, Parallax, Player, ScrollingWorldFollow, TilespriteBackground],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }, // false, //{ y: 200 },
      debug: true,
    },
  },
};
const game = new Phaser.Game(config);

export default game;
