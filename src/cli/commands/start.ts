import { defineCommand } from "citty";
import consola from "consola";

import { startServer } from "../../cli.js";
import { createShutdownHooks, runBeforeClose } from "../../index.js";

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
      config: {
        type: "string",
        description: "Path to maya config file"
      }
    },
    run: async ({ args }) => {

      const { listener, config } = await startServer(args, "production");
      let shuttingDown = false;

      const shutdown = async () => {
        if (shuttingDown) {
          return;
        }

        shuttingDown = true;
        const hooks = createShutdownHooks(config ?? {});
        const timeoutMs = config.shutdownTimeoutMs ?? 10000;
        consola.info("🕊️ Maya is landing... running shutdown hooks.");
        await runBeforeClose(hooks, {
          timeoutMs,
          onTimeout: () => {
            consola.warn(`Shutdown hooks timed out after ${timeoutMs}ms.`);
          }
        });

        await listener.close();
        consola.info("🕊️ Maya shutdown complete.");
        process.exit(0);
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    }
  }
)
