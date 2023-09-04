export default class ComponentsDemo extends Phaser.Scene {
  constructor() {
    super({ key: "components" });
  }

  preload() {
    // load image
    this.load.image("square", "assets/img/block_grass_1.png");
    this.load.image("carrot", "assets/img/carrot.png");
  }
  create() {
    this.square1 = this.add.image(100, 100, "square");

    this.square2 = this.add.image(100, 100, "square");
    // Note that origin serves as a reference point for various transformations, such as positioning, rotation, and scaling.
    this.square2.setOrigin(0, 0);

    this.carrot1 = this.add.image(100, 300, "carrot");

    this.carrot2 = this.add.image(100, 300, "carrot");
    this.carrot2.setOrigin(0, 0);
  }
  update() {
    this.rotateItems();
  }

  rotateItems() {
    this.square1.angle += 2;
    this.square2.angle += 1;

    this.carrot1.angle += 2;
    this.carrot2.angle += 1;
  }
}
