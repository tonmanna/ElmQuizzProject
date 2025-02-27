import React, { useState, useEffect } from "react";
import { MainModel, QuizResult } from "./types";
import {
  fetchQuestions,
  fetchQuizList,
  fetchQuizResult,
  submitAnswers,
} from "./api";
import StartBadge from "./components/StartBadge";
import FinishBadge from "./components/FinishBadge";
import Question from "./components/Question";
import DownloadLink from "./components/DownloadLink";
import {
  disposeEditor,
  waitUntilEditorDefine,
} from "./scripts/controllers/monaco";
import codeHeighLight from "./scripts/controllers/code_heighlight";
import submitAnswersDialog from "./scripts/controllers/submit_answer";
import QuizList from "./components/QuizList";

declare let window: any;
const initialModel: MainModel = {
  questions: [],
  questionNumber: 0,
  hiddenQuestion: false,
  candidateID: "",
  candidateSubmitID: "",
  errorMessage: "",
  complete: false,
  startDate: "",
};

const App: React.FC = () => {
  const [model, setModel] = useState<MainModel>(initialModel);
  const [password, setPassword] = useState<string>("");
  const [quizList, setQuizList] = useState<QuizResult[]>([]);

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleStart = async () => {
    const questions = await fetchQuestions();
    let questionNumber = 1;
    questions.map((q) => {
      q.no = questionNumber++;
      return q;
    });
    const updateState: MainModel = {
      ...model,
      questions,
      hiddenQuestion: false,
      questionNumber: 1,
      candidateID: model.candidateID || "Anonymous",
      startDate: new Date().toLocaleString(),
    };
    await updateModel(updateState);
  };

  const handleNext = async () => {
    const hideQuestion =
      model.questionNumber == model.questions.length ? true : false;
    const updateState = {
      ...model,
      questionNumber: model.questionNumber + 1,
      hideQuestion,
    };
    await updateModel(updateState);
  };

  const handleBack = async () => {
    const hideQuestion =
      model.questionNumber == model.questions.length ? true : false;
    const updateState = {
      ...model,
      questionNumber: model.questionNumber - 1,
      hideQuestion,
    };
    await updateModel(updateState);
  };

  const handleSubmit = async () => {
    const updateState = { ...model, complete: true };
    setModel(updateState);
    await submitAnswers(updateState);
    submitAnswersDialog(updateState);
  };

  const handleChangeCandidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateState = {
      ...model,
      candidateID: e.target.value,
    };
    setModel(updateState);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeCandidateSubmitID = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updateState = {
      ...model,
      candidateSubmitID: e.target.value,
    };
    setModel(updateState);
  };

  const handleChangeCandidateSubmitByID =
    (candidateSubmitID: string) => async () => {
      const updateState = {
        ...model,
        candidateSubmitID: candidateSubmitID,
      };
      let previousModel = await fetchQuizResult(updateState);
      if (previousModel) {
        previousModel.hiddenQuestion = false;
        previousModel.questionNumber = 1;
        setModel(previousModel);
      }
    };

  const handleCheckResult = async () => {
    let previousModel = await fetchQuizResult(model);
    if (previousModel) {
      previousModel.hiddenQuestion = false;
      previousModel.questionNumber = 1;
      setModel(previousModel);
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateState = {
      ...model,
      questions: model.questions.map((q) =>
        q.no === model.questionNumber ? { ...q, answer: e.target.value } : q
      ),
    };
    setModel(updateState);
  };

  const handleQuizList = async () => {
    const quizList = await fetchQuizList(password);
    setQuizList(quizList);
  };

  const updateModel = async (update: MainModel) => {
    await codeHeighLight(update);
    setModel(update);

    await disposeEditor();
    await waitUntilEditorDefine(update);
    if (window.currentEditor) {
      window.currentEditor.getModel().onDidChangeContent(() => {
        var text = window.currentEditor.getValue();
        update.questions = update.questions.map((q) =>
          q.no === update.questionNumber ? { ...q, script: text } : q
        );
        setModel(update);
      });
    }
  };

  const currentQuestion = model.questions.find(
    (q) => q.no === model.questionNumber
  ) || {
    no: 0,
    title: "FINISH",
    answer: "",
    language: "javascript",
    mermaid: "",
    code: "",
    markdown: "",
    script: "",
    codeQuestion: false,
  };

  return (
    <div className="container" style={{ paddingBottom: "50px" }}>
      {model.questionNumber == 0 ? (
        <>
          <StartBadge
            model={model}
            onStart={handleStart}
            onChangeCandidateID={handleChangeCandidate}
          />
          <DownloadLink
            model={model}
            onCheckResult={handleCheckResult}
            onChangeCandidateSubmitID={handleChangeCandidateSubmitID}
          />
          <QuizList
            model={quizList}
            password={password}
            onGetQuizList={handleQuizList}
            onChangePassword={handleChangePassword}
            onGetQuizResult={handleChangeCandidateSubmitByID}
          />
          <p
            style={{ fontSize: "20px", wordSpacing: "5px", paddingTop: "20px" }}
          >
            <b>
              Special thanks to ITOPPLUS Senior Developer Team.
              <br />
              <label>@juranger @tonmanna @worawut</label>
            </b>
          </p>
        </>
      ) : (
        <>
          {model.questionNumber <= model.questions.length ? (
            <>
              <Question
                model={model}
                question={currentQuestion}
                onNext={handleNext}
                onBack={handleBack}
                onChangeText={handleChangeText}
              />
              <div
                style={{
                  marginRight: "20px",
                }}
              >
                <button
                  className="btn btn-warning"
                  onClick={handleBack}
                  disabled={model.questionNumber === 1}
                >
                  Back
                </button>
                <button
                  className="btn btn-info"
                  onClick={handleNext}
                  style={{ marginLeft: "5px" }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
          <FinishBadge
            question={currentQuestion}
            showFinishBadge={currentQuestion.title === "FINISH"}
            hideSubmitButton={model.complete}
            errorMessage={model.errorMessage}
            onSubmit={handleSubmit}
            onRecheck={handleBack}
          />
        </>
      )}
    </div>
  );
};

export default App;
