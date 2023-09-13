import { colors, hexToColor, hexToString, theme1 } from "../util/Colors.js";

export default class TextDemo extends Phaser.Scene {
  constructor() {
    super({ key: "text" });
  }

  create() {
    this.cameras.main.setBackgroundColor(hexToColor(theme1.color1[4]));
    console.log(colors.White.hexString, colors.White.hex);
    console.log(hexToColor(colors.White));
    this.hi = this.add.text(10, 10, "Hi!");

    const textStyle = {
      fontFamily: "Arial",
      fontSize: "32px",
      color: theme1.color1[0], //"#ff0000",
      backgroundColor: theme1.color1[3], //"#00ff00",
      align: "center",
      padding: { x: 55, y: 5 },
    };

    this.title = this.add.text(10, 10, "Lorem Ipsum", textStyle);
  }
}
