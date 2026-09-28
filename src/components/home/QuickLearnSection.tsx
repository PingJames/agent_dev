import Link from "next/link";
import { getLearnCollections } from "@/lib/learn";

export default function QuickLearnSection() {
  const collections = getLearnCollections();

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50/70 via-white to-indigo-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="container-custom">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="badge-info">快速学习</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              两套成体系的 Agent 知识资料
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              学习手册和可交互思维导图都能直接在网页里读，不用下载；需要 PDF / 源文件时再走夸克网盘。
            </p>
          </div>
          <Link href="/learn" className="btn-secondary shrink-0">
            查看全部资料
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-primary-700"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${collection.gradient} text-white shadow-md`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{collection.title}</h3>
                  <p className={`mt-1 text-sm font-medium ${collection.accent}`}>{collection.subtitle}</p>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {collection.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {collection.docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/learn/${doc.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-primary-700 dark:hover:text-primary-400"
                  >
                    <span
                      className={`badge ${
                        doc.kind === "html"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      }`}
                    >
                      {doc.kind === "html" ? "HTML" : "MD"}
                    </span>
                    {doc.title}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end dark:border-slate-700">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end">
                  <a
                    href={collection.pan.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-5 py-2.5 text-sm"
                  >
                    夸克网盘获取
                    <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <Link href="/learn" className="btn-secondary px-5 py-2.5 text-sm">
                    资料详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          本站不提供文件下载，PDF / HTML / Markdown 源文件请通过夸克网盘链接获取（复制链接后打开「夸克 APP」即可保存）。
        </p>
      </div>
    </section>
  );
}
