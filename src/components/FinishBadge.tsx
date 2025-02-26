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
      “You can’t stop the future. You can’t rewind the past. The only way to
      learn the secret is to press play.”
    </p>
    <p hidden={hideSubmitButton}>
      <span className="btn btn-primary btn-lg" onClick={onSubmit}>
        Submit exam answer
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
