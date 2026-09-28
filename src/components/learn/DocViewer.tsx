import React from "react";
import type { LearnDoc } from "@/lib/learn";

interface DocViewerProps {
  doc: LearnDoc;
  /** Markdown 文档已编译好的内容（kind === "md" 时传入） */
  children?: React.ReactNode;
}

export default function DocViewer({ doc, children }: DocViewerProps) {
  if (doc.kind === "html" && doc.assetPath) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            {doc.interactive ? "可交互文档 · 支持展开 / 缩放" : "网页版文档"}
          </div>
          <a
            href={doc.assetPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
          >
            新窗口打开
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
        <iframe
          src={doc.assetPath}
          title={doc.title}
          loading="lazy"
          className="block h-[70vh] min-h-[520px] w-full bg-white md:h-[calc(100vh-13rem)] md:min-h-[640px]"
        />
      </div>
    );
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-800/40">
      <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
        <span className="inline-flex h-2 w-2 rounded-full bg-primary-500" />
        Markdown 文档 · 站内阅读
      </div>
      <div className="learn-doc-content">{children}</div>
    </article>
  );
}
