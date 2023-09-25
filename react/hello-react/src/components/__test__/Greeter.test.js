import Greeter from "../Greeter";
import { render, screen, fireEvent } from "@testing-library/react";

// jest-dom library provides a set of custom jest matchers that you can use to extend jest.
import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
// import { describe, test, expect } from "@jest/globals";

// Jest Describe Blocks and Test Cases
describe("test suite 1", () => {
  // Jest Test Cases
  test("renders with heading", () => {
    // Render a component
    render(<Greeter />);
    // Find element(s) to interact with
    const element1 = screen.getByRole("heading");

    // Matching a string:
    const element3 = screen.getByText("Hello World"); // full string match
    // Matching a regex:
    const element4 = screen.getByText(/World/); // substring match
    const element5 = screen.getByText(/world/i); // substring match, ignore case

    // Matching with a custom function:
    const element6 = screen.getByText((content, element) =>
      content.startsWith("Hello")
    );

    // Interact with those elements
    // Assert that the results are as expected.
    // @see — testing-library/jest-dom#tobeinthedocument
    expect(element6).toBeInTheDocument();
    
  });
});


