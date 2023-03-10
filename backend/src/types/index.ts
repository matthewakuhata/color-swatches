export enum ColorType {
  RGB = "rgb",
  HSL = "hsl",
}

export type ColorTypeKey = keyof typeof ColorType;

export type ColorSpaces = RGB | HSL;

export type ColorTone = "light" | "dark";

export type Colors = RGBColor | HSLColor;

export type RGBColor = Color & RGB;

export type HSLColor = Color & HSL;

export interface Color {
  type: ColorType;
  colorString: string;
  hex: string;
  tone: ColorTone;
}

export interface RGB {
  red: number;
  blue: number;
  green: number;
}

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}
