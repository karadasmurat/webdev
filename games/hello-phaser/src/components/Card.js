import colors from "../util/Colors.js";
export default class Card extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    text = "Default",
    width = 100,
    height = 100,
    bgColor = 0xff0000,
    textStyle = {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ffffff",
      align: "center",
    }
  ) {
    super(scene, x, y); // set container position
    // this.scene = scene;

    // this.bgColor = bgColor;

    // Create a rounded rectangle as the background
    // const cardBackground = scene.add.graphics();
    // cardBackground.lineStyle(2, 0x0000ff);
    // cardBackground.strokeRoundedRect(0, 0, width, height, 10); // border
    // cardBackground.fillStyle(bgColor, 1);
    // cardBackground.fillRoundedRect(0, 0, width, height, 10);
    // // Set the origin to the center of the rectangle
    // cardBackground.setPosition(-width / 2, -height / 2);

    // Create the text
    const cardText = scene.add.text(0, 0, text, textStyle);

    // Center the text within the card
    cardText.setOrigin(0.5);
    // cardText.setPosition(width / 2, height / 2);
    const wrapperWidth = cardText.width + 100;

    // Phaser.GameObjects.Rectangle
    const surface = scene.add.rectangle(0, 0, wrapperWidth, height, bgColor);
    // ground.setAlpha(0.01);

    this.on("pointerover", () => {
      // console.log("pointerover card");
      //   this.ground.setAlpha(0.5);
      this.tween_scale(1.1);
    });

    this.on("pointerout", () => {
      // console.log("pointerout card");
      this.tween_scale(1);
    });

    this.on("pointerdown", () => {
      console.log("click card");
      surface.setFillStyle(0x00ff00, 1);
    });

    // Adds the given Game Object, or array of Game Objects, to this Container.
    // this.add(cardBackground);
    this.add(surface);
    this.add(cardText);

    // Make the container interactive
    // Note that we put the "ground" at (0, 0) as a rectangle, so (1/4 is visible),
    // adjust hitArea accordingly as it is defined with the Geom.Rectangle
    // Phaser.Geom.Rectangle: Encapsulates a 2D rectangle defined by its corner point in the top-left and its extends in x (width) and y (height)
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(
        -wrapperWidth / 2, // 0,
        -height / 2, // 0,
        wrapperWidth,
        height
      ),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      cursor: "pointer",
    });
    //  Specify a different debug outline color
    this.scene.input.enableDebug(this, colors.Aqua);

    // Add the container to the scene
    scene.add.existing(this);
  }

  tween_scale(scale) {
    this.scene.tweens.add({
      targets: this,
      scale: scale,
      duration: 200,
    });
  }
}
