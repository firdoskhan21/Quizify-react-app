import React from "react";
import "antd/dist/antd.css";
import { List, Button } from "antd";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import userPayload from "../services/Auth";
const list = ["Art", "Sports", "History", "Geography", "Politics"];
class QuizContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    return (
      <div style={{ padding: "30px" }}>
        <div>
          <h1>Welcome to Quizify {userPayload.username}</h1>
          <h3>Please select any of the sets below to begin with your test</h3>
        </div>
        <List
          size={"large"}
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link to={`/quiz/${item}`} query={{ type: item }}>
                  <Button size={"large"} type="primary">
                    Start Test
                  </Button>
                </Link>,
              ]}
            >
              <List.Item.Meta
                style={{ textAlign: "left" }}
                title={
                  <Link to={`/quiz/'${item}`} query={{ type: item }}>
                    <h3>{item.toUpperCase()}</h3>
                  </Link>
                }
                description={
                  "The Questions in this test will be of the field " + item
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default QuizContainer;
