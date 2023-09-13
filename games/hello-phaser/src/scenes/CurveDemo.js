import Card from "../components/Card.js";

export default class CurveDemo extends Phaser.Scene {
  constructor() {
    super({ key: "curve" });
  }

  preload() {
    this.load.image("hippo", "assets/img/animals/hippo.png");
  }

  create() {
    this.spline();
    this.followers();
    this.tween();

    this.card = new Card(this, 100, 100, "MK");
  }

  spline() {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);

    const points = [50, 400, 100, 100, 250, 500, 300, 500, 340, 400];

    this.curve = new Phaser.Curves.Spline(points);
    this.curve.draw(graphics, 64);
  }

  followers() {
    const ball1 = this.add.follower(this.curve, 50, 350, "hippo").setScale(0.2);
    const ball2 = this.add.follower(this.curve, 50, 150, "hippo").setScale(0.2);

    ball1.startFollow(4000);
    ball2.startFollow(4000);
  }

  tween() {
    var tweenObject = {
      val: 0,
    };
    this.tweens.add({
      targets: tweenObject,
      val: 1,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: "linear", //Sine.easeInOut",
      callbackScope: this,
      onUpdate: function (tween, target) {
        var position = this.curve.getPoint(target.val);
        this.card.x = position.x;
        this.card.y = position.y;
      },
    });
  }
}
