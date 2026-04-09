import { defineTamsiRouter } from "tamsi"

import ping from "./ping.ts"
import hello from "./hello.ts"

export const apiRoutes = defineTamsiRouter({
  basePath: "/api",
  routes: [{ method: "GET", path: "/ping", handler: ping }]
});

export const publicRoutes = defineTamsiRouter({
  basePath: "/",
  routes: [{ method: "GET", path: "/hello", handler: hello }]
});

export const routes = [...apiRoutes, publicRoutes]
