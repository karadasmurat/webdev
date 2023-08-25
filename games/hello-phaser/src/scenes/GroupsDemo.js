export default class GroupsDemo extends Phaser.Scene {
  constructor() {
    super({ key: "groups" });
  }

  preload() {
    this.load.setPath("assets/img");

    this.load.image("carrot", "carrot.png");
    this.load.image("hippo", "animals/hippo.png");
  }
  create() {
    // Create a group for non-physical objects
    this.g = this.add.group();

    this.g.create(10, 50, "carrot"); // doesn't fall down with gravity

    const hippo = this.add.sprite(100, 50, "hippo").setScale(0.2);
    this.g.add(hippo);

    this.g.getChildren().forEach((element) => {
      console.log(element);
    });

    this.time.delayedCall(
      1000,
      () => {
        console.log("delayedCall");
        this.g.destroy(true);
      },
      this
    );

    // Physics groups allow objects to collide, overlap, and perform physics-based interactions.
    // All Game Objects created by this Group will automatically be dynamic Arcade Physics objects.
    this.pg = this.physics.add.group();

    this.pg.create(200, 10, "carrot"); // falls down with gravity
  }
  update() {}
}
