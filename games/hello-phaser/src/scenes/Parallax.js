export default class Parallax extends Phaser.Scene {
  constructor() {
    super({ key: "parallax" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("hills", "assets/img/hillsLarge.png"); // 1024 x 400
    this.load.image("mountains", "assets/img/mountains.png");
    this.load.image("foreground", "assets/img/foreground.png");

    this.load.spritesheet("fullscreen", "assets/img/fullscreen.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  create() {
    const { width, height } = this.scale;

    this.bg = this.add.tileSprite(
      width / 2,
      height / 2,
      width,
      height,
      "background"
    );

    this.fg = this.add.tileSprite(
      width / 2,
      height / 2,
      width,
      height,
      "foreground"
    );

    this.addFullScreenBtn(width, height);
  }

  update() {
    // move background slower.
    this.bg.tilePositionX += 0.03;
    this.fg.tilePositionX += 0.06;
  }

  addFullScreenBtn(w, h) {
    this.btn_FS = this.add
      .image(w - 16, 16, "fullscreen", 0)
      .setOrigin(1, 0)
      .setInteractive();

    this.btn_FS.on(
      "pointerup",
      function () {
        if (this.scale.isFullscreen) {
          this.btn_FS.setFrame(0);

          this.scale.stopFullscreen();
        } else {
          this.btn_FS.setFrame(1);

          this.scale.startFullscreen();
        }
      },
      this
    );
  }
}
