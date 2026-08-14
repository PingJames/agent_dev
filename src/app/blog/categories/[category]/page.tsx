import type { Metadata } from "next";
import { getAllBlogPosts, getBlogCategories, getAllTags } from "@/lib/content";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Pagination from "@/components/blog/Pagination";

interface Props {
  params: { category: string };
}

// App Router 的动态路由参数是未解码的（例如 "LLM%20%E5%9F%BA%E7%A1%80"），
// 需要手动 decodeURIComponent 后才能与 frontmatter 中的分类名比较。
function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeParam(params.category);
  return {
    title: `${category} - 技术博客`,
    description: `浏览 ${category} 分类下的所有 AI 应用开发相关技术文章。`,
  };
}

const POSTS_PER_PAGE = 9;

export default function BlogCategoryPage({ params }: Props) {
  const category = decodeParam(params.category);
  const allPosts = getAllBlogPosts();
  const categories = getBlogCategories();
  const tags = getAllTags();

  const filteredPosts = allPosts.filter(
    (p) => p.frontmatter.category.toLowerCase() === category.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(0, POSTS_PER_PAGE);

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            分类：{category}
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            共 {filteredPosts.length} 篇文章
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={1}
              totalPages={totalPages}
              basePath={`/blog/categories/${encodeURIComponent(category)}`}
            />
          </div>

          <div className="mt-12 lg:mt-0">
            <BlogSidebar
              categories={categories}
              tags={tags}
              currentCategory={category}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
