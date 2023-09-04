export default class ImageDemo extends Phaser.Scene {
  constructor() {
    super({ key: "image" });
  }

  preload() {
    console.log("loading...");
    // load image
    this.load.image("carrot", "assets/img/carrot.png");
  }
  create() {
    // the default origin for objects like Sprites and Images is at the center of the object
    // Note that (0, 0) is the top-left corner of the game's coordinate system
    // The image will be placed such that its origin (center) aligns with the (0, 0).
    // Therefore only a quarter of it will be visible!

    // Note that factory methods return the Game Object that was created
    // We can assign it as a property of the current object making it accessible
    // throughout the scene's methods and functions
    this.item = this.add.image(0, 0, "carrot");
    // By adjusting the origin, you can control how images and sprites are positioned and rotated relative to their coordinate points.
    this.item.setOrigin(0, 0);

    // this.item.setRandomPosition();

    // this.add.image(100, 100, "gold");
  }
  update() {}
}
