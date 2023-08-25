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

  addTextBtn() {
    const button = this.add
      .text(width / 2, height / 2, "Play Game", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#ffffff",
        align: "center",
        fixedWidth: 260,
        backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    button.setInteractive({ useHandCursor: true });

    button.on("pointerover", () => {
      button.setBackgroundColor("#8d8d8d");
    });

    button.on("pointerout", () => {
      button.setBackgroundColor("#2d2d2d");
    });

    button.on("pointerdown", () => {
      this.scene.start("QuizScene");
    });
  }

  addBtn(label) {
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
    this.graphics.fillStyle(0xff7f50, 1); // Coral
    this.bntWrapper = this.graphics.fillRoundedRect(
      400,
      300,
      buttonWidth,
      buttonHeight,
      borderRadius
    );

    this.button = this.add
      .rectangle(400, 300, buttonWidth, buttonHeight, 0x0074d9)
      .setInteractive({ useHandCursor: true });

    // Listen for events on the rectangle button
    // Add hover effect
    this.button.on("pointerover", () => {
      this.button.fillColor = 0x00a6ff; // Change the fill color on hover
    });

    this.button.on("pointerout", () => {
      this.button.fillColor = 0x0074d9; // Revert to original fill color when not hovered
    });

    this.button.on("pointerdown", () => {
      console.log("Button clicked");
      this.scene.start("QuizScene");
    });
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
    this.graphics.fillStyle(0xff7f50, 1); // Coral
    this.bntWrapper = this.graphics.fillRoundedRect(
      400 - buttonWidth / 2,
      300 - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      borderRadius
    );

    // almost invisible Rectangle Gameobject, with interactivity:
    this.button = this.add
      .rectangle(400, 300, buttonWidth, buttonHeight, 0x0074d9)
      .setInteractive({ useHandCursor: true });

    this.button.setAlpha(0.01);

    // Listen for events on the rectangle button
    // Add hover effect
    this.button.on("pointerover", () => {
      this.button.fillColor = 0x00a6ff; // Change the fill color on hover
    });

    this.button.on("pointerout", () => {
      this.button.fillColor = 0x0074d9; // Revert to original fill color when not hovered
    });

    this.button.on("pointerdown", () => {
      console.log("Button clicked");
      this.scene.start("QuizScene");
    });
  }
}
