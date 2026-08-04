import type { Metadata } from "next";
import { getAllBlogPosts, getBlogCategories, getAllTags } from "@/lib/content";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Pagination from "@/components/blog/Pagination";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "技术博客 - AI 应用开发实践",
  description: "探索 AI 应用开发的最新技术与实践，涵盖 LLM、RAG、AI Agent、Prompt Engineering 等主题的深度教程。",
};

const POSTS_PER_PAGE = 9;

interface Props {
  params: { page: string };
}

export default function BlogPaginatedPage({ params }: Props) {
  const pageNum = parseInt(params.page, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const categories = getBlogCategories();
  const tags = getAllTags();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  if (pageNum > totalPages) {
    notFound();
  }

  const startIndex = (pageNum - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            技术博客
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            探索 AI 应用开发的最新技术与实践，从入门教程到进阶指南，助你掌握 LLM、RAG、AI Agent 等前沿技术。
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Posts Grid */}
          <div className="lg:col-span-3">
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
                <Pagination
                  currentPage={pageNum}
                  totalPages={totalPages}
                  basePath="/blog"
                />
              </>
            ) : (
              <div className="py-20 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  暂无文章
                </h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  精彩内容正在准备中，敬请期待！
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0">
            <BlogSidebar categories={categories} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
