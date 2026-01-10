# Headers and Footers

- Generic headers and footers for root layout
- Helper components to be used at at the end of this document
- Note that the routes in NavLinksMenu have not been created yet.
- It also may be a good time to modify the layout with some metadata
- Modify `app/layout.tsx` to use the Header and Footer

```tsx
/* Other Code Above*/
<Providers>
  <div className="min-h-screen flex flex-col justify-between">
    <MainHeader />
    <MaxWidthContainer>
      <main className="w-full h-full">{children}</main>
    </MaxWidthContainer>
    <MainFooter />
  </div>
</Providers>
/* Other Code Below*/
```

## MainHeader

- Simple Header in `components/ui/root-layout/MainHeader.tsx`
- Helper component `NavLinkMenu` in the appendix

```tsx
import Link from "next/link";
import LightDarkButton from "../custom/LightDarkButton";
import MaxWidthContainer from "@/components/helpers/MaxWidthContainer";
import NavLinkMenu from "./NavLinkMenu";

const MainHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b-2 bg-muted py-2">
      <MaxWidthContainer>
        <nav className="w-full flex justify-between items-center">
          <Link href="/">
            <h2>Home</h2>
          </Link>
          <NavLinkMenu />
          <div className="flex items-center gap-x-2">
            <LightDarkButton />
          </div>
        </nav>
      </MaxWidthContainer>
    </header>
  );
};

export default MainHeader;
```

## MainFooter

- Simple Footer in `components/ui/root-layout/MainFooter.tsx`

```tsx
import MaxWidthContainer from "@/components/helpers/MaxWidthContainer";

const MainFooter = () => {
  return (
    <footer className="w-full border-t-2 bg-muted">
      <MaxWidthContainer>
        <nav className="w-full flex justify-evenly items-center text-sm py-1">
          <p>© 2026 Aditya Dixit</p>
          <p className="hidden md:block">Site under construction</p>
        </nav>
      </MaxWidthContainer>
    </footer>
  );
};

export default MainFooter;
```

## Helper Components

- Max Width Helper component
- Nav Link Button helper component

### MaxWidthContainer

- `components/helpers/MaxWidthContainer.tsx`

```tsx
import { cn } from "@/lib/utils";

type MaxWidthContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const MaxWidthContainer = ({ children, className }: MaxWidthContainerProps) => {
  return <div className={cn("container mx-auto", className)}>{children}</div>;
};

export default MaxWidthContainer;
```

### NavLinkButton

- `components/helpers/NavLinkButton.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export type NavLinkProps = {
  linkText: string;
  href: string;
};

const NavLink = ({ href, linkText }: NavLinkProps) => {
  const path = usePathname();
  const btnVariant = path.startsWith(href) ? "default" : "outline";

  return (
    <Button variant={btnVariant} asChild>
      <Link href={href}>{linkText}</Link>
    </Button>
  );
};

export default NavLink;
```

### NavLinkMenu

- `components/ui/root-layout/NavLinkMenu.tsx`

```tsx
import NavLinkButton, {
  NavLinkProps,
} from "@/components/helpers/NavLinkButton";

const navLinks: NavLinkProps[] = [
  { linkText: "About", href: "/about" },
  { linkText: "Portfolio", href: "/portfolio" },
];

const NavLinkMenu = () => {
  return (
    <ul className="flex gap-x-4 items-center">
      {navLinks.map(({ href, linkText }) => (
        <li key={href}>
          <NavLinkButton href={href} linkText={linkText} />
        </li>
      ))}
    </ul>
  );
};

export default NavLinkMenu;
```
