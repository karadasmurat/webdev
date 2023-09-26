import Quantity from "../Quantity";
import { render, screen } from "@testing-library/react";

// user-event is a companion library for Testing Library that simulates user interactions
import userEvent from "@testing-library/user-event";

// jest-dom library provides a set of custom jest matchers that you can use to extend jest.
import "@testing-library/jest-dom";

// Jest Describe Blocks and Test Cases
describe("test suite 1", () => {
  test("test 01", async () => {
    // setup applies workarounds and mock the UI layer to simulate user interactions
    const user = userEvent.setup();
    render(<Quantity />);
    const element = screen.getByRole("spinbutton", { name: /quantity/i });
    expect(element).toHaveValue(0);

    // Simulate a user typing into an input element:
    await user.type(element, "99");
    expect(element).toHaveValue(99);

    const btn_inc = screen.getByRole("button", { name: /\+/i });
    // Simulate a user clicking a button:
    await user.click(btn_inc);
    expect(element).toHaveValue(100);
  });
});
