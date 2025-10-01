import React from "react";
import Hero from "./(home)/Hero";
import Feature from "./(home)/Feature";
import About from "./(home)/About";
import Feedback from "./(home)/Feedback";

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
