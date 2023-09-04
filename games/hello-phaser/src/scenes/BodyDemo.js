export default class BodyDemo extends Phaser.Scene {
  constructor() {
    super({ key: "body" });
  }

  preload() {
    this.player = this.load.image("hippo", "assets/img/animals/hippo.png");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.addPlayer();
  }

  addPlayer() {
    this.player = this.physics.add.sprite(200, 200, "hippo").setScale(0.2);
    this.player.setBounce(0.5);
    // Ensure the character stays within the game world
    this.player.setCollideWorldBounds(true);

    // Disable gravity's effect on player.
    // v1 - use member directly
    // this.player.body.allowGravity = false
    // v2 - use setter
    this.player.body.setAllowGravity(false);

    // Linear drag affects the player's velocity linearly and slows them down over time.
    this.player.body.setDragX(20);
  }
  update() {
    // Handle left and right movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-50); // Move left
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(50); // Move right
    } else {
      // No movement input, let linear drag slow down the character
    }
  }
}
