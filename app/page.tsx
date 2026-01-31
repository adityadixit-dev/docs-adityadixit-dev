import { Separator } from "@/components/ui/separator";
import ListSlugsAsLinks from "@/components/helpers/ListSlugsAsLinks";
import { getAllSlugsInDir, SlugType } from "@/lib/docs/get-all-slugs-in-dir";

export default async function RootHomePage() {
  const currDir = `docs/`;
  const currTemplateSlugs: SlugType[] = getAllSlugsInDir(currDir);

  return (
    <article>
      <h1>Cheat Sheets</h1>
      <Separator className="my-4" />

      <article className="md:grid md:grid-cols-5 h-full  no-scrollbar md:gap-x-4">
        <nav className="md:col-span-1">
          <ListSlugsAsLinks slugs={currTemplateSlugs} basePath={``} />
        </nav>
      </article>
      <h2>Possible Ideas</h2>
      <ul>
        <li>More on NextJs</li>
        <li>Adding a chatbot that interacts with the docs</li>
      </ul>
    </article>
  );
}
