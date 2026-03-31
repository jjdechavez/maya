import { describe, expect, it } from "vitest";
import { defineMayaConfig } from "../src/config.js";

describe("defineMayaConfig", () => {
  it("returns the config object", () => {
    const config = { port: 4321 };
    expect(defineMayaConfig(config)).toBe(config);
  });
});
