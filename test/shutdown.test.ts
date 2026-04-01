import { describe, expect, it, vi } from "vitest";
import { createShutdownHooks, runBeforeClose } from "../src/shutdown.js";

describe("shutdown hooks", () => {
  it("awaits onBeforeClose", async () => {
    const hook = vi.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    const hooks = createShutdownHooks({ onBeforeClose: hook });
    await runBeforeClose(hooks, { timeoutMs: 1000 });
    expect(hook).toHaveBeenCalledTimes(1);
  });

  it("invokes timeout handler when hooks are slow", async () => {
    const hook = vi.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    const onTimeout = vi.fn();
    const hooks = createShutdownHooks({ onBeforeClose: hook });

    await runBeforeClose(hooks, { timeoutMs: 5, onTimeout });
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });
});
