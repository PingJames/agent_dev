import type { Metadata } from "next";
import { getProject } from "@/lib/content";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import MDXRenderer from "@/components/blog/MDXRenderer";
import type { BlogFrontmatter } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

const difficultyLabels: Record<string, string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
};

export default function ProjectDetailPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  const blogFrontmatter: BlogFrontmatter = {
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    category: frontmatter.category,
    tags: frontmatter.tags,
    author: "AI Engineer Roadmap",
    readingTime: 5,
    draft: false,
    difficulty: frontmatter.difficulty as BlogFrontmatter["difficulty"],
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center text-sm text-slate-500">
            <Link href="/projects" className="hover:text-primary-600 transition-colors">
              项目实战
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
              <span className="badge-info">
                {difficultyLabels[frontmatter.difficulty] || frontmatter.difficulty}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>{format(new Date(frontmatter.date), "yyyy年MM月dd日", { locale: zhCN })}</span>
            </div>

            {/* Links */}
            <div className="mt-4 flex flex-wrap gap-3">
              {frontmatter.githubUrl && (
                <a
                  href={frontmatter.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  <svg className="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
                  </svg>
                  查看源码
                </a>
              )}
              {frontmatter.demoUrl && (
                <a
                  href={frontmatter.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2 text-sm"
                >
                  <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  在线演示
                </a>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>
            )}
          </header>

          {/* Tech Stack */}
          {frontmatter.techStack.length > 0 && (
            <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {frontmatter.techStack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">
            <MDXRenderer content={content} frontmatter={blogFrontmatter} />
          </div>

          {/* Back */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <Link href="/projects" className="btn-secondary">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              返回项目列表
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
