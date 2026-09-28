import fs from "fs";
import path from "path";

/**
 * 「快速学习」板块数据层。
 *
 * 说明：站点不提供任何文件下载，源文件（PDF / HTML / MD）统一引导到夸克网盘获取。
 * Markdown 在构建期由 fs 读取并编译为网页；HTML 由 prebuild 脚本同步到 public/learn/ 后以 iframe 内嵌。
 */

const DATA_ROOT = path.join(process.cwd(), "data");

export type LearnDocKind = "md" | "html";

export interface LearnPanLink {
  /** 分享标题（与夸克网盘分享文案保持一致） */
  title: string;
  url: string;
  /** 提取码 */
  code: string;
}

export interface LearnDoc {
  /** URL 使用的 ASCII slug */
  slug: string;
  title: string;
  kind: LearnDocKind;
  collectionId: string;
  /** data 目录下的源文件名（含中文） */
  sourceFile: string;
  /** HTML 文档同步到 public 后的访问路径 */
  assetPath?: string;
  summary: string;
  /** 是否为可交互文档（如 markmap 思维导图） */
  interactive?: boolean;
}

export interface LearnCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** data 下的子目录名 */
  dir: string;
  /** 资料包含的文件（仅展示，不提供下载） */
  fileNames: string[];
  pan: LearnPanLink;
  docs: LearnDoc[];
  /** 卡片配色（Tailwind 渐变类） */
  gradient: string;
  accent: string;
}

export const LEARN_COLLECTIONS: LearnCollection[] = [
  {
    id: "ai-agent",
    title: "AI-Agent 知识体系",
    subtitle: "从原理到工程落地的完整 Agent 知识图谱",
    description:
      "一份系统梳理 AI Agent 的学习手册：从 LLM 基础、Prompt 工程、工具调用与 Function Calling，到记忆机制、多 Agent 协作、RAG 与工程化落地，并配套一张可交互的思维导图，帮你把零散知识点串成体系。",
    dir: "AI-Agent知识体系",
    fileNames: [
      "AI-Agent开发学习手册.md",
      "AI-Agent开发学习手册.pdf",
      "AI-Agent知识体系-思维导图.html",
    ],
    pan: {
      title: "AI-Agent知识体系-思维导图",
      url: "https://pan.quark.cn/s/7e3b9b28a365?pwd=kae4",
      code: "kae4",
    },
    gradient: "from-primary-500 to-indigo-500",
    accent: "text-primary-600 dark:text-primary-400",
    docs: [
      {
        slug: "ai-agent-handbook",
        title: "AI-Agent 开发学习手册",
        kind: "md",
        collectionId: "ai-agent",
        sourceFile: "AI-Agent开发学习手册.md",
        summary: "约 90KB 的体系化长文，覆盖 Agent 的核心概念、架构模式与工程实践要点。",
      },
      {
        slug: "ai-agent-mindmap",
        title: "AI-Agent 知识体系 · 思维导图",
        kind: "html",
        collectionId: "ai-agent",
        sourceFile: "AI-Agent知识体系-思维导图.html",
        assetPath: "/learn/ai-agent-mindmap.html",
        summary: "可交互思维导图，支持展开/折叠节点、缩放，用来快速建立整体知识框架。",
        interactive: true,
      },
    ],
  },
  {
    id: "interview",
    title: "Agent 面试知识全景",
    subtitle: "面向面试的 Agent 考点清单与答题思路",
    description:
      "围绕 Agent 方向面试高频考点整理的全景资料：一份完整的 Markdown 学习手册 + 同内容排版好的网页版手册，覆盖基础概念、协议体系、记忆与状态、可靠性、工程体系与开放性问题，适合面试前快速过一遍、查漏补缺。",
    dir: "Agent面试知识全景",
    fileNames: [
      "Agent面试知识全景-学习手册.md",
      "Agent面试知识全景-学习手册.html",
      "Agent面试知识全景-学习手册.pdf",
    ],
    pan: {
      title: "Agent面试知识全景",
      url: "https://pan.quark.cn/s/5983416d8657?pwd=TnHB",
      code: "TnHB",
    },
    gradient: "from-emerald-500 to-teal-500",
    accent: "text-emerald-600 dark:text-emerald-400",
    docs: [
      {
        slug: "interview-handbook",
        title: "Agent 面试知识全景 · 学习手册",
        kind: "html",
        collectionId: "interview",
        sourceFile: "Agent面试知识全景-学习手册.html",
        assetPath: "/learn/interview-handbook.html",
        summary: "排版好的学习手册网页版，按章节组织，适合循序渐进地读。",
      },
      {
        slug: "interview-handbook-md",
        title: "Agent 面试知识全景 · 学习手册（Markdown）",
        kind: "md",
        collectionId: "interview",
        sourceFile: "Agent面试知识全景-学习手册.md",
        summary: "八大板块、逐章展开的完整手册原文，含目录、主线梳理与附录速查表。",
      },
    ],
  },
];

export function getLearnCollections(): LearnCollection[] {
  return LEARN_COLLECTIONS;
}

export function getLearnCollection(id: string): LearnCollection | undefined {
  return LEARN_COLLECTIONS.find((c) => c.id === id);
}

export function getAllLearnDocs(): LearnDoc[] {
  return LEARN_COLLECTIONS.flatMap((c) => c.docs);
}

export function getAllLearnDocSlugs(): string[] {
  return getAllLearnDocs().map((d) => d.slug);
}

export function getLearnDoc(slug: string): LearnDoc | undefined {
  return getAllLearnDocs().find((d) => d.slug === slug);
}

export function getLearnCollectionBySlug(slug: string): LearnCollection | undefined {
  const doc = getLearnDoc(slug);
  return doc ? getLearnCollection(doc.collectionId) : undefined;
}

/** 读取 Markdown 源文件内容（服务端构建期调用） */
export function readLearnMarkdown(slug: string): string {
  const doc = getLearnDoc(slug);
  if (!doc || doc.kind !== "md") return "";
  const collection = getLearnCollection(doc.collectionId);
  if (!collection) return "";
  const filePath = path.join(DATA_ROOT, collection.dir, doc.sourceFile);
  return fs.readFileSync(filePath, "utf-8");
}

export interface LearnFileStat {
  name: string;
  ext: string;
  size: number;
  sizeLabel: string;
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

/** 读取资料包内文件清单（文件名 + 大小），仅用于展示 */
export function getLearnFileStats(collection: LearnCollection): LearnFileStat[] {
  const dir = path.join(DATA_ROOT, collection.dir);
  return collection.fileNames.map((name) => {
    let size = 0;
    try {
      size = fs.statSync(path.join(dir, name)).size;
    } catch {
      size = 0;
    }
    return {
      name,
      ext: name.split(".").pop()?.toUpperCase() || "",
      size,
      sizeLabel: size ? formatSize(size) : "-",
    };
  });
}

/** 阅读页的上一篇 / 下一篇 */
export function getLearnDocNeighbors(slug: string): { prev?: LearnDoc; next?: LearnDoc } {
  const docs = getAllLearnDocs();
  const index = docs.findIndex((d) => d.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? docs[index - 1] : undefined,
    next: index < docs.length - 1 ? docs[index + 1] : undefined,
  };
}
