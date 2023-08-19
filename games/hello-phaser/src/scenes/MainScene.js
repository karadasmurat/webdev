// import Phaser from "../lib/phaser.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
    this.score = 0; // Initialize the score
    this.scoreText = null; // Placeholder for the score text object
  }

  preload() {
    // load images
    this.load.image("gold", "assets/img/gold_1.png");
    this.load.image("background", "assets/img/bg_layer1.png");
    this.load.image("platform", "assets/img/ground_grass.png");
    this.load.image("bunny-stand", "assets/img/bunny1_stand.png");

    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    // this.load.audio("jump", "assets/sfx/phaseJump1.ogg");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.image(240, 320, "background");

    // add a physics enabled platform image in the middle, changing the scale
    // you should see a platform fall on the screen.
    // We actually want our platforms to stay where they are: a static physics body.
    // this.physics.add.image(240, 320, "platform").setScale(0.5);

    // Create a StaticGroup for physics-enabled platforms and assign it to local variable platforms:
    this.platforms = this.physics.add.staticGroup();

    // A Physics Group can create children that are physics enabled.
    // platforms.create(320, 440, "platform").setScale(0.5).refreshBody();

    // then create 5 platforms from the group
    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(200, 500);
      const y = 100 * i + 50;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, "platform");
      platform.setScale(0.5);

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    // create a bunny sprite
    // this.add.sprite(240, 320, "bunny-stand");

    // Create Sprite via the Physics Game Object Factory (this.physics.add)
    // It has a Dynamic Physics body by default.
    this.bunny_stand = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    // In preload function, you'll see that 'dude' was loaded as a sprite sheet, not an image.
    this.player_dude = this.physics.add.sprite(300, 300, "dude");
    // when it lands after jumping it will bounce ever so slightly
    this.player_dude.setBounce(0.2);
    // The bounds, by default, are on the outside of the game dimensions.
    // It will stop the player from being able to run off the edges of the screen or jump through the top.
    this.player_dude.setCollideWorldBounds(true);

    // To allow the player to collide with the platforms we can create a Collider object:
    this.physics.add.collider(this.player_dude, this.platforms);
    this.physics.add.collider(this.bunny_stand, this.platforms);

    this.anims.create({
      key: "move_left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "move_right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // A Text Game Object, as an attribute (initialized at the constructor.)
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "salmon", //"#000",
    });
  }

  update() {
    // lets see update freq on the screen
    // note that update() gets called automatically by the game engine on every frame
    // this.updateScore(1);

    // left and right input logic
    if (this.cursors.left.isDown) {
      this.player_dude.setVelocityX(-160);
      this.player_dude.anims.play("move_left", true);
      this.updateScore(-1);
    } else if (this.cursors.right.isDown) {
      this.player_dude.setVelocityX(160);
      this.player_dude.anims.play("move_right", true);
      this.updateScore(1);
    } else {
      this.player_dude.setVelocityX(0);

      this.player_dude.anims.play("turn");
    }
  }

  // Method to update and display the score
  updateScore(points) {
    this.score += points;
    this.scoreText.setText("Score: " + this.score);
  }
}
