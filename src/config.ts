import type { EventHandler, Middleware } from "h3";

export type Awaitable<T> = T | Promise<T>;

export interface MayaMiddleware {
  path?: string;
  handler: EventHandler | Middleware | string;
}

export interface MayaRoute {
  path: string;
  handler: EventHandler;
}

export interface MayaConfig {
  port?: number;
  shutdownTimeoutMs?: number;
  onBeforeClose?: () => Awaitable<void>;
  middleware?: MayaMiddleware[];
  routes?: MayaRoute[];
}

export function defineMayaConfig<T extends MayaConfig>(config: T): T {
  return config;
}
