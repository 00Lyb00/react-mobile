// 引入合并reducers的对象
import { combineReducers } from 'redux'

function user(prevState = 0,action) {
  switch(action.type) {
    default: 
      return prevState
  }
}

// 暴露
export default combineReducers({  // 调用
  user
})