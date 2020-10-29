import React, { Component } from "react";

import { WingBlank, InputItem, Button, Toast, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import Nav from "@components/Nav";

import "./index.css";
class SetPassword extends Component {
  state = {
    flag: true,
    codeFlag: true,
    count: 10,
  };
  leftClick = () => {};

  // 表单验证
  validator = (rule, value, callback) => {
    // 验证
    const reg = /^[\d]{8 ,20}$/;
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

  // 发送验证码给后台
  shortSend = async () => {
    try {
      const phone = window.localStorage.getItem("phone");
      const code = this.props.form.getFieldValue("code");
      // 发送请求
      // await reqIfCode(phone, code);
      // 跳转短信界面
      // this.props.history.push("/regist/shortMsg");
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
          <p style={{ textAlign: "center", fontSize: "15px" }}>
            请设置登录密码
          </p>
          <div className="msg-flex">
            <InputItem
              type="password"
              clear
              placeholder="请设置8-20位登录密码"
              {...getFieldProps("code", {
                // 表单验证规则
                rules: [{ validator: this.validator }],
              })}
            ></InputItem>
            <div
              style={{
                backgroundImage:
                  "url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)",
                backgroundSize: "cover",
                height: "22px",
                width: "22px",
              }}
            ></div>
          </div>

          <p style={{ color: "rgb(211 ,193 ,187)" }}>
            密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
          </p>

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

export default createForm()(SetPassword);
