export default class SpaceScene extends Phaser.Scene {
  constructor() {
    super({ key: "space" });
    this.ship;
    this.cursors;
  }

  preload() {
    // this.load.image("background", "assets/img/bg_layer1.png");
    this.load.image("laser", "assets/img/laserBlue02.png");
    this.load.image("ship", "assets/img/playerShip1_red.png");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    // this.cameras.main.setBackgroundColor("#ccc");
    // this.add.image(240, 320, "background");

    this.addShip();
    this.addEvents();
  }

  update() {}

  addShip() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height - 50;

    this.ship = this.physics.add.sprite(centerX, bottom, "ship");
    // The bounds, by default, are on the outside of the game dimensions.
    // It will stop the player from being able to run off the edges of the screen or jump through the top.
    this.ship.setCollideWorldBounds(true);
  }

  addEvents() {
    // listen for a specific key, and handle it:
    this.input.keyboard.on("keydown_A", () => {
      console.log("keydown_A");
      this.ship.setVelocityX(-160);
    });

    this.input.keyboard.on("keydown_D", () => {
      console.log("keydown_D");
      this.ship.setVelocityX(160);
    });

    // listen for pointer move, and handle it:
    this.input.on("pointermove", (pointer) => {
      this.ship.x = pointer.x;
    });
  }
}
