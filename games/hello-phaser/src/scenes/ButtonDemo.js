import Button from "../custom/Button.js";

export default class ButtonDemo extends Phaser.Scene {
  constructor() {
    super({ key: "button" });
  }

  init() {
    this.cameras.main.backgroundColor = 0xccc;
  }

  preload() {
    this.load.image("btn", "assets/img/start-button.png");
    this.load.image("hippo", "assets/img/animals/hippo.png");
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // custom Button GameObject
    this.btn2 = new Button(this, centerX, centerY, "btn", this.startGame);
  }

  update() {}

  startGame() {
    this.scene.start("helloworld");
  }
}
