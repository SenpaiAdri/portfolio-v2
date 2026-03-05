import RevealScroll from "@/components/reveal-scroll";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Projects2 from "@/components/sections/projects2";

export default function Home() {
  return (
    <RevealScroll>
      <Hero />
      <Projects />
      <Projects2 />
      <Hero />
    </RevealScroll>
  );
}
