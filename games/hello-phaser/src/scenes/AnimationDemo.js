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

    // load atlas
    this.load.atlas(
      "explosion_atlas",
      "assets/atlas/explosion.png",
      "assets/atlas/explosion.json"
    );
  }

  create() {
    this.createAnimations();

    this.addPlayer();

    const cody = this.add.sprite(200, 200);
    cody.setScale(2);
    cody.play("punch");

    const cody2 = this.add.sprite(100, 100);
    cody2.setScale(2);
    cody2.play("idle");

    // add sprite to play animation
    this.add.sprite(100, 300).play("anim_explosion");

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

  createAnimations() {
    // without the helper function to generate frames array:
    // every frame in the spritesheet is the exact same size, referenced by numbers, not names.
    this.anims.create({
      key: "idle",
      defaultTextureKey: "brawler",
      frames: [
        { frame: 5 }, // note defaultTextureKey = { key: "brawler", frame: 5 },
        { frame: 6 },
        { frame: 7 },
        { frame: 8, duration: 500 }, // Per-frame durations
      ],
      frameRate: 8,
      repeat: -1, // -1 for infinity
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

    this.anims.create({
      key: "anim_explosion",
      // use helper method, using frame names from atlas json
      frames: this.anims.generateFrameNames("explosion_atlas", {
        prefix: "explode0",
        end: 7,
      }),
      frameRate: 10,
      repeat: 2,
      hideOnComplete: true, // Should sprite.visible = false when the animation finishes?
    });
  }
}
