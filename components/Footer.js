import Image from "next/image";
import {
  Linkedin,
  GithubIcon,
} from "lucide-react";
import { TextHoverEffect } from "./TextHoverEffect";
import ShinyText from "./ui/ShinyText";

const Footer = () => {
  return (
    <div className="w-full h-[17vh] grid place-content-center pointer-events-auto relative border-t-2">
      <div className="w-fit h-[15vh]">
        <TextHoverEffect text="PRISM" />
      </div>
      <footer className="bg-transparent text-foreground/30 pt-6 pointer-events-none w-full absolute top-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-foreground/30 pointer-events-none ">
            Design and Developed by{" "}
            <a
              href="https://nikhilkole.netlify.app/"
              className="pointer-events-auto"
            >
              <ShinyText text={"Nikhil Kole"} />
            </a>
          </h2>
          <h2 className="text-xl font-semibold text-foreground/30 pointer-events-none ">
            Inspired from {" "}
            <a
              href="https://www.youtube.com/@RoadsideCoder"
              className="pointer-events-auto"
            >
              <ShinyText text={"Roadside Coder"} />
            </a>
          </h2>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://www.linkedin.com/in/nikhil-kole/"
              className="text-foreground/30 hover:text-primary pointer-events-auto"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/Async-NickL/"
              className="text-foreground/30 hover:text-primary pointer-events-auto"
            >
              <GithubIcon size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
