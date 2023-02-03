import { RGBColor } from "../RGBColor";

describe("TESTING calculateTone", () => {
  describe("GIVEN valid RGB values that is dark", () => {
    describe("WHEN calling calculateTone", () => {
      test("THEN the tone is dark", () => {
        const color = new RGBColor(255, 255, 255);
        const tone = color.calculateTone();
        expect(tone).toBe("light");
      });
    });
  });

  describe("GIVEN valid RGB values that is dark", () => {
    describe("WHEN calling calculateTone", () => {
      test("THEN the tone is dark", () => {
        const color = new RGBColor(0, 0, 0);
        const tone = color.calculateTone();
        expect(tone).toBe("dark");
      });
    });
  });
});

describe("TESTING toHex", () => {
  describe("GIVEN a valid RGB color", () => {
    describe("WHEN calling toHex", () => {
      test("THEN then correct valid hex value is returned", () => {
        const rgb = {
          red: 120,
          green: 49,
          blue: 143,
        };
        const color = new RGBColor(rgb.red, rgb.green, rgb.blue);

        const expectedHex = "#78318f";
        expect(color.toHex()).toBe(expectedHex);
      });
    });
  });
});

describe("TESTING toRGB", () => {
  describe("GIVEN a valid RGB color", () => {
    describe("WHEN calling convertToRGB", () => {
      test("THEN rbg values are returned", () => {
        const expectedRed = 120;
        const expectedGreen = 49;
        const expectedBlue = 143;
        const color = new RGBColor(expectedRed, expectedGreen, expectedBlue);

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
        const rgb = {
          red: 120,
          green: 49,
          blue: 143,
        };
        const color = new RGBColor(rgb.red, rgb.green, rgb.blue);

        expect(color.toString()).toEqual("rgb(120,49,143)");
      });
    });
  });
});

describe("TESTING getDetails", () => {
  describe("GIVEN a valid HSL color", () => {
    describe("WHEN calling getDetails", () => {
      test("The color object details are returned", () => {
        const rgb = {
          red: 120,
          green: 49,
          blue: 143,
        };
        const color = new RGBColor(rgb.red, rgb.green, rgb.blue);

        expect(color.getDetails()).toEqual(
          expect.objectContaining({
            red: 120,
            green: 49,
            blue: 143,
            type: "rgb",
            colorString: "rgb(120,49,143)",
            tone: "dark",
            hex: "#78318f",
          })
        );
      });
    });
  });
});
