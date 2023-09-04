export default class GroupDemo extends Phaser.Scene {
  constructor() {
    super({ key: "groups" });
  }

  preload() {
    this.load.setPath("assets/img");

    this.load.image("carrot", "carrot.png");
    this.load.image("hippo", "animals/hippo.png");
    this.load.image("grass", "block_grass_1.png");
  }
  create() {
    // A. GameObjectFactory
    this.createGroup();

    this.g.getChildren().forEach((element) => {
      console.log(element);
    });

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
  }
  update() {}

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
    this.pdg = this.physics.add.group();

    // All Game Objects created by this Group will automatically be dynamic Arcade Physics objects.
    this.pdg.create(150, 10, "carrot"); // falls down with gravity
    this.pdg.create(200, 100, "carrot");
  }

  createStaticPhysicsGroup() {
    // B2. Creates a Static Physics Group object.
    // All Game Objects created by this Group will automatically be static Arcade Physics objects.
    this.psg = this.physics.add.staticGroup();

    this.psg.create(50, 500, "grass"); // static, doesn't fall down with gravity.
    this.psg.create(120, 500, "grass");
    this.psg.create(190, 500, "grass");
  }
}
