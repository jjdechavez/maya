import { defineTamsiConfig } from "tamsi";
import handler from "./routes/index";
import { defineHandler } from "h3";

export default defineTamsiConfig({
  port: 5555,
  shutdownTimeoutMs: 8000,
  routes: [
    {
      method: "GET",
      path: "/",
      middleware: [defineHandler(() => console.log("Middleware before '/' endpoint."))],
      handler,
    }
  ],
  onBeforeClose: () => {
    console.warn("Prepare for landing...")
  },
  middlewares: [
    { handler: defineHandler(() => console.log("Middleware 1")) },
    { handler: defineHandler(() => console.log("Middleware 2")) }
  ]
});
