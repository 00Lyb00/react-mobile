import CheckPhone from '@pages/regist/CheckPhone'
import ShortMsg from '@pages/regist/ShortMsg'
import SetPassword from '@pages/regist/SetPassword'
// 路由配置
const routes = [
  {
    path: '/regist/checkphone',
    component: CheckPhone,
    excat: true
  },
  {
    path: '/regist/shortMsg',
    component: ShortMsg,
    excat: true
  },
  {
    path: '/regist/setPassword',
    component: SetPassword,
    excat: true
  }
]
export default routes