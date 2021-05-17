import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Button } from "antd";
import quiz_logo from "../quiz_logo.png";

class MainContainer extends React.Component {
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
          extra={[
            <Button type="primary" size={"large"}>
              Logout
            </Button>,
          ]}
        />
      </div>
    );
  }
}

export default MainContainer;
