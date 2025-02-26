import React from "react";
import { MainModel } from "../types";

interface Props {
  model: MainModel;
  onStart: () => void;
}

const StartBadge: React.FC<Props> = ({ model, onStart }) => (
  <div>
    <h1 className="display-12">The exam center for candidate.</h1>
    <p>
      “You can’t stop the future. You can’t rewind the past. The only way to
      learn the secret is to press play.”
    </p>
    <p>
      <label className="badge badge-secondary">
        Candidate Name:
        <input
          style={{ paddingLeft: "5px" }}
          type="text"
          value={model.candidateID}
          placeholder="Enter your ID here."
        />
      </label>
    </p>
    <p>
      <span className="btn btn-primary btn-lg" onClick={onStart}>
        Developer »
      </span>
    </p>
  </div>
);

export default StartBadge;
