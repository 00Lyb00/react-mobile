import React, { Component } from "react";

import { WingBlank, InputItem, Button, Toast, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import Nav from "@components/Nav";

import { reqIfCode } from "@api/regist";
import { reqShortSend } from "@api/login";

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
    // 发送请求，开启定时器
    this.getCode();
  }

  // 定时器
  setTime = () => {
    this.timeId = setInterval(() => {
      let { count } = this.state;
      // 判断
      if (count <= 1) {
        clearInterval(this.timeId);
        delete this.timeId;
        this.setState({
          codeFlag: false,
          count: 10,
        });
        return;
      }
      this.setState({
        count: count - 1,
      });
    }, 1000);
  };

  // 获取验证码
  getVerifyCode = async () => {
    if (this.timeId) return;
    console.log("来了");
    // 弹出对话框，是否需要送去验证码
    // 获取phone,和code
    const phone = window.localStorage.getItem("phone");
    Modal.alert(
      "",
      <span>
        我们将发送短信/语音验证码至：
        <span style={{ display: "block" }}>{phone}</span>
      </span>,
      [
        {
          text: "取消",
        },
        {
          text: "确认",
          onPress: this.getCode,
          style: { backgroundColor: "red", color: "white" },
        },
      ]
    );
  };

  // 向后台获取验证码
  getCode = async () => {
    // 修改状态
    this.setState({
      codeFlag: true,
    });
    this.setTime();
    try {
      // 发送请求，获取验证码
      await reqShortSend(window.localStorage.getItem("phone"));
    } catch (e) {
      Toast.fail(e, 3);
    }
  };

  // 发送验证码给后台
  shortSend = async () => {
    try {
      const phone = window.localStorage.getItem("phone");
      const code = this.props.form.getFieldValue("code");
      // 发送请求
      await reqIfCode(phone, code);
      // 跳转短信界面
      this.props.history.push("/regist/setPassword");
      console.log("success");
    } catch (e) {
      Toast.fail(e, 3);
    }
  };

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
            ></InputItem>
            <button
              className="msg-code"
              style={{
                backgroundColor: codeFlag
                  ? "rgb(231, 229, 229 ,0.3)"
                  : "rgb(247, 199, 199)",
                color: codeFlag ? "rgb(112, 110, 110)" : "rgb(250, 121, 121)",
              }}
              disabled={codeFlag}
              onTouchEnd={this.getVerifyCode}
            >
              {codeFlag ? `重新发送(${count}s)` : "获取验证码"}
            </button>
          </div>
          {/* 下一步 */}
          <Button
            type="warning"
            disabled={flag}
            onClick={this.shortSend}
            className="msg-next"
          >
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
