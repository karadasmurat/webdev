import Button from "../custom/Button.js";

export default class GroupDemo extends Phaser.Scene {
  constructor() {
    super({ key: "groups" });

    this.fireable = true;
  }

  preload() {
    this.load.setPath("assets/img");

    this.load.image("carrot", "carrot.png");
    this.load.image("hippo", "animals/hippo.png");
    this.load.image("panda", "animals/panda.png");
    this.load.image("grass", "block_grass_1.png");
    this.load.image("plus", "plus.png");
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    // A. GameObjectFactory
    this.createGroup();

    // this.g.getChildren().forEach((element) => {
    //   console.log(element);
    // });

    // this.time.delayedCall(
    //   1000,
    //   () => {
    //     console.log("delayedCall");
    //     this.g.destroy(true);
    //   },
    //   this
    // );

    // B. Arcade.Factory
    this.createDynamicPhysicsGroup();
    this.createStaticPhysicsGroup();

    // Create with a config
    this.createGroupWithConfig();

    this.initAnimals();
    this.physics.add.collider(this.animals, this.ground);
    this.btn_create = new Button(this, 200, 400, "plus", this.spawnAnimal);

    this.groupInfo(this.groupWithConfig);

    this.periodicCleanup();
  }
  update() {
    // Handle space key press
    // Note that if we press and hold space key, this condition will be true at each frame!
    if (this.fireable && this.cursors.space.isDown) {
      console.log("Fire in the hole!");

      // fired once. now turn the safety on.
      this.fireable = false;
    }

    if (this.cursors.space.isUp) {
      this.fireable = true;
    }
  }

  createGroup() {
    // Create a new Group Game Object (for non-physical objects) and add it to the Scene.
    this.g = this.add.group();

    // 1. Create a new Game Object and adds it to this group
    // Note that it non-physical, ie doesn't fall down with gravity
    this.g.create(10, 50, "carrot");

    const hippo = this.add.sprite(100, 50, "hippo").setScale(0.2);
    // 2. Add a Game Object to this group.
    this.g.add(hippo);
  }

  createDynamicPhysicsGroup() {
    // B1. Create a Physics Group object
    // All Game Objects created by this Group will automatically be dynamic Arcade Physics objects.
    this.obstacles = this.physics.add.group();

    // this.pdg.create(150, 10, "carrot"); // falls down with gravity
    // this.pdg.create(200, 100, "carrot");

    // Add multiple obstacles to the group with random positions and velocities
    for (let i = 0; i < 5; i++) {
      const limitX = this.cameras.main.width;
      const obstacleX = Phaser.Math.Between(50, limitX); // Random x position

      // All Game Objects created by this Group will automatically be dynamic Arcade Physics objects.
      const obstacle = this.obstacles.create(obstacleX, -30, "carrot");

      // Set obstacle properties
      const obstacleVelocityX = Phaser.Math.Between(-100, 100); // Random x velocity
      const obstacleVelocityY = Phaser.Math.Between(-100, 100); // Random y velocity
      obstacle.setVelocity(obstacleVelocityX, obstacleVelocityY);

      // obstacle.setCollideWorldBounds(true); // Prevent obstacles from moving out of bounds
    }
  }

  createStaticPhysicsGroup() {
    // B2. Creates a Static Physics Group object.
    // All Game Objects created by this Group will automatically be static Arcade Physics objects.
    this.ground = this.physics.add.staticGroup();

    this.ground.create(50, 500, "grass"); // static, doesn't fall down with gravity.
    this.ground.create(120, 500, "grass");
    this.ground.create(190, 500, "grass");
  }

  createGroupWithConfig() {
    this.groupWithConfig = this.add.group({
      key: "panda", // texture assigned at the preload
      quantity: 4, // Start with 5 children
      // Sets the x and y position for all children, Increment each Game Object's horizontal position from the previous by this amount
      setXY: { x: 100, y: 200, stepX: 100 },
      // The scale of each new Game Object, incremental steps.
      setScale: { x: 1, y: 1, stepX: -0.2, stepY: -0.2 },
    });
  }

  groupInfo(group) {
    // v1. iterate through Groups children, using for-of
    for (const child of group.getChildren()) {
      // 'obstacle' represents each child in the group
      // You can perform actions or access properties of each obstacle here
      console.log("Child", child);
    }

    // v2. iterate through Groups children, using foreach
    group.getChildren().forEach((child) => {
      console.log("Child", child);
    });
  }

  initAnimals() {
    this.animals = this.physics.add.group();
  }

  // TODO -
  spawnAnimal() {
    // Creates a new Game Object and adds it to this group. Return the new Game Object
    const newAnimal = this.animals.create(200, 200, "hippo");
    newAnimal.setScale(0.2);
    const randomX = Phaser.Math.Between(0, this.cameras.main.width);
    newAnimal.setPosition(randomX, 0);
    newAnimal.setBounce(0.2);
  }

  periodicCleanup() {
    // Set up a timer to periodically clean up invisible items
    this.timedEvent = this.time.addEvent({
      delay: 5000, // Adjust the delay as needed
      loop: true, // Set to true for periodic execution
      callback: this.destroyInvisibleItems,
      callbackScope: this,
    });
  }

  // Function to destroy invisible items
  // Iterate through group, and check y coordinates of items to destroy()
  destroyInvisibleItems() {
    console.log(
      "Periodic cleanup. Active Members:",
      this.animals.getTotalUsed()
    );

    const itemsToRemove = [];

    for (const item of this.animals.getChildren()) {
      // if (!item.visible) { // visible property does not seem to work, compare y coordinate instead.
      if (item.y > this.game.config.height) {
        // item.destroy(); // avoid modifying the group while iterating over it
        itemsToRemove.push(item);
      }
    }

    // Remove the marked items
    // console.log("Items to remove:", itemsToRemove.length);
    itemsToRemove.forEach((item) => {
      item.destroy();
    });
  }
}
