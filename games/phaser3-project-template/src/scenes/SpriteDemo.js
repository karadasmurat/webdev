import dudeImg from "../assets/img/dude.png";
import carrotImg from "../assets/img/carrot.png";
import hippoImg from "../assets/img/animals/hippo.png";

export default class SpriteDemo extends Phaser.Scene {
  constructor() {
    super({ key: "sprite" });
  }

  preload() {
    this.load.image("carrot", carrotImg);
    this.load.image("hippo", hippoImg);

    // A sprite can be created from a regular image, but
    // an animated sprite will need to use a special type of image called a "spritesheet".
    // Each frame has the same width and same height: "frameConfig" parameter
    this.load.spritesheet("dude", dudeImg, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    // Sprite GameObject
    // Note that if you do not require animation then you can safely use an Image Game Object
    this.item1 = this.add.sprite(100, 100, "carrot");

    // Physics Sprite
    this.hippo = this.physics.add.sprite(100, 100, "hippo").setScale(0.2);

    // Using a frame from spritesheet
    // sprite(x, y, texture, [frame])
    // frame is an optional string | number identifying the frame from the Texture this Game Object is rendering with.
    this.player = this.add.sprite(100, 200, "dude", 4);

    this.createAnimations();

    // Start playing the given animation on this Sprite.
    this.player.play("move_left");
  }
  createAnimations() {
    /* 
    We have a character with three different animations: moving left, standing still, and moving right. 
    We want to play the appropriate animation based on whether the left or right keys are pressed, 
    and when neither key is pressed, play the "still" animation.  
    */

    this.anims.create({
      key: "move_left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
