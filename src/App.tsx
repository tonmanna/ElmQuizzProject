import React, { useState, useEffect } from "react";
import { MainModel } from "./types";
import { fetchQuestions, submitAnswers } from "./api";
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

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleStart = async () => {
    const questions = await fetchQuestions();
    const updateState = {
      ...model,
      questions,
      hiddenQuestion: false,
      questionNumber: 1,
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
    await submitAnswers(model);
    const updateState = { ...model, complete: true };
    setModel(updateState);
    submitAnswersDialog(updateState);
  };

  const handleChangeCandidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateState = {
      ...model,
      candidateID: e.target.value,
    };
    setModel(updateState);
  };

  const updateModel = async (update: MainModel) => {
    await codeHeighLight(update);
    setModel(update);

    console.log("update: ", update);
    setTimeout(async () => {
      await disposeEditor();
      await waitUntilEditorDefine(update);
      console.log("window.currentEditor: ", window.currentEditor);
      if (window.currentEditor) {
        window.currentEditor.getModel().onDidChangeContent(() => {
          var text = window.currentEditor.getValue();
          console.log("model: ", update);
          update.questions = update.questions.map((q) =>
            q.no === update.questionNumber ? { ...q, script: text } : q
          );
          setModel(update);
        });
      }
    });
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
          <StartBadge
            model={model}
            onStart={handleStart}
            onChangeCandidateID={handleChangeCandidate}
          />
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
