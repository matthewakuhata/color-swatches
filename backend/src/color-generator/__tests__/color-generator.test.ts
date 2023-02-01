import { ColorType, HSL, RGB } from '../../types';
import { ColorGenerator } from './../color-generator';

describe('TESTING getRandomInteger', () => {
   const generator = new ColorGenerator();
   describe('GIVEN a max value', () => {
      describe('WHEN calling getRandomInteger', () => {
         test('THEN an integer greater less than max is returned', () => {
            const val = generator.getRandomInteger(1);
            expect(val).toBeLessThanOrEqual(1);
            expect(val).toBeGreaterThanOrEqual(0);
         });
      });
   });

   describe('GIVEN a max value and a min value', () => {
      describe('WHEN calling getRandomInteger', () => {
         test('THEN an integer greater less than max and greater than min is returned', () => {
            const min = 10;
            const max = 15;
            const val = generator.getRandomInteger(max, min);
            expect(val).toBeLessThanOrEqual(max);
            expect(val).toBeGreaterThanOrEqual(min);
         });
      });
   });
});

describe('TESTING getRandomColorSpace', () => {
   const generator = new ColorGenerator();
   describe('GIVEN some color spaces are defined', () => {
      describe('WHEN calling generate randomColorSpace', () => {
         test('THEN a valid color space is returned', () => {
            const colorSpace = generator.getRandomColorSpace();
            const colorSpaces = Object.values(ColorType);
            expect(colorSpaces).toContain(colorSpace);
         });
      });
   });
});

describe('TESTING generateRGB', () => {
   const generator = new ColorGenerator();
   describe('GIVEN a ColorGenerator', () => {
      describe('WHEN calling generateRGB', () => {
         test('THEN valid RGB values are returned', () => {
            const rgbValues = generator.generateRGB();

            ['red', 'green', 'blue'].forEach((key) => {
               const value = rgbValues[key as keyof RGB]
               expect(value).toBeDefined();
               expect(value).toBeLessThanOrEqual(255);
               expect(value).toBeGreaterThanOrEqual(0);
            });
         });
      });
   });
});

describe('TESTING generateHSL', () => {
   const generator = new ColorGenerator();
   describe('GIVEN a ColorGenerator', () => {
      describe('WHEN calling generateHSL', () => {
         test('THEN valid HSL values are returned', () => {
            const hslValues = generator.generateHSL();

            expect(hslValues.hue).toBeDefined();
            expect(hslValues.hue).toBeLessThanOrEqual(360);
            expect(hslValues.hue).toBeGreaterThanOrEqual(0);

            ['saturation', 'lightness'].forEach((key) => {
               const value = hslValues[key as keyof HSL]
               expect(value).toBeDefined();
               expect(value).toBeLessThanOrEqual(100);
               expect(value).toBeGreaterThanOrEqual(0);
            });
         });
      });
   });
});

describe('TESTING calculateTone', () => {
   const generator = new ColorGenerator();

   describe('GIVEN valid RGB values that is light', () => {
      describe('WHEN calling calculateTone', () => {
         test('THEN the tone is light', () => {
            const tone = generator.calculateTone({
               red: 255,
               green: 255,
               blue: 255,
            });
            expect(tone).toBe("light");
         });
      });
   });

   describe('GIVEN valid RGB values that is dark', () => {
      describe('WHEN calling calculateTone', () => {
         test('THEN the tone is dark', () => {
            const tone = generator.calculateTone({
               red: 0,
               green: 0,
               blue: 0,
            });
            expect(tone).toBe("dark");
         });
      });
   });

   describe('GIVEN invalid RGB values', () => {
      describe('WHEN calling calculateTone', () => {
         test('THEN an error is thrown', () => {
            expect(() => generator.calculateTone({ red: 256, green: 0, blue: 0 })).toThrow("Invalid RGB values passed in");
            expect(() => generator.calculateTone({ red: -1, green: 0, blue: 0 })).toThrow("Invalid RGB values passed in");
            expect(() => generator.calculateTone({ red: 0, green: 256, blue: 0 })).toThrow("Invalid RGB values passed in");
            expect(() => generator.calculateTone({ red: 0, green: -1, blue: 0 })).toThrow("Invalid RGB values passed in");
            expect(() => generator.calculateTone({ red: 0, green: 0, blue: 256 })).toThrow("Invalid RGB values passed in");
            expect(() => generator.calculateTone({ red: 0, green: 0, blue: -1 })).toThrow("Invalid RGB values passed in");
         });
      });
   });
});

