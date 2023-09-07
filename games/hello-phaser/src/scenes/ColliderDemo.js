export default class ColliderDemo extends Phaser.Scene {
  constructor() {
    super({ key: "collider" });
  }

  init() {}
  preload() {
    this.load.image("hippo", "assets/img/animals/hippo.png");
    this.load.image("snake", "assets/img/animals/snake.png");

    // load atlas
    this.load.atlas(
      "explosion_atlas",
      "assets/atlas/explosion.png",
      "assets/atlas/explosion.json"
    );
  }
  create() {
    this.hippos = this.physics.add.group();
    this.snakes = this.physics.add.group();

    this.physics.add.collider(
      this.hippos,
      this.snakes,
      this.handleCollusion.bind(this) // TODO investigate binding and addEvent callback scope
    );

    this.createAnims();

    this.time.addEvent({
      delay: 1000,
      //   loop: true,
      repeat: 5,
      callback: this.spawnAnimals.bind(this), // TODO investigate binding and addEvent callback scope
    });
  }

  handleCollusion(object1, object2) {
    console.log("handling collusion");
    const collusionX = (object1.x + object2.x) / 2;
    const collusionY = (object1.y + object2.y) / 2;

    // We create a new sprite at the position of object1 where the collision occurred.
    const explosion = this.add.sprite(
      collusionX,
      collusionY,
      "explosion_atlas"
    );
    explosion.play("anim_explosion").setScale(0.7);
    object1.destroy();
    object2.destroy();

    // explosion.on("animationcomplete", () => {
    //   explosion.destroy(); // Destroy the sprite when the animation completes
    // });
  }

  spawnAnimals() {
    this.createHippo();
    this.createSnake();
  }

  createHippo() {
    const randomY = Phaser.Math.Between(0, this.cameras.main.height);
    this.hippos.create(0, randomY, "hippo").setScale(0.2).setVelocityX(40);
  }

  createSnake() {
    const snakeX = this.cameras.main.width;
    const randomY = Phaser.Math.Between(0, this.cameras.main.height);
    this.snakes
      .create(snakeX, randomY, "snake")
      .setScale(0.2)
      .setVelocityX(-40);
  }

  update() {
    this.repositionItems();
  }

  repositionItems() {
    for (const hippo of this.hippos.getChildren()) {
      if (hippo.x > this.cameras.main.width) {
        hippo.setPosition(0, Phaser.Math.Between(0, this.cameras.main.height));
      }
    }

    for (const snake of this.snakes.getChildren()) {
      if (snake.x < 0) {
        snake.setPosition(
          this.cameras.main.width,
          Phaser.Math.Between(0, this.cameras.main.height)
        );
      }
    }
  }

  createAnims() {
    this.anims.create({
      key: "anim_explosion",
      // use helper method, using frame names from atlas json
      frames: this.anims.generateFrameNames("explosion_atlas", {
        prefix: "explode0",
        end: 7,
      }),
      frameRate: 10,
      hideOnComplete: true, // Should sprite.visible = false when the animation finishes?
    });
  }
}
