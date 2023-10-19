// package.json "type": "module",
import { toQueryString, parseSeconds } from "./util.js";
import { describe, test, expect } from "vitest";

// package.json "type": "commonjs",
// const toQueryString = require("./util");

describe("Utilities", () => {
  test("Demo run", () => {
    expect(true).toBe(true);
  });

  test("Convert empty queries object to URL, without a filter", () => {
    const queries = {};
    const result = toQueryString(queries);
    expect(result).toEqual("");
  });

  test("Convert queries object to URL, without a filter", () => {
    const queries = {
      level: "easy",
      secondParam: "hello world",
    };
    const result = toQueryString(queries);
    expect(result).toEqual("?level=easy&secondParam=hello%20world");
  });

  test("Convert queries object to URL, with a filter", () => {
    const queries = { level: "easy", secondParam: "second" };
    const result = toQueryString(queries, ["level"]);
    expect(result).toEqual("?level=easy");
  });
});
