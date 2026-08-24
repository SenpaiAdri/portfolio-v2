import RevealScroll from "../components/reveal-scroll";
import IntroOverlay from "@/components/intro-overlay";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import FooterStrip from "@/components/sections/footer";

const NAV_ITEMS = [
  { label: "Home", index: 0 },
  { label: "Projects", index: 1 },
  { label: "Experience", index: 2 },
  { label: "About", index: 3 },
  { label: "Contact", index: 4 },
];

export default function Home() {
  return (
    <>
      <RevealScroll navItems={NAV_ITEMS} footer={<FooterStrip />}>
        <Hero />
        <Projects />
        {/*<Skills />*/}
        <Experience />
        <About />
        <Contact />
      </RevealScroll>
      <IntroOverlay />
    </>
  );
}
