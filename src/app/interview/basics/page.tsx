import type { Metadata } from "next";
import { getQuestionsByDimension } from "@/lib/interview-data";
import AccordionQuestion from "@/components/interview/AccordionQuestion";

export const metadata: Metadata = {
  title: "基础理论 - 面试题库",
  description:
    "Transformer架构、注意力机制、预训练与微调、Scaling Law等大模型核心基础理论知识",
};

export default function BasicsPage() {
  const questions = getQuestionsByDimension("basics");

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
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl text-white shadow-md">
              🧠
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">基础理论</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {questions.length} 道题 · Transformer架构 / 注意力机制 / 预训练微调 / Scaling Law
              </p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q) => (
            <AccordionQuestion key={q.slug} question={q} />
          ))}
        </div>
      </div>
    </div>
  );
}
