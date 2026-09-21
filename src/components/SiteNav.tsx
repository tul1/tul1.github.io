"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";

const links = [
  { href: "/", label: "Posts" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-paper/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-mono text-xs tracking-wide text-ink-muted link-underline"
        >
          {profile.name.toLowerCase().replace(" ", ".")}
        </Link>
        <ul className="flex items-center gap-5 text-sm text-ink-muted sm:gap-7">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/" || pathname.startsWith("/blog/")
                : pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`link-underline hover:text-ink ${active ? "text-ink" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
