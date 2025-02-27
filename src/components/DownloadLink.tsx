import React from "react";
import { MainModel } from "../types";

interface Props {
  model: MainModel;
}

const DownloadLink: React.FC<Props> = ({ model }) => (
  <div>
    <p className="text-bold-load">Resource</p>

    <p>
      Exam Basic JS (Junior Developer):
      <a href="https://github.com/iTopPlus/ExamJSTDD">Exam JS TDD</a>
    </p>

    <p>
      Exam Basic TDD (Junior Developer):
      <a href="https://github.com/tonmanna/TDDLab1">Exam TDD Approach</a>
    </p>

    <p className="text-bold-load">Other candidate center</p>

    <p>
      ClosePackage Lab (Resource for Data Sci):
      <a href="./">Excel Test Exam I(Close Job)</a>
    </p>

    <p>
      Test Website Lab (Resource for Data Sci):
      <a href="./">Excel Test Exam II (Test_Website Job)</a>
    </p>
    <div className="text-bold-load">
      Staff Section (Get Id from Backend System):
      <div></div>
      <label className="badge badge-secondary" style={{ margin: "5px" }}>
        Candidate ID:
      </label>
      <input style={{ margin: "5px" }} value={model.candidateSubmitID} />
      <span className="btn btn-primary btn-lg" style={{ margin: "5px" }}>
        Check Result »
      </span>
    </div>
  </div>
);

export default DownloadLink;
