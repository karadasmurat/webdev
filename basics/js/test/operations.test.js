const { add, multiply } = require("./operations");

// Create a block that groups together several related tests.
describe("suite 2", () => {
  // compare primitives - toBe
  test("add(1,2) is 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});
