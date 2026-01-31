import fs from "fs";

export type SlugType = {
  slug: string;
};

export function getAllSlugsInDir(dirPathName: string): SlugType[] {
  const files = fs.readdirSync(dirPathName, { withFileTypes: true });

  return files
    .filter((file) => file.isDirectory() || file.name.endsWith(".md"))
    .map((filteredFiles) => {
      return filteredFiles.isDirectory()
        ? { slug: filteredFiles.name }
        : { slug: filteredFiles.name.slice(0, -3) };
    });
}
