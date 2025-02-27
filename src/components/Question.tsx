import React from "react";
import { MainModel, QuestionModel } from "../types";

interface Props {
  model: MainModel;
  question: QuestionModel;
  onNext: () => void;
  onBack: () => void;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Question: React.FC<Props> = ({
  model,
  question,
  onNext,
  onBack,
  onChangeText,
}) => (
  <div>
    <div
      style={{ position: "fixed", right: "0", top: "5px", marginRight: "20px" }}
    >
      <button
        className="btn btn-warning"
        onClick={onBack}
        disabled={question.no === 1}
      >
        Back
      </button>
      <button
        className="btn btn-info"
        onClick={onNext}
        style={{ marginLeft: "5px" }}
      >
        Next
      </button>
    </div>
    <div className="mb-3">
      <label htmlFor="address">{`${question.no}. ${question.title}`}</label>
      <div id={`mermaid${question.no}`}></div>
      <pre>
        <code id={`code${question.no}`} className="language-javascript"></code>
      </pre>
      <div id={`markdown${question.no}`}></div>
      <textarea
        hidden={question.questionType}
        className="form-control"
        placeholder="Please explain solution here."
        rows={5}
        value={question.answer}
        onChange={onChangeText}
      ></textarea>
      <div hidden={!question.questionType} style={{ paddingTop: "20px" }}>
        Script:
        <div id={`container${question.no}`} style={{ height: "400px" }}></div>
      </div>
    </div>
    <div
      style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        marginRight: "20px",
      }}
    >
      <label className="badge badge-secondary" style={{ margin: "5px" }}>
        Candidate Name : {model.candidateID} : {model.startDate}
      </label>
    </div>
  </div>
);

export default Question;
