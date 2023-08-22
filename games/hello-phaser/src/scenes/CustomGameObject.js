import ScoreText from "../custom/Score.js";

export default class CustomGameObject extends Phaser.Scene {
  constructor() {
    super({ key: "customGO" });
  }

  preload() {}
  create() {
    this.scoreBoard = new ScoreText(this, 20, 20, 0);
  }
  update() {
    this.scoreBoard.updateScore(2);
  }
}
