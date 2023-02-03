import { ColorType } from "../../types";
import { getRandomColorSpace } from "../utils";

describe("TESTING getRandomColorSpace", () => {
  describe("GIVEN some color spaces are defined", () => {
    describe("WHEN calling generate randomColorSpace", () => {
      test("THEN a valid color space is returned", () => {
        const colorSpace = getRandomColorSpace();
        const colorSpaces = Object.values(ColorType);
        expect(colorSpaces).toContain(colorSpace);
      });
    });
  });
});
