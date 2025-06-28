import React from "react";
import Hero from "./(Home)/Hero";
import Feature from "./(Home)/Feature";
import About from "./(Home)/About";
import Feedback from "./(Home)/Feedback";

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
