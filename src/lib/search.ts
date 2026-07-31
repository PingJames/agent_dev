import Fuse from "fuse.js";
import type { SearchResult } from "./types";
import { getAllBlogPosts, getAllProjects, getAllInterviewQuestions, getRoadmapIndex } from "./content";

let searchIndex: Fuse<SearchResult> | null = null;
let indexVersion = 0;

function buildSearchIndex(): Fuse<SearchResult> {
  const results: SearchResult[] = [];

  // Blog posts
  getAllBlogPosts().forEach((post) => {
    results.push({
      type: "blog",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      slug: post.slug,
      category: post.frontmatter.category,
      tags: post.frontmatter.tags,
    });
  });

  // Projects
  getAllProjects().forEach((project) => {
    results.push({
      type: "project",
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      slug: project.slug,
      category: project.frontmatter.category,
      tags: project.frontmatter.tags,
    });
  });

  // Interview questions
  getAllInterviewQuestions().forEach((question) => {
    results.push({
      type: "interview",
      title: question.frontmatter.title,
      description: question.frontmatter.description,
      slug: question.slug,
      category: question.frontmatter.category,
      tags: question.frontmatter.tags,
    });
  });

  // Roadmap topics
  getRoadmapIndex().forEach((topic) => {
    results.push({
      type: "roadmap",
      title: topic.title,
      description: topic.description,
      slug: topic.slug,
      category: "roadmap",
      tags: [],
    });
    topic.nodes.forEach((node) => {
      results.push({
        type: "roadmap",
        title: node.title,
        description: node.description,
        slug: `${topic.slug}#${node.id}`,
        category: "roadmap",
        tags: [],
      });
    });
  });

  return new Fuse(results, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "description", weight: 0.3 },
      { name: "tags", weight: 0.1 },
      { name: "category", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

export function getSearchIndex(): Fuse<SearchResult> {
  if (!searchIndex) {
    searchIndex = buildSearchIndex();
    indexVersion = 1;
  }
  return searchIndex;
}

export function refreshSearchIndex(): void {
  searchIndex = buildSearchIndex();
  indexVersion++;
}

export function search(query: string, limit = 20): { item: SearchResult; score: number }[] {
  const fuse = getSearchIndex();
  if (!query || query.trim().length < 2) return [];

  const results = fuse.search(query.trim());
  return results.slice(0, limit).map((r) => ({
    item: r.item,
    score: r.score || 0,
  }));
}

export function searchByType(
  query: string,
  type: SearchResult["type"],
  limit = 10
): { item: SearchResult; score: number }[] {
  const results = search(query, 50);
  return results.filter((r) => r.item.type === type).slice(0, limit);
}
