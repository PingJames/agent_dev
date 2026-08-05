import type { Metadata } from "next";
import { getRoadmapIndex } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "学习路线 - AI 应用工程师成长路径",
  description:
    "工程实践优先的 AI 应用工程师学习路线，从 Python Web 开发到 RAG、Agent 企业级应用，掌握利用大模型解决企业问题的能力。",
};

export default function RoadmapPage() {
  const topics = getRoadmapIndex();

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
            学习路线
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            你不是来学习如何训练大模型，而是学习如何利用大模型解决企业问题。
          </p>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            从环境搭建到企业级项目实战，10 个阶段循序渐进，工程实践优先，成为真正的 AI 应用工程师。
          </p>

          {/* Learning Ratio Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
              学习内容比例
            </h3>
            <div className="flex h-6 rounded-full overflow-hidden shadow-inner">
              <div className="bg-emerald-400 flex items-center justify-center text-xs text-white font-medium" style={{ width: "15%" }} title="环境与Python Web基础">Web 15%</div>
              <div className="bg-blue-300 flex items-center justify-center text-xs text-white font-medium" style={{ width: "5%" }} title="LLM 基础">基础</div>
              <div className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium" style={{ width: "20%" }} title="LLM 应用开发">LLM 20%</div>
              <div className="bg-purple-400 flex items-center justify-center text-xs text-white font-medium" style={{ width: "10%" }} title="Prompt">Prompt 10%</div>
              <div className="bg-orange-400 flex items-center justify-center text-xs text-white font-medium" style={{ width: "20%" }} title="RAG">RAG 20%</div>
              <div className="bg-rose-400 flex items-center justify-center text-xs text-white font-medium" style={{ width: "15%" }} title="Agent">Agent 15%</div>
              <div className="bg-gray-400 flex items-center justify-center text-xs text-white font-medium" style={{ width: "10%" }} title="工程化">工程化 10%</div>
              <div className="bg-amber-400 flex items-center justify-center text-xs text-white font-medium" style={{ width: "5%" }} title="面试">面试</div>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
              <span>🟢 环境 Web 15%</span>
              <span>🔵 LLM 应用 20%</span>
              <span>🟣 Prompt 10%</span>
              <span>🟠 RAG 20%</span>
              <span>🔴 Agent 15%</span>
              <span>⚪ 工程化 10%</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {topics.length > 0 ? (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block" />

            <div className="space-y-12">
              {topics.map((topic, index) => (
                <div key={topic.slug} className="relative lg:pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-8 top-8 -translate-x-1/2 hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold shadow-lg shadow-primary-500/25">
                    {index + 1}
                  </div>

                  {/* Phase Card */}
                  <Link
                    href={`/roadmap/${topic.slug}`}
                    className="card block group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white text-lg font-bold lg:hidden shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                          {topic.title}
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                          {topic.description}
                        </p>

                        {/* Topic Nodes Preview */}
                        {topic.nodes && topic.nodes.length > 0 && (
                          <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {topic.nodes.slice(0, 4).map((node) => (
                              <div
                                key={node.id}
                                className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                              >
                                <h3 className="font-medium text-slate-900 dark:text-white">
                                  {node.title}
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                  {node.description}
                                </p>
                                <div className="mt-2">
                                  <span className="badge-info">
                                    {node.difficulty === "beginner"
                                      ? "入门"
                                      : node.difficulty === "intermediate"
                                      ? "进阶"
                                      : "高级"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-6 flex items-center text-sm font-medium text-primary-600">
                          查看完整路线
                          <svg
                            className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                路线图内容即将上线
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                我们正在精心准备学习路线内容，敬请期待。
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
