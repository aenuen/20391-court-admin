// 异步加载
import { guarantee } from './modules/guarantee'
import { organize } from './modules/organize'
import { audit } from './modules/audit'
import { account } from './modules/account'
import { user } from './modules/user'
import { dict } from './modules/dict'
import { icons } from './modules/icons'
const asyncRoutes = [
  guarantee,
  organize,
  audit,
  user,
  dict,
  account,
  icons,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
