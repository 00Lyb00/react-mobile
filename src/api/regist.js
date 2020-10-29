import request from '@utils/request'

const COMMON_URL = '/regist'

// 验证手机号是否注册
export const reqIfPhoneRegist = (phone) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/verify_phone`,
    data: {
      phone
    }
  })
}

// 验证验证码
export const reqIfCode = (phone, code) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/verify_code`,
    data: {
      phone, code
    }
  })
}

export const reqIfRegister = (phone, password) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/user`,
    data: {
      phone, password
    }
  })
}