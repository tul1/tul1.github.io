import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" className="border-t border-rule scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          contact
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Let&apos;s talk
        </h2>
        <p className="mt-4 max-w-lg text-ink-muted">{profile.availability}</p>
        <ul className="mt-8 flex flex-col gap-3 font-mono text-sm sm:flex-row sm:flex-wrap sm:gap-6">
          <li>
            <a
              href={`mailto:${profile.social.email}`}
              className="link-underline text-ink hover:text-accent"
            >
              {profile.social.email}
            </a>
          </li>
          <li>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink-muted hover:text-ink"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink-muted hover:text-ink"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={profile.cvPath}
              download
              className="link-underline text-accent hover:text-ink"
            >
              Download CV (PDF)
            </a>
          </li>
        </ul>
      </div>
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-6 font-mono text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>{profile.social.website.replace("https://", "")}</p>
        </div>
      </footer>
    </section>
  );
}
