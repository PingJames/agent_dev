/**
 * 构建前同步「快速学习」资料中的 HTML 文档到 public/learn/，
 * 以便阅读页用 iframe 内嵌展示（源文件名含中文，统一改成 ASCII slug）。
 *
 * 站点不提供文件下载，因此只同步可用于在线阅读的 HTML，PDF / MD 不同步。
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "learn");

const ASSETS = [
  {
    dir: "AI-Agent知识体系",
    file: "AI-Agent知识体系-思维导图.html",
    slug: "ai-agent-mindmap",
  },
  {
    dir: "Agent面试知识全景",
    file: "Agent面试知识全景-学习手册.html",
    slug: "interview-handbook",
  },
];

fs.mkdirSync(outDir, { recursive: true });

let copied = 0;
for (const asset of ASSETS) {
  const src = path.join(root, "data", asset.dir, asset.file);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-learn-assets] 跳过（源文件不存在）: ${src}`);
    continue;
  }
  const dest = path.join(outDir, `${asset.slug}.html`);
  fs.copyFileSync(src, dest);
  const size = fs.statSync(dest).size;
  console.log(`[sync-learn-assets] ${asset.slug}.html <- ${asset.file} (${(size / 1024).toFixed(0)} KB)`);
  copied += 1;
}

console.log(`[sync-learn-assets] 完成，共同步 ${copied} 个 HTML 文档`);
