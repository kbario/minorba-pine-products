import calculatedPrices from "./retail";
import { retail } from "@data/prices";
import { describe, expect, test } from "vitest";

describe("Wholesale Price List", () => {
  // describe("Ordering Code Generation", () => {
  //   test.each(
  //     calculatedPrices.map((x, i) => ({
  //       actual: x.code,
  //       expected: retail[i]?.code,
  //     })),
  //   )("$actual should match $expected", ({ actual, expected }) => {
  //     expect(actual).toBe(expected);
  //   });
  // });

  // describe("Prices", () => {
  //   test.each(
  //     calculatedPrices.map((x, i) => ({
  //       actual: x.postPrice,
  //       expected: Number(retail[i]?.postPrice) * 1.04,
  //     })),
  //   )("should make price be 4%% more than original", ({ actual, expected }) => {
  //     expect(actual).toBeCloseTo(expected, 2);
  //   });
  // });

  describe("test", () => {
    test.each(
      calculatedPrices.map((x, i) => ({
        actual: x.packPrice,
        expected: Number(retail[i]?.packPrice) * 1.04,
      })),
    )("should make price be 4%% more than original", ({ actual, expected }) => {
      expect(actual).toBe(expected);
    });
  });
});
