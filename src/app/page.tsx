import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Feature } from "@/components/Feature";
import { Program } from "@/components/Program";
import { OpenCalls } from "@/components/OpenCalls";
// import { Values } from "@/components/Values";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Feature />
        <Program />
        <OpenCalls />
        {/* <Values /> — hidden for now */}
        <Contact />
        <Footer />
      </main>
    </>
  );
}
