import fs from "fs";

export type SlugType = {
  slug: string;
};

export function getAllSlugsInDir(dirPathName: string): SlugType[] {
  const slugs = fs.readdirSync(dirPathName);

  return slugs
    .filter((slug) => slug.endsWith(".md"))
    .map((filteredSlug) => {
      return { slug: filteredSlug.slice(0, -3) };
    });
}
