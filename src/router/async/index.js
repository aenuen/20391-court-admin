// 异步加载
import guarantee from './modules/guarantee'
import manager from './modules/manager'
import icons from './modules/icons'
const asyncRoutes = [
  guarantee,
  manager,
  icons,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
