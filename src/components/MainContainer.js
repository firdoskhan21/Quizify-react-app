import React from "react";
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import quiz_logo from "../quiz_logo.png";

class QuizContainer extends React.Component {
  render() {
    return (
      <div>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          title={
            <div>
              <img
                src={quiz_logo}
                alt="Quiz"
                style={{ height: "50px", width: "50px" }}
              />{" "}
              <span>Quizify</span>
            </div>
          }
        />
      </div>
    );
  }
}

export default QuizContainer;
