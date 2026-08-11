/**
 * check-mdx.mjs
 *
 * 扫描 src/content 下所有 .mdx 文件，检查 MDX 编译错误隐患：
 *   - `<` 紧跟数字（如 `<10%`）会被 MDX 当作 JSX 标签名解析而编译失败
 *   - 错误示例: Unexpected character `1` (U+0031) before name
 *
 * 排除项：
 *   - 代码块（``` 围栏内）
 *   - 行内反引号代码
 *   - 转义写法（`\<`）
 *   - `<` 后跟空格（`< 5` 是安全的）
 *   - 合法的 HTML/JSX 标签起始（字母、$、_、/、!、?）
 *
 * 用法: node scripts/check-mdx.mjs
 * 存在隐患时 exit code 为 1，可在 prebuild 中挂载。
 */
import fs from "node:fs";
import path from "node:path";

const contentRoot = path.resolve("src/content");
const errors = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".mdx")) checkFile(full);
  }
}

function stripInlineCode(line) {
  // 剔除行内反引号代码（支持 `` 双反引号），避免误报
  return line.replace(/`{1,2}[^`]*`{1,2}/g, "");
}

function checkFile(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let inCodeBlock = false;

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock) return;

    const stripped = stripInlineCode(line);
    // `<` 后紧跟数字（未被 `\` 转义）。注意：`< 5`（带空格）是安全的，不匹配
    const re = /(?<!\\)<(\d)/;
    const match = re.exec(stripped);
    if (match) {
      errors.push(
        `${path.relative(process.cwd(), file)}:${i + 1}: 检测到 "<${match[1]}"，MDX 会将其解析为 JSX 标签导致编译失败。请改为 "&lt;${match[1]}"、"< ${match[1]}" 或反引号包裹（见 harness/docs/coding-rules.md）`
      );
    }
  });
}

walk(contentRoot);

if (errors.length > 0) {
  console.error("[check-mdx] 发现 " + errors.length + " 处 MDX 编译隐患：\n");
  for (const e of errors) console.error("  " + e);
  console.error(
    "\n修复后重新构建。规则详见 harness/docs/coding-rules.md 的「MDX 内容规范」小节。"
  );
  process.exit(1);
}

console.log("[check-mdx] 未发现 MDX 编译隐患");
