/**
 * A simple GameObject to represent Button
 *  an interactive Image GameObject,
 *  :hover effects
 *  onClick callback
 */
export default class Button extends Phaser.GameObjects.GameObject {
  constructor(scene, x = 0, y = 0, texture, onClick, width = 50) {
    super(scene, "custombutton"); // GameObject
    // this.scene = scene;
    this.x = x;
    this.y = y;
    this.texture = texture;
    this.handleClick = onClick;
    this.width = width;

    // note that onClick is defined in Scene, and "this", means "current scene" in that contex.
    // When we pass it as a parameter, the context (this reference) inside the Button indeed changes.
    // To maintain the correct scope, we can use JavaScript's .bind() method
    // Bind the onClick callback to the correct context (scene)
    this.handleClick = onClick.bind(scene);

    this.addButton();
  }

  addButton() {
    this.btn_image = this.scene.add.image(this.x, this.y, this.texture);
    this.btn_image.setInteractive({ cursor: "pointer" });

    // set the scale of btn image, using a "scaleFactor"
    // 1. Calculate the desired size for the logo (e.g., 80% of the screen width)
    // const desiredWidth = this.scene.cameras.main.width * 0.5;
    const desiredWidth = this.width;
    // 2. Calculate the scale factor to achieve the desired width
    const scaleFactor = desiredWidth / this.btn_image.width;
    // 3. setScale using scaleFactor
    this.btn_image.setScale(scaleFactor);

    console.log("desiredWidth:", desiredWidth, "scaleFactor:", scaleFactor);

    this.btnHover();
  }

  // Register pointerover and pointerout listeners for :hover effect
  btnHover() {
    // Note that btn has an initial scale.
    const initialScale = this.btn_image.scale;

    this.btn_image.on("pointerover", () => {
      //   console.log("button: pointerover");
      this.btn_image.setScale(1.1 * initialScale);
    });

    this.btn_image.on("pointerout", () => {
      //   console.log("button: pointerout");
      this.btn_image.setScale(initialScale);
    });

    this.btn_image.on("pointerdown", () => {
      //   console.log("button: pointerdown");

      // check truthy to see if the callback exists: call only if it exists.
      this.handleClick && this.handleClick();
    });
  }
}
