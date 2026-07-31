import type { Metadata } from "next";
import { getAllInterviewQuestions } from "@/lib/content";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export const metadata: Metadata = {
  title: "面试题库 - AI 应用工程师面试准备",
  description: "精选 AI 应用开发面试题，涵盖机器学习基础、LLM 原理、RAG 技术、系统设计等方向。",
};

const difficultyLabels: Record<string, string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
};

const difficultyColors: Record<string, string> = {
  easy: "badge-success",
  medium: "badge-warning",
  hard: "badge-info",
};

export default function InterviewPage() {
  const questions = getAllInterviewQuestions();

  // Group by category
  const grouped = questions.reduce((acc, q) => {
    const cat = q.frontmatter.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(q);
    return acc;
  }, {} as Record<string, typeof questions>);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            面试题库
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            系统整理的 AI 应用开发面试题目，覆盖 ML 基础、LLM 原理、RAG 技术、Agent 架构等核心方向。
          </p>
        </div>

        {questions.length > 0 ? (
          <div className="space-y-16">
            {Object.entries(grouped).map(([category, categoryQuestions]) => (
              <section key={category}>
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
                  {category}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {categoryQuestions.map((q) => (
                    <Link
                      key={q.slug}
                      href={`/interview/${q.slug}`}
                      className="card group flex items-start gap-4"
                    >
                      <span className={`shrink-0 mt-0.5 ${difficultyColors[q.frontmatter.difficulty] || "badge-info"}`}>
                        {difficultyLabels[q.frontmatter.difficulty] || q.frontmatter.difficulty}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
                          {q.frontmatter.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {q.frontmatter.description}
                        </p>
                        {q.frontmatter.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {q.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="tag text-xs">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <svg className="h-5 w-5 shrink-0 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <svg className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">面试题库内容即将上线</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">我们正在整理面试题目，敬请期待！</p>
          </div>
        )}
      </div>
    </div>
  );
}
