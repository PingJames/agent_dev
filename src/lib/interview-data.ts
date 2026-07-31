import type { InterviewQuestionItem, InterviewDimension } from "@/lib/types";
import type { DimensionMeta } from "@/lib/types";
import { DIMENSIONS } from "@/lib/interview-dimensions";
import { basicsQuestions } from "@/data/interview/basics";
import { practiceQuestions } from "@/data/interview/practice";
import { trendsQuestions } from "@/data/interview/trends";
import {
  promptingQuestions,
  ragQuestions,
  agentQuestions,
  finetuningQuestions,
  deploymentQuestions,
  codingQuestions,
} from "@/data/interview/engineering";

// ============================================================
// All questions combined
// ============================================================
export const ALL_QUESTIONS: InterviewQuestionItem[] = [
  ...basicsQuestions,
  ...promptingQuestions,
  ...ragQuestions,
  ...agentQuestions,
  ...finetuningQuestions,
  ...deploymentQuestions,
  ...codingQuestions,
  ...practiceQuestions,
  ...trendsQuestions,
];

// ============================================================
// Dimension queries
// ============================================================
export function getQuestionsByDimension(dim: InterviewDimension): InterviewQuestionItem[] {
  return ALL_QUESTIONS.filter((q) => q.dimension === dim);
}

export function getDimensionMeta(dim: InterviewDimension): DimensionMeta | undefined {
  return DIMENSIONS.find((d) => d.id === dim);
}

// ============================================================
// Slug query
// ============================================================
export function getQuestionBySlug(slug: string): InterviewQuestionItem | undefined {
  return ALL_QUESTIONS.find((q) => q.slug === slug);
}

// ============================================================
// Grouped queries (for dimension sub-categories)
// ============================================================
export function getQuestionsGroupedByCategory(
  dim: InterviewDimension
): { category: string; questions: InterviewQuestionItem[] }[] {
  const questions = getQuestionsByDimension(dim);
  const map = new Map<string, InterviewQuestionItem[]>();
  for (const q of questions) {
    const list = map.get(q.category) || [];
    list.push(q);
    map.set(q.category, list);
  }
  return Array.from(map.entries()).map(([category, questions]) => ({ category, questions }));
}

// ============================================================
// Dimension stats
// ============================================================
export function getDimensionStats() {
  return DIMENSIONS.map((dim) => ({
    ...dim,
    count: getQuestionsByDimension(dim.id).length,
  }));
}

export function getTotalQuestionCount(): number {
  return ALL_QUESTIONS.length;
}
