import { BoxReveal } from "@/components/ui/box-reveal";
import ShinyText from "@/components/ui/ShinyText";
import Spline from "@splinetool/react-spline";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] border-b-2 mb-10 select-none relative flex w-full justify-center items-center overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full max-sm:mt-[10vh] max-sm:h-[70vh]">
        <Spline scene="https://prod.spline.design/s08getnkZ9zYv0LD/scene.splinecode" className="dark:opacity-100 opacity-20 max-md:pointer-events-none"/>
        <div className="hider absolute bg-background h-15 z-[1] bottom-4 right-4 w-42"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen px-4 sm:px-6 lg:px-8 pointer-events-none">
        {/* Hero Title */}
        <div className="flex flex-col w-full items-center justify-center mb-8 sm:mb-12 lg:mb-16">
          <BoxReveal boxColor={"var(--foreground)"} duration={0.5}>
            <ShinyText
              text="PRISM"
              className="text-[28vw] sm:text-[10vw] max-md:tracking-[10vw] tracking-[10vw] sm:ml-30 max-sm:tracking-wide lg:text-[20vw] xl:text-[18vw] 2xl:text-[16vw] font-extrabold leading-none text-center"
            />
          </BoxReveal>
        </div>

        {/* Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-2 sm:space-y-3 lg:space-y-4">
          <BoxReveal boxColor={"var(--foreground)"} duration={0.5}>
            <ShinyText
              text="Empower your team with seamless,"
              className="text-[4.5vw] sm:text-[3.5vw] lg:text-[2.2vw] xl:text-[1.8vw] 2xl:text-[1.6vw] font-light tracking-wide"
            />
            <ShinyText
              text="intuitive project management"
              className="text-[4.5vw] sm:text-[3.5vw] lg:text-[2.2vw] xl:text-[1.8vw] 2xl:text-[1.6vw] font-light tracking-wide"
            />
          </BoxReveal>
        </div>
      </div>

    </div>
  );
};

export default Hero;
