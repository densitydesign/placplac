import { inputToStateThreshold, stateToInputThreshold } from "./threshold";
import { MAX_LABEL_THRESHOLD, MIN_LABEL_THRESHOLD } from "../lib/consts";

describe("Label thresholds translation utils", () => {
  describe("#inputThresholdToStateThreshold", () => {
    it("should work 'normally' with normal single values cases", () => {
      expect(inputToStateThreshold(1)).toBe(6);
      expect(inputToStateThreshold(2)).toBe(3);
      expect(inputToStateThreshold(0.5)).toBe(12);
    });

    it("should work with extreme values", () => {
      expect(inputToStateThreshold(MAX_LABEL_THRESHOLD)).toBe(0);
      expect(inputToStateThreshold(MAX_LABEL_THRESHOLD + 0.001)).toBe(0);
      expect(inputToStateThreshold(MIN_LABEL_THRESHOLD)).toBe(Infinity);
      expect(inputToStateThreshold(MIN_LABEL_THRESHOLD - 0.001)).toBe(Infinity);
    });
  });

  describe("#stateThresholdToInputThreshold", () => {
    it("should work 'normally' with normal single values cases", () => {
      expect(stateToInputThreshold(6)).toBe(1);
      expect(stateToInputThreshold(3)).toBe(2);
      expect(stateToInputThreshold(12)).toBe(0.5);
    });

    it("should work with extreme values", () => {
      expect(stateToInputThreshold(0)).toBe(MAX_LABEL_THRESHOLD);
      expect(stateToInputThreshold(Infinity)).toBe(MIN_LABEL_THRESHOLD);
    });
  });
});
