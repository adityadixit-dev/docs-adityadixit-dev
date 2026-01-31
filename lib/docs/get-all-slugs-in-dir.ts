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

export type CatchAllSlugsType = {
  slugs: string[];
};

export function getAllSlugsPath(baseDir: string): CatchAllSlugsType[] {
  function walkDirSync(
    dir: string,
    fileList: SlugType[] = [],
    dirSoFar: string = "",
  ) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const f of files) {
      if (f.isDirectory()) {
        fileList.push({ slug: `${dirSoFar}/${f.name}` });
        walkDirSync(`${dir}/${f.name}`, fileList, `${dirSoFar}/${f.name}`);
      } else if (f.name.endsWith(".md")) {
        fileList.push({ slug: `${dirSoFar}/${f.name.slice(0, -3)}` });
      }
    }

    return fileList;
  }

  const allSlugs: SlugType[] = walkDirSync(baseDir);

  return allSlugs.map(({ slug }) => {
    return { slugs: slug.split("/").slice(1) };
  });
}
