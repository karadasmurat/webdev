export default class TransformDemo extends Phaser.Scene {
  preload() {
    this.load.image("carrot", "assets/img/carrot.png");
  }

  create() {
    // Create a group to hold the falling carrots
    this.carrotsGroup = this.add.group();

    // Set up a timer to create falling carrots every second
    this.time.addEvent({
      delay: 1000,
      callback: this.createCarrot,
      callbackScope: this,
      loop: true,
    });

    this.addCarrot();
  }

  update() {
    // we can rotate in degrees (angle) or radians ()
    this.carrot0.angle += 1;

    // we can manually update position at each frame, to create illusion of movement:
    // this.moveCarrot(this.carrot4, 2);
    // this.moveCarrot(this.carrot2, 4);

    // Move carrots downwards
    this.carrotsGroup.getChildren().forEach((carrot) => {
      carrot.y += carrot.spd;
      // Remove carrots that are out of bounds
      if (carrot.y > this.cameras.main.height) {
        this.carrotsGroup.remove(carrot, true, true);
      }
    });
  }

  addCarrot() {
    const centerX = this.scale.width / 2;

    this.carrot0 = this.add.image(centerX, 100, "carrot").setScale(0.5);

    // scale and flip
    // this.carrot2 = this.add
    //   .image(centerX, 300, "carrot")
    //   .setScale(0.5)
    //   .setFlipX(true);

    // scale and flip
    // this.carrot3 = this.add
    //   .image(centerX, 400, "carrot")
    //   .setScale(0.5)
    //   .setFlipY(true);

    // this.carrot4 = this.add.image(centerX, 0, "carrot");

    // this.carrot5 = this.physics.add.image(centerX, 0, "carrot");

    this.fallingCarrots;
  }

  moveCarrot(carrot, speed) {
    carrot.y += speed;
    console.log();

    if (carrot.y > this.scale.height) {
      this.resetPosition(carrot);
    }
  }

  resetPosition(carrot) {
    carrot.y = 0;
    carrot.x = Phaser.Math.Between(0, this.scale.width);
  }

  createCarrot() {
    const x = Phaser.Math.Between(0, this.cameras.main.width); // Random x position
    const speed = Phaser.Math.Between(2, 5); // Random falling speed

    // Create a carrot sprite
    const carrot = this.add.sprite(x, -20, "carrot");
    carrot.spd = speed;
    this.carrotsGroup.add(carrot); // Add carrot to the group

    // Set a random tint color for variety
    carrot.setTint(Phaser.Math.RND.integerInRange(0x000000, 0xffffff));
  }
}
