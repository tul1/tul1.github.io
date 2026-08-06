import { profile } from "@/content/profile";

export function Stack() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-baseline sm:gap-8">
        <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-accent uppercase">
          stack
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm text-ink-muted">
          {profile.stack.map((tech, i) => (
            <li key={tech} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-rule" aria-hidden>
                  ·
                </span>
              )}
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
