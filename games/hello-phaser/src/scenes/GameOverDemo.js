export default class GameOverDemo extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
  }

  preload() {
    this.load.image("hippo", "assets/img/animals/hippo.png");
    this.load.image("wall", "assets/img/wall-48x48.png");
  }
  create() {
    this.addBall();
    this.addWalls();

    this.physics.add.collider(this.ball, this.walls);

    this.simulateGameOver();
  }

  addWalls() {
    this.walls = this.physics.add.staticGroup({
      key: "wall", // texture assigned at the preload
      quantity: 3, // Start with 5 children
      // Sets the x and y position for all children,
      // Increment each Game Object's horizontal position from the previous by this amount
      setXY: { x: 48, y: 300, stepX: 48 },
      // The scale of each new Game Object, incremental steps.
      // setScale: { x: 1, y: 1, stepX: -0.2, stepY: -0.2 },
    });
  }

  addBall() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.ball = this.physics.add
      .sprite(centerX, centerY, "hippo")
      .setScale(0.2);

    // Bounce component
    this.ball.setBounce(1);
    // make this body collide with world bounds:
    this.ball.setCollideWorldBounds(true);

    // set initial velocity
    this.ball.setVelocity(333);
  }

  // Create a Semi-Transparent Overlay
  createOverlay() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.overlay = this.add.graphics();
    this.overlay.fillStyle(0xff0000, 0.7); // Color with opacity
    this.overlay.fillRect(0, 0, width, height);
    this.overlay.setAlpha(0.7);

    const gameOverText = this.add.text(
      width / 2,
      (height * 2) / 3,
      "Game Over",
      {
        font: "48px Arial",
        fill: "#fff", // Text color
        // backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
        padding: 20, // Padding around the text
      }
    );
    gameOverText.setOrigin(0.5);
  }

  simulateGameOver() {
    this.time.delayedCall(
      2000,
      () => {
        // Shutdown the Scene, clearing display list, timers, etc.
        // this.scene.stop();

        // Shutdown this Scene and run the given one.
        // this.scene.start("overlay");

        // Makes this Scene sleep then starts the Scene given:
        // this.scene.switch("overlay");

        // Pause the Scene - this stops the update step from happening but it still renders.
        this.scene.pause();
        // Launch the given Scene and run it in parallel with this one.
        this.scene.launch("overlay");

        // this.cameras.main.fadeOut(1000, 127, 127, 127);
        // this.cameras.main.on("camerafadeoutcomplete", () => {
        //   console.log("camerafadeoutcomplete, pausing the scene.");
        //   this.scene.pause();
        // });
        // this.ball.setGravityY(0); // Disable vertical gravity
        // this.ball.setVelocity(0);
        // this.physics.world.disable(this.ball.body);
        // this.tweens.add({
        //   targets: [this.overlay],
        //   alpha: 0.8,
        //   duration: 500, // Duration of the fade-in effect in milliseconds
        //   pauseOnBlur: false,
        //   onComplete: () => {
        //     console.log("tween complete, pausing the scene.");
        //     // this.scene.pause();
        //   },
        // });
      },
      [],
      this
    );
  }
}
