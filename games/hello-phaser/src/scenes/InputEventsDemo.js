export default class InputEventsDemo extends Phaser.Scene {
  constructor() {
    super({ key: "inputevents" });
  }

  init() {}
  preload() {
    this.load.image("gold", "assets/img/gold_1.png");
  }

  create() {
    this.addGolds();
    this.hoverGolds();
  }

  update() {}

  addGolds() {
    //
    // this.golds = this.add.group({
    //   key: "gold", // The texture key of each new Game Object
    //   quantity: 4, // The number of Game Objects to create
    //   setXY: { x: 50, y: 100, stepX: 100 }, // position of each new Game Object
    // });

    this.golds = this.add.group();

    // note that we need interactive GameObjects
    // simulate setXY of cretegroupconfig

    let xPos = 50;
    let yPos = 100;
    let stepX = 100;
    let stepY = 0;
    for (let i = 0; i < 4; i++) {
      const gold = this.golds.create(xPos, yPos, "gold");
      gold.setInteractive({ draggable: true, cursor: "pointer" });
      xPos += stepX;
      yPos += stepY;
    }
  }

  hoverGolds() {
    this.input.on(
      Phaser.Input.Events.GAMEOBJECT_OVER,
      (pointer, gameObject, event) => {
        // one color value, in which case the whole Game Object will be tinted in that color
        gameObject.setTint(0xfa8072); // Salmon
      }
    );

    this.input.on(
      Phaser.Input.Events.GAMEOBJECT_OUT,
      (pointer, gameObject, event) => {
        // one color value, in which case the whole Game Object will be tinted in that color
        gameObject.clearTint();
      }
    );
  }
}
