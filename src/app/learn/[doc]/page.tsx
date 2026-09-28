import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "@/components/blog/mdx-components";
import DocViewer from "@/components/learn/DocViewer";
import DownloadCard from "@/components/learn/DownloadCard";
import {
  getAllLearnDocSlugs,
  getLearnDoc,
  getLearnCollection,
  getLearnDocNeighbors,
  readLearnMarkdown,
} from "@/lib/learn";

interface Props {
  params: { doc: string };
}

export function generateStaticParams() {
  return getAllLearnDocSlugs().map((doc) => ({ doc }));
}

export function generateMetadata({ params }: Props): Metadata {
  const doc = getLearnDoc(params.doc);
  if (!doc) return { title: "文档未找到" };
  return {
    title: `${doc.title} - 快速学习`,
    description: doc.summary,
    openGraph: {
      title: doc.title,
      description: doc.summary,
      type: "article",
    },
  };
}

export default async function LearnDocPage({ params }: Props) {
  const doc = getLearnDoc(params.doc);
  if (!doc) notFound();

  const collection = getLearnCollection(doc.collectionId);
  if (!collection) notFound();

  let compiledContent: React.ReactNode = null;
  if (doc.kind === "md") {
    const source = readLearnMarkdown(doc.slug);
    const compiled = await compileMDX({
      source,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
        parseFrontmatter: false,
      },
      components: mdxComponents,
    });
    compiledContent = compiled.content;
  }

  const { prev, next } = getLearnDocNeighbors(doc.slug);
  const wide = doc.kind === "html";

  return (
    <div className="section-padding">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${wide ? "max-w-7xl" : "max-w-4xl"}`}>
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-slate-500">
          <Link href="/" className="transition-colors hover:text-primary-600">
            首页
          </Link>
          <svg className="mx-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/learn" className="transition-colors hover:text-primary-600">
            快速学习
          </Link>
          <svg className="mx-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/learn" className="transition-colors hover:text-primary-600">
            {collection.title}
          </Link>
          <svg className="mx-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="truncate text-slate-900 dark:text-white">{doc.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`badge ${
                doc.kind === "html"
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              }`}
            >
              {doc.kind === "html" ? "HTML 文档" : "Markdown"}
            </span>
            <span className="tag">{collection.title}</span>
            {doc.interactive ? <span className="badge-warning">可交互</span> : null}
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {doc.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {doc.summary}
          </p>
        </header>

        {/* Viewer */}
        <DocViewer doc={doc}>{compiledContent}</DocViewer>

        {/* 网盘下载 */}
        <div className="mt-8">
          <DownloadCard pan={collection.pan} collectionTitle={collection.title} compact />
        </div>

        {/* 上一篇 / 下一篇 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-primary-300 hover:shadow-sm dark:border-slate-700 dark:hover:border-primary-700"
            >
              <span className="text-xs text-slate-500 dark:text-slate-400">上一篇</span>
              <p className="mt-1 truncate text-sm font-medium text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="group rounded-xl border border-slate-200 p-4 text-right transition-all hover:border-primary-300 hover:shadow-sm dark:border-slate-700 dark:hover:border-primary-700"
            >
              <span className="text-xs text-slate-500 dark:text-slate-400">下一篇</span>
              <p className="mt-1 truncate text-sm font-medium text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-8">
          <Link href="/learn" className="btn-secondary">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            返回快速学习
          </Link>
        </div>
      </div>
    </div>
  );
}
