# [Using MDX and markdown in NextJS](https://nextjs.org/docs/app/guides/mdx)

## Install and configure dependencies

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

- Update the `next.config.ts` file

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
```

- Add a `mdx-components.tsx` file to define global MDX components

```tsx
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

- Checkout [Rendering MDX](https://nextjs.org/docs/app/guides/mdx#rendering-mdx) for more info
- We will discuss custom styles and components later
- Please note that NextJS uses turbopack by default. Use the appropriate method for using plugins
