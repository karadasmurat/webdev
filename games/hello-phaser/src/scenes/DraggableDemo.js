export default class DraggableDemo extends Phaser.Scene {
  constructor() {
    super({ key: "draggable" });
  }

  preload() {
    this.load.image("gold", "assets/img/gold_1.png");
  }
  create() {
    this.add.text(16, 16, "Drag the Sprite!");
    this.addDropZone();
    this.addDraggableSprite();
  }

  addDraggableSprite() {
    this.item2 = this.add.sprite(200, 300, "gold");

    // Game Objects can be enabled for input by calling their setInteractive method
    // allowing it to respond to various pointer events, such as mouse clicks and touch inputs.
    // With this setup, you can now listen for and respond to events like
    this.item2.setInteractive({ draggable: true, cursor: "pointer" });

    // this.item2.setData("dropZone", this.dZone);

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      //   console.log(`dragging! (${dragX}, ${dragY})`);
      // this.item2.x = dragX;
      gameObject.setPosition(dragX, dragY);
    });
  }

  // Drop zones are helpful for determining if a dragged object has been successfully dropped into a specific area.
  addDropZone() {
    // Define a drop zone (sorted area)
    const x = 100;
    const y = 100;
    const width = 200;
    const height = 200;

    this.dZone = this.add.zone(x, y, width, height);
    this.dZone.setRectangleDropZone(width, height);

    // IMPORTANT The rectangle is centered on this Zones x and y coordinates.
    // which means they do not overlap: Zones topLeft is (100, 100) while DropZone's is (0.0)
    // like a rect(0, 0, 200, 200)

    /*
       dropZone
 (0,0)._ _ _ _ _ .
      |   100,100|
      |     ._  _|_ _ _ .
      |     |    |      |
      |_ _ _|_ _ .      |
            | (200,200) |
            |_ _ _ _ _ _. (300,300)
                  
                     zone
*/

    this.highlightDropZone();

    this.printZoneInfo();

    // Attach a "drop" event listener to the input manager, and it will be triggered
    // whenever any draggable object is dropped anywhere on the canvas.
    // Note that the documentation says: Listen to DROP event from within a Scene using: this.input.on('drop', listener).
    this.input.on("drop", (pointer, gameObject, dropZone) => {
      // this.dropZone.on("drop", (pointer, gameObject, dropZone) => {
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      console.log("************ DROP");
    });
  }

  highlightDropZone() {
    // Note that Zone has no texture and never displays
    // Just a visual display of the drop zone

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);

    // Note that Zone and DropZone do not overlap, since setRectangleDropZone centers on Zones x,y coordinates!
    graphics.strokeRect(
      this.dZone.x - this.dZone.input.hitArea.width / 2, // x - width / 2
      this.dZone.y - this.dZone.input.hitArea.height / 2, // y - height / 2
      this.dZone.input.hitArea.width, // width
      this.dZone.input.hitArea.height // height
    );
  }

  printZoneInfo() {
    console.log("x", this.dZone.x);
    console.log("dZone.input.hitArea", this.dZone.input.hitArea);
    console.log("getTopLeft", this.dZone.getTopLeft());
  }

  update() {}
}
