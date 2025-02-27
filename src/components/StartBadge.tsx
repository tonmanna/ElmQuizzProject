import React from "react";
import { MainModel } from "../types";

interface Props {
  model: MainModel;
  onStart: () => void;
  onChangeCandidateID: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartBadge: React.FC<Props> = ({
  model,
  onStart,
  onChangeCandidateID,
}) => (
  <div>
    <img
      src="https://www.itopplus.com/images/LOGO_ITOPPLUS_GREEN.png"
      width={"200px"}
      style={{ transition: "transform 0.5s ease-in-out" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />
    <div style={{ padding: "10px" }}></div>
    <p style={{ fontSize: "20px", wordSpacing: "5px" }}>
      &nbsp;Welcome to ITOPPLUS exam center site for developer. Before you
      start, write your name below. Please beware refresh the page. We don't
      save any state of your answers, so refreshing will cause all your answer
      to be lost.
    </p>
    <p style={{ fontSize: "20px", wordSpacing: "5px" }}>
      &nbsp;Trust in your journey. Each step makes the way clearer; your choices
      become your lessons. The only way to know is to simply press{" "}
      <b>"Start"</b>.<br />
    </p>

    <p>
      <label className="badge badge-secondary">
        Candidate Name :
        <input
          style={{ paddingLeft: "5px", fontSize: "20px" }}
          type="text"
          value={model.candidateID}
          placeholder="Enter your name here."
          onChange={onChangeCandidateID}
        />
      </label>
    </p>
    <p>
      <span className="btn btn-primary btn-lg" onClick={onStart}>
        Start »
      </span>
    </p>
  </div>
);

export default StartBadge;
