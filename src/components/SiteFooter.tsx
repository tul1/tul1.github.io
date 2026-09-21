import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-6 font-mono text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <a
              href={`mailto:${profile.social.email}`}
              className="link-underline hover:text-ink"
            >
              email
            </a>
          </li>
          <li>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-ink"
            >
              github
            </a>
          </li>
          <li>
            <a href="/feed.xml" className="link-underline hover:text-ink">
              rss
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
