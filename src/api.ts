import { MainModel, QuestionModel, QuizResult } from "./types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;
const hostName =
  window.location.hostname == "localhost"
    ? "http://localhost:4000"
    : "https://exam.itopplus.com";
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

export const fetchQuizList = async (token: string): Promise<QuizResult[]> => {
  try {
    console.log("token: ", token);
    const response = await fetch(`${hostName}/getQuizList?token=${token}`);
    const data = await response.json();
    return data;
  } catch {
    const errorDialog = document.createElement("div");
    errorDialog.className = "alert alert-danger";
    errorDialog.role = "alert";
    errorDialog.style.position = "fixed";
    errorDialog.style.top = "10px";
    errorDialog.style.right = "10px";
    errorDialog.style.zIndex = "1000";
    errorDialog.innerText =
      "May wrong Token. An error occurred while fetching the quiz list.";
    document.body.appendChild(errorDialog);
    setTimeout(() => {
      document.body.removeChild(errorDialog);
    }, 2000);
    return [];
  }
};
