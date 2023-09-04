export default class Tmp extends Phaser.Scene {
  constructor() {
    super({ key: "tmp" });
  }

  preload() {
    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.addPlayer();
  }

  addPlayer() {
    // Create a new Arcade Sprite object with a Dynamic body.
    this.player = this.physics.add.sprite(100, 100, "dude", 4);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Velocity Component's methods for initial velocity
    this.player.setVelocityX(100);
  }
}
