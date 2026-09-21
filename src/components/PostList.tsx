import Link from "next/link";
import { formatPostDate, type PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-ink-muted">No posts yet.</p>
    );
  }

  return (
    <ul className="divide-y divide-rule">
      {posts.map((post) => (
        <li key={post.slug} className="project-row py-7">
          <p className="font-mono text-xs text-ink-muted">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">
            <Link href={`/blog/${post.slug}`} className="hover:text-accent">
              {post.title}
            </Link>
          </h2>
          {post.excerpt ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {post.excerpt}
            </p>
          ) : null}
          {post.tags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-xs tracking-wide text-accent"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
