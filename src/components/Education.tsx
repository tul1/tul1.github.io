import { profile } from "@/content/profile";

export function Education() {
  return (
    <section id="education" className="border-t border-rule scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          education
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Education
        </h2>
        <ul className="mt-10 divide-y divide-rule">
          {profile.education.map((item) => (
            <li
              key={item.school}
              className="grid gap-2 py-7 sm:grid-cols-[140px_1fr] sm:gap-8"
            >
              <p className="font-mono text-xs text-ink-muted">{item.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  {item.degree}
                  <span className="font-normal text-ink-muted">
                    {" "}
                    · {item.school}
                  </span>
                </h3>
                <p className="mt-1 font-mono text-xs text-ink-muted">
                  {item.location}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-rule pt-8">
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
            languages
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ink-muted">
            {profile.languages.map((lang) => (
              <li key={lang.name}>
                {lang.name}
                <span className="text-ink-muted/70"> · {lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
