import { SlugType } from "@/lib/docs/get-all-slugs-in-dir";
import Link from "next/link";

type ListSlugsAsLinksProps = {
  slugs: SlugType[];
  basePath: string;
};

const ListSlugsAsLinks = ({ slugs, basePath }: ListSlugsAsLinksProps) => {
  return (
    <div>
      <ul>
        {slugs.map(({ slug }) => (
          <li key={slug}>
            <Link href={`${basePath}/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSlugsAsLinks;
