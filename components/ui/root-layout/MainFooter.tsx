import MaxWidthContainer from "@/components/helpers/MaxWidthContainer";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

const MainFooter = () => {
  return (
    <footer className="w-full sticky bottom-0 border-t-2 bg-muted">
      <MaxWidthContainer>
        <nav className="w-full flex justify-evenly items-center text-sm py-1">
          <p>© 2026 Aditya Dixit</p>
          <p className="hidden md:block">Site under construction</p>
          <ul className="flex items-center gap-x-4">
            <li className="hidden md:block">
              <Link href="https://www.boot.dev/u/adityadixit" target="_blank">
                <Image
                  src="https://www.boot.dev/img/bootdev-logo-full-small.webp"
                  alt="my boot dev progress"
                  width={320}
                  height={140}
                  style={{
                    objectFit: "contain",
                    height: "auto",
                    width: "64px",
                  }}
                />
              </Link>
            </li>

            <li>
              <Link
                href="https://github.com/adityadixit-dev/adityadixit-dev"
                target="_blank"
              >
                <FaGithub className="text-xl md:text-base" />
              </Link>
            </li>
            <li className="hidden md:block">
              <Link href="https://x.com/arwenandleia" target="_blank">
                <FaXTwitter />
              </Link>
            </li>
          </ul>
        </nav>
      </MaxWidthContainer>
    </footer>
  );
};

export default MainFooter;
