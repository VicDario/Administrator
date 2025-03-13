export async function loadFiles<T>(path: string): Promise<T[]> {
  const filesPath = Deno.readDir(path);
  const files: T[] = [];
  for await (const filePath of filesPath) {
    const module: { default: T } = await import(`${path}/${filePath.name}`);
    files.push(module.default);
  }
  return files;
}
