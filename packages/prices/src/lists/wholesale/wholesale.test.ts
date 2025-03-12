import calculatedPrices from "./wholesale";
import { wholesale } from "@data/prices";
import { describe, expect, test } from "vitest";

describe("Wholesale Price List", () => {
  describe("Ordering Code Generation", () => {
    test.each(
      calculatedPrices.map((x, i) => ({
        actual: x.code,
        expected: wholesale[i]?.code,
      })),
    )("$actual should match $expected", ({ actual, expected }) => {
      expect(actual).toBe(expected);
    });
  });

  describe("Prices", () => {
    test.each(
      calculatedPrices.map((x, i) => ({
        actual: x.postPrice,
        expected: Number(wholesale[i]?.postPrice) * 1.04,
      })),
    )("should make price be 4%% more than original", ({ actual, expected }) => {
      expect(actual).toBeCloseTo(expected, 2);
    });
  });
});
