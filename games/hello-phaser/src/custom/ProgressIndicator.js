export default class ProgressBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, border = 3) {
    super(scene, x, y);

    this.scene = scene;
    this.width = width;
    this.height = height;

    // The progressBox is background rectangle, representing 100%
    this.progressBox = this.scene.add.graphics();
    this.progressBox.fillStyle(0xfa8072, 0.5);
    this.progressBox.fillRect(
      x - border,
      y - border,
      width + 2 * border,
      height + 2 * border
    );

    // The progressBar representing actual progress
    this.progressBar = this.scene.add.graphics();
    this.progressBar.fillStyle(0xffffff, 1);

    scene.add.existing(this);
  }

  setProgress(val) {
    this.progressBar.fillRect(this.x, this.y, this.width * val, this.height);
  }
}
