export default class PersistenceDemo extends Phaser.Scene {
  constructor() {
    super({ key: "persistence" });
  }

  init() {
    this.loadData();
  }
  preload() {
    this.load.image("light", "assets/img/sun-30x30.png");
    this.load.image("dark", "assets/img/moon-30x30.png");
  }
  create() {
    this.scoreBoard = this.add.text(10, 10, this.score);
    this.add.image(
      333,
      33,
      this.preferences.theme === "light" ? "light" : "dark"
    );
  }
  update() {
    if (Math.random() < 0.01) {
      this.simulateWin();
    }
  }

  loadData() {
    this.score = parseInt(localStorage.getItem("score") ?? 0);
    this.preferences = JSON.parse(localStorage.getItem("preferences"));
  }

  saveData() {
    localStorage.setItem("score", this.score);

    const preferences = {
      theme: "light",
      difficulty: 2,
      musicEnabled: true,
    };

    localStorage.setItem("preferences", JSON.stringify(preferences));
  }

  updateDisplay() {
    this.scoreBoard.setText(this.score);
  }

  simulateWin() {
    this.score += 1;
    this.saveData();
    this.updateDisplay();
  }
}
