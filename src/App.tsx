import React, { useState, useEffect } from "react";
import { MainModel, QuestionModel } from "./types";
import { fetchQuestions, fetchQuizResult, submitAnswers } from "./api";
import StartBadge from "./components/StartBadge";
import FinishBadge from "./components/FinishBadge";
import Question from "./components/Question";
import DownloadLink from "./components/DownloadLink";
import { InitItem } from "./scripts/helpers/localstorage";
import monacoInit from "./scripts/controllers/monaco";
import codeHeighLight from "./scripts/controllers/code_heighlight";
import submitAnswersDialog from "./scripts/controllers/submit_answer";
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

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleStart = async () => {
    await InitItem();
    const questions = await fetchQuestions();
    const updateState = {
      ...model,
      questions,
      hiddenQuestion: false,
      questionNumber: 1,
    };
    await monacoInit(updateState);
    await codeHeighLight(updateState);
    setModel(updateState);
  };

  const handleNext = async () => {
    const hideQuestion =
      model.questionNumber == model.questions.length ? true : false;
    const updateState = {
      ...model,
      questionNumber: model.questionNumber + 1,
      hideQuestion,
    };
    await monacoInit(updateState);
    await codeHeighLight(updateState);
    setModel(updateState);
  };

  const handleBack = async () => {
    const hideQuestion =
      model.questionNumber == model.questions.length ? true : false;
    const updateState = {
      ...model,
      questionNumber: model.questionNumber - 1,
      hideQuestion,
    };
    await monacoInit(updateState);
    await codeHeighLight(updateState);
    setModel(updateState);
  };

  const handleSubmit = async () => {
    await submitAnswers(model);
    const updateState = { ...model, complete: true };
    setModel(updateState);
    submitAnswersDialog(updateState);
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
    questionType: false,
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

  return (
    <div className="container" style={{ paddingBottom: "50px" }}>
      {model.questionNumber == 0 ? (
        <>
          <StartBadge model={model} onStart={handleStart} />
          <DownloadLink model={model} />
        </>
      ) : (
        <>
          {model.questionNumber <= model.questions.length ? (
            <>
              <Question
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
