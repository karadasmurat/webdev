export default class HelloWorld extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
  }

  preload() {
    console.log("Loading assets for the scene.");
  }
  create() {
    console.log("Play scene created.");

    this.add.text(250, 240, "hello, there!");

    this.scene.start("kick");
  }

  update() {
    console.log("Play scene updated.");
  }
}
