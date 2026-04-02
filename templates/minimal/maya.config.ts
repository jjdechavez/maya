import { defineMayaConfig } from "maya";
import handler from "./routes/index";

export default defineMayaConfig({
  port: __PORT__,
  routes: [{ path: "/", handler }]
});
