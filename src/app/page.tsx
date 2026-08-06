import { Contact } from "@/components/Contact";
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
        <Contact />
      </main>
    </>
  );
}
