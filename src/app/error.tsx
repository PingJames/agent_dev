"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-4">
        <p className="text-red-500 text-6xl font-bold">500</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          出错了
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          抱歉，发生了意外错误。请稍后重试。
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            重试
          </button>
          <Link href="/" className="btn-secondary">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
