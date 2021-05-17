import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, notification } from "antd";
import style from "./style.module.css";
import quiz_logo from "../../quiz_logo.png";
import userPayload from "../../components/services/Auth";
import { withRouter } from "react-router-dom";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  enterLoading = () => {
    this.setState({ loading: true });
    this.handleSubmit();
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (
          values.username === userPayload.username &&
          values.password === userPayload.password
        ) {
          localStorage.setItem("isUserVisited", true);
          this.props.history.push("/choose-quiz");
        } else {
          notification["error"]({
            message: "Please enter valid credentials",
            placement: "bottomRight",
          });
          this.setState({ loading: false });
        }
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.mainContainer}>
        <h1>Welcome to Quizify</h1>
        <div className={style.Login_container}>
          <div>
            <img
              src={quiz_logo}
              alt="Quiz"
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={{ marginTop: "20px" }}
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" },
                ],
              })(<Input size={"large"} placeholder="Username" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" },
                ],
              })(
                <Input size={"large"} type="password" placeholder="Password" />
              )}
            </Form.Item>
          </Form>{" "}
          <Button
            size={"large"}
            style={{ marginTop: "10px" }}
            type="primary"
            loading={this.state.loading}
            onClick={this.enterLoading}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

const AuthLogin = Form.create({ name: "dynamic_rule" })(LoginForm);
export default withRouter(AuthLogin);
