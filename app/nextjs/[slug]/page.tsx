import { nextJsTemplateSlugs } from "@/docs/nextjs/nextjs-template.config";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/docs/nextjs/${slug}.md`);

  return <Post />;
}

export function generateStaticParams() {
  return nextJsTemplateSlugs;
}

export const dynamicParams = false;
