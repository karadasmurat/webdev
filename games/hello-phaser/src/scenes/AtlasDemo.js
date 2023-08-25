export default class AtlasDemo extends Phaser.Scene {
  constructor() {
    super({ key: "atlas" });
  }

  preload() {
    // load atlas
    this.load.atlas(
      "dragon",
      "assets/atlas/dragon_atlas.png",
      "assets/atlas/dragon_atlas.json"
    );
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.createAnims();
    this.addPlayer();
  }

  update() {
    // left and right input logic
    if (this.cursors.left.isDown) {
      // this.player.setVelocityX(-160);
      this.player.x -= 2;
      this.player.play("move_left", true);
    } else if (this.cursors.right.isDown) {
      //   this.player.setVelocityX(160);
      this.player.x += 2;
      this.player.play("move_right", true);
    } else {
      //   this.player.setVelocityX(0);
      this.player.play("stay_still", true);
      // this.player_dude.anims.stop(); // stop current animation
    }
  }

  addPlayer() {
    this.player = this.add.sprite(100, 100, "dragon", "still01");
    this.player.setScale(0.8);

    // this.player.setBounce(0.2);
    // this.player.setCollideWorldBounds(true);
  }

  createAnims() {
    this.anims.create({
      key: "move_right",
      // use helper method, using frame names from atlas json
      frames: this.anims.generateFrameNames("dragon", {
        prefix: "right0",
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "move_left",
      // manually write frames of the animation, using frame names from atlas json
      frames: [
        { key: "dragon", frame: "left00" },
        { key: "dragon", frame: "left01" },
        { key: "dragon", frame: "left02" },
      ],
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "stay_still",
      // use helper method, using frame names from atlas json
      frames: [
        { key: "dragon", frame: "still00" },
        { key: "dragon", frame: "still00" },
        { key: "dragon", frame: "still01" },
        { key: "dragon", frame: "still01" },
        { key: "dragon", frame: "still02" },
        { key: "dragon", frame: "still02" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // see the out of frame array helper
    // const frames = this.anims.generateFrameNames("dragon", {
    //   prefix: "still0",
    //   end: 2,
    // });

    // console.log(frames);
  }
}
