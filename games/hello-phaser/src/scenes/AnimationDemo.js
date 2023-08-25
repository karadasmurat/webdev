export default class AnimationDemo extends Phaser.Scene {
  constructor() {
    super({ key: "animate" });
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

  update() {}

  addPlayer() {
    // In preload function, you'll see that 'dude' was loaded as a sprite sheet, not an image.
    // notice the optional frame number that sprite is rendering with
    this.player_dude = this.add.sprite(300, 300, "dude", 4);
  }
}
