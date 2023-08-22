export default class TransformDemo extends Phaser.Scene {
  preload() {
    this.load.image("carrot", "assets/img/carrot.png");
  }

  create() {
    this.addCarrot();
  }

  update() {
    // we can rotate in degrees (angle) or radians ()
    this.carrot0.angle += 1;
  }

  addCarrot() {
    const centerX = this.scale.width / 2;

    this.carrot0 = this.add.image(centerX, 100, "carrot").setScale(0.5);

    // scale and flip
    this.carrot2 = this.add
      .image(centerX, 300, "carrot")
      .setScale(0.5)
      .setFlipX(true);

    // scale and flip
    this.carrot3 = this.add
      .image(centerX, 400, "carrot")
      .setScale(0.5)
      .setFlipY(true);
  }
}
