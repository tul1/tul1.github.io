import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-14 sm:pt-20">
      <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
        about
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 font-mono text-sm text-ink-muted">
        {profile.title} · {profile.company} · {profile.location}
      </p>
      <div className="mt-10 grid gap-10 sm:grid-cols-[160px_1fr] sm:items-start">
        <div className="relative aspect-square w-40 overflow-hidden rounded-sm">
          <Image
            src={profile.headshot}
            alt={profile.name}
            fill
            priority
            className="object-cover object-center"
            sizes="160px"
          />
        </div>
        <div className="max-w-xl space-y-4 text-base leading-relaxed text-ink-muted">
          <p>{profile.bio}</p>
          <p>
            I keep a log here of projects I am working on: explanations,
            experiments, and what I learn along the way. If something is useful,
            feel free to get in touch.
          </p>
        </div>
      </div>
      <section className="mt-14 border-t border-rule pt-10">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          stack
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm text-ink-muted">
          {profile.stack.map((tech, i) => (
            <li key={tech} className="flex items-center gap-3">
              {i > 0 ? (
                <span className="text-rule" aria-hidden>
                  ·
                </span>
              ) : null}
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-12 font-mono text-sm">
        <a
          href={`mailto:${profile.social.email}`}
          className="link-underline text-ink hover:text-accent"
        >
          {profile.social.email}
        </a>
      </p>
    </main>
  );
}
