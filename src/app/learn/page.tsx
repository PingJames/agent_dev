import type { Metadata } from "next";
import Link from "next/link";
import { getLearnCollections } from "@/lib/learn";
import DownloadCard from "@/components/learn/DownloadCard";

export const metadata: Metadata = {
  title: "快速学习",
  description:
    "四套成体系的 AI 学习资料：AI-Agent 知识体系、Agent 面试知识全景、RAG 知识、RAG 面试知识。在线直接阅读学习手册与思维导图，源文件通过百度网盘获取。",
};

function CollectionIcon({ gradient }: { gradient: string }) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    </span>
  );
}

export default function LearnPage() {
  const collections = getLearnCollections();
  const docCount = collections.reduce((sum, c) => sum + c.docs.length, 0);

  return (
    <div className="section-padding bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="container-custom">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-info">快速学习</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            四套成体系的 Agent / RAG 知识资料
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            学习手册与思维导图都可以直接在网页里阅读，不用下载也能学；需要 PDF / 源文件时，走百度网盘获取。
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="tag">{collections.length} 套资料</span>
            <span className="tag">{docCount} 篇在线文档</span>
            <span className="tag">PDF / HTML 源文件</span>
          </div>
        </div>

        {/* Collections */}
        <div className="mt-16 space-y-12">
          {collections.map((collection) => (
            <section
              key={collection.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
            >
                <div className="border-b border-slate-200 p-6 sm:p-8 dark:border-slate-700">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <CollectionIcon gradient={collection.gradient} />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {collection.title}
                      </h2>
                      <p className={`mt-1 text-sm font-medium ${collection.accent}`}>
                        {collection.subtitle}
                      </p>
                      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-5">
                  {/* 在线阅读文档 */}
                  <div className="lg:col-span-3">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      在线阅读
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {collection.docs.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/learn/${doc.slug}`}
                          className="group rounded-xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/40 dark:hover:border-primary-700"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`badge ${
                                doc.kind === "html"
                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                              }`}
                            >
                              {doc.kind === "html" ? "HTML" : "Markdown"}
                            </span>
                            {doc.interactive ? <span className="badge-warning">可交互</span> : null}
                          </div>
                          <h4 className="mt-3 text-base font-semibold text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                            {doc.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            {doc.summary}
                          </p>
                          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
                            开始阅读
                            <svg
                              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </div>

                  </div>

                  {/* 网盘下载 */}
                  <div className="lg:col-span-2">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      获取源文件
                    </h3>
                    <DownloadCard pan={collection.pan} collectionTitle={collection.title} />
                  </div>
                </div>
              </section>
          ))}
        </div>

        {/* 说明与引导 */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/roadmap" className="btn-secondary">
              查看学习路线
            </Link>
            <Link href="/interview" className="btn-secondary">
              刷面试题库
            </Link>
            <Link href="/" className="btn-primary">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
