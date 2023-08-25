export default class TweenDemo extends Phaser.Scene {
  constructor() {
    super({ key: "tween" });
  }

  preload() {
    this.load.setPath("assets");
    this.load.image("carrot", "img/carrot.png");
    this.load.image("ship", "img/playerShip1_red.png");
  }

  create() {
    this.carrot0 = this.add.image(50, 50, "carrot");
    this.console = this.add.text(10, this.cameras.main.height - 50);

    this.ship = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height - 50,
      "ship"
    );

    this.addTweens();
  }

  addTweens() {
    // Playback will start immediately unless the tween has been configured to be paused.
    this.tweens.add({
      targets: this.carrot0,
      delay: 0,
      duration: 1000,
      ease: "Power1", // The easing equation to use for the tween.
      repeat: 0,
      // A function to call when the tween completes
      onComplete: () => {
        console.log("tween completed.");
        this.console.setText("Tween completed.");
      },

      // <yoyo>
      // Should the tween complete, then reverse the values incrementally to get back to the starting tween values?
      // The reverse tweening will also take `duration` milliseconds to complete.
      yoyo: true,
      //   The number of milliseconds to hold the tween for before yoyo'ing.
      hold: 0,
      // Horizontally flip the target of the Tween when it completes (before it yoyos, if set to do so)
      flipX: true,
      flipY: false,
      // </yoyo>

      x: 300,
    });

    // spaceship tween
    this.tweens.add({
      targets: this.ship,
      duration: 1000, // Duration in milliseconds

      // we can tween on multiple properties simultaneously
      scaleX: 1.1, // Scale horizontally to half of its size
      scaleY: 1.1, // Scale vertically to half of its size
      alpha: 0.4,

      ease: "Linear", // Easing function
      yoyo: true, // Don't reverse the tween after completing
      repeat: -1, // Number of times to repeat the tween (-1 means infinite)
      onUpdate: (tween) => {
        const currentScaleX = tween.getValue(0); // Index 0 corresponds to the scaleX property
        console.log("Current scaleX:", currentScaleX);
      },
    });
  }

  update() {}
}
