import React from "react";
import "antd/dist/antd.css";
import QuizService from "../services/questions";
import { withRouter } from "react-router-dom";
class QuizComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionData: [],
    };
  }

  getQuestionsData = () => {
    QuizService.getQuestionsData(this.props.match.params.type)
      .then((response) => {
        if (response.result) {
          this.setState({ getQuestionsData: response.result });
        }
      })
      .catch((err) => {
        //something went wrong
      });
  };

  componentDidMount() {
    this.getQuestionsData();
  }

  render() {
    console.log(this.props);
    return <div>data Quiz</div>;
  }
}

export default withRouter(QuizComp);
