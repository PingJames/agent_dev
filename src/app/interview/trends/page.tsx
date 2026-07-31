import type { Metadata } from "next";
import { getQuestionsGroupedByCategory } from "@/lib/interview-data";
import AccordionQuestion from "@/components/interview/AccordionQuestion";

export const metadata: Metadata = {
  title: "前沿趋势 - 面试题库",
  description:
    "长上下文、多模态、世界模型、合成数据、Test-Time Compute等大模型前沿技术与发展趋势面试题",
};

export default function TrendsPage() {
  const groups = getQuestionsGroupedByCategory("trends");
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
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-xl text-white shadow-md">
              🚀
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">前沿趋势</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {total} 道题 · {groups.length} 个分类 · 长上下文 / 多模态 / 世界模型 / 未来发展
              </p>
            </div>
          </div>
        </div>

        {/* Grouped Questions */}
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.category}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
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
