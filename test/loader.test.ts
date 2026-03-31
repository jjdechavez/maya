import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createJiti } from "jiti";
import { loadMayaConfig } from "../src/loader.js";

let tempDir: string | undefined;

afterEach(async () => {
  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true });
    tempDir = undefined;
  }
});

describe("loadMayaConfig", () => {
  it("loads config and merges dotenv", async () => {
    tempDir = await mkdtemp(join(tmpdir(), "maya-"));
    await writeFile(join(tempDir, ".env"), "MAYA_PORT=4123\n");
    await writeFile(
      join(tempDir, "maya.config.ts"),
      "export default { port: Number(process.env.MAYA_PORT) };\n"
    );

    const resolver = createJiti(import.meta.url, { moduleCache: false });
    const { config } = await loadMayaConfig({
      cwd: tempDir,
      import: (id) => resolver.import(id)
    });

    expect(config.port).toBe(4123);
  });
});
