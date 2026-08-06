import { profile } from "@/content/profile";

export function Focus() {
  return (
    <section className="border-t border-rule bg-paper-raised/60">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
          focus
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          What I own
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {profile.focus.map((item) => (
            <li key={item.label} className="border-t border-rule pt-5">
              <p className="font-mono text-xs tracking-wide text-accent">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
