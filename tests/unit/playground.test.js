import { describe, it, expect } from "vitest";
import { oddOrEven } from "@/playground";

describe("basic math", () => {
  it("adds to numbers", () => {
    expect(1 + 1).toBe(2); //Used to run the core tests
  }); //Used to dictate or fore state what the test will do

  describe("EvenOrOdd", () => {
    it("checks if a number is Even", () => {
      expect(oddOrEven(4)).toBe("Even");
    });
  });
}); //Used to describe what we are testing at it appears in our test output

//run $npm run test:unit to run all the files ending in .test.js
