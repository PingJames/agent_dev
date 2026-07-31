import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "了解 AI 工程师之路 — 一个面向开发者的 AI 应用工程师学习平台。我们的使命、内容范围、隐私承诺与联系方式。",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            关于我们
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            一个为开发者打造的 AI 应用工程师学习平台，致力于让 AI 学习更系统、更高效、更贴近实战。
          </p>
        </div>

        {/* Sections */}
        <div className="max-w-3xl space-y-12">
          {/* 我们是谁 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                我们是谁
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                <strong>AI 工程师之路</strong> 是一个面向开发者的人工智能应用学习平台。我们聚焦于 LLM、RAG、AI Agent、Prompt Engineering 等前沿技术，通过系统化的学习路线、深度技术博客、实战项目解析与面试题库，帮助开发者从零到一成长为专业的 AI 应用工程师。
              </p>
              <p>
                本站由一名热爱 AI 与开源的独立开发者创建并维护。在日常的 AI 应用开发实践中，我深感资料分散、体系不全、内容良莠不齐，于是决定搭建这样一个站点，把自己在学习与工程实践中的经验沉淀下来，分享给同样在路上的你。
              </p>
            </div>
          </section>

          {/* 为什么做这个 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                为什么做这个
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                学习 AI 应用开发的路上，常会遇到三个痛点：一是<strong>资料零散</strong>，从论文到博客、从官方文档到 GitHub 仓库，知识像碎片一样散落在各处；二是<strong>缺乏体系</strong>，难以判断先学什么、后学什么、学到什么程度才算入门；三是<strong>实战脱节</strong>，理论讲了一大堆，却很少告诉你如何在真实项目中落地。
              </p>
              <p>
                <strong>AI 工程师之路</strong> 正是为了解决这些问题而存在：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>用结构化的<strong>学习路线</strong>，把碎片化知识串成完整体系；</li>
                <li>用深度的<strong>技术博客</strong>，把抽象概念讲清楚、讲透彻；</li>
                <li>用可复现的<strong>项目实战</strong>，把理论转化为工程能力；</li>
                <li>用精选的<strong>面试题库</strong>，帮你检验学习成果、应对求职挑战。</li>
              </ul>
            </div>
          </section>

          {/* 这里有什么 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                这里有什么
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>目前平台提供以下几类内容：</p>
              <div className="grid gap-4 sm:grid-cols-2 not-prose">
                <Link
                  href="/roadmap"
                  className="card group hover:border-primary-300 dark:hover:border-primary-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-.982l-3.318 1.659a1.5 1.5 0 0 1-.672.158H6.32a1.5 1.5 0 0 1-.672-.158L2.33 3.838C1.583 3.44.703 3.984.703 4.82v9.593c0 .426.24.816.622 1.006l4.875 2.437a1.5 1.5 0 0 0 1.345 0l4.875-2.437a1.5 1.5 0 0 1 1.345 0l4.875 2.437a1.5 1.5 0 0 0 1.345 0Z" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                        学习路线
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        从 Python 基础到大模型应用开发的系统化路径
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/blog"
                  className="card group hover:border-primary-300 dark:hover:border-primary-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                        技术博客
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        LLM、RAG、Agent 等主题的深度教程与实践分享
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/projects"
                  className="card group hover:border-primary-300 dark:hover:border-primary-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                        项目实战
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        可复现的 AI 应用项目案例与架构拆解
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/interview"
                  className="card group hover:border-primary-300 dark:hover:border-primary-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                        面试题库
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        覆盖基础、工程、实践、趋势四个维度的精选题目
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <p className="mt-2">
                我们会根据社区反馈与技术演进，持续更新现有内容、补充新的主题与项目。
              </p>
            </div>
          </section>

          {/* 隐私承诺 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                隐私承诺
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                本站遵循&ldquo;最小必要&rdquo;原则收集和处理个人信息。我们不会主动要求您提供敏感个人数据，浏览内容无需注册账号。涉及日志、Cookies 等自动收集的信息，仅用于保障网站安全与优化用户体验，不会用于未经您同意的其他用途。
              </p>
              <p>
                详细的处理规则请参阅我们的&ldquo;<Link href="/privacy" className="text-primary-600 hover:underline dark:text-primary-400">隐私政策</Link>&rdquo;。
              </p>
            </div>
          </section>

          {/* 联系方式 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                联系方式
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                如果您在使用中遇到问题、有内容建议、发现错误，或者希望探讨合作，欢迎通过以下方式与我们取得联系：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>本站运营主体：AI 工程师之路</li>
                <li>备案信息：粤ICP备2023124211号</li>
                <li>
                  联系邮箱：<a href="mailto:574291562@qq.com" className="text-primary-600 hover:underline dark:text-primary-400">574291562@qq.com</a>
                </li>
              </ul>
              <p>
                我们一般会在 24–48 小时内回复。如果您有特别希望看到的学习主题，也欢迎告诉我们，我们会评估后纳入后续的内容规划。
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="not-prose">
            <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-purple-50 p-8 dark:border-primary-900/50 dark:from-primary-900/20 dark:to-purple-900/20">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                准备好开始了吗？
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                从学习路线出发，一步步构建你的 AI 应用工程师能力图谱。
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/roadmap" className="btn-primary">
                  查看学习路线
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/blog" className="btn-secondary">
                  浏览技术博客
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
