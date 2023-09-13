import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import Helloworld from "./scenes/HelloWorld";
import SpriteDemo from "./scenes/SpriteDemo";
import MongoDBTest from "./scenes/MongoDBTest";

const config = {
  // The title of the game. Shown in the browser console.
  title: "MK Games",
  type: Phaser.AUTO,
  // The background color of the game canvas. The default is black.
  backgroundColor: "0xADC4CE",
  //   parent: "phaser-example",
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
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }, // false, // { y: 200 },
      debug: true,
    },
  },
  scene: [SpriteDemo, Helloworld], //MongoDBTest,
};

const game = new Phaser.Game(config);
