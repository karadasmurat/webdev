export default class SplashSceneDemo extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
  }

  preload() {
    // Load any assets you want to display in the splash scene (e.g., logos, images)
    // For example:
    this.load.image("hello", "assets/img/hello.jpg");
  }
  create() {
    this.addSplashLogo();
    this.tweenLogo();

    // Set a timer to automatically transition to the main game scene after a delay
    // we could check "time" in update as well.
    this.time.delayedCall(3000, this.startGame, [], this);
  }

  addSplashLogo() {
    // find the center of canvas
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Splash screen image or logo
    this.logo = this.add.image(centerX, centerY, "hello");

    // hide logo initially
    this.logo.setAlpha(0);

    // set the scale of logo, using a "scaleFactor"
    // 1. Calculate the desired size for the logo (e.g., 80% of the screen width)
    const desiredWidth = this.cameras.main.width * 0.8;
    // 2. Calculate the scale factor to achieve the desired width
    const scaleFactor = desiredWidth / this.logo.width;
    // 3. setScale using scaleFactor
    this.logo.setScale(scaleFactor);

    console.log("scaleFactor:", scaleFactor);
  }

  update(time, delta) {
    // we check time for delay effect.
    // we could also use a delayedCall (or addEvent)
    // if (time > 3000) {
    //   this.startGame();
    // }
  }

  startGame() {
    // Start your main game scene
    this.scene.start("helloworld", { author: "MK" }); // key of Scene, data
  }

  tweenLogo() {
    this.tweens.add({
      targets: this.logo,

      alpha: 1,

      delay: 300,
      duration: 750,
      ease: "Power1", // The easing equation to use for the tween.
      repeat: 0,
      // A function to call when the tween completes
      onComplete: () => {
        console.log("tween completed.");
      },
      yoyo: true,
      //   The number of milliseconds to hold the tween for before yoyo'ing.
      hold: 1000,
    });

    // this.tweens.add({
    //   targets: this.logo,

    //   x: this.cameras.main.width * -2, // move to left

    //   delay: 2111,
    //   duration: 1000,
    //   ease: "Power2", // The easing equation to use for the tween.
    //   repeat: 0,
    //   // A function to call when the tween completes
    //   onComplete: () => {
    //     console.log("tween completed.");
    //   },
    // });
  }
}
