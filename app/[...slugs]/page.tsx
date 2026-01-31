import H2Toc from "@/components/helpers/H2Toc";
import ListSlugsAsLinks from "@/components/helpers/ListSlugsAsLinks";
import {
  CatchAllSlugsType,
  getAllSlugsInDir,
  getAllSlugsPath,
  SlugType,
} from "@/lib/docs/get-all-slugs-in-dir";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const slugPath = slugs.join("/");

  try {
    const { default: Post, tableOfContents } = await import(
      `@/docs/${slugPath}.md`
    );

    return (
      <div className="md:grid md:grid-cols-4 h-full md:gap-x-8">
        <section className="col-span-3 no-scrollbar ">
          <Post />
        </section>

        <aside className="col-span-1 ">
          <H2Toc toc={tableOfContents} />
        </aside>
      </div>
    );
  } catch {
    try {
      const directorySlugs: SlugType[] = getAllSlugsInDir(`docs/${slugPath}`);
      return (
        <nav>
          <ListSlugsAsLinks slugs={directorySlugs} basePath={`/${slugPath}`} />
        </nav>
      );
    } catch {
      return notFound();
    }
  }
}

export function generateStaticParams() {
  const allSlugs: CatchAllSlugsType[] = getAllSlugsPath("docs");
  return allSlugs;
}

export const dynamicParams = false;
