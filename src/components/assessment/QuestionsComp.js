import React from "react";
import "antd/dist/antd.css";
import {
  List,
  Typography,
  Icon,
  Button,
  Checkbox,
  Spin,
  Modal,
  notification,
} from "antd";
import style from "./style.module.css";
import QuizService from "../services/questions";
import { withRouter } from "react-router-dom";
const { confirm, success } = Modal;
// Question list component

function OneQuestion(props) {
  const onChange = (e) => {
    var data = props.qtn;
    data.isVisitLater = e.target.checked;
    props.update(data, props.Num);
  };
  const upDataData = (selection, i) => {
    var data = props.qtn;
    data.userSelection = { value: selection, position: i };
    props.update(data, props.Num);
  };

  return (
    <div>
      <List
        header={
          <div style={{ textAlign: "left", display: "flex" }}>
            <h1>
              <span style={{ color: "green" }}>{props.Num + 1}</span>
              {" : "}
              <span
                dangerouslySetInnerHTML={{
                  __html: props.qtn.question,
                }}
              ></span>
            </h1>
            <Checkbox
              className={style.visitLater}
              onChange={onChange}
              disabled={
                typeof props.qtn.userSelection !== "undefined" ? true : false
              }
              checked={
                typeof props.qtn.isVisitLater !== "undefined"
                  ? props.qtn.isVisitLater
                  : false
              }
            >
              Visit Later
            </Checkbox>
          </div>
        }
        bordered
        dataSource={props.options}
        renderItem={(item, index) => (
          <List.Item
            style={{ textAlign: "left", cursor: "pointer" }}
            className={
              typeof props.qtn.userSelection !== "undefined"
                ? props.qtn.userSelection.position === index
                  ? style.highlightList
                  : ""
                : ""
            }
            onClick={() => {
              upDataData(item, index);
            }}
          >
            <h2>
              <Typography.Text className={style.Bullets}>
                {index + 1}
              </Typography.Text>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              ></span>
            </h2>
          </List.Item>
        )}
      />
    </div>
  );
}
// ----------------

class QuizComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionData: [],
      index: 0,
      minutes: 10,
      seconds: 0,
      ScoreData: 0,
    };
  }

  updateTimer = (duration) => {
    var timer = duration,
      min,
      sec;
    let that = this;
    setInterval(function () {
      min = parseInt(timer / 60, 10);
      sec = parseInt(timer % 60, 10);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      that.setState({ minutes: min, seconds: sec });
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  };

  getQuestionsData = async () => {
    QuizService.getQuestionsData(this.props.match.params.type)
      .then((response) => {
        if (response.data.results) {
          this.setState({ QuestionData: response.data.results });
          var minutes = 60 * this.state.minutes;
          this.updateTimer(minutes);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Something wet wrong",
          placement: "bottomRight",
        });
      });
  };

  showAlert = (type) => {
    let that = this;
    console.log(this.props);
    if (type === "confirm") {
      confirm({
        title: <h2>Are you sure you want to exit the Test?</h2>,
        content: <h3>If you exit the test it will flush all your answers.</h3>,
        onOk() {
          that.props.history.push("/choose-quiz");
        },
        okText: "Exit Anyway",
        cancelText: "Cancel",
      });
    } else {
      var userList = JSON.parse(localStorage.getItem("qtn_details"));
      userList[that.props.match.params.value].istestTaken = true;
      localStorage.setItem("qtn_details", JSON.stringify(userList));
      success({
        title: <h2>Heres your test result</h2>,
        content: (
          <div style={{ fontSize: "1.1rem" }}>
            You Scored {that.state.ScoreData} / {that.state.QuestionData.length}
          </div>
        ),
        onOk() {
          that.props.history.push("/choose-quiz");
        },
        okText: "OK",
      });
    }
  };

  getOptions = () => {
    var arr = JSON.parse(
      JSON.stringify(
        this.state.QuestionData[this.state.index].incorrect_answers
      )
    );
    arr.push(this.state.QuestionData[this.state.index].correct_answer);

    return arr.sort();
  };
  updateQtnData = (qtn, i) => {
    var dataArr = this.state.QuestionData;
    dataArr[i] = qtn;
    this.setState({ QuestionData: dataArr });
  };
  getTestScore = () => {
    // var isAllAnswered = this.state.QuestionData.map((dataObj) => {
    //   dataObj.filter(function (o) {
    //     return o.hasOwnProperty("userSelection");
    //   });
    // });
    var score = 0;
    for (var i = 0; i < this.state.QuestionData.length; i++) {
      if (typeof this.state.QuestionData[i].userSelection !== "undefined") {
        if (
          this.state.QuestionData[i].userSelection.value ===
          this.state.QuestionData[i].correct_answer
        ) {
          score = score + 1;
        }
      }
    }
    this.setState({ ScoreData: score });
    setTimeout(() => this.showAlert("Success"), 500);
  };

  componentDidMount() {
    this.getQuestionsData();
  }

  render() {
    return (
      <div style={{ padding: "30px" }}>
        <Spin
          className={style.loaderContainer}
          spinning={this.state.QuestionData.length === 0 ? true : false}
          delay={500}
        >
          {this.state.QuestionData.length > 0 ? (
            <>
              <div className={style.QtnHeader}>
                <span>
                  {this.state.QuestionData[this.state.index].category} Test
                </span>
                <div style={{ marginLeft: "auto" }}>
                  <span style={{ marginRignt: "10px" }}>
                    Test ends in {this.state.minutes} : {this.state.seconds}
                  </span>{" "}
                  <Button
                    size={"large"}
                    onClick={() => {
                      this.showAlert("confirm");
                    }}
                  >
                    End Test
                  </Button>
                </div>
              </div>
              <OneQuestion
                qtn={this.state.QuestionData[this.state.index]}
                Num={this.state.index}
                options={this.getOptions()}
                update={this.updateQtnData}
              />
            </>
          ) : null}
        </Spin>
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
                this.state.index > this.state.QuestionData.length - 1
                  ? true
                  : false
              }
              onClick={() => {
                if (this.state.index < this.state.QuestionData.length - 1) {
                  this.setState({ index: this.state.index + 1 });
                } else {
                  this.getTestScore();
                }
              }}
            >
              {this.state.index === this.state.QuestionData.length - 1
                ? "Finish Test"
                : "Next"}
              <Icon type="right" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuizComp);
