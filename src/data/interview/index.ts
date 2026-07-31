// Re-export everything from the shared data access layer
export {
  ALL_QUESTIONS,
  getQuestionsByDimension,
  getQuestionBySlug,
  getQuestionsGroupedByCategory,
  getDimensionStats,
  getTotalQuestionCount,
} from "@/lib/interview-data";

// Re-export dimension data for direct access
export { basicsQuestions } from "./basics";
export {
  promptingQuestions,
  ragQuestions,
  agentQuestions,
  finetuningQuestions,
  deploymentQuestions,
  codingQuestions,
} from "./engineering";
export { practiceQuestions } from "./practice";
export { trendsQuestions } from "./trends";
