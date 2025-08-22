import { simpleErrorDialog } from "./scripts/controllers/submit_answer";
import { MainModel, QuestionModel, QuizResult } from "./types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;
const hostName =
  window.location.hostname == "localhost"
    ? "http://localhost:4000"
    : "https://exam.itopplus.com";
export const fetchQuestions = async (role: string): Promise<QuestionModel[]> => {
  try {
    let endpoint = '/getQuiz'; // Default for DEVELOPER
    
    switch (role) {
      case 'TESTER':
        endpoint = '/getTesterQuiz';
        break;
      case 'DATA ENGINEER':
        endpoint = '/getDataEngineerQuiz';
        break;
      case 'PRODUCT OWNER':
        endpoint = '/getProductOwnerQuiz';
        break;
      case 'DEVELOPER':
      default:
        endpoint = '/getQuiz';
        break;
    }
    
    const response = await fetch(`${hostName}${endpoint}`);
    const data = await response.json();
    return data;
  } catch {
    simpleErrorDialog("Cannot fetch questions");
    return [];
  }
};

export const fetchQuizResult = async (model: MainModel): Promise<MainModel> => {
  try {
    const response = await fetch(
      `${hostName}/getQuizResult?quizId=${model.candidateSubmitID}`
    );
    const data = await response.json();
    return data;
  } catch {
    simpleErrorDialog("Cannot fetch quiz result");
    return model;
  }
};

export const submitAnswers = async (model: MainModel): Promise<void> => {
  try {
    await fetch(`${hostName}/submitAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });
  } catch {
    simpleErrorDialog("Cannot submit answers");
  }
};

export const fetchQuizList = async (token: string): Promise<QuizResult[]> => {
  try {
    console.log("token: ", token);
    const response = await fetch(`${hostName}/getQuizList?token=${token}`);
    const data = await response.json();
    return data;
  } catch {
    simpleErrorDialog("Cannot fetch quiz summarize list");
    return [];
  }
};

export const deleteQuizResult = async (quizId: string, token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${hostName}/deleteQuizResult`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizId, token }),
    });
    return response.ok;
  } catch {
    simpleErrorDialog("Cannot delete quiz result");
    return false;
  }
};
