import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-purple-600 px-6 py-16 sm:px-16 sm:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              准备好开始你的 AI 工程师之旅了吗？
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              加入数千名学习者，系统化掌握 AI 应用开发技能。
              从今天开始，构建属于你的 AI 项目。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/roadmap"
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg transition-all hover:bg-indigo-50"
              >
                开始学习
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                浏览博客
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
