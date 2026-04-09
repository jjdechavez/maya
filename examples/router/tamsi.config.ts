import { defineTamsiConfig } from "tamsi";

import { routes } from './src/app.ts'

export default defineTamsiConfig({
  port: 5555,
  routes
});
