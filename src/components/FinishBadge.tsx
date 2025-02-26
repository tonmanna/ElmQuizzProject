import React from "react";
import { QuestionModel } from "../types";

interface Props {
  question: QuestionModel;
  showFinishBadge: boolean;
  hideSubmitButton: boolean;
  errorMessage: string;
  onSubmit: () => void;
  onRecheck: () => void;
}

const FinishBadge: React.FC<Props> = ({
  question,
  showFinishBadge,
  hideSubmitButton,
  errorMessage,
  onSubmit,
  onRecheck,
}) => (
  <div className="container" hidden={!showFinishBadge}>
    <h1 className="display-12">{question.title}</h1>
    <h3>{errorMessage}</h3>
    <p>
      “Yesterday's lessons, tomorrow's unknown, The wisdom we seek has already
      been shown. Not in rewind, not in fast-forward dreams, But in embracing
      now, as strange as it seems.”
    </p>
    <p>
      When you're ready, just submit the exam. On the other hand, if you need to
      review your answers, just click Re-check.
    </p>
    <p hidden={hideSubmitButton}>
      <span className="btn btn-primary btn-lg" onClick={onSubmit}>
        Submit »
      </span>
      <span
        className="btn btn-warning btn-lg"
        style={{ marginLeft: "5px" }}
        onClick={onRecheck}
      >
        Re-check
      </span>
    </p>
    <div hidden={!hideSubmitButton}>
      <h4>Thank you for your participation.</h4>
    </div>
  </div>
);

export default FinishBadge;
