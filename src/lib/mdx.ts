import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export interface MDXCompileOptions {
  content: string;
  components?: Record<string, React.ComponentType<unknown>>;
}

export async function compileMDXContent<TFrontmatter>({
  content,
  components = {},
}: MDXCompileOptions): Promise<{
  frontmatter: TFrontmatter;
  content: React.ReactElement;
}> {
  const result = await compileMDX<TFrontmatter>({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
      parseFrontmatter: true,
    },
    components,
  });

  return {
    frontmatter: result.frontmatter,
    content: result.content,
  };
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const chineseCharsPerMinute = 400;

  const words = text.split(/\s+/).length;
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;

  const readingTime =
    words / wordsPerMinute + chineseChars / chineseCharsPerMinute;

  return Math.max(1, Math.ceil(readingTime));
}
