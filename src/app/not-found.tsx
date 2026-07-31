import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-4">
        <p className="text-primary-600 text-6xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          页面未找到
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          你访问的页面不存在或已被移除。
        </p>
        <Link href="/" className="btn-primary mt-6">
          返回首页
        </Link>
      </div>
    </div>
  );
}
