import type { Metadata } from "next";
import { getQuestionsGroupedByCategory } from "@/lib/interview-data";
import AccordionQuestion from "@/components/interview/AccordionQuestion";

export const metadata: Metadata = {
  title: "工程实践 - 面试题库",
  description:
    "提示工程、RAG检索增强生成、Agent开发、模型微调、部署优化、编程实践等大模型工程实践面试题",
};

export default function EngineeringPage() {
  const groups = getQuestionsGroupedByCategory("engineering");
  const total = groups.reduce((sum, g) => sum + g.questions.length, 0);

  return (
    <div className="container-custom section-padding">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/interview"
            className="mb-3 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            ← 返回维度总览
          </a>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl text-white shadow-md">
              ⚙️
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">工程实践</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {total} 道题 · {groups.length} 个分类 · RAG / Agent / 微调 / 部署 / 编程
              </p>
            </div>
          </div>
        </div>

        {/* Quick nav for categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.category}
              href={`#${encodeURIComponent(g.category)}`}
              className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
            >
              {g.category}
              <span className="ml-1.5 rounded-full bg-emerald-200 px-1.5 py-0.5 text-[10px] text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                {g.questions.length}
              </span>
            </a>
          ))}
        </div>

        {/* Grouped Questions */}
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.category} id={encodeURIComponent(group.category)}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {group.category}
                <span className="text-sm font-normal text-slate-400">
                  ({group.questions.length}题)
                </span>
              </h2>
              <div className="space-y-3">
                {group.questions.map((q) => (
                  <AccordionQuestion key={q.slug} question={q} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
