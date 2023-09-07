import Button from "../custom/Button.js";

export default class CameraDemo extends Phaser.Scene {
  constructor() {
    super({ key: "camera" });
  }

  init() {}
  preload() {
    // By default the SVG will be rendered to a texture at the same size defined in the SVG file attributes.
    this.load.svg("flash", "assets/svg/fs_flash.svg", {
      width: 55,
      height: 55,
    });
    this.load.svg("shake", "assets/svg/shake.svg", {
      width: 55,
      height: 55,
    });
    this.load.svg("blur", "assets/svg/blur.svg", {
      width: 55,
      height: 55,
    });
  }

  create() {
    this.btn1 = new Button(
      this,
      100,
      400,
      "flash",
      this.flashOnClick //Note. Button binds cb: onClick.bind(scene);
    );

    this.btn2 = new Button(
      this,
      200,
      400,
      "shake",
      this.shakeOnClick //Note. Button binds cb: onClick.bind(scene);
    );

    this.btn3 = new Button(
      this,
      300,
      400,
      "blur",
      () => {
        this.fadeOutAndStartScene("helloworld");
      } //Note. Button binds cb: onClick.bind(scene);
    );
  }

  flashOnClick() {
    this.cameras.main.flash();
  }

  shakeOnClick() {
    this.cameras.main.shake();
  }

  fadeOutAndStartScene(sceneKey) {
    this.cameras.main.fadeOut();
    this.cameras.main.on(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(sceneKey);
      }
    );
  }
  update() {}
}
