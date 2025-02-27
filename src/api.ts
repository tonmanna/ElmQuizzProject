import { MainModel, QuestionModel } from "./types";
declare let windows: any;
const hostName =
  windows.location.hostname == "localhost"
    ? "http://localhost:4000"
    : "https://exam.itopplus.com/";
export const fetchQuestions = async (): Promise<QuestionModel[]> => {
  const response = await fetch(`${hostName}/getQuiz`);
  const data = await response.json();
  return data;
};

export const fetchQuizResult = async (model: MainModel): Promise<MainModel> => {
  const response = await fetch(
    `${hostName}/getQuizResult?quizId=${model.candidateSubmitID}`
  );
  const data = await response.json();
  return data;
};

export const submitAnswers = async (model: MainModel): Promise<void> => {
  await fetch(`${hostName}/submitAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model),
  });
};
