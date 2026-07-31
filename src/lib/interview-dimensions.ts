import type { DimensionMeta } from "./types";

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: "basics",
    name: "基础理论",
    icon: "🧠",
    description: "Transformer架构、注意力机制、预训练与微调、Scaling Law等核心理论知识",
    color: "from-indigo-500 to-purple-600",
    subCategories: ["大模型基础理论"],
  },
  {
    id: "engineering",
    name: "工程实践",
    icon: "⚙️",
    description: "提示工程、RAG检索增强生成、Agent开发、模型微调、部署优化、编程实践",
    color: "from-emerald-500 to-teal-600",
    subCategories: [
      "提示工程与Prompt设计",
      "RAG检索增强生成",
      "Agent开发与工具调用",
      "模型微调与训练",
      "模型部署与推理优化",
      "编程能力与工程实践",
    ],
  },
  {
    id: "practice",
    name: "场景落地",
    icon: "🏢",
    description: "业务理解、场景分析、效果评估、成本平衡等真实生产环境落地能力",
    color: "from-orange-500 to-amber-600",
    subCategories: ["业务理解与场景落地"],
  },
  {
    id: "trends",
    name: "前沿趋势",
    icon: "🚀",
    description: "长上下文、多模态、世界模型、合成数据等前沿技术与未来发展洞察",
    color: "from-pink-500 to-rose-600",
    subCategories: ["前沿技术与发展趋势", "软技能与团队协作"],
  },
];

export function getDimensionMeta(id: string): DimensionMeta | undefined {
  return DIMENSIONS.find((d) => d.id === id);
}

export const DIMENSION_LABEL_MAP: Record<string, string> = {
  basics: "基础理论",
  engineering: "工程实践",
  practice: "场景落地",
  trends: "前沿趋势",
};

export const DIMENSION_COLOR_MAP: Record<string, string> = {
  basics: "bg-indigo-100 text-indigo-700 border-indigo-200",
  engineering: "bg-emerald-100 text-emerald-700 border-emerald-200",
  practice: "bg-orange-100 text-orange-700 border-orange-200",
  trends: "bg-pink-100 text-pink-700 border-pink-200",
};

export const DIMENSION_DARK_COLOR_MAP: Record<string, string> = {
  basics: "dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  engineering: "dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  practice: "dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
  trends: "dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800",
};
