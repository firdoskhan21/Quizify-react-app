import React from "react";
import "antd/dist/antd.css";
import { List, Typography, Icon, Button } from "antd";
import style from "./style.module.css";
import QuizService from "../services/questions";
import { withRouter } from "react-router-dom";

function OneQuestion(props) {
  return (
    <div>
      <List
        header={
          <div style={{ textAlign: "left" }}>
            <h1>
              <span>{props.Num + 1}</span> {props.qtn.question}
            </h1>
          </div>
        }
        bordered
        dataSource={props.options}
        renderItem={(item, index) => (
          <List.Item style={{ textAlign: "left" }}>
            <h2>
              <Typography.Text mark>{index + 1}</Typography.Text>{" "}
              <span>{item}</span>
            </h2>
          </List.Item>
        )}
      />
    </div>
  );
}

class QuizComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionData: [],
      index: 0,
    };
  }

  getQuestionsData = async () => {
    QuizService.getQuestionsData(this.props.match.params.type)
      .then((response) => {
        if (response.data.results) {
          console.log(response.data.results);
          this.setState({ QuestionData: response.data.results });
        }
      })
      .catch((err) => {
        //something went wrong
      });
  };

  getOptions = () => {
    var arr = JSON.parse(
      JSON.stringify(
        this.state.QuestionData[this.state.index].incorrect_answers
      )
    );
    arr.push(this.state.QuestionData[this.state.index].correct_answer);
    return arr;
  };

  componentDidMount() {
    this.getQuestionsData();
  }

  render() {
    return (
      <div style={{ padding: "30px" }}>
        {this.state.QuestionData.length > 0 ? (
          <>
            <div className={style.QtnHeader}>
              <span>
                {this.state.QuestionData[this.state.index].category} Test
              </span>
              <div style={{ marginLeft: "auto" }}>
                <span>Timer</span>
                <Button size={"large"}>End Test</Button>
              </div>
            </div>
            <OneQuestion
              qtn={this.state.QuestionData[this.state.index]}
              Num={this.state.index}
              options={this.getOptions()}
            />
          </>
        ) : null}
        <div className={style.containerFooter}>
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              size={"large"}
              disabled={this.state.index <= 0 ? true : false}
              onClick={() => {
                this.setState({ index: this.state.index - 1 });
              }}
            >
              <Icon type="left" />
              Previous
            </Button>
            <Button
              type="primary"
              size={"large"}
              style={{ marginLeft: "auto" }}
              disabled={
                this.state.index >= this.state.QuestionData.length - 1
                  ? true
                  : false
              }
              onClick={() => {
                this.setState({ index: this.state.index + 1 });
              }}
            >
              Next
              <Icon type="right" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuizComp);
