import { generateRandomInteger } from "../generate-random-int";

describe("TESTING generateRandomInteger", () => {
  describe("GIVEN a max value", () => {
    describe("WHEN calling generateRandomInteger", () => {
      test("THEN an integer greater less than max is returned", () => {
        const val = generateRandomInteger(1);
        expect(val).toBeLessThanOrEqual(1);
        expect(val).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("GIVEN a max value and a min value", () => {
    describe("WHEN calling generateRandomInteger", () => {
      test("THEN an integer greater less than max and greater than min is returned", () => {
        const min = 10;
        const max = 15;
        const val = generateRandomInteger(max, min);
        expect(val).toBeLessThanOrEqual(max);
        expect(val).toBeGreaterThanOrEqual(min);
      });
    });
  });
});
