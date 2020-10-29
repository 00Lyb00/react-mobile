import request from '@utils/request'

// 公共地址
const COMMON_URL = '/common'

// 腾讯验证码
export const reqVerifyCode = (randstr, ticket) => {
  return request({
    method: "POST",
    url: `${COMMON_URL}/verifycode`,
    data: {
      randStr: randstr, ticket
    }
  })
}

// 获取所有城市数据
export const reqCatetoryData = () => {
  return request({
    method: "GET",
    url: `${COMMON_URL}/countryData`,
  })
}