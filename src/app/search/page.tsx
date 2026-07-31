"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchResult {
  type: "blog" | "project" | "interview" | "roadmap";
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
}

const typeLabels: Record<string, string> = {
  blog: "文章",
  project: "项目",
  interview: "面试题",
  roadmap: "路线图",
};

const typeColors: Record<string, string> = {
  blog: "badge-info",
  project: "badge-success",
  interview: "badge-warning",
  roadmap: "badge-info",
};

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<string | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ q: searchQuery });
      if (activeType) params.set("type", activeType);
      const res = await fetch(`/api/search?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
      }
    } catch {
      // search failed silently
    } finally {
      setLoading(false);
    }
  }, [activeType]);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
      performSearch(query.trim());
    }
  };

  const filteredResults = activeType
    ? results.filter((r) => r.type === activeType)
    : results;

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white text-center mb-8">
            搜索内容
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索文章、项目、面试题..."
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  "搜索"
                )}
              </button>
            </div>
          </form>

          {/* Type Filters */}
          {results.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveType(null)}
                className={`tag text-sm ${!activeType ? "bg-primary-600 text-white dark:bg-primary-500" : ""}`}
              >
                全部 ({results.length})
              </button>
              {Object.entries(typeLabels).map(([type, label]) => {
                const count = results.filter((r) => r.type === type).length;
                if (count === 0) return null;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`tag text-sm ${activeType === type ? "bg-primary-600 text-white dark:bg-primary-500" : ""}`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Results */}
          {initialQuery && filteredResults.length > 0 && (
            <div className="space-y-4">
              {filteredResults.map((result, i) => (
                <Link
                  key={`${result.type}-${result.slug}-${i}`}
                  href={
                    result.type === "blog"
                      ? `/blog/${result.slug}`
                      : result.type === "project"
                      ? `/projects/${result.slug}`
                      : result.type === "interview"
                      ? `/interview/${result.slug}`
                      : `/roadmap/${result.slug}`
                  }
                  className="card block group"
                >
                  <div className="flex items-start gap-3">
                    <span className={`shrink-0 mt-0.5 ${typeColors[result.type] || "badge-info"}`}>
                      {typeLabels[result.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                        {result.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {result.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <span className="tag text-xs">{result.category}</span>
                        {result.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <svg className="h-5 w-5 shrink-0 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {initialQuery && !loading && results.length === 0 && (
            <div className="py-20 text-center">
              <svg className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">未找到相关结果</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                尝试使用不同的关键词搜索
              </p>
            </div>
          )}

          {/* Empty State */}
          {!initialQuery && (
            <div className="py-20 text-center">
              <svg className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                搜索你想了解的内容
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                输入关键词搜索文章、项目、面试题和路线图等学习资源
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["RAG", "LLM", "Agent", "Prompt", "向量数据库", "LangChain"].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => {
                      setQuery(kw);
                      router.push(`/search?q=${encodeURIComponent(kw)}`, { scroll: false });
                    }}
                    className="tag cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/50"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
