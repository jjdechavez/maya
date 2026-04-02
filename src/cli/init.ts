import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type TemplateName = "minimal" | "standard";

export interface InitOptions {
  name: string;
  template: TemplateName;
  cwd: string;
  force: boolean;
  port: number;
}

const templateRoot = resolve(
  fileURLToPath(new URL("../../templates", import.meta.url))
);

export async function initProject(options: InitOptions) {
  const targetDir = resolve(options.cwd, options.name);
  const templateDir = resolve(templateRoot, options.template);

  await ensureEmptyDir(targetDir, options.force);
  await copyTemplate(templateDir, targetDir, {
    __NAME__: options.name,
    __PORT__: String(options.port)
  });

  return targetDir;
}

async function ensureEmptyDir(targetDir: string, force: boolean) {
  try {
    const entries = await readdir(targetDir);
    if (entries.length > 0 && !force) {
      throw new Error(`Target directory is not empty: ${targetDir}`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
    await mkdir(targetDir, { recursive: true });
  }
}

async function copyTemplate(
  templateDir: string,
  targetDir: string,
  replacements: Record<string, string>
) {
  const entries = await readdir(templateDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(templateDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await mkdir(targetPath, { recursive: true });
      await copyTemplate(sourcePath, targetPath, replacements);
      continue;
    }

    await mkdir(dirname(targetPath), { recursive: true });
    const contents = await readFile(sourcePath, "utf8");
    const rendered = renderTemplate(contents, replacements);
    await writeFile(targetPath, rendered, "utf8");
  }
}

function renderTemplate(contents: string, replacements: Record<string, string>) {
  let output = contents;
  for (const [key, value] of Object.entries(replacements)) {
    output = output.replaceAll(key, value);
  }
  return output;
}
