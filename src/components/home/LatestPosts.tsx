import Link from "next/link";
import { getFeaturedPosts } from "@/lib/content";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export default async function LatestPosts() {
  const posts = getFeaturedPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white dark:bg-slate-900">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              最新文章
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
              探索 AI 应用开发的最新技术与实践
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            查看全部文章
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group flex flex-col"
            >
              {/* Cover Image */}
              {post.frontmatter.coverImage && (
                <div className="mb-4 -mx-2 -mt-2 overflow-hidden rounded-t-xl">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                    <svg className="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-3">
                <span className="tag">{post.frontmatter.category}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {format(new Date(post.frontmatter.date), "yyyy/MM/dd", { locale: zhCN })}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors">
                {post.frontmatter.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-1">
                {post.frontmatter.description}
              </p>


            </Link>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-10 text-center sm:hidden">
            <Link href="/blog" className="btn-primary">
              查看全部文章
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
