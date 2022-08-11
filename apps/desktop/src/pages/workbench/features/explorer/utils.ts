import { Dir } from "./types";

export function findParentDir(rootDir: Dir, components: string[]) {
  const neededComponents = components.slice(0, components.length - 1);

  let parentDir = rootDir;
  for (const component of neededComponents) {
    parentDir = parentDir.dirs.find((dir) => dir.fileName === component)!;
  }

  return parentDir;
}
