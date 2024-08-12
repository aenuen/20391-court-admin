// 异步加载
import guarantee from './modules/guarantee'
import account from './modules/account'
import icons from './modules/icons'
const asyncRoutes = [
  guarantee,
  account,
  icons,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
