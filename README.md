Maya

Lightweight micro-engine for explicit h3-based servers.

Shutdown hooks

Use `onBeforeClose` to run cleanup logic during a graceful shutdown. The CLI
waits for this hook before closing the listener, with a timeout guard.

```ts
import { defineMayaConfig } from "maya";

export default defineMayaConfig({
  shutdownTimeoutMs: 10000,
  async onBeforeClose() {
    console.log("Maya is landing...");
    // close DB connections, flush queues, etc.
  }
});
```

- `shutdownTimeoutMs` defaults to 10000 if not set.
- `onBeforeClose` runs for both `maya dev` and `maya start`.
