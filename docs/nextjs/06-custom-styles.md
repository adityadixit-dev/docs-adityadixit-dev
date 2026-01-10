# Custom Styles

## Tailwind Typography

```bash
npm install -D @tailwindcss/typography
```

- modify `app/globals.css` by adding `@plugin "@tailwindcss/typography";`
- Modify the relevant `layout.tsx` file to reflect styles as needed
- Add `max-w-none` to remove the width limits

```tsx
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="prose max-w-none prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
      {children}
    </div>
  );
}
```

## Rehype Pretty Code Plugin

- [Check Documentations](https://rehype-pretty.pages.dev/)

```bash
npm install rehype-pretty-code shiki
```

- Modify `next.config.ts` using the [ correct ](https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack) method depending on if you are using turbopack

```ts title="next.config.ts"
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: ["rehype-pretty-code"],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
```

## Copy to clipboard button

- Create a custom [fix](https://github.com/rehype-pretty/rehype-pretty-code/issues/235) since the shiki copy to clipboard button seems to result in errors
- I have put this in `components/helpers/Pre.tsx`

```tsx title="Pre.tsx"
"use client";

import { Check, Clipboard } from "lucide-react";
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";
import { Button } from "../ui/button";

export default function Pre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <pre ref={preRef} {...props} className="relative">
      <Button
        size="icon-lg"
        disabled={isCopied}
        onClick={handleClickCopy}
        className="absolute right-4 size-6"
      >
        {isCopied ? <Check /> : <Clipboard />}
      </Button>
      {children}
    </pre>
  );
}
```

- Modify `mdx-components.tsx` to use the above `Pre` component

```tsx
import type { MDXComponents } from "mdx/types";
import Pre from "./components/helpers/Pre";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return {
    pre: (props) => <Pre {...props} />,
    ...components,
  };
}
```
