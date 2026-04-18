import RevealScroll from "../components/reveal-scroll";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <RevealScroll>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </RevealScroll>
  );
}
