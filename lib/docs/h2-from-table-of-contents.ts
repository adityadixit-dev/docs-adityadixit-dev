interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

export type Toc = Array<TocEntry>;
export type H2HeadingsType = Array<{
  id: string;
  value: string;
}>;

export function getH2FromToc(toc: Toc): H2HeadingsType {
  const h2s: H2HeadingsType = [];

  for (const h1 of toc) {
    if (!h1.children) {
      continue;
    }
    for (const currH2 of h1.children) {
      h2s.push({ id: currH2.id ?? "", value: currH2.value });
    }
  }

  return h2s;
}
