import Link from "next/link";

const footerLinks = {
  学习资源: [
    { label: "学习路线", href: "/roadmap" },
    { label: "技术博客", href: "/blog" },
    { label: "项目实战", href: "/projects" },
    { label: "面试题库", href: "/interview" },
  ],
  技术领域: [
    { label: "LLM 基础", slug: "LLM 基础" },
    { label: "RAG 技术", slug: "rag" },
    { label: "AI Agent", slug: "agent" },
    { label: "Prompt Engineering", slug: "prompt-engineering" },
  ].map(({ label, slug }) => ({
    label,
    // 分类名可能含空格/中文，必须 URL 编码，否则动态路由参数无法匹配
    href: `/blog/categories/${encodeURIComponent(slug)}`,
  })),
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600 mb-4">
              <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#4F46E5" />
                <path d="M8 16C8 11.5817 11.5817 8 16 8V16H8Z" fill="white" />
                <path d="M16 24C11.5817 24 8 20.4183 8 16H16V24Z" fill="white" fillOpacity="0.7" />
                <path d="M24 16C24 20.4183 20.4183 24 16 24V16H24Z" fill="white" fillOpacity="0.5" />
                <path d="M16 8C20.4183 8 24 11.5817 24 16H16V8Z" fill="white" fillOpacity="0.85" />
              </svg>
              <span>AI 工程师之路</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              从零到一，系统化学习 AI 应用开发。涵盖 LLM、RAG、Agent 等前沿技术，帮助你成长为专业的 AI 应用工程师。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/roadmap" className="btn-primary px-5 py-2.5 text-sm">
                开始学习之旅
                <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/blog" className="btn-secondary px-5 py-2.5 text-sm">
                浏览技术博客
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-primary-600 transition-colors dark:text-slate-400 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} AI 工程师之路. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <Link
                href="/about"
                className="text-sm text-slate-400 hover:text-primary-600 transition-colors dark:text-slate-500 dark:hover:text-primary-400"
              >
                关于我们
              </Link>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
              <Link
                href="/privacy"
                className="text-sm text-slate-400 hover:text-primary-600 transition-colors dark:text-slate-500 dark:hover:text-primary-400"
              >
                隐私政策
              </Link>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
              <Link
                href="/terms"
                className="text-sm text-slate-400 hover:text-primary-600 transition-colors dark:text-slate-500 dark:hover:text-primary-400"
              >
                使用条款
              </Link>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-primary-600 transition-colors dark:text-slate-500 dark:hover:text-primary-400"
              >
                ICP备案号：粤ICP备2023124211号
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
