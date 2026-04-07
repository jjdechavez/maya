import { defineTamsiConfig, defineTamsiRouter } from "tamsi";
import ping from "./routes/ping.ts";

const routes = defineTamsiRouter({
  basePath: "/api",
  routes: [{ method: "GET", path: "/ping", handler: ping }]
});

export default defineTamsiConfig({
  port: 5555,
  routes
});
