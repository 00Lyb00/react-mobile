// 引入合并reducers的对象
import { combineReducers } from 'redux'
import { PUT_PHONE } from './constants'


function putPhone(prevState = '', action) {
  switch (action.type) {
    case PUT_PHONE:
      return action.data
    default:
      return prevState
  }
}

function user(prevState = 0, action) {
  switch (action.type) {
    default:
      return prevState
  }
}

// 暴露
export default combineReducers({  // 调用
  user,
  putPhone
})