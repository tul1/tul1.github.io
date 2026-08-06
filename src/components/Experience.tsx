import { profile } from "@/content/profile";

export function Experience() {
  return (
    <section id="experience" className="border-t border-rule scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          career.timeline
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Experience
        </h2>
        <ol className="mt-10 space-y-0">
          {profile.experience.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-2 border-t border-rule py-8 sm:grid-cols-[180px_1fr] sm:gap-8"
            >
              <div>
                <p className="font-mono text-xs text-ink-muted">{job.period}</p>
                <p className="mt-1 font-mono text-xs text-ink-muted/80">
                  {job.location}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  {job.role}
                  <span className="font-normal text-ink-muted">
                    {" "}
                    · {job.company}
                  </span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm leading-relaxed text-ink-muted"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[11px] tracking-wide text-accent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
