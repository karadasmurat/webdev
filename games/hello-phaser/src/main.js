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
import { AnimationConsumer } from "./scenes/AnimationDemo.js";

import TweenDemo from "./scenes/TweenDemo.js";
import AtlasDemo from "./scenes/AtlasDemo.js";
import GraphicsDemo from "./scenes/GraphicsDemo.js";
import ImageDemo from "./scenes/ImageDemo.js";
import ComponentsDemo from "./scenes/ComponentsDemo.js";
import SpriteDemo from "./scenes/SpriteDemo.js";
import PhysicsDemo from "./scenes/PhysicsDemo.js";
import GroupDemo from "./scenes/GroupDemo.js";
import BodyDemo from "./scenes/BodyDemo.js";
import Tmp from "./scenes/Tmp.js";
import DragDropDemo from "./scenes/DragDropDemo.js";
import SplashSceneDemo from "./scenes/SplashSceneDemo.js";
import TimerDemo from "./scenes/TimerDemo.js";
import ButtonDemo from "./scenes/ButtonDemo.js";
import SoundDemo from "./scenes/SoundDemo.js";
import ColliderDemo from "./scenes/ColliderDemo.js";
import InputDemo from "./scenes/InputDemo.js";
import SceneUpdateDemo from "./scenes/SceneUpdateDemo.js";
import ProgressDemo from "./scenes/ProgressDemo.js";
import CameraDemo from "./scenes/CameraDemo.js";
import DataDemo from "./scenes/DataDemo.js";
import GroupCollisionDemo from "./scenes/GroupCollisionDemo.js";
import GameOverDemo from "./scenes/GameOverDemo.js";
import OverlayDemo from "./scenes/OverlayDemo.js";
import InputEventsDemo from "./scenes/InputEventsDemo.js";
import DomElementDemo from "./scenes/DomElementDemo.js";
import HealthBarDemo from "./scenes/HealtBarDemo.js";
import PersistenceDemo from "./scenes/PersistenceDemo.js";

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
  backgroundColor: "0xADC4CE",
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
  scene: [SpriteDemo, PersistenceDemo, AnimationConsumer, OverlayDemo], // [HelloWorld, InputEventsDemo, GameOverDemo, GroupCollisionDemo, DataDemo, ProgressDemo, SceneUpdateDemo,InputDemo, AnimationDemo, ColliderDemo, SoundDemo, ButtonDemo, TimerDemo, SplashSceneDemo, DraggableDemo,Tmp, BodyDemo,PhysicsDemo, SpriteDemo, ComponentsDemo, GraphicsDemo, ImageDemo, AtlasDemo,TweenDemo, GroupDemo, LoadingDemo, AnimationDemo, CustomGameObject, EventsDemo, TransformDemo, MainScene, Parallax, Player, ScrollingWorldFollow, TilespriteBackground],
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
