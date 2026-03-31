import { describe, expect, it } from "vitest";
import { resolveServerOptions } from "../src/cli/resolve.js";

describe("resolveServerOptions", () => {
  it("prefers CLI port over config", () => {
    const resolved = resolveServerOptions({ port: "5050" }, { port: 4040 });
    expect(resolved.port).toBe(5050);
  });

  it("falls back to config port", () => {
    const resolved = resolveServerOptions({}, { port: 4040 });
    expect(resolved.port).toBe(4040);
  });

  it("falls back to default port", () => {
    const resolved = resolveServerOptions({}, {});
    expect(resolved.port).toBe(3000);
  });

  it("throws on invalid port", () => {
    expect(() => resolveServerOptions({ port: "abc" }, {})).toThrow(
      "Invalid port"
    );
  });
});
