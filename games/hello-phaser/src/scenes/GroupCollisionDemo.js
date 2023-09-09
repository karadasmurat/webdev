export default class GroupCollisionDemo extends Phaser.Scene {
  constructor() {
    super({ key: "worldbounds" });
  }

  preload() {
    this.load.image("hippo", "assets/img/animals/hippo.png");
    this.load.image("wall", "assets/img/wall-48x48.png");
  }
  create() {
    this.addBall();
    this.addWalls();

    this.physics.add.collider(this.ball, this.walls);
  }

  addWalls() {
    this.walls = this.physics.add.staticGroup({
      key: "wall", // texture assigned at the preload
      quantity: 3, // Start with 5 children
      // Sets the x and y position for all children,
      // Increment each Game Object's horizontal position from the previous by this amount
      setXY: { x: 48, y: 300, stepX: 48 },
      // The scale of each new Game Object, incremental steps.
      // setScale: { x: 1, y: 1, stepX: -0.2, stepY: -0.2 },
    });
  }

  addBall() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.ball = this.physics.add
      .sprite(centerX, centerY, "hippo")
      .setScale(0.2);

    // Bounce component
    this.ball.setBounce(1);
    // make this body collide with world bounds:
    this.ball.setCollideWorldBounds(true);

    // set initial velocity
    this.ball.setVelocity(333);
  }
}
