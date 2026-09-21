import Image from "next/image";
import { PostList } from "@/components/PostList";
import { profile } from "@/content/profile";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-14 sm:pt-20">
      <header className="animate-fade-up grid gap-10 sm:grid-cols-[1.3fr_0.7fr] sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
            blog
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            {profile.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-sm text-ink-muted">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-ink"
            >
              github/{profile.social.github.split("/").pop()}
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-ink"
            >
              linkedin
            </a>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-sm sm:mx-0 sm:max-w-none">
          <Image
            src={profile.headshot}
            alt={profile.name}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 640px) 220px, 240px"
          />
        </div>
      </header>
      <section className="animate-fade-up-delay-1 mt-14">
        <PostList posts={posts} />
      </section>
    </main>
  );
}
