import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export const metadata: Metadata = {
  title: "项目实战 - AI 应用开发练手项目",
  description: "通过真实项目练手，构建 RAG 问答系统、AI Agent、智能客服等实际应用场景，积累项目经验。",
};

const difficultyLabels: Record<string, string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
};

const difficultyColors: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-warning",
  advanced: "badge-info",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            项目实战
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            通过真实项目练手，将理论知识转化为实际能力。每个项目从环境搭建到部署上线，提供完整的实战教程。
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card group flex flex-col"
              >
                {/* Cover */}
                <div className="-mx-2 -mt-2 mb-4">
                  <div className="aspect-video rounded-t-xl bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 flex items-center justify-center">
                    <svg className="h-12 w-12 text-purple-400 dark:text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="tag">{project.frontmatter.category}</span>
                  <span className={difficultyColors[project.frontmatter.difficulty] || "badge-info"}>
                    {difficultyLabels[project.frontmatter.difficulty] || project.frontmatter.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {project.frontmatter.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-1">
                  {project.frontmatter.description}
                </p>

                {/* Tech Stack */}
                {project.frontmatter.techStack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.frontmatter.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tag text-xs bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                    {project.frontmatter.techStack.length > 4 && (
                      <span className="tag text-xs bg-slate-100 text-slate-500">
                        +{project.frontmatter.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span>{format(new Date(project.frontmatter.date), "yyyy/MM/dd", { locale: zhCN })}</span>
                  {project.frontmatter.githubUrl && (
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
                      </svg>
                      源码
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <svg className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">项目内容即将上线</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">实战项目正在精心准备中，敬请期待！</p>
          </div>
        )}
      </div>
    </div>
  );
}
