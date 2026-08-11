import Link from "next/link";
import type { BlogListItem } from "@/lib/types";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface Props {
  post: BlogListItem;
}

export default function BlogCard({ post }: Props) {
  const { slug, frontmatter } = post;

  const difficultyLabel = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };

  const difficultyColor = {
    beginner: "badge-success",
    intermediate: "badge-warning",
    advanced: "badge-info",
  };

  return (
    <Link href={`/blog/${slug}`} className="card group block">
      <div className="flex items-start gap-4">
        {/* Decorative icon */}
        <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="tag">{frontmatter.category}</span>
            <span className={`${difficultyColor[frontmatter.difficulty] || "badge-info"}`}>
              {difficultyLabel[frontmatter.difficulty] || frontmatter.difficulty}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {format(new Date(frontmatter.date), "yyyy/MM/dd", { locale: zhCN })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {frontmatter.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {frontmatter.description}
          </p>
        </div>

        {/* Arrow */}
        <svg className="hidden sm:block h-5 w-5 shrink-0 self-center text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
