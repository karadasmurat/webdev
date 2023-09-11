export default class Card extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    text = "Default",
    width = 100,
    height = 100,
    bgColor = 0xff0000,
    textColor = "#ffffff"
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

    const ground = scene.add.rectangle(0, 0, width, height, bgColor);
    // ground.setAlpha(0.01);

    ground.on("pointerover", () => {
      console.log("pointerover card");
      //   this.ground.setAlpha(0.5);
      // this.tween_scale();
    });

    ground.on("pointerout", () => {
      console.log("pointerout card");
    });

    // Create the text
    const textStyle = {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ffffff",
      align: "center",
    };
    const cardText = scene.add.text(0, 0, text, textStyle);

    // Center the text within the card
    cardText.setOrigin(0.5);
    // cardText.setPosition(width / 2, height / 2);

    this.on("pointerdown", () => {
      console.log("click card");
      ground.setFillStyle(0x00ff00, 1);
    });

    // Adds the given Game Object, or array of Game Objects, to this Container.
    // this.add(cardBackground);
    this.add(ground);
    this.add(cardText);

    // Make the container interactive
    // Create a hit area as a rectangle that covers the entire card
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(
        -width / 2,
        -height / 2,
        width,
        height
      ),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      cursor: "pointer",
    });

    // Add the container to the scene
    scene.add.existing(this);
  }

  tween_scale(target) {
    this.scene.tweens.add({
      targets: this,
      scale: 1.1,
      duration: 200,
      yoyo: true,
    });
  }
}
