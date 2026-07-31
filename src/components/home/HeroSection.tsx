import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent dark:from-primary-900/20" />

      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            2024 学习路线已更新
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            <span className="block">从零到一，</span>
            <span className="mt-2 block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI 应用工程师之路
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            系统化学习 AI 应用开发，掌握 LLM、RAG、AI Agent 等核心技术。
            从理论学习到项目实战，帮助你成长为专业的 AI 应用工程师。
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/roadmap" className="btn-primary text-base px-8 py-4 shadow-lg shadow-primary-500/25">
              开始学习之旅
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/blog" className="btn-secondary text-base px-8 py-4">
              浏览技术博客
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { label: "学习阶段", value: "6+" },
              { label: "技术文章", value: "30+" },
              { label: "实战项目", value: "10+" },
              { label: "面试题目", value: "50+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
