export default class DataDemo extends Phaser.Scene {
  constructor() {
    super({ key: "data" });
  }

  init() {}
  preload() {
    this.load.image("diamond", "assets/img/diamond-128x128.png");
  }
  create() {
    this.info = this.add.text(10, 10, "Press SPACE or Mouse Click.", {
      font: "16px Arial",
    });

    this.consoleTxt = this.add.text(10, 200, "", { font: "16px Arial" });

    this.diamond = this.add.image(50, 100, "diamond").setScale(0.5);
    this.storeGemData();
    this.logGemInfo();

    this.addClickListener();
  }
  update() {}

  storeGemData() {
    // create GameObject's Data Manager, its null by default.
    this.diamond.setDataEnabled();

    // store a key value pair within this Game Objects Data Manager.
    this.diamond.setData("name", "Green Gem Stone");
    this.diamond.setData("level", 2);
    this.diamond.setData("gold", 100);
  }

  addClickListener() {
    // note that the context argument is this, which is the Scene.
    this.input.on("pointerdown", this.handleClick, this);

    this.input.keyboard.on("keydown-SPACE", this.handleClick, this);
  }

  handleClick() {
    this.cameras.main.flash();
    this.updateGemData();
    this.logGemInfo();
  }

  updateGemData() {
    // increment
    this.diamond.setData("level", this.diamond.getData("level") + 1);
  }

  getGemInfo() {
    return `
    Name: ${this.diamond.getData("name")} 
    Level: ${this.diamond.getData("level")}
    Gold: ${this.diamond.getData("gold")}
    `;
  }

  logGemInfo() {
    this.consoleTxt.setText(this.getGemInfo());
  }
}
