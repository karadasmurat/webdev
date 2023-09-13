import GameTimer from "../components/GameTimer.js";
import ProgressBar from "../components/ProgressBar.js";

export default class Test extends Phaser.Scene {
  constructor() {
    super({ key: "test" });
  }

  create() {
    this.progressbar = new ProgressBar(this, 10, 10, 0, 2);
    const timeLimit = 10;
    this.gameTimer = new GameTimer(this, 680, 60, timeLimit);

    this.gameTimer.on("TIMEOUT", () => {
      console.log("Handle TIMEOUT.");
    });
  }
}
