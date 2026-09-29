"use client";

import { useState } from "react";
import type { LearnPanLink } from "@/lib/learn";

interface DownloadCardProps {
  pan: LearnPanLink;
  /** 资料包名称，用于卡片副标题 */
  collectionTitle?: string;
  /** 紧凑模式：用于阅读页底部 */
  compact?: boolean;
}

function CloudIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.75 3.75 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export default function DownloadCard({ pan, collectionTitle, compact = false }: DownloadCardProps) {
  const [copied, setCopied] = useState<"" | "url">("");

  const copyText = async (text: string, flag: "url") => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(flag);
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      window.setTimeout(() => setCopied(""), 2000);
    }
  };

  return (
    <div
      className={`rounded-xl border border-dashed border-primary-300 bg-primary-50/60 p-5 dark:border-primary-800 dark:bg-primary-900/20 ${
        compact ? "" : "sm:p-6"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
          <CloudIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
            百度网盘 · {pan.title}
          </h4>
          {collectionTitle ? (
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
              {collectionTitle}（PDF / HTML 全套源文件）
            </p>
          ) : null}
        </div>
      </div>

      <a
        href={pan.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block truncate text-sm text-primary-600 underline decoration-primary-300 transition-colors hover:text-primary-700 hover:decoration-primary-500 dark:text-primary-400"
      >
        {pan.url}
      </a>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a href={pan.url} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
          打开百度网盘
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => copyText(pan.url, "url")}
          className="btn-secondary flex-1"
        >
          {copied === "url" ? <CheckIcon className="mr-2 h-4 w-4" /> : <CopyIcon className="mr-2 h-4 w-4" />}
          {copied === "url" ? "链接已复制" : "复制链接"}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        本站不提供文件下载，源文件请通过上方百度网盘链接获取：复制链接后在浏览器打开，输入提取码即可保存。
      </p>
    </div>
  );
}
