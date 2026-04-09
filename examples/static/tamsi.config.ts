import { defineTamsiConfig } from "tamsi";
import handler from "./src/routes/index.ts";

export default defineTamsiConfig({
  port: 5555,
  serveStatic: {
    publicDir: "public",
    publicPath: "/", // Set "/admin" or "/dashboard"
  },
  routes: [{ method: "GET", path: "/api/test", handler }],
  health: { enabled: false }
});
