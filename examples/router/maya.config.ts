import { defineMayaConfig, defineMayaRouter } from "maya";
import ping from "./routes/ping";

const routes = defineMayaRouter({
  basePath: "/api",
  routes: [{ method: "GET", path: "/ping", handler: ping }]
});

export default defineMayaConfig({
  port: 5555,
  routes
});
