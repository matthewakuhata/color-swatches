import { ColorType, HSL, RGB } from "../../types";
import { HSLColor } from "../HSLColor";

describe("TESTING calculateTone", () => {
  describe("GIVEN valid RGB values that is dark", () => {
    describe("WHEN calling calculateTone", () => {
      test("THEN the tone is dark", () => {
        const color = new HSLColor(360, 0, 0);
        const tone = color.calculateTone();
        expect(tone).toBe("dark");
      });
    });
  });

  describe("GIVEN valid RGB values that is light", () => {
    describe("WHEN calling calculateTone", () => {
      test("THEN the tone is light", () => {
        const color = new HSLColor(360, 100, 100);
        const tone = color.calculateTone();
        expect(tone).toBe("light");
      });
    });
  });
});

describe("TESTING getHex", () => {
  describe("GIVEN a valid HSL color", () => {
    describe("WHEN calling getHex", () => {
      test("THEN then correct valid hex value is returned", () => {
        const hsl = {
          hue: 285,
          saturation: 49,
          lightness: 38,
        };

        const color = new HSLColor(hsl.hue, hsl.saturation, hsl.lightness);
        const expectedHex = "#793190";

        expect(color.toHex()).toBe(expectedHex);
      });
    });
  });
});

describe("TESTING toRGB", () => {
  describe("GIVEN a valid HSL color", () => {
    describe("WHEN calling toRGB", () => {
      test("THEN rbg values are returned", () => {
        const expectedRed = 121;
        const expectedGreen = 49;
        const expectedBlue = 144;

        const hsl = {
          hue: 285,
          saturation: 49,
          lightness: 38,
        };
        const color = new HSLColor(hsl.hue, hsl.saturation, hsl.lightness);

        const { red, green, blue } = color.toRGB();

        expect(red).toEqual(expectedRed);
        expect(green).toEqual(expectedGreen);
        expect(blue).toEqual(expectedBlue);
      });
    });
  });
});

describe("TESTING toString", () => {
  describe("GIVEN a valid HSL color", () => {
    describe("WHEN calling toString", () => {
      test("THEN a color string is returned", () => {
        const hsl = {
          hue: 285,
          saturation: 49,
          lightness: 38,
        };
        const color = new HSLColor(hsl.hue, hsl.saturation, hsl.lightness);

        expect(color.toString()).toEqual("hsl(285, 49%, 38%)");
      });
    });
  });
});

describe("TESTING getDetails", () => {
  describe("GIVEN a valid HSL color", () => {
    describe("WHEN calling getDetails", () => {
      test("The color object details are returned", () => {
        const hsl = {
          hue: 360,
          saturation: 0,
          lightness: 0,
        };
        const color = new HSLColor(hsl.hue, hsl.saturation, hsl.lightness);
        expect(color.getDetails()).toEqual(
          expect.objectContaining({
            hue: 360,
            saturation: 0,
            lightness: 0,
            type: "hsl",
            colorString: "hsl(360, 0%, 0%)",
            tone: "dark",
            hex: "#000000",
          })
        );
      });
    });
  });
});
