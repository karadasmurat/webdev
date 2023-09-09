export default class SceneUpdateDemo extends Phaser.Scene {
  constructor() {
    super({ key: "update" });
  }

  create() {
    this.consoleTxt = this.add.text(10, 10, "");
  }

  update(time, delta) {
    // exptectation- 60 fps, delta = 1000 ms / 60 = 16.66
    this.log(`time: ${time} ms\ndelta: ${delta} ms`);
  }

  log(txt) {
    this.consoleTxt.setText(txt);
  }
}
