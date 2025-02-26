import { MainModel, QuestionModel } from "./types";

export const fetchQuestions = async (): Promise<QuestionModel[]> => {
  const response = await fetch("http://localhost:4000/getQuiz");
  const data = await response.json();
  return data;
};

export const fetchQuizResult = async (model: MainModel): Promise<MainModel> => {
  const response = await fetch(
    `http://localhost:4000/getQuizResult?quizId=${model.candidateSubmitID}`
  );
  const data = await response.json();
  return data;
};

export const submitAnswers = async (model: MainModel): Promise<void> => {
  await fetch("http://localhost:4000/submitAnswer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model),
  });
};
