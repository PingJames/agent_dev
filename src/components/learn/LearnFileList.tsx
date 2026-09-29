import type { LearnFileStat } from "@/lib/learn";

const TYPE_STYLE: Record<string, string> = {
  PDF: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  HTML: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  MD: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export default function LearnFileList({ files }: { files: LearnFileStat[] }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        资料包含的文件
      </p>
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span className={`badge ${TYPE_STYLE[file.ext] || "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                {file.ext}
              </span>
              <span className="truncate text-slate-700 dark:text-slate-300">{file.name}</span>
            </span>
            <span className="shrink-0 text-slate-400 dark:text-slate-500">{file.sizeLabel}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        以上文件可在百度网盘中获取，本站不提供文件下载。
      </p>
    </div>
  );
}
