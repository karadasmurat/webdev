export default class SpriteDemo extends Phaser.Scene {
  constructor() {
    super({ key: "sprite" });
  }

  preload() {
    this.load.image("carrot", "assets/img/carrot.png");

    // A sprite can be created from a regular image, but
    // an animated sprite will need to use a special type of image called a "spritesheet".
    // Each frame has the same width and same height: "frameConfig" parameter
    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    // Note that if you do not require animation then you can safely use an Image Game Object
    this.item1 = this.add.sprite(100, 100, "carrot");

    // sprite(x, y, texture, [frame])
    // frame is an optional string | number identifying the frame from the Texture this Game Object is rendering with.
    this.player = this.add.sprite(100, 200, "dude", 4);
  }
  update() {}
}
