export default class ScoreText extends Phaser.GameObjects.Text {
  constructor(scene, x, y, initScore) {
    super(scene, x, y, `Score: ${initScore}`);
    scene.add.existing(this);
    this.score = initScore;
  }

  updateScore(val) {
    this.score += val;
    this.setText(`Score: ${this.score}`);
  }

  getScore() {
    return this.score;
  }
}
