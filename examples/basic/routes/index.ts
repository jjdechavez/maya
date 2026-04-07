import { defineHandler } from "h3";

export default defineHandler((event) => ({
  ok: true,
  message: "Tamsi is flying.",
  requestId: event.context.requestId
}));
