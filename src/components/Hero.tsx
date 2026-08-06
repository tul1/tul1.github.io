import Image from "next/image";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-5xl gap-10 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:gap-14"
    >
      <div>
        <p className="animate-fade-up font-mono text-xs tracking-[0.14em] text-accent uppercase">
          {profile.location} · {profile.title}
        </p>
        <h1 className="animate-fade-up-delay-1 mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {profile.tagline}
        </p>
        <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
          {profile.summary}
        </p>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap items-center gap-4">
          <a
            href={profile.cvPath}
            download
            className="rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-paper transition hover:bg-ink/90"
          >
            Download CV
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-sm text-ink-muted hover:text-ink"
          >
            github/{profile.social.github.split("/").pop()}
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-sm text-ink-muted hover:text-ink"
          >
            linkedin
          </a>
        </div>
      </div>
      <div className="animate-fade-up-delay-1 relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-sm lg:mx-0 lg:max-w-none">
        <Image
          src={profile.headshot}
          alt={`${profile.name} headshot`}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 280px, 320px"
        />
      </div>
    </section>
  );
}
