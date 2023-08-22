export default class Player extends Phaser.Scene {
  constructor() {
    super({ key: "player" });
  }

  preload() {
    console.log("Loading assets for the scene.");

    // load spritesheet
    this.load.spritesheet("player", "assets/img/penguin.png", {
      frameWidth: 144,
      frameHeight: 128,
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    // Change Background to Random Color
    const color = new Phaser.Display.Color();
    this.cameras.main.setBackgroundColor(color.random());

    // Calculate the center of the camera
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.addPlayer();
    this.createAnimations();
  }

  update() {
    this.checkKeysAndMovePlayer();
  }

  addPlayer() {
    // In preload function, you'll see that 'dude' was loaded as a sprite sheet, not an image.
    // notice the optional frame number that sprite is rendering with
    this.player = this.physics.add.sprite(300, 300, "player", 0);

    // when it lands after jumping it will bounce ever so slightly
    this.player.setBounce(0.2);

    // The bounds, by default, are on the outside of the game dimensions.
    // It will stop the player from being able to run off the edges of the screen or jump through the top.
    this.player.setCollideWorldBounds(true);
  }

  createAnimations() {
    /* 
    We have a character with three different animations: moving left, standing still, and moving right. 
    We want to play the appropriate animation based on whether the left or right keys are pressed, 
    and when neither key is pressed, play the "still" animation.  
    */

    this.anims.create({
      key: "move_right",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1,
    });
  }

  checkKeysAndMovePlayer() {
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("move_right", true);
      this.player.body.setVelocityX(200);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
    } else {
      this.player.anims.stop(); // stop current animation
      this.player.body.setVelocity(0, 0);
    }
  }
}