describe('TESTING getHex', () => {
   const generator = new ColorGenerator();
   describe('GIVEN a valid RGB color', () => {
      describe('WHEN calling getHex', () => {
         test('THEN then correct valid hex value is returned', () => {
            const rgb = {
               red: 120,
               green: 49,
               blue: 143
            };

            const expectedHex = "#78318f"
            expect(generator.getHex(ColorType.RGB, rgb)).toBe(expectedHex);
         });
      });
   });
   describe('GIVEN a valid HSL color', () => {
      describe('WHEN calling getHex', () => {
         test('THEN then correct valid hex value is returned', () => {
            const hsl = {
               hue: 285,
               saturation: 49,
               lightness: 38
            };
            const expectedHex = "#793190"

            expect(generator.getHex(ColorType.HSL, hsl)).toBe(expectedHex);
         });
      });
   });
});


describe('TESTING convertToRGB', () => {
   const generator = new ColorGenerator();
   describe('GIVEN a valid RGB color', () => {
      describe('WHEN calling convertToRGB', () => {
         test('THEN rbg values are returned', () => {
            const expectedRed = 120;
            const expectedGreen = 49;
            const expectedBlue = 143;

            const rgb = {
               red: expectedRed,
               green: expectedGreen,
               blue: expectedBlue
            }

            const { red, green, blue } = generator.convertToRGB(ColorType.RGB, rgb);

            expect(red).toEqual(expectedRed);
            expect(green).toEqual(expectedGreen);
            expect(blue).toEqual(expectedBlue);
         });
      });
   });

   describe('GIVEN a valid HSL color', () => {
      describe('WHEN calling convertToRGB', () => {
         test('THEN rbg values are returned', () => {
            const expectedRed = 121;
            const expectedGreen = 49;
            const expectedBlue = 144;

            const hsl = {
               hue: 285,
               saturation: 49,
               lightness: 38
            }

            const { red, green, blue } = generator.convertToRGB(ColorType.HSL, hsl);

            expect(red).toEqual(expectedRed);
            expect(green).toEqual(expectedGreen);
            expect(blue).toEqual(expectedBlue);
         });
      });
   });
});


describe('TESTING generate', () => {
   const generator = new ColorGenerator();
   describe('GIVEN ColorGenerator', () => {
      describe('WHEN calling generate for RGB colorspace', () => {
         test('THEN then correct valid hex value is returned', () => {
            generator.getRandomColorSpace = jest.fn(() => ColorType.RGB);
            generator.getRandomInteger = jest.fn(() => 10);

            const color = generator.generate();

            expect(color)
               .toEqual(
                  expect.objectContaining({
                     red: 10,
                     green: 10,
                     blue: 10,
                     type: 'rgb',
                     colorString: 'rgb(10, 10, 10)',
                     tone: 'dark',
                     hex: '#0a0a0a'
                  })
               );
         });
      });

      describe('WHEN calling generate for HSL colorspace', () => {
         test('THEN then correct valid hex value is returned', () => {
            generator.getRandomColorSpace = jest.fn(() => ColorType.HSL);
            generator.getRandomInteger = jest.fn(() => 10);

            const color = generator.generate();
            expect(color)
               .toEqual(
                  expect.objectContaining({
                     hue: 10,
                     saturation: 10,
                     lightness: 10,
                     type: 'hsl',
                     colorString: 'hsl(10, 10%, 10%)',
                     tone: 'dark',
                     hex: '#1c1817'
                  })
               );
         });
      });
   });
});