export default class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: "ResultsScene" });
  }

  create(data) {
    const score = data.score;

    // Display user's score
    this.add.text(400, 200, `Your Score: ${score}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    // Add a "Play Again" button
    const playAgainButton = this.add
      .text(400, 300, "Play Again", { fontSize: "24px", fill: "#fff" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MainMenuScene");
      });
  }
}
