import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://www.boot.dev/**")],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      ["rehype-pretty-code", {}],
      ["rehype-slug", {}],
      ["@stefanprobst/rehype-extract-toc", {}],
      ["@stefanprobst/rehype-extract-toc/mdx", {}],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
