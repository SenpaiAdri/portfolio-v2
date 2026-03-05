import RevealScroll from "../components/reveal-scroll";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <RevealScroll>
      <Hero />
      <Projects />
      <Hero />
    </RevealScroll>
  );
}
