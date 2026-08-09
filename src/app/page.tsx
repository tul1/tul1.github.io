import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Focus } from "@/components/Focus";
import { Hero } from "@/components/Hero";
import { SiteNav } from "@/components/SiteNav";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Focus />
        <Stack />
        <Work />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}
