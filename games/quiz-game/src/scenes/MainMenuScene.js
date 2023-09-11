export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  create() {
    const { width, height } = this.scale;
    // this.addRoundedRect();

    // Change Background to Random Color
    // const color = new Phaser.Display.Color();
    // this.cameras.main.setBackgroundColor(color.random());

    this.cameras.main.setBackgroundColor(0xff1493);

    // Create start button
    // this.addTextBtn();
    this.addBtn_rounded("hi this is a pretty long title for a button");
  }

  addRoundedRect() {
    this.graphics = this.add.graphics();

    this.graphics.fillStyle(0xffff00, 1);

    //  32px radius on the corners
    this.rect = this.graphics.fillRoundedRect(32, 32, 300, 200, 32);
    // this.rect.setInteractive({ useHandCursor: true });
  }

  drawRoundedRect(color, buttonWidth, buttonHeight, borderRadius) {
    this.graphics.clear();
    this.graphics.fillStyle(color, 1); // Coral
    this.bntWrapper = this.graphics.fillRoundedRect(
      400 - buttonWidth / 2,
      300 - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      borderRadius
    );
  }
  addBtn_rounded(label) {
    // Create a clickable rectangle button

    // Set up text for the button
    const textStyle = {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ffffff",
      align: "center",
    };

    const buttonText = this.add.text(400, 300, label, textStyle);
    buttonText.setOrigin(0.5);
    buttonText.setDepth(1); // Set the depth of the text

    // Calculate the width based on the text content and some padding
    const padding = 20;
    const borderRadius = 10;
    const buttonWidth = buttonText.width + padding * 2;
    const buttonHeight = buttonText.height + padding * 2;

    // Draw the rounded rectangle button
    // Create a graphics object to draw the button
    this.graphics = this.add.graphics();
    this.drawRoundedRect(0xff7f50, buttonWidth, buttonHeight, borderRadius);
    // this.graphics.fillStyle(0xff7f50, 1); // Coral
    // this.bntWrapper = this.graphics.fillRoundedRect(
    //   400 - buttonWidth / 2,
    //   300 - buttonHeight / 2,
    //   buttonWidth,
    //   buttonHeight,
    //   borderRadius
    // );

    // almost invisible Rectangle Gameobject, with interactivity:
    this.button = this.add
      .rectangle(400, 300, buttonWidth, buttonHeight, 0x0074d9)
      .setInteractive({ useHandCursor: true });

    this.button.setAlpha(0.01);

    // Listen for events on the rectangle button
    // Add hover effect
    this.button.on("pointerover", () => {
      console.log("pointerover");
      // this.button.setAlpha(1);
      // this.button.setFillStyle(0x0074d9, 1);
      // this.drawRoundedRect(0x00ff00, 100, 100, 10);
    });

    this.button.on("pointerout", () => {
      // Revert to original fill color when not hovered
    });

    this.button.on("pointerdown", () => {
      console.log("Button clicked");
      this.scene.start("QuizScene");
    });
  }
}
