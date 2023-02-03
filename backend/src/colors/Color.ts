import { ColorTone, ColorType, Colors, RGB } from "../types";

interface IColor {
  toString(): string;
  getDetails(): Colors;
  toRGB(): RGB;
}

export abstract class Color implements IColor {
  calculateTone(): ColorTone {
    const { red, green, blue } = this.toRGB();
    const hsp = Math.sqrt(
      0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue)
    );

    return hsp > 127.5 ? "light" : "dark";
  }

  toHex(): string {
    const { red, green, blue } = this.toRGB();

    let redHex = red.toString(16);
    let greenHex = green.toString(16);
    let blueHex = blue.toString(16);

    if (redHex.length == 1) redHex = "0" + redHex;

    if (greenHex.length == 1) greenHex = "0" + greenHex;

    if (blueHex.length == 1) blueHex = "0" + blueHex;

    return "#" + redHex + greenHex + blueHex;
  }

  abstract toString(): string;

  abstract toRGB(): RGB;

  abstract getDetails(): Colors;
}
