/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: false,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      // 旧文档「Agent 面试知识全景 · 思维导图」已下线，统一指向手册 Markdown 版
      {
        source: '/learn/interview-mindmap',
        destination: '/learn/interview-handbook-md',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
