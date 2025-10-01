export interface QuestionModel {
  no: number;
  title: string;
  answer: string;
  language: string;
  mermaid: string;
  code: string;
  markdown: string;
  script: string;
  codeQuestion: boolean;
}

export interface MainModel {
  questions: QuestionModel[];
  questionNumber: number;
  hiddenQuestion: boolean;
  candidateID: string;
  candidateSubmitID: string;
  errorMessage: string;
  complete: boolean;
  startDate: string;
  submitDate: string;
  selectedRole: string;
  examType?: string;
}

export interface QuizResultData {
  id: string;
  body: {
    questions: QuestionModel[];
    questionNumber: number;
    hiddenQuestion: boolean;
    candidateID: string;
    candidateSubmitID: string;
    errorMessage: string;
    complete: boolean;
    startDate: string;
    submitDate: string;
    selectedRole: string;
    examType?: string;
    aiResult?: {
      output: string;
    };
  };
  timestamp: Date;
}
