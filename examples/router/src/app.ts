import { apiRoutes, publicRoutes } from "./routes/index.ts";

export const routes = [...apiRoutes, ...publicRoutes]
