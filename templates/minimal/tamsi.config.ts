import { defineTamsiConfig } from "tamsi";
import handler from "./src/routes/index.ts";

export default defineTamsiConfig({
  port: __PORT__,
  routes: [{ path: "/", handler }]
});
