import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionBySlug, ALL_QUESTIONS } from "@/lib/interview-data";
import { getInterviewQuestion } from "@/lib/content";
import { DIMENSION_LABEL_MAP } from "@/lib/interview-dimensions";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const question = getQuestionBySlug(params.slug);
  if (question) {
    return {
      title: `${question.title} - 面试题库`,
      description: `Q${question.qNumber}: ${question.question}`,
    };
  }
  return { title: "题目未找到" };
}

export function generateStaticParams() {
  return ALL_QUESTIONS.map((q) => ({ slug: q.slug }));
}

export default function InterviewDetailPage({ params }: Props) {
  // Try new data system first
  const question = getQuestionBySlug(params.slug);

  if (question) {
    return (
      <div className="container-custom section-padding">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/interview" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              面试题库
            </Link>
            <span>/</span>
            <Link
              href={`/interview/${question.dimension}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {DIMENSION_LABEL_MAP[question.dimension] || question.dimension}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100">Q{question.qNumber}</span>
          </div>

          {/* Question Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {question.qNumber}
              </span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {question.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {question.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      question.difficulty === "easy"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : question.difficulty === "medium"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {question.difficulty === "easy" ? "简单" : question.difficulty === "medium" ? "中等" : "困难"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50/50 p-5 dark:border-indigo-800 dark:bg-indigo-900/10">
            <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
              📋 面试问题
            </p>
            <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
              {question.question}
            </p>
          </div>

          {/* Answer */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="mb-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              ✅ 期望回答
            </p>
            <div
              className="prose prose-slate prose-base max-w-none dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 dark:prose-code:bg-slate-700"
              dangerouslySetInnerHTML={{ __html: renderFullMarkdown(question.answer) }}
            />
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-700">
            <Link
              href={`/interview/${question.dimension}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              ← 返回{DIMENSION_LABEL_MAP[question.dimension]}维度
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: legacy MDX-based question
  const legacyQuestion = getInterviewQuestion(params.slug);
  if (!legacyQuestion) return notFound();

  return (
    <div className="container-custom section-padding">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/interview"
          className="mb-6 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          ← 返回面试题库
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {legacyQuestion.frontmatter.title}
        </h1>
        <div
          className="prose prose-slate mt-6 max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: legacyQuestion.content }}
        />
      </div>
    </div>
  );
}

/** 完整 Markdown → HTML 渲染 */
function renderFullMarkdown(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_: string, lang: string, code: string) => {
      return `<pre class="rounded-lg bg-slate-900 p-4 overflow-x-auto"><code class="text-sm text-slate-100">${escapeHtml(code.trim())}</code></pre>`;
    })
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Horizontal rules
    .replace(/^---$/gm, "<hr />")
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // List items
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Wrap list items
    .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    // Tables
    .replace(/^\|(.+)\|$/gm, (line: string) => {
      const cells = line.split("|").filter((c) => c.trim());
      if (cells.every((c) => /^[-:\s]+$/.test(c.trim()))) return ""; // separator row
      const tag = line.match(/^\|[-:\s|]+\|$/) ? "" : "td";
      return `<tr>${cells.map((c) => `<${tag}>${c.trim()}</${tag}>`).join("")}</tr>`;
    })
    // Paragraphs
    .replace(/^(?!<[a-z])[^\n]+$/gm, "<p>$&</p>")
    // Clean empty
    .replace(/<p><\/p>/g, "");

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
