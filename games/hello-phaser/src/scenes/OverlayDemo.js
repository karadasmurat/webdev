export default class OverlayDemo extends Phaser.Scene {
  constructor() {
    super({ key: "overlay" });
  }

  create() {
    this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
      console.log("RESUME GAME.");

      // start([key], [data])
      // Shutdown this Scene and run the given one.
      this.scene.start("gameover");
    });

    this.createOverlay();
  }

  // Create a Semi-Transparent Overlay
  createOverlay() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.overlay = this.add.graphics();
    this.overlay.fillStyle(0xff0000, 1); // Color with opacity
    this.overlay.fillRect(0, 0, width, height);
    this.overlay.setAlpha(0);

    this.tweens.add({
      targets: [this.overlay],
      alpha: 0.5,
      duration: 500, // Duration of the fade-in effect in milliseconds
      onComplete: () => {
        console.log("tween complete");
        this.displayInfo();
      },
    });
  }

  displayInfo() {
    const gameOverText = this.add.text(
      this.cameras.main.width / 2,
      (this.cameras.main.height * 2) / 3,
      "Overlay",
      {
        font: "48px Arial",
        fill: "#fff", // Text color
        // backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
        padding: 20, // Padding around the text
      }
    );
    gameOverText.setOrigin(0.5);

    this.add
      .text(
        this.cameras.main.width / 2,
        (this.cameras.main.height * 2) / 3 + 50,
        "Click to Restart",
        {
          font: "24px Arial",
          fill: "#fff", // Text color
          // backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
          padding: 20, // Padding around the text
        }
      )
      .setOrigin(0.5);
  }
}
