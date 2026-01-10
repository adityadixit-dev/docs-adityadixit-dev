# Install NextJS and Shadcn

- Install [NextJS](https://nextjs.org/)

```bash
npx create-next-app@latest .
```

## Clean up boilerplate code

- `app/globals.css` : Remove everything except `@import "tailwindcss";`
- Delete `svg` files from the `public` folder
- Clean `app/page.tsx` to have a simple component

```tsx
export default function RootHomePage() {
  return (
    <article>
      <h1>Home Page</h1>
      <p> Simple template</p>
    </article>
  );
}
```

- _Optional_ : set up favicon in `app/favicon.ico` or `app/icon.png` using [favicon](https://favicon.io/)
- Test using `npm run dev` and see if everything is running correctly

## [Shadcn](https://ui.shadcn.com/docs) and Helper Components

- Install ShadCn

```bash
npx shadcn@latest init
```

- Add commonly used components

```bash
npx shadcn@latest add button separator sonner
```

- Optional : Add [ShadCn Themes](https://ui.shadcn.com/themes)
- In `src/app.globals.css`, add `--color-*: initial;` to `@theme inline {....}` to disable other colors

## [Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)

```bash
npm install next-themes
```

- Check the documentation, but files should look as follows

- Create `src/providers/ThemeProvider.tsx`

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- Create `src/providers/Providers.tsx` and

```tsx
"use client";

import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="top-center" richColors closeButton expand={true} />
      {children}
    </ThemeProvider>
  );
};
export default Providers;
```

- Modify the root layout in `src/app/layout.tsx` to return the following. The additional div is to render some shadcn components correctly

```tsx
import Providers from "@/providers/Providers";
/* Other Code here...*/
<html lang="en" suppressHydrationWarning>
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <div>
      <Providers>{children}</Providers>
    </div>
  </body>
</html>;
```

## Add Light Dark Button

- In file `src/components/ui/custom/LightDarkButton.tsx`

```tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function LightDarkButton() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      className="cursor-pointer"
    >
      <Sun className="h-fit w-fit scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-fit w-fit scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
export default LightDarkButton;
```

## Additional Customization

- `src/app/globals.css` : Set colour scheme as needed for both light and dark modes

- Add a helper component in `src/components/ui/custom/MaxWidthWrapper.tsx`

```tsx
import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <main
      className={cn("container mx-auto max-w-7xl w-full h-full", className)}
    >
      {children}
    </main>
  );
};

export default MaxWidthWrapper;
```
