import { defineCommand } from "citty";
import { access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

export default defineCommand(
  {
    meta: {
      name: "start",
      description: "Start Maya in production mode"
    },
    args: {
      port: {
        type: "string",
        description: "Port to listen on"
      },
      host: {
        type: "string",
        description: "Host to bind"
      },
      outDir: {
        type: "string",
        description: "Build output directory",
        default: "dist"
      }
    },
    run: async ({ args }) => {
      const outDir = typeof args.outDir === "string" ? args.outDir : "dist";
      const serverPath = resolve(process.cwd(), outDir, "server.mjs");

      try {
        await access(serverPath);
      } catch {
        consola.error(`Build output not found at ${serverPath}. Run "maya build".`);
        throw new Error("Missing build output.");
      }

      const env = { ...process.env };
      if (typeof args.port === "string") {
        env.PORT = args.port;
      }
      if (typeof args.host === "string") {
        env.HOST = args.host;
      }

      const child = spawn(process.execPath, [serverPath], {
        stdio: "inherit",
        env
      });

      child.on("exit", (code) => {
        process.exit(code ?? 0);
      });
    }
  }
)
