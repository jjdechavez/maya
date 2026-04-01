import { defineEventHandler } from "h3";

export default defineEventHandler(() => ({
  ok: true,
  message: "Static example ready"
}));
