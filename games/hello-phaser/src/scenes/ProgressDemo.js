import ProgressBar from "../custom/ProgressBar.js";
export default class ProgressDemo extends Phaser.Scene {
  constructor() {
    super({ key: "progressdemo" });
  }

  init() {}
  preload() {}
  create() {
    this.progressBar = new ProgressBar(this, 52, 10, 10, 100, 30);
    // this.progressBar.setValue(0.5);
  }
  update() {}
}
