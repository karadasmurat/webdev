const worldWidth = 900; // Example world width
const worldHeight = 600; // Example world height

export default class ScrollingWorldFollow extends Phaser.Scene {
  constructor() {
    super({ key: "follow" });
  }

  preload() {
    this.load.image("bg", "assets/img/sky-clouds.jpg");
    this.load.image("ground", "assets/img/block_grass_1.png");

    // load spritesheet
    this.load.spritesheet("player", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set the bounds of the camera to match the game world's dimensions
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.add.image(this.scale.width / 2, this.scale.height / 2, "bg");
    this.addGround();
    this.addPlayer();
    this.createAnimations();

    // Enable collision between the player and the ground
    this.physics.add.collider(this.player, this.platforms);

    // Set the camera to follow the player smoothly with a horizontal deadzone
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    // Enable camera bounds to prevent the camera from going beyond the game world
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
  }

  update() {
    this.checkKeysAndMovePlayer();
  }

  addPlayer() {
    // In preload function, you'll see that 'dude' was loaded as a sprite sheet, not an image.
    // notice the optional frame number that sprite is rendering with
    this.player = this.physics.add.sprite(300, 300, "player", 4);

    // when it lands after jumping it will bounce ever so slightly
    this.player.setBounce(0.2);

    // The bounds, by default, are on the outside of the game dimensions.
    // It will stop the player from being able to run off the edges of the screen or jump through the top.
    // this.player.setCollideWorldBounds(true);
  }

  addGround() {
    // Create a ground/platform
    // this.ground = this.physics.add.staticSprite(
    //   this.scale.width / 2,
    //   worldHeight - 10,
    //   "ground"
    // );

    // this.platforms = this.physics.add.staticGroup();

    // this.platforms.create(150, 550, "ground").refreshBody();
    // this.platforms.create(300, 550, "ground");
    // this.platforms.create(450, 550, "ground");
    // this.platforms.create(600, 550, "ground");
    // this.platforms.create(750, 550, "ground");

    this.platforms = this.physics.add.staticGroup({
      key: "ground",
      repeat: 11,
      setXY: { x: 100, y: worldHeight, stepX: 100 },
    });
  }

  checkKeysAndMovePlayer() {
    if (this.cursors.left.isDown) {
      this.player.anims.play("move_left", true);
      this.player.body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("move_right", true);
      this.player.body.setVelocityX(200);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
    } else {
      this.player.anims.play("stand_still");
      this.player.body.setVelocityX(0);
    }
  }

  createAnimations() {
    /* 
    We have a character with three different animations: moving left, standing still, and moving right. 
    We want to play the appropriate animation based on whether the left or right keys are pressed, 
    and when neither key is pressed, play the "still" animation.  
    */
    this.anims.create({
      key: "move_left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stand_still",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "move_right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
