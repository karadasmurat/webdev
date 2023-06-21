import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import App from "../App";

// Vitest comes with test suites (here: describe),
// test cases (here: it) and
// assertions (here: expect().toBe()).
describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    const headline = screen.getByText("List of Todos:");
    expect(headline).toBeInTheDocument();
  });
});
