import { ColorType, RGB } from "../types";
import { generateRandomInteger } from "../utils/generate-random-int";
import { Color } from "./Color";

export class RGBColor extends Color {
  public red;
  public green;
  public blue;

  constructor(red?: number, green?: number, blue?: number) {
    super();
    this.red = red ?? generateRandomInteger(255);
    this.green = green ?? generateRandomInteger(255);
    this.blue = blue ?? generateRandomInteger(255);
  }

  getDetails() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      colorString: this.toString(),
      type: ColorType.RGB,
      tone: this.calculateTone(),
      hex: this.toHex(),
    };
  }

  toRGB() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
    };
  }

  toString(): string {
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
  }
}
