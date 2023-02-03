import { ColorType } from "../types";
import { generateRandomInteger } from "../utils/generate-random-int";
import { Color } from "./Color";

export class HSLColor extends Color {
  public hue;
  public saturation;
  public lightness;

  constructor(hue?: number, saturation?: number, lightness?: number) {
    super();
    this.hue = hue ?? generateRandomInteger(360);
    this.saturation = saturation ?? generateRandomInteger(100);
    this.lightness = lightness ?? generateRandomInteger(100);
  }

  toString() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  }

  getDetails() {
    return {
      hue: this.hue,
      saturation: this.saturation,
      lightness: this.lightness,
      colorString: this.toString(),
      type: ColorType.HSL,
      tone: this.calculateTone(),
      hex: this.toHex(),
    };
  }

  toRGB() {
    const s = this.saturation / 100;
    const l = this.lightness / 100;

    const k = (n: number) => (n + this.hue / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    // return [255 * f(0), 255 * f(8), 255 * f(4)];

    return {
      red: Math.round(255 * f(0)),
      green: Math.round(255 * f(8)),
      blue: Math.round(255 * f(4)),
    };
  }
}
