import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
        Not found
      </h1>
      <p className="mt-4 text-ink-muted">That page does not exist.</p>
      <p className="mt-8 font-mono text-sm">
        <Link href="/" className="link-underline hover:text-accent">
          ← back to posts
        </Link>
      </p>
    </main>
  );
}
