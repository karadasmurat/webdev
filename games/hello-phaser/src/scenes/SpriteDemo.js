export default class SpriteDemo extends Phaser.Scene {
  constructor() {
    super({ key: "sprite" });
  }

  preload() {
    this.load.image("carrot", "assets/img/carrot.png");
    this.load.image("hippo", "assets/img/animals/hippo.png");
    this.load.image("panda", "assets/img/animals/panda.png");
    this.load.image("monkey", "assets/img/animals/monkey.png");

    // A sprite can be created from a regular image, but
    // an animated sprite will need to use a special type of image called a "spritesheet".
    // Each frame has the same width and same height: "frameConfig" parameter
    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    // Sprite GameObject
    // Note that if you do not require animation then you can safely use an Image Game Object
    this.carrot = this.add.sprite(100, 100, "carrot");
    this.makeCarrotDraggable();

    // Physics Sprite
    this.hippo = this.physics.add.sprite(100, 100, "hippo").setScale(0.2);

    // Using a frame from spritesheet
    // sprite(x, y, texture, [frame])
    // frame is an optional string | number identifying the frame from the Texture this Game Object is rendering with.
    this.player = this.add.sprite(100, 200, "dude", 4);

    this.createAnimations();

    // Start playing the given animation on this Sprite.
    this.player.play("move_right");

    // GameObjectCreator - create many common types of Game Objects and return them, using a configuration object
    this.createFromConfig();
  }
  update() {
    this.moveIt();
  }
  createAnimations() {
    /* 
    We have a character with three different animations: moving left, standing still, and moving right. 
    We want to play the appropriate animation based on whether the left or right keys are pressed, 
    and when neither key is pressed, play the "still" animation.  
    */

    this.anims.create({
      key: "move_right",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createFromConfig() {
    const config = {
      key: ["panda", "monkey"], // "panda",
      x: { randInt: [50, 300] },
      y: function () {
        return 200 + Math.random() * 300;
      },
      scale: { randFloat: [0.05, 0.3] },
    };

    for (let i = 0; i < 5; i++) {
      this.make.sprite(config);
    }
  }

  // move a sprite
  // Updating the sprite's position on each frame
  moveIt() {
    this.player.x -= 2;
    if (this.player.x <= 0) {
      this.player.x = this.cameras.main.width;
    }
  }

  makeCarrotDraggable() {
    this.carrot.setInteractive({ draggable: true, cursor: "pointer" });
    this.carrot.on("drag", (pointer, dragX, dragY) => {
      this.carrot.setPosition(dragX, dragY);
    });
  }
}
