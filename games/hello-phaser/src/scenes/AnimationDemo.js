export default class AnimationDemo extends Phaser.Scene {
  constructor() {
    super({ key: "animate" });
  }

  preload() {
    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.spritesheet("brawler", "assets/spritesheet/brawler48x48.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.addPlayer();

    // without the helper function to generate frames array:
    this.anims.create({
      key: "idle",
      frames: [
        { key: "brawler", frame: 5 },
        { key: "brawler", frame: 6 },
        { key: "brawler", frame: 7 },
        { key: "brawler", frame: 8 },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // helper function to generate frames array:
    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNumbers("brawler", {
        frames: [15, 16, 17, 18, 17, 15],
      }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 2000,
    });

    const cody = this.add.sprite(200, 200);
    cody.setScale(2);
    cody.play("punch");

    const cody2 = this.add.sprite(100, 100);
    cody2.setScale(2);
    cody2.play("idle");

    // what does the helper function return?
    console.log(
      this.anims.generateFrameNumbers("brawler", {
        frames: [15, 16, 17, 18, 17, 15],
      })
    );
  }

  update() {}

  addPlayer() {
    // In preload function, you'll see that 'dude' was loaded as a sprite sheet, not an image.
    // notice the optional frame number that sprite is rendering with
    this.player_dude = this.add.sprite(300, 300, "dude", 4);
  }
}
