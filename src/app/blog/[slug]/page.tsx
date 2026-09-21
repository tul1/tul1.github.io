import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMarkdown } from "@/components/Markdown";
import { profile } from "@/content/profile";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post" };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || profile.tagline,
      type: "article",
      publishedTime: post.date,
      authors: [profile.fullName],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pb-20 pt-14 sm:pt-20">
      <p className="font-mono text-xs text-ink-muted">
        <Link href="/" className="link-underline hover:text-ink">
          ← posts
        </Link>
      </p>
      <header className="mt-6 border-b border-rule pb-8">
        <p className="font-mono text-xs tracking-wide text-accent">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        {post.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-ink-muted">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <div className="mt-10">
        <PostMarkdown content={post.content} />
      </div>
    </article>
  );
}
