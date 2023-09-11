import events from "../custom/Events.js";
import HealthBar from "../custom/HealthBar.js";
export default class HealthBarDemo extends Phaser.Scene {
  constructor() {
    super({ key: "healthbar" });
  }

  init() {
    console.log("HealthBarDemo");
  }
  preload() {
    this.load.image("heart", "assets/img/heart-128x128.png");
  }

  create() {
    // create a health bar instance
    this.healthBar = new HealthBar(this, 260, 32, 5);
    console.log(this.healthBar);

    this.healthBar.on(events.NO_HEALTH, () => {
      this.scene.start("overlay");
    });

    this.simulateDamage();
  }

  simulateDamage() {
    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.healthBar.damage();
      },
      this
    );
  }
}