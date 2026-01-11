import {
  getH2FromToc,
  H2HeadingsType,
  Toc,
} from "@/lib/docs/h2-from-table-of-contents";
import Link from "next/link";

type H2TocProps = {
  toc: Toc;
};

const H2Toc = ({ toc }: H2TocProps) => {
  const h2s: H2HeadingsType = getH2FromToc(toc);

  if (h2s.length === 0) {
    return;
  }

  return (
    <nav>
      <h2>On this page</h2>
      <ul>
        {h2s.map((h2) => (
          <li key={h2.id}>
            <Link href={`#${h2.id}`}>{h2.value}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default H2Toc;
