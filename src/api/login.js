import request from '@utils/request'

// 公共地址
const COMMON_URL = '/login'

// 登录github
export const reqGitHubLogin = (code) => {
  return request({
    method: "GET",
    url: `${COMMON_URL}/oauth/github`,
    data: {
      code
    }
  })
}

// 发送短信，获取验证码
export const reqShortSend = (phone) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/digits`,
    data: {
      phone
    }
  })
}

// 手机号登录
export const reqLoginPhone = (phone, code) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/phone`,
    data: {
      phone,
      code
    }
  })
}

// 用户账目密码登录
export const reqLoginUser = (userInfo) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/user`,
    data: userInfo
  })
}

// 验证用户是否登录
export const reqLoginVerify = () => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/verify`,
    data: {}
  })
}
