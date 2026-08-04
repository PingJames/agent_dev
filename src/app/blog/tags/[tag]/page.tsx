import type { Metadata } from "next";
import { getAllBlogPosts, getBlogCategories, getAllTags } from "@/lib/content";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Pagination from "@/components/blog/Pagination";

interface Props {
  params: { tag: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} - 技术博客`,
    description: `浏览标签 ${tag} 下的所有 AI 应用开发相关技术文章。`,
  };
}

const POSTS_PER_PAGE = 9;

export default function BlogTagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const allPosts = getAllBlogPosts();
  const categories = getBlogCategories();
  const tags = getAllTags();

  const filteredPosts = allPosts.filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
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
            #{tag}
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            共 {filteredPosts.length} 篇文章
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={1}
              totalPages={totalPages}
              basePath={`/blog/tags/${encodeURIComponent(tag)}`}
            />
          </div>

          <div className="mt-12 lg:mt-0">
            <BlogSidebar
              categories={categories}
              tags={tags}
              currentTag={tag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
