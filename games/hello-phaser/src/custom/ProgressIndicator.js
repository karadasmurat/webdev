export default class ProgressBar extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    {
      border = 1,
      borderRadius = 3,
      colorRemaining = 0x3f72af,
      colorCompleted = 0xdbe2ef,
    } = {}
  ) {
    super(scene, x, y);

    this.scene = scene;
    this.width = width;
    this.height = height;

    this.style = { border, borderRadius, colorRemaining, colorCompleted };

    // The progressBox is background rectangle, representing 100%
    this.progressBox = this.scene.add.graphics();
    this.progressBox.fillStyle(colorRemaining, 1);
    this.progressBox.fillRoundedRect(
      x, //x - border,
      y, // y - border,
      width, // width + 2 * border,
      height, // height + 2 * border
      borderRadius
    );

    // The progressBar representing actual progress
    this.progressBar = this.scene.add.graphics();
    this.progressBar.fillStyle(colorCompleted, 1); // (color, [alpha])

    scene.add.existing(this);
  }

  setProgress(val) {
    this.progressBar.clear();
    this.progressBox.fillStyle(this.style.colorCompleted, 1);

    this.progressBar.fillRoundedRect(
      this.x + this.style.border,
      this.y + this.style.border,
      (this.width - 2 * this.style.border) * val,
      this.height - 2 * this.style.border,
      this.style.borderRadius // { tl: radius, tr: 0, bl: radius, br: 0 }
    );
  }
}
