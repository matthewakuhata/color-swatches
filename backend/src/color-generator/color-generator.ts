import { ColorType, Colors, RGB, HSL, ColorSpaces, ColorTypeKey } from '../types';

export class ColorGenerator {

   generate(): Colors {
      const type = this.getRandomColorSpace();

      let colorValues: ColorSpaces;
      let colorString: string;
      switch (type) {
         case ColorType.RGB:
            colorValues = this.generateRGB();
            colorString = "rgb(" + [colorValues.red, colorValues.green, colorValues.blue].join(", ") + ")";
            break;
         case ColorType.HSL:
            colorValues = this.generateHSL();
            colorString = "hsl(" + [colorValues.hue, colorValues.saturation + "%", colorValues.lightness + "%"].join(", ") + ")";
            break;
         default:
            colorValues = this.generateRGB();
            colorString = "rgb(" + [colorValues.red, colorValues.green, colorValues.blue].join(", ") + ")";
      }

      const rgbValues = this.convertToRGB(type, colorValues);
      const tone = this.calculateTone(rgbValues);
      const hex = this.getHex(ColorType.RGB, rgbValues);

      return {
         ...colorValues,
         type,
         colorString,
         tone,
         hex,
      };
   }

   generateRGB(): RGB {
      const red = this.getRandomInteger(255);
      const green = this.getRandomInteger(255);
      const blue = this.getRandomInteger(255);

      return {
         red,
         green,
         blue,
      }
   }

   generateHSL(): HSL {
      const hue = this.getRandomInteger(360);
      const saturation = this.getRandomInteger(100);
      const lightness = this.getRandomInteger(100);

      return {
         hue,
         saturation,
         lightness,
      }
   }

   getRandomInteger(max: number, min: number = 0): number {
      if (max < min) return NaN;

      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   getRandomColorSpace(): ColorType {
      const values = Object.keys(ColorType) as ColorTypeKey[];
      const key = values[Math.floor(Math.random() * values.length)];
      const type = ColorType[key];

      return type;
   }

   convertToRGB(type: ColorType, color: ColorSpaces): RGB {
      if (type === ColorType.RGB) return color as RGB;

      let red = 0;
      let green = 0;
      let blue = 0;

      if (type === ColorType.HSL) {
         let { hue, saturation, lightness } = color as HSL;
         saturation /= 100;
         lightness /= 100;

         const chroma = saturation * Math.min(lightness, 1 - lightness);
         const hueCalculation = (value: number) => (value + hue / 30) % 12;
         const valueCalculation = (value: number) =>
            lightness - chroma * Math.max(-1, Math.min(hueCalculation(value) - 3, Math.min(9 - hueCalculation(value), 1)));

         red = Math.round(255 * valueCalculation(0));
         green = Math.round(255 * valueCalculation(8));
         blue = Math.round(255 * valueCalculation(4));
      }

      return {
         red,
         green,
         blue,
      }
   }


   getHex(type: ColorType, color: ColorSpaces): string {
      const { red, green, blue }: RGB = this.convertToRGB(type, color);

      let redHex = red.toString(16);
      let greenHex = green.toString(16);
      let blueHex = blue.toString(16);

      if (redHex.length == 1)
         redHex = "0" + redHex;

      if (greenHex.length == 1)
         greenHex = "0" + greenHex;

      if (blueHex.length == 1)
         blueHex = "0" + blueHex;

      return "#" + redHex + greenHex + blueHex;
   }

   calculateTone({ red, green, blue }: RGB) {
      if (red < 0 || red > 255 ||
         green < 0 || green > 255 ||
         blue < 0 || blue > 255) {
         throw new Error("Invalid RGB values passed in");
      }

      const hsp = Math.sqrt(
         0.299 * (red * red) +
         0.587 * (green * green) +
         0.114 * (blue * blue)
      );

      return hsp > 127.5 ? 'light' : 'dark';
   }
}