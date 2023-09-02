export default class GraphicsDemo extends Phaser.Scene {
  constructor() {
    super({ key: "graphics" });
  }

  preload() {
    console.log("Loading...");
  }
  create() {
    this.g = this.add.graphics();

    this.g.lineStyle(2, 0xbcead5);
    this.g.strokeRect(10, 10, 200, 50);

    this.g.fillStyle(0xff9494);
    this.g.fillRoundedRect(10, 100, 200, 50);
  }
  update() {}
}
