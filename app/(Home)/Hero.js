import { BoxReveal } from "@/components/ui/box-reveal";
import ShinyText from "@/components/ui/ShinyText";
import Prism from "@/components/Prism";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] border-b-2 mb-10 select-none relative flex w-full justify-center items-center overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full pointer-events-none h-screen">
        <Prism
          animationType="3drotate"
          timeScale={0.5}
          height={5.5}
          baseWidth={8.5}
          scale={1.1}
          hueShift={0}
          colorFrequency={0}
          noise={0}
          glow={1}
          hoverStrength={2}
        />
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
