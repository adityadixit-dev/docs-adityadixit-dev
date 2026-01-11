import ListSlugsAsLinks from "@/components/helpers/ListSlugsAsLinks";
import { nextJsTemplateSlugs } from "@/docs/nextjs/nextjs-template.config";
import { getAllSlugsInDir } from "@/lib/docs/get-all-slugs-in-dir";

type NextJSLayoutProps = {
  children: React.ReactNode;
};

const NextJSLayout = ({ children }: NextJSLayoutProps) => {
  const slugs = nextJsTemplateSlugs;

  return (
    <article className="md:grid md:grid-cols-5 h-full  no-scrollbar md:gap-x-4">
      <nav className="md:col-span-1">
        <ListSlugsAsLinks slugs={slugs} basePath="/nextjs" />
      </nav>

      <main className="md:col-span-4 h-full  no-scrollbar ">{children}</main>
    </article>
  );
};

export default NextJSLayout;
