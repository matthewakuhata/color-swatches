export enum ColorType {
   RGB = 'rgb',
   HSL = 'hsl'
}

export type Colors = RGBColor | HSLColor;

export type RGBColor = Color & RGB;

export type HSLColor = Color & HSL;

export interface Color {
   type: ColorType;
   colorString: string;
   hex: string;
   tone: 'light' | 'dark';
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