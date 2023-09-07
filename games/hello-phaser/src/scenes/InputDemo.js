/**
 * Note that even if you press and lift, update catches this in multiple time, since gameloop is run with a high fps.
 * */

export default class InputDemo extends Phaser.Scene {
  constructor() {
    super({ key: "input" });
  }

  init() {}
  preload() {}
  create() {
    // this.cursorKeys = this.input.keyboard.createCursorKeys();

    // KEY_DOWN
    // to listen for the A key being pressed use the following from within a Scene:
    // this.input.keyboard.on('keydown-A', listener).
    // You can replace the -A part of the event name with any valid Key Code string.
    this.input.keyboard.on("keydown-A", () => {
      console.log("Keypress (keydown): A");
    });

    //KEY_UP
    // to listen for the A key being released use the following from within a Scene:
    // this.input.keyboard.on('keyup-A', listener).
    // You can replace the -A part of the event name with any valid Key Code string.
    this.input.keyboard.on("keyup-A", () => {
      console.log("Key released: A");
    });

    // DOWN
    // This event is dispatched by a Phaser.Input.Keyboard.Key object when it is pressed.
    // emitOnRepeat : default false, meaning emit event just once
    var spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceBar.on("down", () => {
      console.log("Keypress (down): SPACE");
    });

    // DOWN
    // This event is dispatched by a Phaser.Input.Keyboard.Key object when it is pressed.
    // emitOnRepeat : true - Key will continuously emit a 'down' event while being held down
    var Key_R = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R,
      true,
      true
    );

    Key_R.on("down", () => {
      console.log("Keypress (down): R");
    });
  }
  update() {
    // Note that even if you press and lift, update catches this in multiple time, since gameloop is run with a high fps.
    // this also means a high precision to catch right after your keypress
    // but this may cause repeated behavior.
  }
}
