import React, { Component } from "react";

import { WingBlank, InputItem, Button } from "antd-mobile";
import { createForm } from "rc-form";
import Nav from "@components/Nav";
import "./index.css";
class ShortMsg extends Component {
  state = {
    flag: true,
    codeFlag: true,
    count: 10,
  };
  leftClick = () => {};

  // 表单验证
  validator = (rule, value, callback) => {
    // 验证
    const reg = /^[\d]{6}$/;
    let flag = true;
    if (reg.test(value)) {
      // 验证通过
      flag = false;
    }
    this.setState({
      flag,
    });
    // 不管验证通过还是失败，都需要调用callback回到函数
    callback();
  };
  componentDidMount() {
    // 开启定时器
    this.timeId = setInterval(() => {
      let { count } = this.state;
      // 判断
      if (count <= 1) {
        clearInterval(this.timeId);
        this.setState({
          codeFlag: false,
        });
        return;
      }
      this.setState({
        count: count - 1,
      });
    }, 1000);
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { flag, codeFlag, count } = this.state;
    return (
      <>
        <Nav title={"硅谷注册"} leftClick={this.leftClick} />
        <WingBlank>
          {/* 图片 */}
          <div className="msg-center-img"></div>
          {/* 文字提示 */}
          <p className="msg-p-tips">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <div className="msg-flex">
            <InputItem
              clear
              placeholder="请输入手机验证码"
              className="phone-content"
              {...getFieldProps("code", {
                // 表单验证规则
                rules: [{ validator: this.validator }],
              })}
              maxLength="3"
            ></InputItem>
            <button
              className="msg-code"
              style={{
                backgroundColor: codeFlag
                  ? "rgb(231, 229, 229 ,0.3)"
                  : "rgb(247, 199, 199)",
                color: codeFlag ? "rgb(112, 110, 110)" : "rgb(250, 121, 121)",
              }}
            >
              {codeFlag ? `重新发送(${count}s)` : "获取验证码"}
            </button>
          </div>
          {/* 下一步 */}
          <Button type="warning" disabled={flag} className="msg-next">
            下一步
          </Button>
          <p style={{ color: " rgb(185, 182, 182)", paddingLeft: "30px" }}>
            遇到问题？请 <a href="###">联系客服</a>
          </p>
        </WingBlank>
      </>
    );
  }
}

export default createForm()(ShortMsg);
