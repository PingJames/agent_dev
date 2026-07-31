import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Building2, Rocket } from "lucide-react";
import { DIMENSIONS } from "@/lib/interview-dimensions";
import type { InterviewDimension } from "@/lib/types";
import { getQuestionsByDimension } from "@/lib/interview-data";

const DIMENSION_ICON_MAP: Record<string, React.ReactNode> = {
  basics: <BookOpen className="h-8 w-8" />,
  engineering: <Wrench className="h-8 w-8" />,
  practice: <Building2 className="h-8 w-8" />,
  trends: <Rocket className="h-8 w-8" />,
};

export default function DimensionGrid() {
  const dimensions = DIMENSIONS.map((dim) => {
    const questions = getQuestionsByDimension(dim.id as InterviewDimension);
    return { ...dim, count: questions.length, subCatCount: dim.subCategories.length };
  });

  const total = dimensions.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-6">
      {/* Hero / Stats bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg">
        <div className="flex-1">
          <h2 className="text-xl font-bold">大模型应用开发面试题库</h2>
          <p className="mt-1 text-sm text-white/80">
            精选 {total} 道高频面试题，覆盖四大核心维度，助你系统备战
          </p>
        </div>
        <div className="flex gap-4 text-center">
          {dimensions.map((d) => (
            <div key={d.id} className="rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
              <div className="text-2xl font-bold">{d.count}</div>
              <div className="text-xs text-white/70">{d.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dimension Cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {dimensions.map((dim) => (
          <Link
            key={dim.id}
            href={`/interview/${dim.id}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800/80"
          >
            {/* Top gradient accent */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${dim.color}`}
            />

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${dim.color} text-white shadow-md`}
              >
                {DIMENSION_ICON_MAP[dim.id]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {dim.icon} {dim.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {dim.description}
                </p>

                {/* Metadata row */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {dim.count} 道题
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>{dim.subCatCount} 个分类</span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:text-indigo-500 group-hover:translate-x-1 dark:text-slate-600 dark:group-hover:text-indigo-400" />
            </div>

            {/* Bottom categories pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {dim.subCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
