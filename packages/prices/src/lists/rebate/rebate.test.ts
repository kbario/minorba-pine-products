import calculatedPrices from "./rebate";
import { wholesale } from "@data/prices";
import { describe, expect, test } from "vitest";

describe("Rebate Price List", () => {
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
        expected: (Number(wholesale[i]?.postPrice) * 1.04) / 0.96,
      })),
    )(
      "should make price be 4%% more than original + rebate",
      ({ actual, expected }) => {
        expect(actual).toBeCloseTo(expected, 2);
      },
    );
  });
});
