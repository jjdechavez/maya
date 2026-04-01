import { defineMayaConfig } from "maya";
import handler from "./routes/index";

export default defineMayaConfig({
  port: 5555,
  publicDir: "public",
  publicPath: "/",
  routes: [{ path: "/api", handler }]
});
