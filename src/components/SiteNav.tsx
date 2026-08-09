import { profile } from "@/content/profile";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-paper/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#top"
          className="font-mono text-xs tracking-wide text-ink-muted link-underline"
        >
          {profile.name.toLowerCase().replace(" ", ".")}
        </a>
        <ul className="flex items-center gap-5 text-sm text-ink-muted sm:gap-7">
          <li>
            <a href="#work" className="link-underline hover:text-ink">
              Work
            </a>
          </li>
          <li>
            <a href="#experience" className="link-underline hover:text-ink">
              Experience
            </a>
          </li>
          <li>
            <a href="#education" className="link-underline hover:text-ink">
              Education
            </a>
          </li>
          <li>
            <a href="#contact" className="link-underline hover:text-ink">
              Contact
            </a>
          </li>
          <li>
            <a
              href={profile.cvPath}
              download
              className="rounded-sm bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              Download CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
