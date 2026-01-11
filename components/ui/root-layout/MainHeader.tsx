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
            <h2>Docs</h2>
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
