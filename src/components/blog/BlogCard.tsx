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
    <Link href={`/blog/${slug}`} className="card group flex flex-col">
      {/* Cover Image Placeholder */}
      {frontmatter.coverImage ? (
        <div className="-mx-2 -mt-2 mb-4 overflow-hidden rounded-t-xl">
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="-mx-2 -mt-2 mb-4">
          <div className="aspect-video rounded-t-xl bg-gradient-to-br from-primary-100 via-primary-50 to-purple-100 dark:from-primary-900/20 dark:via-slate-800 dark:to-purple-900/20 flex items-center justify-center">
            <svg className="h-12 w-12 text-primary-300 dark:text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="tag">{frontmatter.category}</span>
        <span className={`${difficultyColor[frontmatter.difficulty] || "badge-info"}`}>
          {difficultyLabel[frontmatter.difficulty] || frontmatter.difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {frontmatter.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-1">
        {frontmatter.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-3">
          <span>{format(new Date(frontmatter.date), "yyyy/MM/dd", { locale: zhCN })}</span>
        </div>
      </div>
    </Link>
  );
}
