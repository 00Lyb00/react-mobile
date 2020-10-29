import React, { Component } from "react";

import { Button, Toast } from "antd-mobile";

import { reqVerifyCode } from "@api/common";

const verifyBtnProps = {
  id: "TencentCaptcha",
  "data-appid": "2030765311",
  "data-cbfn": "verifyCallback",
};

export default class VerifyModal extends Component {
  componentDidMount() {
    window.verifyCallback = async (res) => {
      // res（用户主动关闭验证码）= {ret: 2, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
      if (res.ret === 0) {
        try {
          // 验证成功
          // 发送请求
          await reqVerifyCode(res.randstr, res.ticket);
          await this.props.callback();
        } catch (e) {
          Toast.fail(e, 3);
        }
      }
    };
  }

  render() {
    const { isDisabled } = this.props;
    return (
      <>
        {/* 按钮 */}
        <Button
          type="warning"
          className="button-next"
          // onClick={this.next}
          disabled={isDisabled}
          style={{ display: isDisabled ? "block" : "none" }}
        >
          下一步
        </Button>
        <Button
          type="warning"
          className="button-next"
          disabled={isDisabled}
          style={{ display: !isDisabled ? "block" : "none" }}
          {...verifyBtnProps}
        >
          下一步
        </Button>
      </>
    );
  }
}
