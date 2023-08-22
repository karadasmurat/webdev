export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  create() {
    // Change Background to Random Color
    const color = new Phaser.Display.Color();
    this.cameras.main.setBackgroundColor(color.random());

    // Create start button
    const startButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Start Quiz", {
        fontSize: "32px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("QuizScene");
      });
  }
}
