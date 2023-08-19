export default class KickScene extends Phaser.Scene {
  constructor() {
    super({ key: "kick" });
    this.player;
    //this.golds;
    this.gold;
    this.rotationAngle = 0.01;
  }

  preload() {
    this.load.image("player", "assets/img/bubble.png");
    this.load.image("gold", "assets/img/gold_1.png");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.addPlayer();
    this.addGold();

    // To allow the player to collide with the platforms we can create a Collider object:
    this.physics.add.collider(this.player, this.gold);
    // we set a callback to invoke when two objects collide
    // this.physics.add.collider(
    //   this.player,
    //   this.gold,
    //   this.handleCollision,
    //   null,
    //   this
    // );

    this.addEvents();

    // Start the flip animation
    this.tweens.add({
      targets: this.gold,
      scaleX: 0, // Flip horizontally
      duration: 1000, // Duration of the animation in milliseconds
      ease: "Linear",
      yoyo: true, // Reverse the animation
      repeat: -1, // Repeat indefinitely
    });

    // this.cameras.main.setBackgroundColor("#ccc");
    // this.add.image(240, 320, "background");
  }

  update() {
    // this.physics.arcade.collide(this.player, this.gold, () => {
    //   console.log("Player has collided with an enemy!");
    // });

    // this.gold.rotation += 0.05;

    this.checkKeysAndMovePlayer();
  }

  checkKeysAndMovePlayer() {
    // Put this in so that the player stays still if no key is being pressed
    this.player.body.setVelocity(0, 0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-350);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(350);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-350);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(350);
    }
  }

  addPlayer() {
    //const centerX = this.cameras.main.width / 2;
    //const centerX = this.physics.world.bounds.width / 2;
    //const centerX = this.physics.world.bounds.centerX;

    const bottom = this.physics.world.bounds.height - 50;

    this.player = this.physics.add.sprite(
      this.physics.world.bounds.centerX,
      bottom,
      "player"
    );
    this.player.setScale(0.3);
    // The bounds, by default, are on the outside of the game dimensions.
    // It will stop the player from being able to run off the edges of the screen or jump through the top.
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);
    // this.player.setBounce(1, 1); // Adjust the bounce value as needed
    // this.player.setMass(1); // Adjust the mass value as needed
  }

  addGold() {
    // this.golds = this.physics.add.group();
    this.gold = this.physics.add.image(200, 200, "gold").setScale(0.4);
    this.gold.setBounce(1, 1);
    this.gold.setCollideWorldBounds(true);
  }

  addEvents() {
    // listen for a specific key, and handle it:
    this.input.keyboard.on("keydown_A", () => {
      console.log("keydown_A");
      this.player.setVelocityX(-100);
    });

    // listen for pointer move, and handle it:
    this.input.on("pointermove", (pointer) => {
      this.player.setPosition(pointer.x, pointer.y);
      //   this.physics.world.update();
    });
  }

  handleCollision(player, gold) {
    console.log("collusion detected.");
    // Calculate the direction from player to gold
    // const directionX = gold.x - player.x;
    // const directionY = gold.y - player.y;

    // Apply force to the gold object
    // const forceMagnitude = 10; // Adjust the force strength as needed
    // gold.setVelocity(directionX * forceMagnitude, directionY * forceMagnitude);
  }
}
