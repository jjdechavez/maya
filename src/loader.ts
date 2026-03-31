import { loadConfig } from "c12";
import type { MayaConfig } from "./config.js";

export interface LoadMayaConfigOptions {
  cwd?: string;
  configFile?: string;
  import?: (id: string) => Promise<unknown>;
}

export interface LoadedMayaConfig {
  config: MayaConfig;
  configFile?: string;
}

export async function loadMayaConfig(
  options: LoadMayaConfigOptions = {}
): Promise<LoadedMayaConfig> {
  const { cwd, configFile, import: importModule } = options;
  const result = await loadConfig<MayaConfig>({
    name: "maya",
    cwd,
    configFile,
    dotenv: true,
    import: importModule
  });

  return {
    config: result.config,
    configFile: result.configFile
  };
}
