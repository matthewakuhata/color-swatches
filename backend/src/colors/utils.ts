import { ColorType, ColorTypeKey } from "../types";

export function getRandomColorSpace(): ColorType {
   const values = Object.keys(ColorType) as ColorTypeKey[];
   const key = values[Math.floor(Math.random() * values.length)];
   const type = ColorType[key];

   return type;
}