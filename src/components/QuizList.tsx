import React from "react";
import { QuizResult } from "../types";

interface Props {
  model: QuizResult[];
  password: string;

  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetQuizList: () => void;
  onGetQuizResult: (quizId: string) => () => void;
}

const QuizList: React.FC<Props> = ({
  model,
  password,
  onGetQuizList,
  onChangePassword,
  onGetQuizResult,
}) => (
  <div
    className="card"
    style={{
      position: "absolute",
      top: "calc(100% - 500px)",
      right: "calc(0%)",
      transform: "translate(-50%, -50%)",
    }}
  >
    <div>
      <div
        className="card-body"
        style={{ maxWidth: "500px", margin: "auto", overflowY: "scroll" }}
      >
        <h5 className="card-title">Staff Section</h5>
        <div className="text-bold-load">
          <div></div>
          <label className="badge badge-secondary" style={{ margin: "5px" }}>
            Token ID:
          </label>
          <input
            style={{ margin: "5px" }}
            value={password}
            type="password"
            onChange={onChangePassword}
          />
          <span
            className="btn btn-success"
            style={{ margin: "5px" }}
            onClick={onGetQuizList}
          >
            Get Candidate List »
          </span>
        </div>
        {model.length === 0 ? (
          <></>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {model.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{}</td>
                  <td>
                    <span
                      className="btn btn-success"
                      style={{ margin: "5px" }}
                      onClick={onGetQuizResult(quiz.id)}
                    >
                      See result »
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
);

export default QuizList;
