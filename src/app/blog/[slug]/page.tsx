import type { Metadata } from "next";
import { getBlogPost, getAllBlogSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import MDXRenderer from "@/components/blog/MDXRenderer";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "文章未找到" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated,
      tags: post.frontmatter.tags,
      ...(post.frontmatter.coverImage && {
        images: [{ url: post.frontmatter.coverImage }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default function BlogDetailPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  const difficultyLabels: Record<string, string> = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };

  return (
    <article className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center text-sm text-slate-500 gap-1">
            <Link href="/blog" className="hover:text-primary-600 transition-colors">
              博客
            </Link>
            <svg className="mx-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <Link
              href={`/blog/categories/${frontmatter.category}`}
              className="hover:text-primary-600 transition-colors"
            >
              {frontmatter.category}
            </Link>
            <svg className="mx-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-slate-900 dark:text-white truncate">
              {frontmatter.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {frontmatter.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="tag">{frontmatter.category}</span>
              <span className="badge-info">
                {difficultyLabels[frontmatter.difficulty] || frontmatter.difficulty}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                {frontmatter.author}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {format(new Date(frontmatter.date), "yyyy年MM月dd日", { locale: zhCN })}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {frontmatter.readingTime} 分钟阅读
              </span>
              {frontmatter.updated && (
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  更新于 {format(new Date(frontmatter.updated), "yyyy/MM/dd", { locale: zhCN })}
                </span>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tags/${tag}`} className="tag text-xs">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {frontmatter.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose-custom">
            <MDXRenderer content={content} frontmatter={frontmatter} />
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <Link href="/blog" className="btn-secondary">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              返回博客列表
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
