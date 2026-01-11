import NavLinkButton, {
  NavLinkProps,
} from "@/components/helpers/NavLinkButton";

const navLinks: NavLinkProps[] = [{ linkText: "NextJS", href: "/nextjs" }];

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
