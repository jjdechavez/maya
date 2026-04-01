import { defineMayaConfig } from "maya";
import handler from "./routes/index";

export default defineMayaConfig({
  port: 8080,
  shutdownTimeoutMs: 8000,
  routes: [{ path: "/", handler }]
});
