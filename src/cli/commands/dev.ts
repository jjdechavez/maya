import { defineCommand } from "citty";
import { Listener } from "listhen";
import consola from "consola";
import { dirname, resolve } from "node:path";
import chokidar from "chokidar";

import { startServer } from "../../cli.js";
import { type MayaConfig, createShutdownHooks, runBeforeClose } from "../../index.js";

export default defineCommand(
  {
    meta: {
      name: "dev",
      description: "Start Maya in development mode"
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
      config: {
        type: "string",
        description: "Path to maya config file"
      }
    },
    run: async ({ args }) => {
      let listener: Listener | undefined;
      let config: MayaConfig | undefined;
      let restarting = false;
      let pendingRestart = false;
      let shuttingDown = false;

      async function stop() {
        if (listener) {
          await listener.close();
          listener = undefined;
        }
      }

      async function start() {
        const result = await startServer(args, "dev");
        listener = result.listener;
        config = result.config;
      }

      async function restart() {
        if (restarting) {
          pendingRestart = true;
          return;
        }

        restarting = true;
        try {
          await stop();
          await start();
          consola.success("Maya restarted.");
        } finally {
          restarting = false;
          if (pendingRestart) {
            pendingRestart = false;
            await restart();
          }
        }
      }

      await start();

      const cwd = process.cwd();
      const configArgs = typeof args.config === "string" ? args.config : undefined;

      let watchTargets: string[] = [
        resolve(cwd, "maya.config.ts"),
        resolve(cwd, "maya.config.mts"),
        resolve(cwd, "maya.config.cts"),
        resolve(cwd, "routes")
      ];

      if (configArgs) {
        const configFile = resolve(cwd, configArgs);
        const configDir = dirname(configFile);
        watchTargets = [configFile, resolve(configDir, "routes")];
      }

      const watcher = chokidar.watch(watchTargets, {
        ignoreInitial: true,
      });

      watcher.on("all", async () => {
        await restart();
      });

      const shutdown = async () => {
        if (shuttingDown) {
          return;
        }

        shuttingDown = true;
        const hooks = createShutdownHooks(config ?? {});
        const timeoutMs = config?.shutdownTimeoutMs ?? 10000;
        consola.info("🕊️ Maya is landing... running shutdown hooks.");
        await runBeforeClose(hooks, {
          timeoutMs,
          onTimeout: () => {
            consola.warn(`Shutdown hooks timed out after ${timeoutMs}ms.`);
          }
        });

        await watcher.close();
        await stop();
        consola.info("🕊️ Maya shutdown complete.");
        process.exit(0);
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    }
  }
)
