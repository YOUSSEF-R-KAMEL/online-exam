export interface IQuestionRes {
  message: string;
  questions: IQuestion[];
}

export interface IQuestion {
  _id: string;
  question: string;
  answers: IAnswer[];
  type: string;
  correct: string;
  subject: ISubject | null;
  exam: IExam;
  createdAt: string;
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

export interface ISubject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}

export interface IAnswer {
  answer: string;
  key: string;
}