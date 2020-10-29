import React, { Component } from "react";
import {
  Icon,
  InputItem,
  WingBlank,
  Button,
  WhiteSpace,
  Modal,
  Toast,
} from "antd-mobile";
import { createForm } from "rc-form";

import Nav from "@components/Nav";

import VerifyModal from "@components/VerifyModal";

import { reqIfPhoneRegist } from "@api/regist";
import { reqShortSend } from "@api/login";

import "./index.css";

class CheckPhone extends Component {
  // 控制下一步按钮状态
  state = {
    isDisabled: true,
  };

  // 发送短信
  shortSend = (phone) => {
    return async () => {
      console.log(11);
      try {
        // 发送请求
        await reqShortSend(phone);
        // 跳转短信界面
        this.props.history.push("/regist/shortMsg");
      } catch (e) {
        Toast.fail(e, 3);
      }
    };
  };

  componentDidMount() {
    // 当页面加载完，则弹出协议
    // Modal.alert(
    //   "注册协议及隐私政策",
    //   <span style={{ color: "#000" }}>
    //     在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
    //     <strong style={{ textDecoration: "underline" }}>
    //       请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
    //     </strong>
    //     <span className="protocol">《硅谷用户注册协议》</span>
    //     <span className="protocol">《硅谷隐私政策》</span>
    //   </span>,
    //   [
    //     {
    //       text: "不同意",
    //       onPress: () => console.log("cancel"),
    //     },
    //     {
    //       text: "同意",
    //       style: { backgroundColor: "red", color: "#fff" },
    //     },
    //   ]
    // );
  }

  // next = async () => {
  //   try {
  //     const phone = this.props.form.getFieldValue("phone");
  //     const result = await reqIfPhoneRegist(phone);
  //   } catch (e) {}
  // };

  // 表单验证
  validator = (rule, value, callback) => {
    // 验证
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      // 验证通过
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    // 不管验证通过还是失败，都需要调用callback回到函数
    callback();
  };

  reqCallback = async () => {
    const phone = this.props.form.getFieldValue("phone");
    await reqIfPhoneRegist(phone);
    console.log("success");
    // 存储电话号
    window.localStorage.setItem("phone", phone);
    // 发送短信提示对话框
    // this.showAlert(phone);
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
          onPress: this.shortSend(phone),
          style: { backgroundColor: "red", color: "white" },
        },
      ]
    );
  };

  // 点击左上角
  leftClick = () => {};
  render() {
    const { isDisabled } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <>
        {/* 导航 */}
        <Nav title={"硅谷注册"} leftClick={this.leftClick} />
        {/* 文本框 */}
        <WingBlank>
          <InputItem
            clear
            placeholder="请输入手机号"
            className="phone-content"
            {...getFieldProps("phone", {
              // 表单验证规则
              rules: [{ validator: this.validator }],
            })}
          >
            <span className="phone-left">
              +86 <Icon type="down" />
            </span>
          </InputItem>
          <VerifyModal isDisabled={isDisabled} callback={this.reqCallback} />
          {/* 对话框 */}
          <WhiteSpace />
        </WingBlank>
      </>
    );
  }
}

export default createForm()(CheckPhone);
