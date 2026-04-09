import { defineHandler } from "h3";

export default defineHandler(() => {
  return ({
    ok: true,
    route: "pong"
  })
});
