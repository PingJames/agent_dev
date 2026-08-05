import Link from "next/link";
import { getRoadmapIndex } from "@/lib/content";

export default async function RoadmapPreview() {
  const topics = getRoadmapIndex();
  const previewTopics = topics.slice(0, 6);
  const hasMore = topics.length > 6;

  if (previewTopics.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            学习路线预览
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            10 个阶段循序渐进，从 Python Web 开发到企业级 AI 应用实战
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/roadmap/${topic.slug}`}
              className="card group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white text-lg font-bold">
                  {(topic.order ?? 0) + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {topic.title.replace(/^阶段\d+：/, "")}
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                {topic.description}
              </p>
              <div className="flex items-center text-sm text-primary-600 font-medium">
                查看详情
                <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              查看全部 {topics.length} 个学习阶段
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
