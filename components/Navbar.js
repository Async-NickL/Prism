import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { Button } from "./ui/button";
import Image from "next/image";
import UserMenu from "./UserMenu";
import ThemeMenu from "./ThemeMenu";
import Link from "next/link";
import OrgSwitcher from "./OrgSwitcher";
import CreateProject from "./CreateProject";

const Navbar = () => {
  return (
    <header className="fixed bg-card/20 backdrop-blur-md top-0 border-b-2 w-full flex justify-between items-center p-4 gap-4 h-14 z-[50]">
      <div className="flex gap-2 justify-center items-center">
        <Link href="/">
          <Image src={"/logo.png"} alt="Prism" height={50} width={50} />
        </Link>
      </div>

      <div className="cursor-pointer h-full items-center flex gap-4">
        <ThemeMenu />
        <SignedOut>
          <Button asChild>
            <SignInButton forceRedirectUrl="/organization" />
          </Button>
          <Button asChild>
            <SignUpButton forceRedirectUrl="/organization" />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserMenu />
          <OrgSwitcher />
          <CreateProject />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
