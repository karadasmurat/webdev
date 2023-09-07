/**
 *
 *    ----- (  0%)  value = 0
 *    xx--- ( 40%)  value = 0.4
 *    xxxxx (100%)  value = 1
 */
// export default class ProgressBar extends Phaser.GameObjects.Container {
export default class ProgressBar extends Phaser.GameObjects.GameObject {
  constructor(
    scene,
    value,
    x,
    y,
    width,
    height,
    {
      border = 1,
      borderRadius = 3,
      colorBackground = 0x3f72af,
      colorCompleted = 0xdbe2ef,
    } = {}
  ) {
    // super(scene, x, y);
    super(scene, "progress");

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = { border, borderRadius, colorBackground, colorCompleted };

    // The progressBox is background rectangle, representing 100%
    this.progressBox = this.scene.add.graphics();
    this.progressBox.fillStyle(colorBackground, 1);
    this.progressBox.fillRoundedRect(
      x, //x - border,
      y, // y - border,
      width, // width + 2 * border,
      height, // height + 2 * border
      borderRadius
    );

    // The progressBar representing actual status
    this.progressBar = this.scene.add.graphics();
    this.setValue(value);

    scene.add.existing(this);
  }

  // setter, value is normalized [0-1]
  setValue(val) {
    this.value = Phaser.Math.Clamp(val, 0, 1);
    this.drawProgress();
  }

  drawProgress() {
    this.progressBar.clear();
    this.progressBox.fillStyle(this.style.colorCompleted, 1);

    this.progressBar.fillRoundedRect(
      this.x + this.style.border,
      this.y + this.style.border,
      (this.width - 2 * this.style.border) * this.value,
      this.height - 2 * this.style.border,
      this.style.borderRadius // { tl: radius, tr: 0, bl: radius, br: 0 }
    );
  }
}
