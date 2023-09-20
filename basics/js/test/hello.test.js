// check referential identity - toBe
test("referential identity", () => {
  const std1 = { surname: "Potter", isWizard: true };
  const std2 = { surname: "Potter", isWizard: true };
  expect(std1).not.toBe(std2); // pass
});

// check referential identity - toBe
test("referential identity", () => {
  const std1 = { surname: "Potter", isWizard: true };
  const std3 = std1;
  expect(std3).toBe(std1); // pass
});

// check deep equality (compare recursively all properties) - toEqual
test("deep equality of different objects", () => {
  const std1 = { surname: "Potter", isWizard: true };
  const std2 = { surname: "Potter", isWizard: true };
  expect(std1).toEqual(std2); // pass
});

// compare primitives - toBe
test("compare primitives", () => {
  expect(3).toBe(3);
});
