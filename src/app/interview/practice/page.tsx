import type { Metadata } from "next";
import { getQuestionsByDimension } from "@/lib/interview-data";
import AccordionQuestion from "@/components/interview/AccordionQuestion";

export const metadata: Metadata = {
  title: "场景落地 - 面试题库",
  description:
    "业务理解、场景分析、效果评估、成本平衡等大模型应用的真实生产环境落地面试题",
};

export default function PracticePage() {
  const questions = getQuestionsByDimension("practice");

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
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-xl text-white shadow-md">
              🏢
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">场景落地</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {questions.length} 道题 · 电商客服 / 合同审查 / 医疗应用 / 效果评估 / 成本平衡
              </p>
            </div>
          </div>
        </div>

        {/* Tip banner */}
        <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/30 dark:bg-orange-900/10">
          <p className="text-sm text-orange-700 dark:text-orange-300">
            💡 场景落地类题目考察"技术理解 + 业务敏感度"的综合能力，回答时需要结合真实业务场景分析，展示从技术到价值的完整闭环思考。
          </p>
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
