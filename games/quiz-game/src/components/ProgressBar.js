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
    x,
    y,
    value,
    max = 1,
    width = 100,
    height = 30,

    // Optional style configuration
    {
      border = 1,
      borderRadius = 3,
      backgroundColor = 0xff0000, //0x3f72af,
      color = 0x00ff00, //0xdbe2ef,
    } = {}
  ) {
    // super(scene, x, y);
    super(scene, "progress");

    this.scene = scene;
    this.max = max;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = { border, borderRadius, backgroundColor, color };

    // The progressBox is background rectangle, representing max
    this.progressBox = this.scene.add.graphics();
    this.progressBox.fillStyle(backgroundColor, 0.8);
    this.progressBox.fillRoundedRect(
      x, //x - border,
      y, // y - border,
      width, // width + 2 * border,
      height, // height + 2 * border
      borderRadius
    );

    // The progressBar representing value
    this.progressBar = this.scene.add.graphics();
    this.setValue(value);

    scene.add.existing(this);
  }

  // ensure that the value property >= 0
  setValue(val) {
    this.value = val < 0 ? 0 : val;
    this.drawValue();
  }

  drawValue() {
    // console.log("progress: ", this.value / this.max);

    // Clear the command buffer and reset the fill style and line style to their defaults.
    this.progressBar.clear();

    this.progressBox.fillStyle(this.style.color, 1);

    this.progressBar.fillRoundedRect(
      this.x + this.style.border,
      this.y + this.style.border,
      (this.width - 2 * this.style.border) * (this.value / this.max),
      this.height - 2 * this.style.border,
      this.value != 0 ? this.style.borderRadius : 0 // { tl: radius, tr: 0, bl: radius, br: 0 }
    );
  }
}
