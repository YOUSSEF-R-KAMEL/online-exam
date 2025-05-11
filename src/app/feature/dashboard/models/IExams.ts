export interface IExamsRes {
  message: string;
  metadata: Metadata;
  exams: IExam[];
}

export interface IExam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}


