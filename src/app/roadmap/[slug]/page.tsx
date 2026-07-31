import type { Metadata } from "next";
import { getRoadmapTopic } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getRoadmapTopic(params.slug);
  if (!topic) return { title: "未找到" };
  return {
    title: topic.title,
    description: topic.description,
  };
}

export default function RoadmapTopicPage({ params }: Props) {
  const topic = getRoadmapTopic(params.slug);
  if (!topic) notFound();

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm text-slate-500">
          <Link href="/roadmap" className="hover:text-primary-600 transition-colors">
            学习路线
          </Link>
          <svg className="mx-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-slate-900 dark:text-white">{topic.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{topic.icon}</span>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              {topic.title}
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            {topic.description}
          </p>
        </div>

        {/* Topic Nodes */}
        <div className="space-y-8">
          {topic.nodes.map((node, index) => (
            <div key={node.id} className="card">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {node.title}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    {node.description}
                  </p>

                  {/* Meta Info */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="badge-info">
                      {node.difficulty === "beginner"
                        ? "入门"
                        : node.difficulty === "intermediate"
                        ? "进阶"
                        : "高级"}
                    </span>
                    {node.prerequisites && node.prerequisites.length > 0 && (
                      <span className="text-sm text-slate-400">
                        前置要求：{node.prerequisites.join("、")}
                      </span>
                    )}
                  </div>

                  {/* Resources */}
                  {node.resources && node.resources.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                        推荐资源
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {node.resources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-3 text-sm transition-colors hover:border-primary-200 hover:bg-primary-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-800 dark:hover:bg-primary-900/20"
                          >
                            <span className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium ${
                              resource.type === "video"
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                : resource.type === "book"
                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                : resource.type === "course"
                                ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}>
                              {resource.type === "video" ? "▶" :
                               resource.type === "book" ? "📖" :
                               resource.type === "course" ? "📚" :
                               resource.type === "project" ? "💻" : "📄"}
                            </span>
                            <span className="flex-1 text-slate-700 dark:text-slate-300 line-clamp-1">
                              {resource.title}
                            </span>
                            {resource.isFree && (
                              <span className="badge-success shrink-0">免费</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Children Nodes */}
                  {node.children && node.children.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                        子主题
                      </h3>
                      <div className="space-y-2">
                        {node.children.map((child) => (
                          <div
                            key={child.id}
                            className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
                          >
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              {child.title}
                            </h4>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              {child.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Roadmap */}
        <div className="mt-12 text-center">
          <Link href="/roadmap" className="btn-secondary">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            返回学习路线
          </Link>
        </div>
      </div>
    </div>
  );
}
