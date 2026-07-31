import type { Metadata } from "next";
import { getDimensionStats } from "@/lib/interview-data";
import DimensionGrid from "@/components/interview/DimensionGrid";

export const metadata: Metadata = {
  title: "面试题库 - 大模型应用开发",
  description: "精选100道大模型应用开发面试题，覆盖基础理论、工程实践、场景落地、前沿趋势四大维度",
};

export default function InterviewPage() {
  const dimensions = getDimensionStats();

  return (
    <div className="container-custom section-padding">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            面试题库
          </h1>
          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
            大模型应用开发面试100题，系统化备战，助你从基础理论到工程实践全面通关
          </p>
        </div>

        {/* Dimension Grid */}
        <div className="mt-8">
          <DimensionGrid />
        </div>

        {/* Footer Note */}
        <div className="mt-12 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5 dark:border-indigo-900/30 dark:bg-indigo-900/10">
          <p className="text-sm leading-relaxed text-indigo-700 dark:text-indigo-300">
            本题库涵盖 {dimensions[0]?.count} 道基础理论题、{dimensions[1]?.count} 道工程实践题、{dimensions[2]?.count} 道场景落地题和 {dimensions[3]?.count} 道前沿趋势题。按照大模型应用开发面试中&ldquo;技术深度&rdquo;与&ldquo;业务敏感度&rdquo;并重的评估原则，工程实践类题目权重最高（约25%），建议优先掌握。
          </p>
        </div>
      </div>
    </div>
  );
}
