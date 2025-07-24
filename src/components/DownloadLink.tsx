import React from "react";
import { MainModel } from "../types";

interface Props {
  model: MainModel;

  onChangeCandidateSubmitID: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckResult: () => void;
}

const DownloadLink: React.FC<Props> = ({
  model,
  onCheckResult,
  onChangeCandidateSubmitID,
}) => (
  <div>
    {/* Resource section moved to BottomBadges popup - hiding static content */}
    <div className="text-bold-load">
      <label className="badge badge-secondary" style={{ margin: "5px" }}>
        Candidate ID:
      </label>
      <input
        style={{ margin: "5px" }}
        value={model.candidateSubmitID}
        onChange={onChangeCandidateSubmitID}
      />
      <span
        className="btn btn-primary"
        style={{ margin: "5px" }}
        onClick={onCheckResult}
      >
        Check Result »
      </span>
    </div>
  </div>
);

export default DownloadLink;
