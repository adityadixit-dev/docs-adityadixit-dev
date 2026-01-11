import H2Toc from "@/components/helpers/H2Toc";
import { nextJsTemplateSlugs } from "@/docs/nextjs/nextjs-template.config";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post, tableOfContents } = await import(
    `@/docs/nextjs/${slug}.md`
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
}

export function generateStaticParams() {
  return nextJsTemplateSlugs;
}

export const dynamicParams = false;
