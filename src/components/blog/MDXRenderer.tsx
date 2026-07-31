"use client";

import { MDXRemote } from "next-mdx-remote";
import type { BlogFrontmatter } from "@/lib/types";

interface Props {
  content: string;
  frontmatter: BlogFrontmatter;
}

// Custom components for MDX
const components = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold text-slate-900 dark:text-white" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold text-slate-900 dark:text-white" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed text-slate-700 dark:text-slate-300" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="my-4 list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-1" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal pl-6 text-slate-700 dark:text-slate-300 space-y-1" {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400 pl-6 py-4 rounded-r-lg" {...props} />
  ),
  code: (props: React.HTMLProps<HTMLElement>) => {
    const { className, children, ...rest } = props as { className?: string; children: React.ReactNode };
    const isInline = !className || !className.includes("language-");
    if (isInline) {
      return (
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-primary-700 dark:bg-slate-800 dark:text-primary-300" {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <div className="my-6 relative">
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100 dark:bg-slate-950" {...props} />
    </div>
  ),
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.HTMLProps<HTMLTableHeaderCellElement>) => (
    <th className="border border-slate-200 bg-slate-50 px-4 py-2 text-left font-semibold dark:border-slate-700 dark:bg-slate-800" {...props} />
  ),
  td: (props: React.HTMLProps<HTMLTableDataCellElement>) => (
    <td className="border border-slate-200 px-4 py-2 dark:border-slate-700" {...props} />
  ),
  hr: () => <hr className="my-8 border-slate-200 dark:border-slate-700" />,
  img: (props: React.HTMLProps<HTMLImageElement>) => (
    <img className="my-6 rounded-lg shadow-md" alt={props.alt || ""} {...props} />
  ),
};

export default function MDXRenderer({ content }: Props) {
  if (!content) {
    return (
      <div className="prose-custom">
        <p className="text-slate-500">内容加载中...</p>
      </div>
    );
  }

  return (
    <div className="prose-custom">
      {/* @ts-expect-error MDXRemote is a client component with dynamic props */}
      <MDXRemote
        source={content}
        components={components}
      />
    </div>
  );
}
