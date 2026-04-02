import { defineMayaConfig } from "maya";
import handler from "./routes/index";

export default defineMayaConfig({
  port: __PORT__,
  publicDir: "public",
  publicPath: "/public",
  routes: [{ path: "/", handler }]
});
