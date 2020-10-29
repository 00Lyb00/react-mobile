import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";

import "./index.css";
export default class Nav extends Component {
  render() {
    const { title, leftClick } = this.props;
    return (
      <>
        {/* 导航标题 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" className="nav-left" />}
          onLeftClick={leftClick}
        >
          {title}
        </NavBar>
      </>
    );
  }
}
