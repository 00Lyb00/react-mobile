import React, { Component } from "react";
// 引入Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// 引入路由组件配置
import routes from "./config/routes";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((v) => {
            return <Route {...v} key={v.path} />;
          })}
        </Switch>
      </Router>
    );
  }
}
