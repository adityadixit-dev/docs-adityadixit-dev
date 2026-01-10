import fs from "fs";

export function getAllSlugsInDir(dirPathName: string) {
  const slugs = fs.readdirSync(dirPathName);

  return slugs
    .filter((slug) => slug.endsWith(".md"))
    .map((filteredSlug) => {
      return { slug: filteredSlug.slice(0, -3) };
    });
}
