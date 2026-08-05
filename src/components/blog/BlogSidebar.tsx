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
          {tags
            .filter((tag) => tag.count > 0)
            .slice(0, 20)
            .map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tags/${encodeURIComponent(tag.slug)}`}
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

    </aside>
  );
}
