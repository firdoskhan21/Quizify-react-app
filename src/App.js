import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLogin from "../src/components/Auth/Login";
import QuizComp from "../src/components/assessment/QuestionsComp";
import QuizContainer from "../src/components/assessment/QuizContainer";
import MainContainer from "../src/components/MainContainer.js";
import "./App.css";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();
localStorage.setItem("isUserVisited", false);

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter history={customHistory}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return localStorage.getItem("isUserVisited") ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/choose-quiz" />
                );
              }}
            />
            <Route path="/login">
              <AuthLogin />
            </Route>
            <Route path="/choose-quiz">
              <MainContainer />
              <QuizContainer />
            </Route>
            <Route path="/quiz/:type">
              <MainContainer />
              <QuizComp />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
