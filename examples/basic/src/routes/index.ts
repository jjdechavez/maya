import { defineHandler } from "h3";

export default defineHandler((event) => ({
  ok: true,
  message: "Tamsi is cool.",
  requestId: event.context.requestId
}));
