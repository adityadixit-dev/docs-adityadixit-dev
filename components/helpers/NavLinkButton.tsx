"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export type NavLinkProps = {
  linkText: string;
  href: string;
};

const NavLinkButton = ({ href, linkText }: NavLinkProps) => {
  const path = usePathname();
  const btnVariant = path.startsWith(href) ? "default" : "outline";

  return (
    <Button variant={btnVariant} asChild>
      <Link href={href}>{linkText}</Link>
    </Button>
  );
};

export default NavLinkButton;
