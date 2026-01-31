import ListSlugsAsLinks from "@/components/helpers/ListSlugsAsLinks";
import { getAllSlugsInDir, SlugType } from "@/lib/docs/get-all-slugs-in-dir";
import Link from "next/link";

const AllDocsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slugs: string[] }>;
}) => {
  const { slugs } = await params;

  const basePath = slugs?.slice(0, -1).join("/") ?? "";
  // const finalSlug = slugs[slugLength - 1];

  const currDir = `docs/${basePath}`;
  const currTemplateSlugs: SlugType[] = getAllSlugsInDir(currDir);

  return (
    <article className="md:grid md:grid-cols-5 h-full  no-scrollbar md:gap-x-4">
      <nav className="md:col-span-1">
        <h2>
          <Link href={`/${basePath}`}>Previous</Link>
        </h2>
        <ListSlugsAsLinks
          slugs={currTemplateSlugs}
          basePath={basePath ? `/${basePath}` : ""}
        />
      </nav>

      <main className="md:col-span-4 h-full  no-scrollbar ">{children}</main>
    </article>
  );
};

export default AllDocsLayout;
