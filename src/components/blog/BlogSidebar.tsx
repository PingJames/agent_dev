import Link from "next/link";
import type { CategoryInfo } from "@/lib/types";

interface Props {
  categories: CategoryInfo[];
  tags: CategoryInfo[];
  currentCategory?: string;
  currentTag?: string;
}

export default function BlogSidebar({ categories, tags, currentCategory, currentTag }: Props) {
  return (
    <aside className="space-y-8">
      {/* Current Filter */}
      {(currentCategory || currentTag) && (
        <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            当前筛选：
            {currentCategory && <span className="font-medium">分类「{currentCategory}」</span>}
            {currentTag && <span className="font-medium">标签「{currentTag}」</span>}
          </p>
          <Link
            href="/blog"
            className="mt-2 inline-flex items-center text-xs text-primary-600 hover:text-primary-700"
          >
            <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            清除筛选
          </Link>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          文章分类
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/categories/${cat.slug}`}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                currentCategory === cat.slug
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <span>{cat.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-700">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          热门标签
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 20).map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tags/${tag.slug}`}
              className={`tag text-xs ${
                currentTag === tag.slug
                  ? "bg-primary-600 text-white dark:bg-primary-500"
                  : ""
              }`}
            >
              {tag.name}
              <span className="ml-1 opacity-60">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* RSS */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
          订阅更新
        </h3>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          通过 RSS 获取最新文章更新。
        </p>
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
          </svg>
          RSS Feed
        </a>
      </div>
    </aside>
  );
}
