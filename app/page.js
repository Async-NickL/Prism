import React from "react";
import Hero from "@/app/(Home)/Hero";
import Feature from "@/app/(Home)/Feature";
import About from "@/app/(Home)/About";
import Feedback from "@/app/(Home)/Feedback";

const page = () => {
  return (
    <section className="flex flex-col h-full w-full">
      <Hero />
      <About />
      <Feature />
      <Feedback/>
    </section>
  );
};

export default page;
