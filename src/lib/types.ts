// ============================================================
// Core Types for AI Application Engineer Roadmap
// ============================================================

// --- Blog Types ---
export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  author: string;
  coverImage?: string;
  readingTime: number;
  draft: boolean;
  featured?: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface BlogListItem {
  slug: string;
  frontmatter: BlogFrontmatter;
}

// --- Roadmap Types ---
export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  icon?: string;
  children?: RoadmapNode[];
  resources?: Resource[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedHours: number;
  prerequisites?: string[];
}

export interface Resource {
  title: string;
  url: string;
  type: "article" | "video" | "course" | "book" | "project";
  isFree: boolean;
}

export interface RoadmapTopic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order?: number;
  nodes: RoadmapNode[];
}

// --- Project Types ---
export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
  demoUrl?: string;
  githubUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  featured?: boolean;
  draft: boolean;
  techStack: string[];
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

// --- Interview Types ---
export interface InterviewFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  order: number;
}

export interface InterviewQuestion {
  slug: string;
  frontmatter: InterviewFrontmatter;
  content: string;
}

// --- Search Types ---
export interface SearchResult {
  type: "blog" | "project" | "interview" | "roadmap";
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
}

// --- SEO Types ---
export interface SEOMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

// --- Pagination Types ---
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

// --- Navigation Types ---
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// --- Category Types ---
export interface CategoryInfo {
  slug: string;
  name: string;
  count: number;
  description?: string;
}
