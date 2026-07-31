import Link from "next/link";

const footerLinks = {
  学习资源: [
    { label: "学习路线", href: "/roadmap" },
    { label: "技术博客", href: "/blog" },
    { label: "项目实战", href: "/projects" },
    { label: "面试题库", href: "/interview" },
  ],
  技术领域: [
    { label: "LLM 基础", href: "/blog/categories/llm" },
    { label: "RAG 技术", href: "/blog/categories/rag" },
    { label: "AI Agent", href: "/blog/categories/agent" },
    { label: "Prompt Engineering", href: "/blog/categories/prompt-engineering" },
  ],
  关于: [
    { label: "关于本站", href: "/blog/about" },
    { label: "搜索内容", href: "/search" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
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
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              从零到一，系统化学习 AI 应用开发。
              涵盖 LLM、RAG、Agent 等前沿技术，
              帮助你成长为专业的 AI 应用工程师。
            </p>
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
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Built with Next.js & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
