"use client";

import { useState } from "react";
import { ChevronDown, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { InterviewQuestionItem } from "@/lib/types";
import { DIMENSION_LABEL_MAP } from "@/lib/interview-dimensions";

interface Props {
  question: InterviewQuestionItem;
  defaultOpen?: boolean;
}

export default function AccordionQuestion({ question, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        {/* Q Number Badge */}
        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {question.qNumber}
        </span>

        {/* Title & Meta */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
            {question.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {question.category}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
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

        {/* Chevron */}
        <ChevronDown
          className={`mt-1 h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-slate-700">
          {/* Question */}
          <div className="mb-4 rounded-lg bg-indigo-50/50 p-4 dark:bg-indigo-900/10">
            <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
              📋 {question.question}
            </p>
          </div>

          {/* Answer */}
          <div className="prose prose-slate prose-sm max-w-none dark:prose-invert prose-headings:text-base prose-headings:font-semibold prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-slate-700">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(question.answer) }} />
          </div>

          {/* Tags & Action */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
            <div className="flex flex-wrap gap-1.5">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/interview/${question.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              查看详情
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 简易 Markdown → HTML 渲染（处理代码块、列表、加粗等） */
function renderMarkdown(md: string): string {
  let html = md
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Backtick code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Horizontal rules
    .replace(/^---$/gm, "<hr />")
    // Headings (###)
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // Unordered list items
    .replace(/^    - (.+)$/gm, "<li class='ml-6'>$1</li>")
    .replace(/^- (.+)$/gm, "<li class='ml-4'>$1</li>")
    // Wrap consecutive list items
    .replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    // Nested list cls
    .replace(/class='ml-6'/g, "style='margin-left:1.5rem'")
    .replace(/class='ml-4'/g, "style='margin-left:1rem'")
    // Paragraphs: wrap lines not starting with a tag
    .replace(/^(?!<[a-z])[^\n]+$/gm, "<p>$&</p>")
    // Clean up empty <p>
    .replace(/<p><\/p>/g, "");

  return html;
}
