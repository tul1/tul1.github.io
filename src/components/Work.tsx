import { profile } from "@/content/profile";

export function Work() {
  return (
    <section id="work" className="border-t border-rule scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          selected.work
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Highlights
        </h2>
        <ul className="mt-10 divide-y divide-rule">
          {profile.highlights.map((item) => (
            <li key={item.name} className="project-row py-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-ink">
                      {item.name}
                    </h3>
                    <span className="font-mono text-xs text-ink-muted">
                      {item.role}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-[11px] tracking-wide text-accent"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 gap-4 font-mono text-xs">
                  {item.links.live && (
                    <a
                      href={item.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink-muted hover:text-ink"
                    >
                      {item.links.label ?? "live →"}
                    </a>
                  )}
                  {item.links.github && (
                    <a
                      href={item.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink-muted hover:text-ink"
                    >
                      github →
                    </a>
                  )}
                  {!item.links.live && !item.links.github && (
                    <span className="text-ink-muted/60">production</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
