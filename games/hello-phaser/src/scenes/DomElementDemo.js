export default class DomElementDemo extends Phaser.Scene {
  constructor() {
    super({ key: "dom" });
  }

  init() {
    console.log("Init DomElementsDemo.");
  }
  preload() {
    this.load.html("answerForm", "assets/html/answer_form.html");
  }

  create() {
    this.form = this.add.dom(10, 10).createFromCache("answerForm");
    this.form.setOrigin(0);
  }
}
