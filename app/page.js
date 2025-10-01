import React from "react";
import Hero from "@/app/(home)/Hero";
import Feature from "@/app/(home)/Feature";
import About from "@/app/(home)/About";
import Feedback from "@/app/(home)/Feedback";

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
