export interface IExamResult {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface IQuizHistory {
  examId: string;
  examTitle: string;
  date: Date;
  score: number;
  totalQuestions: number;
  percentage: number;
  duration: number;
  results: IExamResult[];
}
