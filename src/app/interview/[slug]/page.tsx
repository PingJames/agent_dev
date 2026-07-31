import type { Metadata } from "next";
import { getInterviewQuestion } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import MDXRenderer from "@/components/blog/MDXRenderer";
import { BlogFrontmatter } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const question = getInterviewQuestion(params.slug);
  if (!question) return { title: "题目未找到" };
  return {
    title: question.frontmatter.title,
    description: question.frontmatter.description,
  };
}

const difficultyLabels: Record<string, string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
};

export default function InterviewDetailPage({ params }: Props) {
  const question = getInterviewQuestion(params.slug);
  if (!question) notFound();

  const { frontmatter } = question;

  // Convert interview frontmatter to blog frontmatter for MDXRenderer
  const blogFrontmatter: BlogFrontmatter = {
    title: frontmatter.title,
    description: frontmatter.description,
    date: new Date().toISOString(),
    category: frontmatter.category,
    tags: frontmatter.tags,
    author: "AI Engineer Roadmap",
    readingTime: 5,
    draft: false,
    difficulty: frontmatter.difficulty === "easy" ? "beginner" : frontmatter.difficulty === "medium" ? "intermediate" : "advanced",
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center text-sm text-slate-500">
            <Link href="/interview" className="hover:text-primary-600 transition-colors">
              面试题库
            </Link>
            <svg className="mx-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-slate-900 dark:text-white">{frontmatter.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {frontmatter.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="tag">{frontmatter.category}</span>
              <span className={`badge ${frontmatter.difficulty === "easy" ? "badge-success" : frontmatter.difficulty === "medium" ? "badge-warning" : "badge-info"}`}>
                {difficultyLabels[frontmatter.difficulty]}
              </span>
            </div>
            {frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose-custom">
            <MDXRenderer content={question.content} frontmatter={blogFrontmatter} />
          </div>

          {/* Back */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <Link href="/interview" className="btn-secondary">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              返回面试题库
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
