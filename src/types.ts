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
}
