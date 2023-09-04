export default class PhysicsDemo extends Phaser.Scene {
  constructor() {
    super({ key: "physics" });
  }

  preload() {
    this.load.image("carrot", "assets/img/carrot.png");

    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    // Create a new Image Game Object and adds it to the Scene.
    this.item1 = this.add.image(200, 100, "carrot");

    //  Create a new Arcade Image object with a Static body.
    this.item_static = this.physics.add.staticImage(300, 100, "carrot");

    // Create a new Arcade Sprite object with a Dynamic body.
    this.player = this.physics.add.sprite(100, 100, "dude", 4);

    this.movePlayer();

    // Enable physics collision between the player and item_static
    this.physics.add.collider(this.player, this.item_static, () => {
      // Callback function when player collides with item_static
      this.player.setVelocityX(0); // Stop player's horizontal velocity
      this.player.setVelocityY(0); // Stop player's vertical velocity
    });
  }

  update() {
    // this.player.x += 1;
  }

  movePlayer() {
    this.player.setVelocityX(50);
  }
}
