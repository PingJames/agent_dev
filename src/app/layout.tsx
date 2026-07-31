import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI 工程师之路 - 从零到一学习 AI 应用开发",
    template: "%s | AI 工程师之路",
  },
  description:
    "系统化学习 AI 应用开发，涵盖 LLM、RAG、AI Agent、Prompt Engineering 等前沿技术，提供学习路线、技术博客、项目实战和面试题库。",
  keywords: [
    "AI应用开发",
    "LLM",
    "RAG",
    "AI Agent",
    "Prompt Engineering",
    "机器学习",
    "深度学习",
    "大语言模型",
  ],
  authors: [{ name: "AI Engineer Roadmap" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "AI 工程师之路",
    title: "AI 工程师之路 - 从零到一学习 AI 应用开发",
    description:
      "系统化学习 AI 应用开发，涵盖 LLM、RAG、AI Agent、Prompt Engineering 等前沿技术。",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 工程师之路",
    description:
      "系统化学习 AI 应用开发，涵盖 LLM、RAG、AI Agent 等前沿技术。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
