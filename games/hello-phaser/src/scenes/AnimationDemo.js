import Button from "../custom/Button.js";

/**
 *
 * This Scene itself does not create any animations,
 * However it can still play animations through "this.anims", which is the GLOBAL Animation Manager.
 */
export class AnimationConsumer extends Phaser.Scene {
  constructor() {
    super({ key: "animationConsumer" });
  }
  preload() {}
  create() {
    this.add.sprite(100, 100).play("anim_coin");
  }
}

export default class AnimationDemo extends Phaser.Scene {
  constructor() {
    super({ key: "animate" });
  }

  preload() {
    this.load.image("arrow_right", "assets/img/right-48x48.png");

    this.load.spritesheet("dude", "assets/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.spritesheet("brawler", "assets/spritesheet/brawler48x48.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet("coin", "assets/img/coin.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // load atlas
    this.load.atlas(
      "explosion_atlas",
      "assets/atlas/explosion.png",
      "assets/atlas/explosion.json"
    );

    // load atlas
    this.load.atlas(
      "heart_atlas",
      "assets/atlas/heart_atlas.png",
      "assets/atlas/heart_atlas.json"
    );

    // load atlas
    this.load.atlas(
      "soldier",
      "assets/atlas/soldier.png",
      "assets/atlas/soldier.json"
    );
  }

  create() {
    this.btn = new Button(this, 300, 500, "arrow_right", 48, () => {
      this.scene.start("animationConsumer");
    });

    this.addPlayer();

    // Create animation on a Specific Sprite
    this.rambo = this.add.sprite(300, 300, "soldier");
    this.createAnimations();

    //  Because the rambo Sprite has its own 'walk' animation, it will play it:
    this.rambo.play("walk");

    const cody = this.add.sprite(200, 200);
    cody.setScale(2);
    cody.play("punch");

    const cody2 = this.add.sprite(100, 100);
    cody2.setScale(2);
    cody2.play("idle");

    // add sprite to play animation
    this.add.sprite(100, 300).play("anim_explosion");

    // add sprite to play animation
    this.add.sprite(50, 400).play("anim_coin");

    // add sprite from atlas
    this.heart = this.add
      .sprite(50, 500, "heart_atlas", "sprite14")
      .setScale(0.5);
    this.input.keyboard.on("keydown-K", () => {
      console.log("kill");
      this.heart.play("anim_heart_1");
    });

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

    // spritesheet, helper function to generate frames array:
    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNumbers("brawler", {
        frames: [15, 16, 17, 18, 17, 15], // frames may not be sequential, else use start/end properties.
      }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 2000,
    });

    // spritesheet, helper function to generate frames array:
    this.anims.create({
      key: "anim_coin",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // atlas, helper function to generate frames array:
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

    // atlas, helper function to generate frames array:
    this.anims.create({
      key: "anim_heart_1",
      // use helper method, using frame names from atlas json
      frames: this.anims.generateFrameNames("heart_atlas", {
        prefix: "sprite",
        start: 1,
        end: 9,
      }),
      yoyo: true,
      // frameRate: 24,
      // repeat: 1,
      // hideOnComplete: true, // Should sprite.visible = false when the animation finishes?
    });

    //  The following animation is created directly on the 'rambo' Sprite.
    //  It cannot be used by any other sprite, and the key ('walk') is never added to the global Animation Manager, as it's kept local to this Sprite.
    this.rambo.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("soldier", {
        prefix: "soldier_3_walk_",
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }
}
