import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入reducers
import reducers from './reducers'
let middle = applyMiddleware(thunk)

// 判断是否时开发模式
if (process.env.NODE_ENV === 'development') {
  middle = composeWithDevTools(middle)
}

// 暴露store对象
export default createStore(reducers, middle)