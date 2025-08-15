import React from "react";
import { QuizResult } from "../types";

interface Props {
  model: QuizResult[];
  password: string;

  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetQuizList: () => void;
  onGetQuizResult: (quizId: string) => () => void;
  onDeleteQuizResult: (quizId: string) => () => void;
}

const QuizList: React.FC<Props> = ({
  model,
  password,
  onGetQuizList,
  onChangePassword,
  onGetQuizResult,
  onDeleteQuizResult,
}) => (
  <div className="card" style={{ display: "none" }}>
    {/* Staff section moved to BottomBadges popup - hiding static content */}
    <div>
      <div className="card-body">
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
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Submit Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {model.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.submitDate || 'N/A'}</td>
                  <td>
                    <span
                      className="btn btn-success"
                      style={{ margin: "5px" }}
                      onClick={onGetQuizResult(quiz.id)}
                    >
                      See result »
                    </span>
                    <span
                      className="btn btn-danger"
                      style={{ margin: "5px" }}
                      onClick={onDeleteQuizResult(quiz.id)}
                    >
                      Delete
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
