export default class HelloWorld extends Phaser.Scene {
  constructor() {
    super({ key: "helloworld" });
  }

  preload() {
    console.log("Loading assets for the scene.");
    this.load.image("gold", "assets/img/gold_1.png");
  }
  create() {
    console.log("Play scene created.");

    // Change Background to Random Color
    const color = new Phaser.Display.Color();
    this.cameras.main.setBackgroundColor(color.random());

    // Calculate the center of the camera
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // default origin of an Image is the center of it: (0.5, 0.5)
    this.gold1 = this.add.image(centerX, centerY, "gold");
    // this.gold1.rotation += 4;
    // origin top-left
    this.gold2 = this.add.image(centerX, centerY, "gold").setOrigin(0, 0);
    // this.gold2.rotation += 4;

    // default origin of a Text is not the center, but its top-left (0, 0), so we set origin
    // this.add.text(centerX, centerY, "hello, there!").setOrigin(0.5, 0.5);

    // start next scene after loading
    // this.scene.start("main");
  }

  update() {
    console.log("Play scene updated.");
    this.gold1.rotation += 0.03;
    this.gold2.rotation += 0.01;
  }
}
