import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./mdx";
import type {
  BlogPost,
  BlogListItem,
  BlogFrontmatter,
  Project,
  ProjectFrontmatter,
  InterviewQuestion,
  InterviewFrontmatter,
  CategoryInfo,
  RoadmapTopic,
  RoadmapNodeWithContent,
} from "./types";

// ============================================================
// Path Helpers
// ============================================================
const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function getContentPath(dir: string): string {
  return path.join(CONTENT_ROOT, dir);
}

function readDir(dir: string): string[] {
  const dirPath = getContentPath(dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
}

function readFile(dir: string, slug: string): string | null {
  const filePath = path.join(getContentPath(dir), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

// ============================================================
// Blog Functions
// ============================================================
export function getAllBlogSlugs(): string[] {
  return readDir("blog").map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogPost(slug: string): BlogPost | null {
  const raw = readFile("blog", slug);
  if (!raw) return null;

  const { data, content } = matter(raw);
  const readingTime = calculateReadingTime(content);

  const frontmatter: BlogFrontmatter = {
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    updated: data.updated,
    category: data.category || "uncategorized",
    tags: data.tags || [],
    author: data.author || "Anonymous",
    coverImage: data.coverImage,
    readingTime,
    draft: data.draft || false,
    featured: data.featured || false,
    difficulty: data.difficulty || "beginner",
  };

  return { slug, frontmatter, content };
}

export function getAllBlogPosts(): BlogListItem[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      const { content: _content, ...rest } = post;
      void _content;
      return rest;
    })
    .filter((p): p is BlogListItem => p !== null) as BlogListItem[];

  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getFeaturedPosts(): BlogListItem[] {
  return getAllBlogPosts().filter((p) => p.frontmatter.featured);
}

export function getBlogCategories(): CategoryInfo[] {
  const posts = getAllBlogPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((p) => {
    const cat = p.frontmatter.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([slug, count]) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    count,
  }));
}

export function getAllTags(): CategoryInfo[] {
  const posts = getAllBlogPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((p) => {
    // 使用 Set 在单篇文章内去重，避免同一标签在一篇文章中被重复计数
    const uniqueTags = new Set(p.frontmatter.tags);
    uniqueTags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .filter(([, count]) => count > 0)
    .map(([slug, count]) => ({
      slug,
      name: slug,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

// ============================================================
// Project Functions
// ============================================================
export function getAllProjectSlugs(): string[] {
  return readDir("projects").map((f) => f.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): Project | null {
  const raw = readFile("projects", slug);
  if (!raw) return null;

  const { data, content } = matter(raw);

  const frontmatter: ProjectFrontmatter = {
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    category: data.category || "other",
    tags: data.tags || [],
    coverImage: data.coverImage,
    demoUrl: data.demoUrl,
    githubUrl: data.githubUrl,
    difficulty: data.difficulty || "beginner",
    featured: data.featured || false,
    draft: data.draft || false,
    techStack: data.techStack || [],
  };

  return { slug, frontmatter, content };
}

export function getAllProjects(): Project[] {
  return getAllProjectSlugs()
    .map((slug) => getProject(slug))
    .filter((p): p is Project => p !== null && !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured);
}

// ============================================================
// Interview Functions
// ============================================================
export function getAllInterviewSlugs(): string[] {
  return readDir("interview").map((f) => f.replace(/\.mdx$/, ""));
}

export function getInterviewQuestion(slug: string): InterviewQuestion | null {
  const raw = readFile("interview", slug);
  if (!raw) return null;

  const { data, content } = matter(raw);

  const frontmatter: InterviewFrontmatter = {
    title: data.title || slug,
    description: data.description || "",
    category: data.category || "general",
    tags: data.tags || [],
    difficulty: data.difficulty || "easy",
    order: data.order || 0,
    dimension: data.dimension || "basics",
    qNumber: data.qNumber || 0,
  };

  return { slug, frontmatter, content };
}

export function getAllInterviewQuestions(): InterviewQuestion[] {
  return getAllInterviewSlugs()
    .map((slug) => getInterviewQuestion(slug))
    .filter((q): q is InterviewQuestion => q !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

// ============================================================
// Roadmap Functions
// ============================================================
export function getRoadmapIndex(): RoadmapTopic[] {
  const dirPath = getContentPath("roadmap");
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      try {
        const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
        if (!raw.trim()) return null; // skip empty files
        return JSON.parse(raw) as RoadmapTopic;
      } catch {
        return null;
      }
    })
    .filter((t): t is RoadmapTopic => t !== null)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getRoadmapTopic(slug: string): RoadmapTopic | null {
  const filePath = path.join(getContentPath("roadmap"), `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as RoadmapTopic;
  } catch {
    return null;
  }
}

export function getRoadmapNodeContent(contentPath: string): string | null {
  const filePath = path.join(getContentPath("roadmap"), `${contentPath}.md`);
  if (!fs.existsSync(filePath)) return null;
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function getRoadmapTopicWithContent(slug: string): RoadmapTopic | null {
  const topic = getRoadmapTopic(slug);
  if (!topic) return null;

  const nodesWithContent = topic.nodes.map((node) => {
    if (node.contentPath) {
      const content = getRoadmapNodeContent(node.contentPath);
      (node as RoadmapNodeWithContent).content = content ?? undefined;
    }
    return node;
  });

  return { ...topic, nodes: nodesWithContent };
}
