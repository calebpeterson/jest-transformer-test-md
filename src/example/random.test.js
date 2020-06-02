const random = require("./random");

describe("random", () => {
  it("should default to having a max of 1", () => {
    expect(random()).toBeLessThan(1);
  });
  it("should have a configurable max", () => {
    expect(random(100)).toBeLessThan(100);
  });
});
